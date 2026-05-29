import { useState, useRef, useCallback } from 'react';
import { detectPitch } from '../utils/audioUtils'; // kept as autocorrelation fallback
import { getSwaram, identifyRaga, RAGAS } from '../utils/ragaLogic';
/* global ml5 */
import { identifyRagaWithGroq } from '../utils/groqIdentify';
import SketchyRule from './SketchyRule';

const STATUS = {
  IDLE:      'idle',
  RECORDING: 'recording',
  ANALYZING: 'analyzing',
  RESULTS:   'results',
  ERROR:     'error',
};

const FRAME_MS       = 80;
const MAX_RECORD_SEC = 45;
const MIN_SCORE      = 4.0; // minimum identifyRaga score before we trust a result

// Western note names used only to display the inferred Sa to the user.
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
function hzToNoteName(hz) {
    const semi = Math.round(12 * Math.log2(hz / 16.35));
    return `${NOTE_NAMES[((semi % 12) + 12) % 12]}${Math.floor(semi / 12)}`;
}

// Group consecutive pitch frames into stable note events.
// Compares each new frame to the MODE semitone of the current group (not the last frame)
// so that natural pitch drift within a sustained note doesn't shatter the group.
// Requires ≥5 frames (~400 ms) to count — filters slides and brief ornaments.
function buildNoteEvents(hzFrames) {
    if (hzFrames.length < 5) return [];
    const toSemi = (hz) => Math.round(12 * Math.log2(hz / 130.81));

    let group   = [hzFrames[0]];
    let semiBin = { [toSemi(hzFrames[0])]: 1 }; // running semitone-count for this group
    let modeSemi = toSemi(hzFrames[0]);

    const getMode = (bin) => {
        let best = modeSemi, bestVal = 0;
        for (const [k, v] of Object.entries(bin)) { if (v > bestVal) { bestVal = v; best = +k; } }
        return best;
    };

    const events = [];
    const flush  = () => {
        if (group.length >= 5) {
            events.push({
                hz:         group.reduce((a, b) => a + b, 0) / group.length,
                durationMs: group.length * FRAME_MS,
            });
        }
    };

    for (let i = 1; i < hzFrames.length; i++) {
        const cs = toSemi(hzFrames[i]);
        if (Math.abs(cs - modeSemi) <= 2) {          // ±2 semitone tolerance handles vibrato
            group.push(hzFrames[i]);
            semiBin[cs] = (semiBin[cs] || 0) + 1;
            modeSemi = getMode(semiBin);
        } else {
            flush();
            group    = [hzFrames[i]];
            semiBin  = { [cs]: 1 };
            modeSemi = cs;
        }
    }
    flush();
    return events;
}

// Build a 12-bin pitch-class histogram from stable note events (weighted by duration).
// This tells us which notes the singer actually held longest.
function buildPitchHistogram(noteEvents) {
    const hist = new Array(12).fill(0);
    for (const { hz, durationMs } of noteEvents) {
        const bin = ((Math.round(12 * Math.log2(hz / 130.81)) % 12) + 12) % 12;
        hist[bin] += durationMs;
    }
    return hist;
}

// Return all 12 chromatic tonic candidates sorted by histogram weight (most-sung pitch class first).
// We evaluate every semitone — accuracy matters more than speed — but the ordering lets the
// best candidates bubble up so the composite sort below can pick the winner confidently.
function rankTonicCandidates(histogram) {
    return histogram
        .map((w, bin) => ({ bin, w }))
        .sort((a, b) => b.w - a.w)
        .map(({ bin }) => 130.81 * Math.pow(2, bin / 12));
}

// Score one candidate tonic. Returns null only if note variety is too low or no raga matches at all.
// Returns a composite `tonicScore` covering five dimensions so the caller can rank correctly even
// when two tonics produce the same identifyRaga score.
function scoreCandidate(saHz, noteEvents) {
    const noteFreqs = {};
    const swaraList = [];

    for (const { hz, durationMs } of noteEvents) {
        const s = getSwaram(hz, saHz);
        if (!s) continue;
        const w = Math.max(1, Math.round(durationMs / 200));
        for (let i = 0; i < w; i++) swaraList.push(s);
        noteFreqs[s] = (noteFreqs[s] || 0) + w;
    }

    const unique = [...new Set(swaraList)];
    if (unique.length < 4) return null;

    const candidates = identifyRaga(unique, noteFreqs);
    if (!candidates.length || candidates[0].score < 1) return null;

    // ── Tonic quality dimensions ──────────────────────────────────────────────

    const totalWeight = Object.values(noteFreqs).reduce((a, b) => a + b, 0);

    // 1. Sa prominence: Sa should appear and carry reasonable duration weight.
    //    Reward proportionally up to 2.0; penalise lightly if Sa is absent.
    const saFraction = totalWeight > 0 ? (noteFreqs['Sa'] || 0) / totalWeight : 0;
    const saBonus    = saFraction > 0.03 ? Math.min(saFraction * 5, 2.0) : -0.5;

    // 2. Pa plausibility: Pa is a stable svara in the vast majority of ragas.
    const paBonus = (noteFreqs['Pa'] || 0) > 0 ? 0.3 : 0;

    // 3. Landing / nyasa plausibility: the last 3 note events should ideally
    //    resolve to Sa, Pa, or a Madhyama — the most common nyasa swaras.
    const tail      = noteEvents.slice(-3);
    const tailNotes = tail.map(e => getSwaram(e.hz, saHz)).filter(Boolean);
    const landingBonus = tailNotes.some(
        s => s === 'Sa' || s === 'Pa' || s === 'Ma1' || s === 'Ma2'
    ) ? 0.5 : 0;

    // 4. Phrase coherence proxy: fraction of consecutive note pairs that move
    //    by ≤2 semitones (stepwise) or wrap across the octave (Ni→Sa).
    //    Carnatic melody is overwhelmingly stepwise; a tonic that makes the
    //    transitions look like leaps is likely wrong.
    let stepCount = 0;
    for (let i = 1; i < noteEvents.length; i++) {
        const s1  = Math.round(12 * Math.log2(noteEvents[i - 1].hz / saHz));
        const s2  = Math.round(12 * Math.log2(noteEvents[i].hz     / saHz));
        const gap = Math.abs(((s2 - s1 + 6) % 12) - 6); // shortest circular distance
        if (gap <= 2) stepCount++;
    }
    const pairs          = Math.max(noteEvents.length - 1, 1);
    const coherenceBonus = (stepCount / pairs) * 0.8;

    const tonicScore = saBonus + paBonus + landingBonus + coherenceBonus;

    return { saHz, unique, noteFreqs, candidates, tonicScore };
}

// Build the swara evidence string in the format identifyRagaWithGroq expects.
function buildSwaraString(noteEvents, saHz) {
    const noteSeq = noteEvents.map(({ hz, durationMs }) => {
        const s = getSwaram(hz, saHz);
        if (!s) return null;
        if (durationMs > 1500) return `${s}(very long)`;
        if (durationMs > 800)  return `${s}(long)`;
        return s;
    }).filter(Boolean).join(' ');

    const counts = {};
    const longCounts = {};
    noteEvents.forEach(({ hz, durationMs }) => {
        const s = getSwaram(hz, saHz);
        if (!s) return;
        counts[s] = (counts[s] || 0) + 1;
        if (durationMs > 800) longCounts[s] = (longCounts[s] || 0) + 1;
    });

    const freqSummary = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([n, c]) => `${n}×${c}${longCounts[n] ? `(${longCounts[n]} long)` : ''}`)
        .join(', ');

    return `${noteSeq}\n\nNOTE FREQUENCY SUMMARY (most→least frequent): ${freqSummary}`;
}

export default function Viveka({ onSelectRaga }) {
    const [status,    setStatus]    = useState(STATUS.IDLE);
    const [elapsed,   setElapsed]   = useState(0);
    const [currentHz, setCurrentHz] = useState(null);
    const [results,   setResults]   = useState(null);
    const [errorMsg,  setErrorMsg]  = useState('');

    const streamRef     = useRef(null);
    const analyserRef   = useRef(null);
    const pitchTimer    = useRef(null);
    const countTimer    = useRef(null);
    const autoStopTimer = useRef(null);
    const framesRef     = useRef([]);
    const statusRef     = useRef(STATUS.IDLE); // mirror for use inside closures

    const cleanup = useCallback(() => {
        clearInterval(pitchTimer.current);
        clearInterval(countTimer.current);
        clearTimeout(autoStopTimer.current);
        streamRef.current?.getTracks().forEach(t => t.stop());
        streamRef.current = null;
        analyserRef.current = null;
    }, []);

    const runAnalysis = useCallback(async (frames) => {
        const noteEvents = buildNoteEvents(frames);

        if (noteEvents.length < 6) {
            setErrorMsg('Could not detect enough stable notes. Try singing a full phrase slowly and clearly — hold each note for at least half a second.');
            setStatus(STATUS.ERROR);
            return;
        }

        // Evaluate all 12 chromatic tonic candidates, ordered by histogram weight so the
        // likeliest candidates are processed first. scoreCandidate returns null for any
        // tonic that produces fewer than 4 unique swaras or zero raga matches.
        const histogram       = buildPitchHistogram(noteEvents);
        const tonicCandidates = rankTonicCandidates(histogram);

        const scored = tonicCandidates
            .map(saHz => scoreCandidate(saHz, noteEvents))
            .filter(Boolean)
            .sort((a, b) => {
                // Primary rank: identifyRaga score + tonic quality composite.
                // tonicScore breaks ties when two tonics produce equally good raga matches.
                const compA = (a.candidates[0]?.score ?? -99) + a.tonicScore;
                const compB = (b.candidates[0]?.score ?? -99) + b.tonicScore;
                return compB - compA;
            });

        if (!scored.length) {
            setErrorMsg('Could not match the phrase to any known raga. Try a longer phrase with more varied notes.');
            setStatus(STATUS.ERROR);
            return;
        }

        const best      = scored[0];
        const bestScore = best.candidates[0]?.score ?? -99; // raw raga score, not composite

        // Gate on raw raga score — tonic quality bonus must not let weak raga evidence through.
        if (bestScore < MIN_SCORE) {
            setErrorMsg('The phrase didn\'t have enough note variety to identify a raga confidently. Try singing a longer melodic phrase.');
            setStatus(STATUS.ERROR);
            return;
        }

        const swaraString = buildSwaraString(noteEvents, best.saHz);

        // Ambiguity check uses the composite score so that a tonic with better Sa/landing
        // behaviour beats one that is numerically close on raga score alone.
        const compTop    = (best.candidates[0]?.score ?? 0) + best.tonicScore;
        const compSecond = scored[1] ? (scored[1].candidates[0]?.score ?? 0) + scored[1].tonicScore : 0;
        const tonicAmbiguous = compTop > 0 && compSecond / compTop > 0.88;

        let groqResult = null;
        try {
            groqResult = await identifyRagaWithGroq(swaraString);
        } catch (_) {
            // Network/API failure — fall back to local scoring only.
        }

        const topMatches = groqResult?.top_matches ?? best.candidates.slice(0, 3).map(c => ({
            raagam:     c.name,
            confidence: c.score > 8 ? 'high' : c.score > 4 ? 'medium' : 'low',
            reasoning:  `Matched ${c.matchCount} of the scale notes; ${c.alienCount} note(s) fell outside the raga.`,
            prayogams:  [],
        }));

        setResults({
            matches: topMatches,
            saHz: best.saHz,
            tonicAmbiguous,
            localOnly: !groqResult,
        });
        setStatus(STATUS.RESULTS);
    }, []);

    const stopAndAnalyze = useCallback(() => {
        if (statusRef.current !== STATUS.RECORDING) return;
        statusRef.current = STATUS.ANALYZING;
        cleanup();
        const frames = [...framesRef.current];
        setStatus(STATUS.ANALYZING);
        runAnalysis(frames);
    }, [cleanup, runAnalysis]);

    const startRecording = async () => {
        framesRef.current = [];
        setCurrentHz(null);
        setResults(null);
        setErrorMsg('');
        setElapsed(0);

        try {
            // Resume synchronously during the user gesture — required on iOS Safari.
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (ctx.state === 'suspended') ctx.resume().catch(() => {});

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
            });
            streamRef.current = stream;

            statusRef.current = STATUS.RECORDING;
            setStatus(STATUS.RECORDING);

            // Shared acceptor: octave-jump filter before pushing any Hz reading.
            const onHz = (hz) => {
                const prev = framesRef.current[framesRef.current.length - 1];
                if (!prev || Math.abs(Math.log2(hz / prev)) < 0.6) {
                    framesRef.current.push(hz);
                    setCurrentHz(hz);
                }
            };

            // Autocorrelation fallback — used only when ml5 model fails to load.
            const startAutocorrelation = () => {
                const source  = ctx.createMediaStreamSource(stream);
                const analyser = ctx.createAnalyser();
                analyser.fftSize = 2048;
                source.connect(analyser);
                analyserRef.current = analyser;
                pitchTimer.current = setInterval(() => {
                    if (!analyserRef.current) return;
                    const hz = detectPitch(analyserRef.current, ctx.sampleRate);
                    if (hz) onHz(hz);
                }, FRAME_MS);
            };

            // Primary: ml5 CREPE — same higher-quality model used by the Ālaap AI panel.
            // 3-frame stability buffer eliminates slide/transient frames before adding to the pool.
            const pitchBuf = [];
            const CREPE_URL = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
            ml5.pitchDetection(CREPE_URL, ctx, stream, (err, pitchModel) => {
                if (statusRef.current !== STATUS.RECORDING) return; // stopped before model loaded
                if (err || !pitchModel) { startAutocorrelation(); return; }

                const loop = () => {
                    if (statusRef.current !== STATUS.RECORDING) return;
                    pitchModel.getPitch((_, hz) => {
                        if (hz && statusRef.current === STATUS.RECORDING) {
                            const last = pitchBuf[pitchBuf.length - 1];
                            if (last && Math.abs(Math.log2(hz / last)) >= 0.6) {
                                pitchBuf.length = 0; // octave jump — reset stability window
                            } else {
                                pitchBuf.push(hz);
                                if (pitchBuf.length > 3) pitchBuf.shift();
                                if (pitchBuf.length === 3) {
                                    // All 3 frames within ±1 semitone → stable note, accept it.
                                    const ref = Math.round(12 * Math.log2(pitchBuf[0] / 130.81));
                                    const stable = pitchBuf.every(
                                        f => Math.abs(Math.round(12 * Math.log2(f / 130.81)) - ref) <= 1
                                    );
                                    if (stable) onHz(hz);
                                }
                            }
                        }
                        if (statusRef.current === STATUS.RECORDING) loop();
                    });
                };
                loop();
            });

            countTimer.current    = setInterval(() => setElapsed(e => e + 1), 1000);
            autoStopTimer.current = setTimeout(stopAndAnalyze, MAX_RECORD_SEC * 1000);
        } catch (err) {
            setErrorMsg(
                err.name === 'NotAllowedError'
                    ? 'Microphone access denied — please allow mic access and try again.'
                    : err.message || String(err)
            );
            setStatus(STATUS.ERROR);
        }
    };

    const reset = () => {
        cleanup();
        statusRef.current = STATUS.IDLE;
        setStatus(STATUS.IDLE);
        setResults(null);
        setErrorMsg('');
        setElapsed(0);
        setCurrentHz(null);
        framesRef.current = [];
    };

    const handleSelectRaga = (ragaName) => {
        const ragaData = RAGAS[ragaName];
        if (ragaData && onSelectRaga) {
            onSelectRaga({ raga: { name: ragaName, ...ragaData }, hasClearMatch: true, type: 'identify' });
        }
    };

    const confidenceBadge = (c) => {
        if (c === 'high')   return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
        if (c === 'medium') return 'text-c-gold bg-c-gold/10 border-c-gold/30';
        return 'text-c-cream-dark bg-white/5 border-c-border';
    };

    const topConf = results?.matches?.[0]?.confidence;
    const guidanceMsg = results?.tonicAmbiguous
        ? 'The tonic (Sa) was ambiguous — try starting or ending a phrase cleanly on Sa'
        : topConf === 'low'
        ? 'For a sharper result, sing a longer phrase with more note variety and movement'
        : null;

    const pct = Math.min((elapsed / MAX_RECORD_SEC) * 100, 100);

    return (
        <main className="w-full max-w-3xl mx-auto flex flex-col items-center gap-7 px-4 md:px-8 py-10 animate-fade-in">
            <div className="w-full flex flex-col items-center gap-7">

                {/* Header */}
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-c-card border border-c-gold/30 flex items-center justify-center text-c-gold shadow-md flex-shrink-0">
                            {/* Radar / resonance icon — concentric arcs with a centre dot */}
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="2" fill="#C8941F" stroke="none" />
                                <circle cx="12" cy="12" r="5" strokeOpacity="0.5" />
                                <circle cx="12" cy="12" r="9" strokeOpacity="0.25" fill="currentColor" fillOpacity="0.04" />
                                <line x1="12" y1="3" x2="12" y2="6" strokeOpacity="0.3" />
                                <line x1="12" y1="18" x2="12" y2="21" strokeOpacity="0.3" />
                                <line x1="3" y1="12" x2="6" y2="12" strokeOpacity="0.3" />
                                <line x1="18" y1="12" x2="21" y2="12" strokeOpacity="0.3" />
                            </svg>
                        </div>
                        <div className="flex flex-col text-left">
                            <div className="flex items-center gap-2">
                                <h1 className="font-playfair text-xl font-bold tracking-wider text-c-gold uppercase leading-none">Viveka</h1>
                                <span className="text-[8px] uppercase tracking-widest bg-c-gold/15 text-c-gold px-2 py-0.5 rounded font-semibold border border-c-gold/20 leading-none">Identify</span>
                            </div>
                            <p className="text-c-cream-dim text-[11px] mt-1 font-light leading-none">
                                Sing freely — Viveka discerns the raga.
                            </p>
                        </div>
                    </div>
                    {status !== STATUS.IDLE && (
                        <button
                            onClick={reset}
                            className="text-xs text-c-cream-dark hover:text-c-gold transition-colors font-playfair underline underline-offset-2"
                        >
                            Start over
                        </button>
                    )}
                </div>

                <SketchyRule className="mt-2 opacity-60" />

                {/* ── IDLE ── */}
                {status === STATUS.IDLE && (
                    <div className="w-full flex flex-col items-center gap-8 py-4">
                        <div className="w-full max-w-sm text-center flex flex-col gap-3">
                            <p className="font-playfair text-c-cream text-base leading-relaxed">
                                Sing any Carnatic phrase — scales, a melodic fragment, or the characteristic lines of a raga you want to identify.
                            </p>
                            <p className="text-c-cream-dark text-xs leading-relaxed">
                                No Sa setup needed. Viveka infers your tonic automatically and matches the phrase to a raga.
                            </p>
                        </div>

                        <button
                            onClick={startRecording}
                            className="relative w-24 h-24 rounded-full bg-c-card border-2 border-c-gold/50 hover:border-c-gold hover:bg-c-gold-faint flex items-center justify-center transition-all active:scale-95 group"
                        >
                            <div className="absolute inset-[-4px] rounded-full border border-c-gold/15 animate-ping opacity-50" />
                            <span className="text-c-gold text-[10px] font-mono uppercase tracking-widest font-bold group-hover:text-c-gold-light">Record</span>
                        </button>

                        <div className="flex flex-col items-center gap-1.5 text-center">
                            <p className="text-[10px] text-c-cream-dark font-mono uppercase tracking-widest opacity-60">
                                Suggested: 15–45 seconds · clear vowels
                            </p>
                            <p className="text-[10px] text-c-cream-dark font-playfair italic opacity-50">
                                Gamakams are fine — hold each core note for a moment so it's detected
                            </p>
                        </div>
                    </div>
                )}

                {/* ── RECORDING ── */}
                {status === STATUS.RECORDING && (
                    <div className="w-full flex flex-col items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                            <span className="font-playfair text-c-cream italic">Listening</span>
                            <span className="font-mono text-c-gold text-sm tabular-nums">{elapsed}s</span>
                            <span className="text-c-cream-dark text-xs font-mono opacity-60">/ {MAX_RECORD_SEC}s max</span>
                        </div>

                        <div className="w-full h-1.5 bg-c-border rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-c-gold-dim to-c-gold transition-all duration-1000 rounded-full"
                                style={{ width: `${pct}%` }}
                            />
                        </div>

                        {/* Live pitch readout */}
                        <div className="text-center">
                            <div className="font-playfair text-5xl text-c-cream tabular-nums">
                                {currentHz ? currentHz.toFixed(0) : '·'}
                            </div>
                            <div className="text-[9px] uppercase tracking-widest text-c-cream-dark mt-1.5 font-mono opacity-60">
                                Hz · sing steadily, hold each note
                            </div>
                        </div>

                        {/* 7-bar waveform */}
                        <div className={`flex items-end gap-[3px] h-5 ${currentHz ? 'wave-active' : ''}`}>
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="wave-bar bg-c-gold-dim" />
                            ))}
                        </div>

                        <button
                            onClick={stopAndAnalyze}
                            className="px-8 py-2.5 bg-c-gold hover:bg-c-gold-light text-c-bg font-semibold text-sm rounded transition-all active:scale-95"
                        >
                            Analyze Now
                        </button>
                        <p className="text-[10px] text-c-cream-dark font-playfair italic opacity-60">
                            Or wait — auto-analyzes at {MAX_RECORD_SEC}s
                        </p>
                    </div>
                )}

                {/* ── ANALYZING ── */}
                {status === STATUS.ANALYZING && (
                    <div className="w-full flex flex-col items-center gap-5 py-8">
                        <div className="w-8 h-8 border-2 border-c-gold/30 border-t-c-gold rounded-full animate-spin" />
                        <div className="text-center flex flex-col gap-1.5">
                            <p className="font-playfair text-c-cream italic">Contemplating the phrase…</p>
                            <p className="text-[11px] text-c-cream-dark font-playfair italic opacity-70">
                                Inferring tonic · mapping swaras · discerning the raga
                            </p>
                        </div>
                    </div>
                )}

                {/* ── RESULTS ── */}
                {status === STATUS.RESULTS && results && (
                    <div className="w-full flex flex-col gap-4 animate-fade-in">

                        {/* Inferred Sa */}
                        {results.saHz && (
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-c-gold/40 text-xs">◆</span>
                                <p className="text-[11px] text-c-cream-dark font-playfair italic">
                                    Inferred Sa ≈{' '}
                                    <span className="text-c-gold-dim font-mono not-italic">
                                        {results.saHz.toFixed(1)} Hz · {hzToNoteName(results.saHz)}
                                    </span>
                                </p>
                                <span className="text-c-gold/40 text-xs">◆</span>
                            </div>
                        )}

                        {/* Guidance */}
                        {guidanceMsg && (
                            <div className="w-full bg-c-gold/5 border border-c-gold/20 rounded-lg px-4 py-3 text-[11px] text-c-cream-dark font-playfair italic text-center">
                                ✦ {guidanceMsg}
                            </div>
                        )}

                        {results.localOnly && (
                            <div className="w-full bg-c-border/10 border border-c-border/30 rounded-lg px-4 py-2 text-[10px] text-c-cream-dark font-mono text-center opacity-60">
                                AI analysis unavailable · showing local pattern match
                            </div>
                        )}

                        {/* Match cards */}
                        <div className="flex flex-col gap-3">
                            {results.matches.slice(0, 3).map((match, idx) => {
                                const localData = RAGAS[match.raagam];
                                return (
                                    <div
                                        key={idx}
                                        className={`w-full border rounded-xl overflow-hidden transition-all ${
                                            idx === 0
                                                ? 'border-c-gold/40 bg-c-card shadow-[0_0_20px_rgba(247,214,134,0.04)]'
                                                : 'border-c-border/60 bg-c-surface'
                                        }`}
                                    >
                                        <div className="px-5 py-3.5 flex items-start justify-between gap-3">
                                            <div className="flex items-start gap-3 min-w-0">
                                                <span className="text-[11px] text-c-cream-dark font-mono mt-0.5 flex-shrink-0 opacity-50">
                                                    {idx === 0 ? '◆' : idx === 1 ? '◇' : '·'}
                                                </span>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="font-playfair text-lg font-bold text-c-cream leading-none">
                                                            {match.raagam}
                                                        </h3>
                                                        {localData && (
                                                            <span className="text-[8px] uppercase tracking-widest text-c-cream-dark opacity-50 font-mono">
                                                                {localData.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {localData?.mood && (
                                                        <p className="text-[10px] text-c-gold/70 font-playfair italic mt-0.5 leading-snug">
                                                            {localData.mood}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border flex-shrink-0 mt-0.5 ${confidenceBadge(match.confidence)}`}>
                                                {match.confidence}
                                            </span>
                                        </div>

                                        {match.reasoning && (
                                            <div className="px-5 pb-3.5 border-t border-c-border/30 pt-3">
                                                <p className="text-[11px] text-c-cream-dark leading-relaxed font-playfair italic">
                                                    {match.reasoning}
                                                </p>
                                            </div>
                                        )}

                                        {match.prayogams?.length > 0 && (
                                            <div className="px-5 pb-3 flex flex-wrap gap-1.5">
                                                {match.prayogams.map((p, pi) => (
                                                    <span key={pi} className="text-[9px] font-mono bg-c-gold/10 border border-c-gold/20 text-c-gold px-2 py-0.5 rounded">
                                                        {p}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {localData && (
                                            <div className="px-5 pb-3.5">
                                                <button
                                                    onClick={() => handleSelectRaga(match.raagam)}
                                                    className="text-[10px] text-c-gold/70 hover:text-c-gold font-playfair italic underline underline-offset-2 transition-colors"
                                                >
                                                    Explore {match.raagam} in Raga Kosha →
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-center pt-2">
                            <button
                                onClick={reset}
                                className="px-6 py-2 border border-c-gold/40 hover:border-c-gold hover:bg-c-gold-faint text-c-gold text-sm rounded transition-all font-playfair"
                            >
                                Sing again
                            </button>
                        </div>
                    </div>
                )}

                {/* ── ERROR ── */}
                {status === STATUS.ERROR && (
                    <div className="w-full flex flex-col items-center gap-5 py-4">
                        <div className="w-full max-w-sm bg-red-900/20 border border-red-800/40 rounded-xl px-5 py-4 text-center">
                            <p className="text-red-400 text-sm font-playfair">{errorMsg}</p>
                        </div>
                        <button
                            onClick={reset}
                            className="px-6 py-2 border border-c-gold/40 hover:border-c-gold hover:bg-c-gold-faint text-c-gold text-sm rounded transition-all font-playfair"
                        >
                            Try again
                        </button>
                    </div>
                )}

            </div>
        </main>
    );
}
