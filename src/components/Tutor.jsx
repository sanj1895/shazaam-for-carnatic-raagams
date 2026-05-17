import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RAGAS } from '../utils/ragaLogic';

// ─── Audio ────────────────────────────────────────────────────────────────────

const SEMITONES = {
    'Sa': 0, 'Ri1': 1, 'Ri2': 2, 'Ga1': 2, 'Ga2': 3, 'Ga3': 4,
    'Ma1': 5, 'Ma2': 6, 'Pa': 7, 'Da1': 8, 'Da2': 9, 'Da3': 10,
    'Ni1': 9, 'Ni2': 10, 'Ni3': 11,
};

const swaraFreq = (swara, sa) => sa * Math.pow(2, (SEMITONES[swara] ?? 0) / 12);

const playTone = (freq, duration = 1.1) => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const master = ctx.createGain();
        master.connect(ctx.destination);

        // Additive synthesis — harmonics approximate a sung vowel sound
        const harmonics = [1, 2, 3, 4, 5, 6, 7];
        const amps      = [0.48, 0.26, 0.14, 0.07, 0.03, 0.015, 0.008];
        harmonics.forEach((mult, i) => {
            const osc = ctx.createOscillator();
            const g   = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq * mult;
            g.gain.value = amps[i];
            osc.connect(g);
            g.connect(master);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        });

        // Natural attack / sustain / release
        master.gain.setValueAtTime(0, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.07);
        master.gain.setValueAtTime(0.28, ctx.currentTime + Math.max(0.07, duration - 0.12));
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    } catch {}
};

// Compute octave-aware frequencies so the second Sa is an octave above the first
const octaveFreqs = (swaras, sa) => {
    const out = [];
    let octave = 0, prevSt = -1;
    for (const s of swaras) {
        const st = SEMITONES[s] ?? 0;
        if (prevSt >= 0 && st <= prevSt) octave++;
        out.push(sa * Math.pow(2, (st + octave * 12) / 12));
        prevSt = st;
    }
    return out;
};

const playSequenceAsync = async (swaras, sa, onIdx, signal) => {
    const freqs = octaveFreqs(swaras, sa);
    for (let i = 0; i < swaras.length; i++) {
        if (signal?.aborted) return;
        onIdx(i);
        playTone(freqs[i], 0.7);
        await new Promise(r => setTimeout(r, 750));
    }
    onIdx(-1);
};

// Autocorrelation pitch detector — tuned for human voice
const detectPitch = (buf, sampleRate) => {
    const SIZE = buf.length;
    const rms = Math.sqrt(buf.reduce((s, v) => s + v * v, 0) / SIZE);
    if (rms < 0.002) return { freq: null, level: rms };

    const corr = new Float32Array(SIZE);
    for (let lag = 0; lag < SIZE; lag++) {
        let sum = 0;
        for (let i = 0; i < SIZE - lag; i++) sum += buf[i] * buf[i + lag];
        corr[lag] = sum;
    }
    let d = 1;
    while (d < SIZE - 1 && corr[d] > corr[d - 1]) d++;
    let maxVal = -Infinity, maxLag = -1;
    for (let i = d; i < SIZE / 2; i++) {
        if (corr[i] > maxVal) { maxVal = corr[i]; maxLag = i; }
    }
    if (maxLag < 2 || maxVal < 0.0005) return { freq: null, level: rms };
    const prev = corr[maxLag - 1], curr = corr[maxLag], next = corr[maxLag + 1] ?? 0;
    const denom = 2 * curr - prev - next;
    const shift = denom !== 0 ? (next - prev) / (2 * denom) : 0;
    return { freq: sampleRate / (maxLag + shift), level: rms };
};

const centsDiff = (freq, target) => 1200 * Math.log2(freq / target);

// Match freq to the nearest octave of targetSemitone — so singer can use their natural range
const centsToNearest = (freq, targetSt, sa) => {
    let base = sa * Math.pow(2, targetSt / 12);
    while (base * 1.5 < freq) base *= 2;
    while (base / 1.5 > freq) base /= 2;
    return centsDiff(freq, base);
};

// ─── Curriculum data ──────────────────────────────────────────────────────────

const CURRICULUM = [
    {
        id: 'foundation', title: 'The Foundation', symbol: '◈',
        subtitle: 'Sa & Pa — the two fixed pillars of every raga',
        color: '#5c1a0a',
        swaras: ['Sa', 'Pa'],
        lessons: [
            {
                id: 'meet_sa', title: 'Meet Sa',
                exercises: [
                    { type: 'listen', swara: 'Sa', instruction: 'Sa is the root — where every raga begins and ends. This is what complete rest sounds like.' },
                    { type: 'identify', play: 'Sa', choices: ['Sa', 'Pa'], instruction: 'Which swara did you hear?' },
                    { type: 'identify', play: 'Pa', choices: ['Sa', 'Pa'], instruction: 'And this one?' },
                ],
            },
            {
                id: 'meet_pa', title: 'Meet Pa',
                exercises: [
                    { type: 'listen', swara: 'Pa', instruction: 'Pa sits exactly 7 semitones above Sa — a perfect fifth. Like Sa, it cannot be altered in any raga.' },
                    { type: 'identify', play: 'Pa', choices: ['Sa', 'Pa'], instruction: 'Which is this?' },
                    { type: 'identify', play: 'Sa', choices: ['Sa', 'Pa'], instruction: 'Now this?' },
                    { type: 'identify', play: 'Pa', choices: ['Sa', 'Pa'], instruction: 'One more.' },
                ],
            },
            {
                id: 'sing_sa_pa', title: 'Sing Sa & Pa',
                exercises: [
                    { type: 'sing', swara: 'Sa', instruction: 'Sing Sa. Match the pitch and hold it steady.' },
                    { type: 'sing', swara: 'Pa', instruction: 'Sing Pa. Feel the upward jump from Sa.' },
                    { type: 'sing', swara: 'Sa', instruction: 'Return home to Sa.' },
                ],
            },
        ],
    },
    {
        id: 'mmg', title: 'Mayamalavagowla', symbol: '♬',
        subtitle: 'The first raga every student learns — 15th melakarta',
        color: '#0e2a4a',
        swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Pa', 'Da1', 'Ni3', 'Sa'],
        lessons: [
            {
                id: 'mmg_scale', title: 'Hear the Scale',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Sa','Ri1','Ga3','Ma1','Pa','Da1','Ni3','Sa'], instruction: 'Listen to Mayamalavagowla — all 7 swaras ascending.' },
                    { type: 'listen', swara: 'Ri1', instruction: 'Ri1 (Shuddha Rishabam) — flat and close to Sa. Plaintive, inward.' },
                    { type: 'listen', swara: 'Ga3', instruction: 'Ga3 (Antara Gandharam) — a bright jump. The characteristic note of this raga.' },
                    { type: 'identify', play: 'Ri1', choices: ['Sa', 'Ri1', 'Ga3'], instruction: 'Which swara?' },
                    { type: 'identify', play: 'Ga3', choices: ['Sa', 'Ri1', 'Ga3'], instruction: 'And this?' },
                ],
            },
            {
                id: 'mmg_upper', title: 'Da & Ni',
                exercises: [
                    { type: 'listen', swara: 'Da1', instruction: 'Da1 mirrors Ri1 in the upper half — same lowered, plaintive quality above Pa.' },
                    { type: 'listen', swara: 'Ni3', instruction: 'Ni3 mirrors Ga3 — bright, leading back to Sa.' },
                    { type: 'identify', play: 'Da1', choices: ['Pa', 'Da1', 'Ni3'], instruction: 'Which swara?' },
                    { type: 'identify', play: 'Ni3', choices: ['Pa', 'Da1', 'Ni3'], instruction: 'And this?' },
                    { type: 'identify', play: 'Ri1', choices: ['Ri1', 'Da1'], instruction: 'These two sound similar — Ri1 or Da1?' },
                ],
            },
            {
                id: 'mmg_sing', title: 'Sing the Scale',
                exercises: [
                    { type: 'sing', swara: 'Ri1', instruction: 'Sing Ri1 — 1 semitone above Sa, very close.' },
                    { type: 'sing', swara: 'Ga3', instruction: 'Sing Ga3 — 4 semitones up from Sa, a clear bright jump.' },
                    { type: 'sing', swara: 'Ma1', instruction: 'Sing Ma1 — the stable middle note.' },
                    { type: 'sing', swara: 'Da1', instruction: 'Sing Da1.' },
                    { type: 'sing', swara: 'Ni3', instruction: 'Sing Ni3 — feel it pulling back toward Sa.' },
                ],
            },
        ],
    },
    {
        id: 'alankaras', title: 'Alankaras', symbol: '♩',
        subtitle: 'The foundational melodic patterns — sung in every raga',
        color: '#1a3a20',
        swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Pa'],
        lessons: [
            {
                id: 'al_1', title: 'S R G — ascending',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Sa','Ri1','Ga3'], instruction: 'Sa Ri1 Ga3 — three notes up.' },
                    { type: 'listen_sequence', swaras: ['Sa','Ri1','Ga3','Ri1','Sa'], instruction: 'With a turn: S R G R S.' },
                    { type: 'identify', play: 'Ri1', choices: ['Sa', 'Ri1', 'Ga3'], instruction: 'Identify this swara.' },
                    { type: 'sing', swara: 'Ri1', instruction: 'Sing Ri1.' },
                    { type: 'sing', swara: 'Ga3', instruction: 'Sing Ga3.' },
                ],
            },
            {
                id: 'al_2', title: 'S R G M — four notes',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Sa','Ri1','Ga3','Ma1','Ga3','Ri1','Sa'], instruction: 'Full phrase: S R G M G R S.' },
                    { type: 'identify', play: 'Ma1', choices: ['Ga3', 'Ma1', 'Pa'], instruction: 'Pick out Ma1.' },
                    { type: 'sing', swara: 'Ma1', instruction: 'Sing Ma1.' },
                ],
            },
            {
                id: 'al_3', title: 'S R G M P — all the way to Pa',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Sa','Ri1','Ga3','Ma1','Pa','Ma1','Ga3','Ri1','Sa'], instruction: 'Full phrase: S R G M P M G R S.' },
                    { type: 'identify', play: 'Pa', choices: ['Ma1', 'Pa', 'Da1'], instruction: 'Which is Pa?' },
                    { type: 'sing', swara: 'Pa', instruction: 'Sing Pa — feel it settle.' },
                ],
            },
        ],
    },
];

// ─── Shared: Listen exercise ──────────────────────────────────────────────────

function ExerciseListen({ swara, sa, instruction, onDone }) {
    useEffect(() => {
        const t = setTimeout(() => playTone(swaraFreq(swara, sa)), 200);
        return () => clearTimeout(t);
    }, [swara, sa]);

    return (
        <div className="flex flex-col items-center gap-7 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm leading-relaxed">{instruction}</p>
            <div className="flex flex-col items-center gap-2">
                <div className="text-[64px] font-mono font-bold text-c-gold leading-none">{swara}</div>
                <button onClick={() => playTone(swaraFreq(swara, sa))}
                        className="text-xs text-c-cream-dark hover:text-c-gold transition-colors font-playfair italic flex items-center gap-1.5">
                    <span>▶</span> Play again
                </button>
            </div>
            <button onClick={onDone}
                    className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold tracking-wide hover:opacity-90 transition-opacity">
                Continue
            </button>
        </div>
    );
}

// ─── Shared: Listen sequence ──────────────────────────────────────────────────

function ExerciseListenSequence({ swaras, sa, instruction, onDone }) {
    const [activeIdx, setActiveIdx] = useState(-1);
    const [finished, setFinished] = useState(false);
    const abortRef = useRef(null);

    const run = useCallback(() => {
        abortRef.current?.abort();
        const ctrl = new AbortController();
        abortRef.current = ctrl;
        setFinished(false);
        playSequenceAsync(swaras, sa, setActiveIdx, ctrl.signal).then(() => {
            if (!ctrl.signal.aborted) setFinished(true);
        });
    }, [swaras, sa]);

    useEffect(() => { run(); return () => abortRef.current?.abort(); }, []);

    return (
        <div className="flex flex-col items-center gap-7 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm leading-relaxed">{instruction}</p>
            <div className="flex flex-wrap justify-center gap-2">
                {swaras.map((s, i) => (
                    <div key={i} className={`px-3 py-2 rounded-lg border font-mono text-sm font-bold transition-all duration-100 ${
                        i === activeIdx ? 'border-c-gold bg-c-gold text-c-bg scale-110' : 'border-c-border text-c-cream-dark'
                    }`}>{s}</div>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <button onClick={run} className="text-xs text-c-cream-dark hover:text-c-gold transition-colors font-playfair italic flex items-center gap-1.5">
                    <span>▶</span> Play again
                </button>
                {finished && (
                    <button onClick={onDone}
                            className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold tracking-wide hover:opacity-90 transition-opacity animate-fade-in">
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Shared: Identify exercise ────────────────────────────────────────────────

function ExerciseIdentify({ play, choices, sa, instruction, onDone }) {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const t = setTimeout(() => playTone(swaraFreq(play, sa)), 300);
        return () => clearTimeout(t);
    }, [play, sa]);

    return (
        <div className="flex flex-col items-center gap-7 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm">{instruction}</p>
            <button onClick={() => playTone(swaraFreq(play, sa))}
                    className="w-16 h-16 rounded-full border-2 border-c-gold/40 bg-c-gold-faint flex items-center justify-center text-c-gold hover:bg-c-gold hover:text-c-bg transition-colors text-2xl">
                ▶
            </button>
            <div className="flex gap-3 flex-wrap justify-center">
                {choices.map(choice => {
                    const isSelected = selected === choice;
                    const correct = choice === play;
                    return (
                        <button key={choice} disabled={!!selected}
                                onClick={() => setSelected(choice)}
                                className={`px-8 py-3 rounded-xl border font-mono text-sm font-bold transition-all duration-200 ${
                                    !selected ? 'border-c-border bg-c-card text-c-cream hover:border-c-gold/60' :
                                    isSelected && correct  ? 'border-emerald-500 bg-emerald-900/40 text-emerald-400' :
                                    isSelected && !correct ? 'border-red-700 bg-red-950/40 text-red-400' :
                                    correct ? 'border-emerald-500/40 bg-emerald-900/10 text-emerald-600' :
                                    'border-c-border/30 text-c-cream-dark opacity-40'
                                }`}>
                            {choice}
                        </button>
                    );
                })}
            </div>
            {selected && (
                <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <p className={`text-sm font-playfair italic ${selected === play ? 'text-emerald-400' : 'text-red-400'}`}>
                        {selected === play ? 'Correct' : `That was ${play}`}
                    </p>
                    <button onClick={onDone}
                            className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold tracking-wide hover:opacity-90 transition-opacity">
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Shared: Sing exercise ────────────────────────────────────────────────────

const HOLD_MS = 1500;
const TOLERANCE = 50;

function ExerciseSing({ swara, sa, instruction, onDone }) {
    const [phase, setPhase] = useState('idle');
    const [level, setLevel] = useState(0);       // 0-100: mic volume
    const [cents, setCents] = useState(null);     // null = no pitch detected
    const [heldPct, setHeldPct] = useState(0);
    const [micError, setMicError] = useState('');

    const streamRef  = useRef(null);
    const intervalRef = useRef(null);
    const heldRef    = useRef(0);
    const targetSt   = SEMITONES[swara] ?? 0;

    const cleanup = () => {
        clearInterval(intervalRef.current);
        streamRef.current?.getTracks().forEach(t => t.stop());
    };
    useEffect(() => () => cleanup(), []);

    const startMic = async () => {
        setMicError('');
        heldRef.current = 0;
        setHeldPct(0);
        setCents(null);
        setLevel(0);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 4096; // larger buffer = better low-frequency resolution for voice
            source.connect(analyser);
            const buf = new Float32Array(analyser.fftSize);
            setPhase('listening');

            intervalRef.current = setInterval(() => {
                analyser.getFloatTimeDomainData(buf);
                const { freq, level: rms } = detectPitch(buf, ctx.sampleRate);

                // Always show mic level
                setLevel(Math.min(100, rms * 700));

                if (freq && freq > 50 && freq < 2200) {
                    const diff = centsToNearest(freq, targetSt, sa);
                    setCents(diff);
                    if (Math.abs(diff) <= TOLERANCE) {
                        heldRef.current += 100;
                        setHeldPct(Math.min(100, (heldRef.current / HOLD_MS) * 100));
                        if (heldRef.current >= HOLD_MS) {
                            cleanup();
                            setPhase('success');
                            setTimeout(onDone, 900);
                        }
                    } else {
                        heldRef.current = Math.max(0, heldRef.current - 80);
                        setHeldPct(prev => Math.max(0, prev - 5));
                    }
                } else {
                    setCents(null);
                    heldRef.current = Math.max(0, heldRef.current - 80);
                    setHeldPct(prev => Math.max(0, prev - 5));
                }
            }, 100);
        } catch {
            setMicError('Microphone access denied. Please allow mic access and try again.');
        }
    };

    const inTune = cents !== null && Math.abs(cents) <= TOLERANCE;
    const needleLeft = cents !== null ? 50 + Math.max(-44, Math.min(44, (cents / 100) * 44)) : 50;

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center leading-relaxed">{instruction}</p>

            {/* Target */}
            <div className="flex flex-col items-center gap-1.5">
                <div className="text-[60px] font-mono font-bold text-c-gold leading-none">{swara}</div>
                <button onClick={() => {
                    // Play at the octave closest to a comfortable singing range (~220–440 Hz)
                    let f = sa * Math.pow(2, targetSt / 12);
                    while (f < 180) f *= 2;
                    while (f > 520) f /= 2;
                    playTone(f);
                }} className="text-xs text-c-cream-dark hover:text-c-gold transition-colors font-playfair italic flex items-center gap-1">
                    <span>▶</span> Hear it
                </button>
            </div>

            {phase === 'idle' && (
                <button onClick={startMic}
                        className="px-8 py-2.5 border border-c-gold/60 bg-c-gold-faint text-c-gold rounded-full font-playfair text-sm hover:bg-c-gold hover:text-c-bg transition-colors">
                    Start singing
                </button>
            )}

            {phase === 'listening' && (
                <div className="flex flex-col gap-3 w-full">
                    {/* Mic level — always visible so user knows mic is working */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-c-cream-dark font-playfair w-8">Mic</span>
                        <div className="flex-1 h-2 bg-c-border rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-75 ${level > 5 ? 'bg-c-gold' : 'bg-c-border'}`}
                                 style={{ width: `${level}%` }} />
                        </div>
                        <span className={`text-[9px] w-12 text-right ${level > 5 ? 'text-c-gold' : 'text-c-cream-dark'}`}>
                            {level > 5 ? 'active' : 'silent'}
                        </span>
                    </div>

                    {/* Pitch needle */}
                    <div>
                        <div className="flex justify-between text-[9px] text-c-cream-dark mb-1 px-1">
                            <span>flat</span><span>in tune</span><span>sharp</span>
                        </div>
                        <div className="relative w-full h-7 bg-c-card border border-c-border rounded-full overflow-hidden">
                            {/* Center mark */}
                            <div className="absolute inset-y-0 left-1/2 w-px bg-c-gold/20" />
                            {/* In-tune zone */}
                            <div className="absolute inset-y-0 bg-emerald-900/20 rounded-full" style={{ left: '44%', width: '12%' }} />
                            {/* Needle */}
                            {cents !== null && (
                                <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full transition-all duration-75 shadow-sm ${
                                    inTune ? 'bg-emerald-400 shadow-emerald-400/40' : 'bg-c-gold'
                                }`} style={{ left: `${needleLeft}%` }} />
                            )}
                        </div>
                    </div>

                    {/* Cents label */}
                    <p className={`text-xs text-center font-mono h-4 transition-colors ${inTune ? 'text-emerald-400' : 'text-c-cream-dark'}`}>
                        {cents === null
                            ? (level > 5 ? 'pitch not clear — sing more steadily' : 'sing into the mic')
                            : inTune ? '✓ in tune — hold it!'
                            : cents > 0 ? `+${Math.round(cents)}¢ — too sharp, lower slightly`
                            : `${Math.round(cents)}¢ — too flat, raise slightly`}
                    </p>

                    {/* Hold bar */}
                    <div>
                        <div className="flex justify-between text-[9px] text-c-cream-dark mb-1">
                            <span>Hold</span><span>{Math.round(heldPct)}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-c-border rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-100"
                                 style={{ width: `${heldPct}%` }} />
                        </div>
                    </div>
                </div>
            )}

            {phase === 'success' && (
                <div className="flex flex-col items-center gap-2 animate-fade-in">
                    <div className="w-12 h-12 rounded-full border border-emerald-500/50 bg-emerald-900/30 flex items-center justify-center text-emerald-400 text-xl">✓</div>
                    <p className="text-emerald-400 text-sm font-playfair italic">Held it</p>
                </div>
            )}

            {micError && <p className="text-red-400 text-xs font-playfair italic text-center">{micError}</p>}
        </div>
    );
}

// ─── Lesson runner ────────────────────────────────────────────────────────────

function LessonRunner({ lesson, sa, onComplete, onBack }) {
    const [idx, setIdx] = useState(0);
    const exercises = lesson.exercises;
    const ex = exercises[idx];
    const pct = Math.round((idx / exercises.length) * 100);

    const next = () => idx + 1 >= exercises.length ? onComplete() : setIdx(i => i + 1);

    const renderEx = () => {
        const key = `${lesson.id}-${idx}`;
        if (ex.type === 'listen')          return <ExerciseListen         key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'listen_sequence') return <ExerciseListenSequence key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'identify')        return <ExerciseIdentify       key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'sing')            return <ExerciseSing           key={key} {...ex} sa={sa} onDone={next} />;
    };

    return (
        <div className="w-full max-w-lg mx-auto flex flex-col gap-5">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="text-c-cream-dark hover:text-c-gold text-lg leading-none transition-colors">✕</button>
                <div className="flex-1 h-2 bg-c-border rounded-full overflow-hidden">
                    <div className="h-full bg-c-gold rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[11px] text-c-cream-dark font-mono tabular-nums">{idx + 1}/{exercises.length}</span>
            </div>
            <p className="text-[11px] text-c-cream-dark font-playfair italic text-center">{lesson.title}</p>
            <div className="min-h-[340px] flex items-center justify-center py-4">
                {renderEx()}
            </div>
        </div>
    );
}

// ─── Raga Practice: one raga session ─────────────────────────────────────────

function RagaSession({ ragaName, raga, sa, onBack }) {
    const [phase, setPhase] = useState('listen'); // listen | sing | done
    const [singIdx, setSingIdx] = useState(0);

    const singNotes = raga.arohanam.filter(n => n !== 'Sa' || singIdx === 0);

    const handleSingDone = () => {
        if (singIdx + 1 >= raga.arohanam.length) {
            setPhase('done');
        } else {
            setSingIdx(i => i + 1);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="text-c-cream-dark hover:text-c-gold text-lg transition-colors">←</button>
                <div>
                    <div className="font-playfair text-lg text-c-gold">{ragaName}</div>
                    <div className="text-[10px] text-c-cream-dark uppercase tracking-widest">{raga.type}</div>
                </div>
            </div>

            {/* Phase indicator */}
            <div className="flex gap-1">
                {['Hear', 'Sing', 'Done'].map((label, i) => {
                    const active = (i === 0 && phase === 'listen') || (i === 1 && phase === 'sing') || (i === 2 && phase === 'done');
                    const past = (i === 0 && phase !== 'listen') || (i === 1 && phase === 'done');
                    return (
                        <div key={label} className="flex items-center gap-1">
                            <div className={`px-3 py-1 rounded-full text-[10px] font-playfair transition-colors ${
                                active ? 'bg-c-gold text-c-bg font-bold' :
                                past   ? 'bg-c-gold/20 text-c-gold' :
                                'bg-c-border/30 text-c-cream-dark'
                            }`}>{label}</div>
                            {i < 2 && <div className="w-3 h-px bg-c-border" />}
                        </div>
                    );
                })}
            </div>

            <div className="min-h-[340px] flex items-center justify-center py-4">
                {phase === 'listen' && (
                    <ExerciseListenSequence
                        key="raga-listen"
                        swaras={raga.arohanam}
                        sa={sa}
                        instruction={`Listen to the ${ragaName} arohanam. ${raga.mood ? `Mood: ${raga.mood}.` : ''}`}
                        onDone={() => { setPhase('sing'); setSingIdx(0); }}
                    />
                )}

                {phase === 'sing' && (
                    <ExerciseSing
                        key={`sing-${singIdx}`}
                        swara={raga.arohanam[singIdx]}
                        sa={sa}
                        instruction={`Sing note ${singIdx + 1} of ${raga.arohanam.length}: ${raga.arohanam[singIdx]}`}
                        onDone={handleSingDone}
                    />
                )}

                {phase === 'done' && (
                    <div className="flex flex-col items-center gap-5 animate-fade-in">
                        <div className="w-16 h-16 rounded-full border border-c-gold/40 bg-c-gold-faint flex items-center justify-center text-c-gold text-2xl">✓</div>
                        <div className="text-center">
                            <p className="font-playfair text-lg text-c-cream">You sang {ragaName}</p>
                            <p className="text-xs text-c-cream-dark mt-1 font-playfair italic">{raga.mood && `${raga.mood} · `}{raga.type}</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            {raga.arohanam.map((n, i) => (
                                <span key={i} className="px-2 py-1 rounded border border-c-gold/30 text-xs font-mono text-c-gold bg-c-gold/5">{n}</span>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-2">
                            <button onClick={() => { setPhase('listen'); setSingIdx(0); }}
                                    className="px-5 py-2 border border-c-border text-c-cream-dim text-xs rounded-full font-playfair hover:border-c-gold/40 transition-colors">
                                Practice again
                            </button>
                            <button onClick={onBack}
                                    className="px-5 py-2 bg-c-gold text-c-bg text-xs rounded-full font-playfair font-bold hover:opacity-90 transition-opacity">
                                All ragas
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Sing progress dots */}
            {phase === 'sing' && (
                <div className="flex justify-center gap-1.5">
                    {raga.arohanam.map((n, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-colors ${
                            i < singIdx ? 'bg-emerald-500' : i === singIdx ? 'bg-c-gold' : 'bg-c-border'
                        }`} />
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Raga Practice: browser ───────────────────────────────────────────────────

function RagaPractice({ sa }) {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const allRagas = Object.entries(RAGAS);
    const filtered = allRagas.filter(([name]) => name.toLowerCase().includes(search.toLowerCase()));

    if (selected) {
        return (
            <RagaSession
                ragaName={selected[0]}
                raga={selected[1]}
                sa={sa}
                onBack={() => setSelected(null)}
            />
        );
    }

    const colorMap = { maroon: '#5c1a0a', navy: '#0e2a4a', teal: '#0e3a36' };

    return (
        <div className="w-full max-w-2xl flex flex-col gap-4">
            <div>
                <h3 className="font-playfair text-xl text-c-gold">Raga Practice</h3>
                <p className="text-c-cream-dark text-xs mt-1">Choose any raga — hear its scale, then sing each note.</p>
            </div>
            <input
                type="text"
                placeholder="Search ragas…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-c-surface border border-c-border rounded-full py-2 px-4 text-xs text-c-cream focus:outline-none focus:border-c-gold/60 transition-colors"
            />
            <div className="grid sm:grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
                {filtered.map(([name, data]) => (
                    <button key={name} onClick={() => setSelected([name, data])}
                            className="text-left flex items-center gap-3 px-4 py-3 rounded-lg border border-c-border bg-c-surface hover:border-c-gold/40 transition-colors">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: colorMap[data.color] || '#5c1a0a' }} />
                        <div className="flex-1 min-w-0">
                            <div className="font-playfair text-sm text-c-cream truncate">{name}</div>
                            <div className="text-[10px] text-c-cream-dark truncate">{data.type}{data.mood ? ` · ${data.mood}` : ''}</div>
                        </div>
                        <span className="text-c-cream-dark text-xs">→</span>
                    </button>
                ))}
            </div>
            {filtered.length === 0 && (
                <p className="text-c-cream-dark text-sm font-playfair italic text-center py-8">No ragas match "{search}"</p>
            )}
        </div>
    );
}

// ─── Curriculum home ──────────────────────────────────────────────────────────

function CurriculumHome({ progress, isUnlocked, onSelectUnit }) {
    return (
        <div className="w-full max-w-2xl flex flex-col gap-3">
            {CURRICULUM.map((unit, idx) => {
                const unlocked = isUnlocked(idx);
                const done = unit.lessons.filter(l => progress[`${unit.id}/${l.id}`]).length;
                const total = unit.lessons.length;
                const complete = done === total;
                return (
                    <button key={unit.id} disabled={!unlocked} onClick={() => onSelectUnit(unit, idx)}
                            className={`w-full text-left rounded-xl border overflow-hidden transition-all duration-200 ${
                                unlocked ? 'border-c-border hover:border-c-gold/40' : 'border-c-border/30 opacity-40 cursor-not-allowed'
                            }`}>
                        <div className="px-5 py-4 flex items-center gap-4" style={{ background: unit.color }}>
                            <span className="text-xl text-white/70">{unit.symbol}</span>
                            <div className="flex-1">
                                <div className="font-playfair text-white font-bold">{unit.title}</div>
                                <div className="text-white/55 text-[11px] mt-0.5">{unit.subtitle}</div>
                                {unlocked && unit.swaras && (
                                    <div className="flex gap-1.5 mt-2 flex-wrap">
                                        {unit.swaras.map((s, i) => (
                                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-mono">{s}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {!unlocked && <span className="text-white/30">🔒</span>}
                            {complete && <span className="text-emerald-400 text-lg">✓</span>}
                        </div>
                        {unlocked && (
                            <div className="bg-c-surface px-5 py-2.5 flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-c-border rounded-full overflow-hidden">
                                    <div className="h-full bg-c-gold rounded-full transition-all duration-500"
                                         style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
                                </div>
                                <span className="text-[10px] text-c-cream-dark font-mono">{done}/{total} lessons</span>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

// ─── Unit view ────────────────────────────────────────────────────────────────

function UnitView({ unit, progress, onSelectLesson, onBack }) {
    const isUnlocked = (idx) => idx === 0 || !!progress[`${unit.id}/${unit.lessons[idx - 1].id}`];
    return (
        <div className="w-full max-w-lg flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="text-c-cream-dark hover:text-c-gold transition-colors">←</button>
                <div>
                    <h2 className="font-playfair text-xl text-c-gold">{unit.title}</h2>
                    <p className="text-[11px] text-c-cream-dark">{unit.subtitle}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {unit.lessons.map((lesson, idx) => {
                    const done = !!progress[`${unit.id}/${lesson.id}`];
                    const unlocked = isUnlocked(idx);
                    return (
                        <button key={lesson.id} disabled={!unlocked} onClick={() => unlocked && onSelectLesson(lesson)}
                                className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border transition-all ${
                                    done     ? 'border-c-gold/30 bg-c-gold/5 hover:border-c-gold/50' :
                                    unlocked ? 'border-c-border bg-c-surface hover:border-c-gold/30' :
                                    'border-c-border/20 opacity-35 cursor-not-allowed'
                                }`}>
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm flex-shrink-0 ${
                                done     ? 'border-emerald-500/60 bg-emerald-900/30 text-emerald-400' :
                                unlocked ? 'border-c-gold/40 bg-c-gold-faint text-c-gold' :
                                'border-c-border text-c-cream-dark'
                            }`}>
                                {done ? '✓' : unlocked ? idx + 1 : '🔒'}
                            </div>
                            <div>
                                <div className="font-playfair text-sm text-c-cream">{lesson.title}</div>
                                <div className="text-[10px] text-c-cream-dark mt-0.5">{lesson.exercises.length} exercises</div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Tutor({ saFrequency }) {
    const sa = saFrequency || 261.63;
    const [tab, setTab]         = useState('curriculum'); // curriculum | practice
    const [screen, setScreen]   = useState('home');       // home | unit | lesson
    const [activeUnit, setActiveUnit]     = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [progress, setProgress] = useState(() => {
        try { return JSON.parse(localStorage.getItem('tutor_progress') || '{}'); } catch { return {}; }
    });

    const saveProgress = (unitId, lessonId) => {
        const next = { ...progress, [`${unitId}/${lessonId}`]: true };
        setProgress(next);
        localStorage.setItem('tutor_progress', JSON.stringify(next));
    };

    const isUnlocked = (unitIdx) => {
        if (unitIdx === 0) return true;
        const prev = CURRICULUM[unitIdx - 1];
        return prev.lessons.every(l => progress[`${prev.id}/${l.id}`]);
    };

    return (
        <div className="w-full px-4 md:px-8 py-8 flex flex-col items-center gap-6 animate-fade-in">

            {/* Sa warning — shown prominently if not set */}
            {!saFrequency && (
                <div className="w-full max-w-2xl flex items-start gap-3 px-4 py-3 rounded-lg" style={{ background: '#5c3a00', border: '1px solid #c8860a' }}>
                    <span style={{ color: '#fbbf24' }} className="text-base mt-0.5 flex-shrink-0">⚠</span>
                    <div>
                        <p style={{ color: '#fef08a' }} className="text-sm font-semibold">Sa not set — pitch exercises won't match your voice</p>
                        <p style={{ color: '#fcd34d' }} className="text-xs mt-1 leading-relaxed">
                            Go to <strong>Sing &amp; Discover</strong>, start the mic, and set your Sa first. Without it the tutor defaults to C4 (262 Hz), which is probably not your natural range.
                        </p>
                    </div>
                </div>
            )}

            {/* Tab switcher — only show on home screens */}
            {screen === 'home' && (
                <div className="w-full max-w-2xl">
                    <div className="flex gap-1 border-b border-c-border mb-6">
                        {[['curriculum', 'Curriculum'], ['practice', 'Raga Practice']].map(([id, label]) => (
                            <button key={id} onClick={() => setTab(id)}
                                    className={`px-5 py-2 text-xs font-playfair tracking-wide transition-colors relative ${
                                        tab === id ? 'text-c-gold' : 'text-c-cream-dim hover:text-c-cream'
                                    }`}>
                                {label}
                                {tab === id && <span className="absolute bottom-0 left-0 right-0 h-px bg-c-gold" />}
                            </button>
                        ))}
                    </div>

                    {tab === 'curriculum' ? (
                        <CurriculumHome
                            progress={progress}
                            isUnlocked={isUnlocked}
                            onSelectUnit={(unit) => { setActiveUnit(unit); setScreen('unit'); }}
                        />
                    ) : (
                        <RagaPractice sa={sa} />
                    )}
                </div>
            )}

            {screen === 'unit' && (
                <UnitView
                    unit={activeUnit}
                    progress={progress}
                    onSelectLesson={(lesson) => { setActiveLesson(lesson); setScreen('lesson'); }}
                    onBack={() => setScreen('home')}
                />
            )}

            {screen === 'lesson' && (
                <LessonRunner
                    lesson={activeLesson}
                    sa={sa}
                    onComplete={() => {
                        saveProgress(activeUnit.id, activeLesson.id);
                        setScreen('unit');
                    }}
                    onBack={() => setScreen('unit')}
                />
            )}
        </div>
    );
}
