import { useState, useRef, useEffect, useCallback } from 'react';
import { RAGAS, toSargam } from '../utils/ragaLogic';
import { playSequence, getAudioCtx, detectPitch, SWARA_SEMITONE } from '../utils/audioUtils';

const ragaNames = Object.keys(RAGAS).sort();
const DIFFICULTIES = [
    { id: 'easy',   label: 'Easy',   noteCount: 4 },
    { id: 'medium', label: 'Medium', noteCount: 6 },
    { id: 'hard',   label: 'Hard',   noteCount: null },
];
const LISTEN_SECS = 20;
const STATES = { IDLE: 'idle', PLAYING: 'playing', LISTENING: 'listening', SCORING: 'scoring', RESULT: 'result' };

function generatePhrase(raga, noteCount) {
    const aro = raga.arohanam || [];
    const count = noteCount || aro.length;
    if (count >= aro.length) return [...aro];
    const maxStart = aro.length - count;
    return aro.slice(Math.floor(Math.random() * (maxStart + 1)), Math.floor(Math.random() * (maxStart + 1)) + count);
}

// Set-based: is targetNote covered by any note in detectedList (±1 semitone)?
function isCovered(targetNote, detectedList) {
    const tSemi = SWARA_SEMITONE[targetNote] ?? -1;
    return detectedList.some(n => {
        const s = SWARA_SEMITONE[n] ?? -999;
        const d = Math.abs(tSemi - s);
        return d <= 1 || d >= 11; // handles octave wrap
    });
}

export default function SingBackChallenge() {
    const [selectedRaga, setSelectedRaga] = useState(ragaNames[0]);
    const [difficulty, setDifficulty]     = useState('easy');
    const [state, setState]               = useState(STATES.IDLE);
    const [phrase, setPhrase]             = useState([]);
    const [playingIdx, setPlayingIdx]     = useState(-1);
    const [detectedNotes, setDetectedNotes] = useState([]); // all unique notes heard
    const [countdown, setCountdown]       = useState(LISTEN_SECS);
    const [scores, setScores]             = useState([]);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // 0.75 | 1.0 | 1.25
    const [revealSargam, setRevealSargam]   = useState(false);

    const abortRef        = useRef(null);
    const streamRef       = useRef(null);
    const animFrameRef    = useRef(null);
    const listenTimerRef  = useRef(null);
    const detectedRef     = useRef([]); // mutable list of unique notes detected

    useEffect(() => () => {
        abortRef.current?.();
        streamRef.current?.getTracks().forEach(t => t.stop());
        cancelAnimationFrame(animFrameRef.current);
        clearInterval(listenTimerRef.current);
    }, []);

    const raga = RAGAS[selectedRaga] || {};
    const diff = DIFFICULTIES.find(d => d.id === difficulty);

    const finishListening = useCallback((targetPhrase) => {
        clearInterval(listenTimerRef.current);
        cancelAnimationFrame(animFrameRef.current);
        streamRef.current?.getTracks().forEach(t => t.stop());
        streamRef.current = null;
        setState(STATES.SCORING);

        // Set-based: each target note is correct if ANY detected note matches it
        const detected = detectedRef.current;
        const noteScores = targetPhrase.map(target => ({
            target,
            correct: isCovered(target, detected),
        }));
        setScores(noteScores);
        setTimeout(() => setState(STATES.RESULT), 400);
    }, []);

    const startChallenge = useCallback(async () => {
        const newPhrase = generatePhrase(raga, diff.noteCount);
        setPhrase(newPhrase);
        setDetectedNotes([]);
        setScores([]);
        setRevealSargam(false);
        detectedRef.current = [];
        setCountdown(LISTEN_SECS);

        // Phase 1: play the phrase
        setState(STATES.PLAYING);
        const speedFactor = 1 / playbackSpeed;
        const { promise, abort } = playSequence(newPhrase, 261.63, {
            gapMs: 650 * speedFactor, 
            duration: 0.5 * speedFactor,
            onNote: (_, idx) => setPlayingIdx(idx),
        });
        abortRef.current = abort;
        await promise;
        setPlayingIdx(-1);

        // Phase 2: listen
        setState(STATES.LISTENING);
        try {
            const audioCtx = getAudioCtx();
            const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = mediaStream;
            const source   = audioCtx.createMediaStreamSource(mediaStream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 2048;
            source.connect(analyser);

            let lastNote = null;
            let lastNoteTime = 0;

            const detect = () => {
                const freq = detectPitch(analyser, audioCtx.sampleRate);
                if (freq) {
                    const ratio      = freq / 261.63;
                    const semitones  = 12 * (Math.log(ratio) / Math.log(2));
                    let interval     = Math.round(semitones) % 12;
                    if (interval < 0) interval += 12;
                    const entry      = Object.entries(SWARA_SEMITONE).find(([, s]) => s === interval);
                    const detectedNote = entry ? entry[0] : null;

                    if (detectedNote && detectedNote !== lastNote) {
                        // Confirm previous note if held ≥200ms
                        if (lastNote && Date.now() - lastNoteTime > 200) {
                            if (!detectedRef.current.includes(lastNote)) {
                                detectedRef.current = [...detectedRef.current, lastNote];
                                setDetectedNotes([...detectedRef.current]);
                            }
                        }
                        lastNote     = detectedNote;
                        lastNoteTime = Date.now();
                    }
                }
                animFrameRef.current = requestAnimationFrame(detect);
            };
            detect();

            let remaining = LISTEN_SECS;
            listenTimerRef.current = setInterval(() => {
                remaining -= 1;
                setCountdown(remaining);
                if (remaining <= 0) {
                    // Flush last held note
                    if (lastNote && Date.now() - lastNoteTime > 200 && !detectedRef.current.includes(lastNote)) {
                        detectedRef.current = [...detectedRef.current, lastNote];
                    }
                    finishListening(newPhrase);
                }
            }, 1000);
        } catch {
            setState(STATES.IDLE);
        }
    }, [raga, diff, finishListening, playbackSpeed]);

    const reset = () => {
        abortRef.current?.();
        streamRef.current?.getTracks().forEach(t => t.stop());
        clearInterval(listenTimerRef.current);
        cancelAnimationFrame(animFrameRef.current);
        setState(STATES.IDLE);
        setPhrase([]); setDetectedNotes([]); setScores([]);
        setPlayingIdx(-1); detectedRef.current = [];
    };

    const totalCorrect = scores.filter(s => s.correct).length;
    const totalScore   = scores.length ? Math.round((totalCorrect / scores.length) * 100) : 0;
    const scoreLabel   = totalScore >= 90 ? 'Perfect!' : totalScore >= 70 ? 'Great!' : totalScore >= 50 ? 'Good try!' : 'Keep practicing!';

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-8 relative z-10">
            <div className="border-b border-c-gold/20 pb-4">
                <h2 className="font-playfair text-3xl font-bold text-c-gold tracking-tight">Sing-Back Challenge</h2>
                <p className="text-c-cream-dark text-sm mt-2 font-playfair italic leading-relaxed">
                    Listen to the phrase, then sing any of those notes back  ·  order doesn't matter.
                </p>
            </div>

            {/* ── IDLE ── */}
            {state === STATES.IDLE && (
                <div className="space-y-4 animate-fade-in">
                    <div className="heritage-card rounded-lg p-6 space-y-4 shadow-lg">
                        {/* Heritage Corners */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="heritage-border-corner heritage-corner-tl" />
                            <div className="heritage-border-corner heritage-corner-tr" />
                            <div className="heritage-border-corner heritage-corner-bl" />
                            <div className="heritage-border-corner heritage-corner-br" />
                        </div>

                        <p className="text-xs font-playfair font-bold text-c-gold uppercase tracking-[0.2em] border-b border-c-gold/10 pb-2 relative z-10">Choose a Raagam</p>
                        <div className="relative z-10">
                            <select value={selectedRaga} onChange={e => setSelectedRaga(e.target.value)}
                                className="w-full bg-c-card border border-c-gold/30 text-c-gold font-playfair font-bold rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-c-gold shadow-inner">
                                {ragaNames.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="heritage-card rounded-lg p-6 space-y-4 shadow-lg">
                         {/* Heritage Corners */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="heritage-border-corner heritage-corner-tl" />
                            <div className="heritage-border-corner heritage-corner-tr" />
                            <div className="heritage-border-corner heritage-corner-bl" />
                            <div className="heritage-border-corner heritage-corner-br" />
                        </div>

                        <p className="text-xs font-playfair font-bold text-c-gold uppercase tracking-[0.2em] border-b border-c-gold/10 pb-2 relative z-10">Difficulty</p>
                        <div className="flex gap-3 relative z-10">
                            {DIFFICULTIES.map(d => (
                                <button key={d.id} onClick={() => setDifficulty(d.id)}
                                    className={`flex-1 px-5 py-2.5 rounded border font-playfair font-bold text-xs tracking-widest transition-all duration-300 ${
                                        difficulty === d.id
                                            ? 'bg-c-gold border-c-gold text-c-bg shadow-md'
                                            : 'border-c-gold/20 text-c-gold hover:bg-c-gold/5'
                                    }`}>
                                    {d.label}
                                    <span className="block text-[10px] opacity-60 mt-1 font-normal tracking-tight">
                                        {d.noteCount ? `${d.noteCount} notes` : 'Full scale'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Symmetrical Tempo Control Card */}
                    <div className="heritage-card rounded-lg p-6 space-y-4 shadow-lg">
                        {/* Heritage Corners */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="heritage-border-corner heritage-corner-tl" />
                            <div className="heritage-border-corner heritage-corner-tr" />
                            <div className="heritage-border-corner heritage-corner-bl" />
                            <div className="heritage-border-corner heritage-corner-br" />
                        </div>

                        <p className="text-xs font-playfair font-bold text-c-gold uppercase tracking-[0.2em] border-b border-c-gold/10 pb-2 relative z-10">Playback Tempo</p>
                        <div className="flex gap-3 relative z-10">
                            {[0.75, 1.0, 1.25].map(speed => (
                                <button key={speed} onClick={() => setPlaybackSpeed(speed)}
                                    className={`flex-1 px-5 py-2.5 rounded border font-mono font-bold text-xs tracking-wider transition-all duration-300 ${
                                        playbackSpeed === speed
                                            ? 'bg-c-gold border-c-gold text-c-bg shadow-md'
                                            : 'border-c-gold/20 text-c-gold hover:bg-c-gold/5'
                                    }`}>
                                    {speed === 1.0 ? '1.0x (Normal)' : `${speed}x`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={startChallenge}
                        className="w-full py-3 rounded-xl border border-c-gold text-c-gold hover:bg-c-gold hover:text-c-bg font-playfair text-base tracking-wide transition-colors">
                        ▶ Start Challenge
                    </button>
                </div>
            )}

            {/* ── PLAYING ── */}
            {state === STATES.PLAYING && (
                <div className="flex flex-col items-center gap-6 py-8 animate-fade-in">
                    <p className="text-c-cream font-playfair text-lg italic">Listen carefully…</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {phrase.map((note, i) => (
                            <span key={i} className={`px-4 py-2.5 rounded-lg border font-mono text-sm transition-all duration-200 ${
                                i === playingIdx
                                    ? 'bg-c-gold border-c-gold text-c-bg scale-110 shadow-md'
                                    : i < playingIdx
                                    ? 'border-c-gold/40 bg-c-gold-faint text-c-gold'
                                    : 'border-c-border text-c-cream-dark'
                            }`}>
                                {revealSargam || i === playingIdx ? toSargam(note) : '❓'}
                            </span>
                        ))}
                    </div>

                    {/* Sargam Cheat-Sheet Toggle */}
                    <button 
                        onClick={() => setRevealSargam(prev => !prev)}
                        className={`px-4 py-1.5 rounded-full border text-[10px] font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                            revealSargam 
                                ? 'bg-c-gold/20 border-c-gold text-c-gold shadow-[0_0_8px_rgba(200,148,31,0.15)] hover:bg-c-gold/30' 
                                : 'bg-c-card border-c-border/40 text-c-cream-dim hover:border-c-gold/50 hover:text-c-gold'
                        }`}
                    >
                        {revealSargam ? '👁️ Sargam Revealed' : '🙈 Reveal Sargam Cheat-Sheet'}
                    </button>
                </div>
            )}

            {/* ── LISTENING ── */}
            {state === STATES.LISTENING && (
                <div className="flex flex-col items-center gap-6 py-6 animate-fade-in">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <p className="text-c-cream font-playfair text-base italic">Sing any of these notes</p>
                        <span className="font-mono text-c-gold tabular-nums">{countdown}s</span>
                    </div>
                    {/* Target notes  ·  highlight as they are covered */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {phrase.map((note, i) => {
                            const covered = isCovered(note, detectedNotes);
                            return (
                                <span key={i} className={`px-4 py-2.5 rounded-lg border font-mono text-sm transition-all duration-300 ${
                                    covered
                                        ? 'bg-c-gold border-c-gold text-c-bg scale-105'
                                        : 'border-c-border text-c-cream-dark'
                                }`}>
                                    {revealSargam ? toSargam(note) : '❓'}
                                    {covered && <span className="ml-1 text-[10px]">✓</span>}
                                </span>
                            );
                        })}
                    </div>
                    
                    {/* Sargam Cheat-Sheet Toggle */}
                    <button 
                        onClick={() => setRevealSargam(prev => !prev)}
                        className={`px-4 py-1.5 rounded-full border text-[10px] font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                            revealSargam 
                                ? 'bg-c-gold/20 border-c-gold text-c-gold shadow-[0_0_8px_rgba(200,148,31,0.15)] hover:bg-c-gold/30' 
                                : 'bg-c-card border-c-border/40 text-c-cream-dim hover:border-c-gold/50 hover:text-c-gold'
                        }`}
                    >
                        {revealSargam ? '👁️ Sargam Revealed' : '🙈 Reveal Sargam Cheat-Sheet'}
                    </button>

                    <p className="text-[11px] text-c-cream-dark font-playfair italic">
                        {detectedNotes.length} note{detectedNotes.length !== 1 ? 's' : ''} heard so far
                    </p>
                    <button onClick={() => finishListening(phrase)}
                        className="text-xs text-c-cream-dark hover:text-c-gold transition-colors underline underline-offset-2 font-playfair italic">
                        Done  ·  score now
                    </button>
                </div>
            )}

            {/* ── SCORING ── */}
            {state === STATES.SCORING && (
                <div className="flex flex-col items-center gap-3 py-12">
                    <div className="w-5 h-5 border-2 border-c-gold/30 border-t-c-gold rounded-full animate-spin" />
                    <p className="text-c-cream-dark text-xs font-playfair italic">Scoring…</p>
                </div>
            )}

            {/* ── RESULT ── */}
            {state === STATES.RESULT && (
                <div className="flex flex-col items-center gap-6 py-4 animate-fade-in">
                    <div className="text-center">
                        <div className="font-playfair text-5xl text-c-gold font-bold">{totalCorrect}/{scores.length}</div>
                        <p className="text-c-cream-dim font-playfair italic mt-1">{scoreLabel}</p>
                        <p className="text-c-cream-dark text-xs mt-1 font-playfair">notes covered</p>
                    </div>
                    <div className="w-full bg-c-card border border-c-border rounded-xl p-5">
                        <p className="text-xs font-playfair italic text-c-cream-dark uppercase tracking-widest mb-3">Notes</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {scores.map((s, i) => (
                                <div key={i} className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg border ${
                                    s.correct ? 'border-c-gold bg-c-gold-faint' : 'border-c-border bg-c-surface'
                                }`}>
                                    <span className="font-mono text-base text-c-cream">{toSargam(s.target)}</span>
                                    <span className={`text-lg ${s.correct ? 'text-c-gold' : 'text-c-cream-dark'}`}>
                                        {s.correct ? '✓' : '✗'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={startChallenge}
                            className="px-6 py-2 rounded-lg border border-c-gold text-c-gold hover:bg-c-gold hover:text-c-bg font-playfair text-sm transition-colors">
                            Try Again
                        </button>
                        <button onClick={reset}
                            className="px-6 py-2 rounded-lg border border-c-border text-c-cream-dim hover:text-c-cream font-playfair text-sm transition-colors">
                            New Raga
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
