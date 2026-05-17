import React, { useState, useRef, useEffect } from 'react';

// ─── Audio helpers ────────────────────────────────────────────────────────────

const SEMITONES = {
    'Sa': 0, 'Ri1': 1, 'Ri2': 2, 'Ga2': 3, 'Ga3': 4,
    'Ma1': 5, 'Ma2': 6, 'Pa': 7, 'Da1': 8, 'Da2': 9, 'Ni2': 10, 'Ni3': 11,
};

const swaraFreq = (swara, sa) => sa * Math.pow(2, (SEMITONES[swara] ?? 0) / 12);

const playTone = (freq, duration = 1.2) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
};

const playSequence = async (swaras, sa) => {
    for (const swara of swaras) {
        playTone(swaraFreq(swara, sa), 0.75);
        await new Promise(r => setTimeout(r, 700));
    }
};

// Autocorrelation pitch detector
const detectPitch = (buf, sampleRate) => {
    const SIZE = buf.length;
    const rms = Math.sqrt(buf.reduce((s, v) => s + v * v, 0) / SIZE);
    if (rms < 0.008) return null;

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
    if (maxLag < 2 || maxVal < 0.01) return null;

    const prev = corr[maxLag - 1], curr = corr[maxLag], next = corr[maxLag + 1] ?? 0;
    const shift = (2 * curr - prev - next) !== 0 ? (next - prev) / (2 * (2 * curr - prev - next)) : 0;
    return sampleRate / (maxLag + shift);
};

const centsDiff = (freq, target) => 1200 * Math.log2(freq / target);

// ─── Curriculum ───────────────────────────────────────────────────────────────

const CURRICULUM = [
    {
        id: 'foundation',
        title: 'The Foundation',
        subtitle: 'Sa & Pa — the two fixed pillars of every raga',
        symbol: '◈',
        color: '#7a2a10',
        lessons: [
            {
                id: 'meet_sa',
                title: 'Meet Sa',
                exercises: [
                    { type: 'listen', swara: 'Sa', instruction: 'This is Sa — the home note. Every raga begins and ends here. Just listen.' },
                    { type: 'listen', swara: 'Sa', instruction: 'Listen again. Notice the complete sense of rest. This feeling is Sa.' },
                    { type: 'identify', play: 'Sa', choices: ['Sa', 'Pa'], instruction: 'Which swara did you hear?' },
                ],
            },
            {
                id: 'meet_pa',
                title: 'Meet Pa',
                exercises: [
                    { type: 'listen', swara: 'Pa', instruction: 'This is Pa — the second fixed note. Exactly 7 semitones above Sa. It cannot be altered.' },
                    { type: 'identify', play: 'Pa', choices: ['Sa', 'Pa'], instruction: 'Sa or Pa?' },
                    { type: 'identify', play: 'Sa', choices: ['Sa', 'Pa'], instruction: 'And this one?' },
                    { type: 'identify', play: 'Pa', choices: ['Sa', 'Pa'], instruction: 'One more.' },
                ],
            },
            {
                id: 'sing_sa_pa',
                title: 'Sing Sa & Pa',
                exercises: [
                    { type: 'sing', swara: 'Sa', instruction: 'Now you sing. Match Sa and hold it steady.' },
                    { type: 'sing', swara: 'Pa', instruction: 'Now Pa. Feel the upward jump.' },
                    { type: 'sing', swara: 'Sa', instruction: 'Return home to Sa.' },
                ],
            },
        ],
    },
    {
        id: 'mayamalavagowla',
        title: 'Mayamalavagowla',
        subtitle: 'The first raga every student learns — 36th melakarta',
        symbol: '♬',
        color: '#1a3a5c',
        lessons: [
            {
                id: 'the_scale',
                title: 'Hear the Scale',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Pa', 'Da1', 'Ni3', 'Sa'], instruction: 'Listen to Mayamalavagowla ascending. Seven distinct swaras.' },
                    { type: 'listen', swara: 'Ri1', instruction: 'Ri1 — Shuddha Rishabam. Flat and close to Sa. It leans inward.' },
                    { type: 'listen', swara: 'Ga3', instruction: 'Ga3 — Antara Gandharam. A bright jump — the characteristic note of this raga.' },
                    { type: 'identify', play: 'Ri1', choices: ['Sa', 'Ri1', 'Ga3'], instruction: 'Which swara?' },
                    { type: 'identify', play: 'Ga3', choices: ['Sa', 'Ri1', 'Ga3'], instruction: 'And this one?' },
                    { type: 'identify', play: 'Ri1', choices: ['Ri1', 'Ga3'], instruction: 'These two are far apart — Ri1 or Ga3?' },
                ],
            },
            {
                id: 'upper_half',
                title: 'Da & Ni',
                exercises: [
                    { type: 'listen', swara: 'Da1', instruction: 'Da1 — the mirror of Ri1 in the upper half. Same plaintive, lowered quality.' },
                    { type: 'listen', swara: 'Ni3', instruction: 'Ni3 — the mirror of Ga3. Bright, pulling you back toward Sa.' },
                    { type: 'identify', play: 'Da1', choices: ['Pa', 'Da1', 'Ni3'], instruction: 'Which swara?' },
                    { type: 'identify', play: 'Ni3', choices: ['Pa', 'Da1', 'Ni3'], instruction: 'And this?' },
                    { type: 'identify', play: 'Ri1', choices: ['Ri1', 'Da1'], instruction: 'These sound similar — Ri1 or Da1?' },
                    { type: 'identify', play: 'Da1', choices: ['Ri1', 'Da1'], instruction: 'Which is this one?' },
                ],
            },
            {
                id: 'sing_scale',
                title: 'Sing the Scale',
                exercises: [
                    { type: 'sing', swara: 'Ri1', instruction: 'Sing Ri1. It sits just a semitone above Sa.' },
                    { type: 'sing', swara: 'Ga3', instruction: 'Sing Ga3. A clear bright jump — 4 semitones up from Sa.' },
                    { type: 'sing', swara: 'Da1', instruction: 'Sing Da1.' },
                    { type: 'sing', swara: 'Ni3', instruction: 'Sing Ni3. Feel it pulling back toward Sa.' },
                    { type: 'sing', swara: 'Ma1', instruction: 'Sing Ma1 — the stable middle note.' },
                ],
            },
        ],
    },
    {
        id: 'alankaras',
        title: 'Alankaras',
        subtitle: 'The foundational melodic patterns',
        symbol: '♩',
        color: '#1a4a40',
        lessons: [
            {
                id: 'alankara_1',
                title: 'Pattern 1: S R G',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3'], instruction: 'Listen: Sa Ri1 Ga3. The first three notes ascending.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ri1', 'Sa'], instruction: 'Now with a turn: Sa Ri1 Ga3 Ri1 Sa.' },
                    { type: 'identify', play: 'Ri1', choices: ['Sa', 'Ri1', 'Ga3'], instruction: 'Identify this swara.' },
                    { type: 'identify', play: 'Ga3', choices: ['Sa', 'Ri1', 'Ga3'], instruction: 'And this.' },
                    { type: 'sing', swara: 'Ri1', instruction: 'Warm up — hold Ri1.' },
                    { type: 'sing', swara: 'Ga3', instruction: 'Now Ga3.' },
                ],
            },
            {
                id: 'alankara_2',
                title: 'Pattern 2: S R G M',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1'], instruction: 'Listen: Sa Ri1 Ga3 Ma1. Four notes ascending.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Ga3', 'Ri1', 'Sa'], instruction: 'A full phrase: S R G M G R S.' },
                    { type: 'identify', play: 'Ma1', choices: ['Ga3', 'Ma1', 'Pa'], instruction: 'Can you pick out Ma1?' },
                    { type: 'sing', swara: 'Ma1', instruction: 'Sing Ma1.' },
                    { type: 'sing', swara: 'Ga3', instruction: 'Now Ga3 — notice the downward step from Ma1.' },
                ],
            },
            {
                id: 'alankara_3',
                title: 'Pattern 3: S R G M P',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Pa'], instruction: 'Listen: S R G M P — all the way to Pa.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Pa', 'Ma1', 'Ga3', 'Ri1', 'Sa'], instruction: 'Full phrase: S R G M P M G R S.' },
                    { type: 'identify', play: 'Pa', choices: ['Ma1', 'Pa', 'Da1'], instruction: 'Which is Pa?' },
                    { type: 'sing', swara: 'Pa', instruction: 'Sing Pa.' },
                ],
            },
        ],
    },
    {
        id: 'raga_ear',
        title: 'Raga Ear Training',
        subtitle: 'Recognise ragas by their characteristic phrases',
        symbol: '◎',
        color: '#3a2a6a',
        lessons: [
            {
                id: 'mmg_vs_others',
                title: 'Spot Mayamalavagowla',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Pa', 'Da1', 'Ni3', 'Sa'], instruction: 'Listen to this — it is Mayamalavagowla.' },
                    { type: 'identify', play: 'Ga3', choices: ['Ga2', 'Ga3'], instruction: 'Mayamalavagowla uses which Ga?' },
                    { type: 'identify', play: 'Ri1', choices: ['Ri1', 'Ri2'], instruction: 'Which Ri does it use?' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Pa', 'Da1', 'Ni3', 'Sa'], instruction: 'One more listen. Notice Ri1 and Ga3 together.' },
                    { type: 'identify', play: 'Da1', choices: ['Da1', 'Da2'], instruction: 'And which Da?' },
                ],
            },
            {
                id: 'characteristic_phrases',
                title: 'Characteristic Phrases',
                exercises: [
                    { type: 'listen_sequence', swaras: ['Ga3', 'Ri1', 'Sa'], instruction: 'G R S — the classic Mayamalavagowla descent.' },
                    { type: 'listen_sequence', swaras: ['Ni3', 'Da1', 'Pa'], instruction: 'N D P — upper descent, same shape.' },
                    { type: 'identify', play: 'Ga3', choices: ['Ga2', 'Ga3'], instruction: 'The bright Ga we keep hearing — which one?' },
                    { type: 'sing', swara: 'Ga3', instruction: 'Sing Ga3 — the heartbeat of this raga.' },
                    { type: 'sing', swara: 'Ni3', instruction: 'Now Ni3 — its mirror.' },
                ],
            },
        ],
    },
];

// ─── Exercise: Listen ─────────────────────────────────────────────────────────

function ExerciseListen({ swara, sa, instruction, onDone }) {
    const [played, setPlayed] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            playTone(swaraFreq(swara, sa));
            setPlayed(true);
        }, 300);
        return () => clearTimeout(t);
    }, [swara, sa]);

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm leading-relaxed">{instruction}</p>
            <div className="flex flex-col items-center gap-3">
                <div className="text-6xl font-mono font-bold text-c-gold">{swara}</div>
                <button
                    onClick={() => { playTone(swaraFreq(swara, sa)); setPlayed(true); }}
                    className="flex items-center gap-2 text-xs text-c-cream-dark hover:text-c-gold transition-colors font-playfair italic"
                >
                    <span className="text-base">▶</span> Play again
                </button>
            </div>
            {played && (
                <button
                    onClick={onDone}
                    className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold tracking-wide hover:bg-c-gold-light transition-colors animate-fade-in"
                >
                    Continue
                </button>
            )}
        </div>
    );
}

// ─── Exercise: Listen Sequence ────────────────────────────────────────────────

function ExerciseListenSequence({ swaras, sa, instruction, onDone }) {
    const [activeIdx, setActiveIdx] = useState(-1);
    const [playing, setPlaying] = useState(false);
    const [done, setDone] = useState(false);

    const runSequence = async () => {
        setPlaying(true);
        for (let i = 0; i < swaras.length; i++) {
            setActiveIdx(i);
            playTone(swaraFreq(swaras[i], sa), 0.75);
            await new Promise(r => setTimeout(r, 750));
        }
        setActiveIdx(-1);
        setPlaying(false);
        setDone(true);
    };

    useEffect(() => { runSequence(); }, []);

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm leading-relaxed">{instruction}</p>
            <div className="flex flex-wrap justify-center gap-3">
                {swaras.map((s, i) => (
                    <div
                        key={i}
                        className={`w-12 h-12 rounded-lg border flex items-center justify-center text-sm font-mono font-bold transition-all duration-150 ${
                            i === activeIdx
                                ? 'border-c-gold bg-c-gold text-c-bg scale-110'
                                : 'border-c-border text-c-cream-dark'
                        }`}
                    >
                        {s}
                    </div>
                ))}
            </div>
            <div className="flex gap-3">
                <button
                    onClick={runSequence}
                    disabled={playing}
                    className="flex items-center gap-2 text-xs text-c-cream-dark hover:text-c-gold transition-colors font-playfair italic disabled:opacity-40"
                >
                    <span>▶</span> Play again
                </button>
            </div>
            {done && (
                <button
                    onClick={onDone}
                    className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold tracking-wide hover:bg-c-gold-light transition-colors animate-fade-in"
                >
                    Continue
                </button>
            )}
        </div>
    );
}

// ─── Exercise: Identify ───────────────────────────────────────────────────────

function ExerciseIdentify({ play, choices, sa, instruction, onDone }) {
    const [selected, setSelected] = useState(null);
    const [played, setPlayed] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            playTone(swaraFreq(play, sa));
            setPlayed(true);
        }, 300);
        return () => clearTimeout(t);
    }, [play, sa]);

    const correct = selected === play;

    const handleSelect = (choice) => {
        if (selected) return;
        setSelected(choice);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm">{instruction}</p>
            <button
                onClick={() => { playTone(swaraFreq(play, sa)); setPlayed(true); }}
                className="w-16 h-16 rounded-full border-2 border-c-gold/40 bg-c-gold-faint flex items-center justify-center text-c-gold hover:bg-c-gold hover:text-c-bg transition-colors text-xl"
            >
                ▶
            </button>
            <div className="flex gap-3 flex-wrap justify-center">
                {choices.map(choice => {
                    const isSelected = selected === choice;
                    const isCorrect = isSelected && choice === play;
                    const isWrong = isSelected && choice !== play;
                    const showCorrect = selected && choice === play && !isSelected;
                    return (
                        <button
                            key={choice}
                            onClick={() => handleSelect(choice)}
                            disabled={!played || !!selected}
                            className={`px-8 py-3 rounded-xl border text-sm font-mono font-bold transition-all duration-200 ${
                                isCorrect  ? 'border-emerald-500 bg-emerald-900/40 text-emerald-400' :
                                isWrong   ? 'border-red-700 bg-red-950/40 text-red-400' :
                                showCorrect ? 'border-emerald-500/50 bg-emerald-900/20 text-emerald-500' :
                                'border-c-border bg-c-card text-c-cream hover:border-c-gold/60 disabled:opacity-50 disabled:cursor-not-allowed'
                            }`}
                        >
                            {choice}
                        </button>
                    );
                })}
            </div>
            {selected && (
                <div className="flex flex-col items-center gap-4 animate-fade-in">
                    <p className={`text-sm font-playfair italic ${correct ? 'text-emerald-400' : 'text-red-400'}`}>
                        {correct ? 'Correct' : `That was ${play}`}
                    </p>
                    <button
                        onClick={onDone}
                        className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold tracking-wide hover:bg-c-gold-light transition-colors"
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Exercise: Sing ───────────────────────────────────────────────────────────

const TARGET_HOLD_MS = 1500;
const TOLERANCE_CENTS = 50;

function ExerciseSing({ swara, sa, instruction, onDone }) {
    const [phase, setPhase] = useState('idle'); // idle | listening | success
    const [cents, setCents] = useState(null);
    const [heldPct, setHeldPct] = useState(0);
    const [error, setError] = useState('');

    const streamRef = useRef(null);
    const intervalRef = useRef(null);
    const heldMsRef = useRef(0);
    const target = swaraFreq(swara, sa);

    const stopMic = () => {
        clearInterval(intervalRef.current);
        streamRef.current?.getTracks().forEach(t => t.stop());
    };

    const startListening = async () => {
        setError('');
        heldMsRef.current = 0;
        setHeldPct(0);
        setCents(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 2048;
            source.connect(analyser);
            const buf = new Float32Array(analyser.fftSize);

            setPhase('listening');
            intervalRef.current = setInterval(() => {
                analyser.getFloatTimeDomainData(buf);
                const freq = detectPitch(buf, ctx.sampleRate);
                if (freq && freq > 60 && freq < 2000) {
                    const diff = centsDiff(freq, target);
                    setCents(diff);
                    if (Math.abs(diff) <= TOLERANCE_CENTS) {
                        heldMsRef.current += 100;
                        setHeldPct(Math.min(100, (heldMsRef.current / TARGET_HOLD_MS) * 100));
                        if (heldMsRef.current >= TARGET_HOLD_MS) {
                            stopMic();
                            setPhase('success');
                            setTimeout(onDone, 900);
                        }
                    } else {
                        heldMsRef.current = Math.max(0, heldMsRef.current - 80);
                        setHeldPct(Math.max(0, (heldMsRef.current / TARGET_HOLD_MS) * 100));
                    }
                } else {
                    setCents(null);
                    heldMsRef.current = Math.max(0, heldMsRef.current - 80);
                    setHeldPct(Math.max(0, (heldMsRef.current / TARGET_HOLD_MS) * 100));
                }
            }, 100);
        } catch {
            setError('Microphone access denied.');
        }
    };

    useEffect(() => () => stopMic(), []);

    const inTune = cents !== null && Math.abs(cents) <= TOLERANCE_CENTS;
    const needleLeft = cents !== null ? 50 + Math.max(-45, Math.min(45, cents / 100 * 45)) : 50;

    return (
        <div className="flex flex-col items-center gap-7 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm leading-relaxed">{instruction}</p>

            <div className="flex flex-col items-center gap-1">
                <div className="text-5xl font-mono font-bold text-c-gold">{swara}</div>
                <button
                    onClick={() => playTone(target)}
                    className="text-xs text-c-cream-dark hover:text-c-gold transition-colors font-playfair italic flex items-center gap-1"
                >
                    <span>▶</span> Hear it
                </button>
            </div>

            {phase === 'idle' && (
                <button
                    onClick={startListening}
                    className="px-8 py-2.5 border border-c-gold/60 bg-c-gold-faint text-c-gold rounded-full font-playfair text-sm hover:bg-c-gold hover:text-c-bg transition-colors"
                >
                    Start singing
                </button>
            )}

            {phase === 'listening' && (
                <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                    {/* Pitch meter */}
                    <div className="relative w-full h-8 bg-c-card border border-c-border rounded-full overflow-hidden">
                        <div className="absolute inset-y-0 left-1/2 w-px bg-c-gold/20" />
                        <div
                            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-75 ${
                                inTune ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-c-gold'
                            }`}
                            style={{ left: `${needleLeft}%` }}
                        />
                    </div>
                    <p className={`text-xs font-mono h-4 ${inTune ? 'text-emerald-400' : 'text-c-cream-dark'}`}>
                        {cents === null ? 'sing into the mic…' :
                         inTune ? '✓ in tune' :
                         cents > 0 ? `+${Math.round(cents)}¢  too sharp` :
                         `${Math.round(cents)}¢  too flat`}
                    </p>
                    {/* Hold bar */}
                    <div className="w-full h-2 bg-c-border rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-100"
                            style={{ width: `${heldPct}%` }}
                        />
                    </div>
                    <p className="text-[10px] text-c-cream-dark font-playfair italic">
                        {heldPct > 5 ? 'Hold it steady…' : 'Sing and hold the note'}
                    </p>
                </div>
            )}

            {phase === 'success' && (
                <div className="flex flex-col items-center gap-2 animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-900/40 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xl">✓</div>
                    <p className="text-emerald-400 text-sm font-playfair italic">Nicely held</p>
                </div>
            )}

            {error && <p className="text-red-400 text-xs font-playfair italic">{error}</p>}
        </div>
    );
}

// ─── Lesson Runner ────────────────────────────────────────────────────────────

function LessonRunner({ unit, lesson, sa, onComplete, onBack }) {
    const [exIdx, setExIdx] = useState(0);
    const exercises = lesson.exercises;
    const ex = exercises[exIdx];
    const pct = Math.round((exIdx / exercises.length) * 100);

    const next = () => {
        if (exIdx + 1 >= exercises.length) {
            onComplete();
        } else {
            setExIdx(i => i + 1);
        }
    };

    const renderExercise = () => {
        const key = `${lesson.id}-${exIdx}`;
        if (ex.type === 'listen')
            return <ExerciseListen key={key} swara={ex.swara} sa={sa} instruction={ex.instruction} onDone={next} />;
        if (ex.type === 'listen_sequence')
            return <ExerciseListenSequence key={key} swaras={ex.swaras} sa={sa} instruction={ex.instruction} onDone={next} />;
        if (ex.type === 'identify')
            return <ExerciseIdentify key={key} play={ex.play} choices={ex.choices} sa={sa} instruction={ex.instruction} onDone={next} />;
        if (ex.type === 'sing')
            return <ExerciseSing key={key} swara={ex.swara} sa={sa} instruction={ex.instruction} onDone={next} />;
        return null;
    };

    return (
        <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="text-c-cream-dark hover:text-c-gold transition-colors text-sm">✕</button>
                <div className="flex-1 h-2 bg-c-border rounded-full overflow-hidden">
                    <div className="h-full bg-c-gold rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-c-cream-dark font-mono">{exIdx + 1}/{exercises.length}</span>
            </div>

            <p className="text-xs text-c-cream-dark font-playfair italic text-center">{lesson.title}</p>

            {/* Exercise area */}
            <div className="min-h-[320px] flex items-center justify-center">
                {renderExercise()}
            </div>
        </div>
    );
}

// ─── Home View ────────────────────────────────────────────────────────────────

function HomeView({ curriculum, progress, isUnlocked, onSelectUnit }) {
    return (
        <div className="w-full max-w-2xl flex flex-col gap-4">
            <div className="mb-2">
                <h2 className="font-playfair text-2xl text-c-gold">Tutor</h2>
                <p className="text-c-cream-dark text-xs mt-1">Learn Carnatic singing from the ground up — one swara at a time.</p>
            </div>
            {curriculum.map((unit, idx) => {
                const unlocked = isUnlocked(idx);
                const total = unit.lessons.length;
                const done = unit.lessons.filter(l => progress[`${unit.id}/${l.id}`]).length;
                const complete = done === total;

                return (
                    <button
                        key={unit.id}
                        onClick={() => unlocked && onSelectUnit(unit, idx)}
                        disabled={!unlocked}
                        className={`w-full text-left rounded-xl border overflow-hidden transition-all duration-300 ${
                            unlocked ? 'border-c-border hover:border-c-gold/50 cursor-pointer' : 'border-c-border/40 opacity-50 cursor-not-allowed'
                        }`}
                    >
                        {/* Color band */}
                        <div className="px-5 py-4 flex items-center gap-4" style={{ background: unit.color }}>
                            <span className="text-2xl text-white/80">{unit.symbol}</span>
                            <div className="flex-1">
                                <div className="font-playfair text-white font-bold tracking-wide">{unit.title}</div>
                                <div className="text-white/60 text-[11px] mt-0.5">{unit.subtitle}</div>
                            </div>
                            {!unlocked && <span className="text-white/40 text-lg">🔒</span>}
                            {complete && <span className="text-emerald-400 text-lg">✓</span>}
                        </div>
                        {/* Progress */}
                        {unlocked && (
                            <div className="bg-c-surface px-5 py-3 flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-c-border rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-c-gold rounded-full transition-all duration-500"
                                        style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
                                    />
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

// ─── Unit View ────────────────────────────────────────────────────────────────

function UnitView({ unit, progress, onSelectLesson, onBack }) {
    const isLessonUnlocked = (idx) => {
        if (idx === 0) return true;
        return !!progress[`${unit.id}/${unit.lessons[idx - 1].id}`];
    };

    return (
        <div className="w-full max-w-lg flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
                <button onClick={onBack} className="text-c-cream-dark hover:text-c-gold transition-colors text-sm">←</button>
                <div>
                    <h2 className="font-playfair text-xl text-c-gold">{unit.title}</h2>
                    <p className="text-c-cream-dark text-[11px]">{unit.subtitle}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {unit.lessons.map((lesson, idx) => {
                    const done = !!progress[`${unit.id}/${lesson.id}`];
                    const unlocked = isLessonUnlocked(idx);
                    return (
                        <button
                            key={lesson.id}
                            onClick={() => unlocked && onSelectLesson(lesson)}
                            disabled={!unlocked}
                            className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-200 ${
                                done      ? 'border-c-gold/30 bg-c-gold/5 hover:border-c-gold/60' :
                                unlocked  ? 'border-c-border bg-c-surface hover:border-c-gold/40' :
                                'border-c-border/30 bg-c-bg/30 opacity-40 cursor-not-allowed'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 border ${
                                done     ? 'border-emerald-500/60 bg-emerald-900/30 text-emerald-400' :
                                unlocked ? 'border-c-gold/40 bg-c-gold-faint text-c-gold' :
                                'border-c-border text-c-cream-dark'
                            }`}>
                                {done ? '✓' : unlocked ? (idx + 1) : '🔒'}
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

const SA_DEFAULT = 261.63; // C4

export default function Tutor({ saFrequency }) {
    const sa = saFrequency || SA_DEFAULT;
    const [screen, setScreen] = useState('home'); // home | unit | lesson
    const [activeUnit, setActiveUnit] = useState(null);
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

    if (screen === 'lesson') {
        return (
            <div className="w-full px-4 md:px-8 py-8 flex justify-center animate-fade-in">
                <LessonRunner
                    unit={activeUnit}
                    lesson={activeLesson}
                    sa={sa}
                    onComplete={() => {
                        saveProgress(activeUnit.id, activeLesson.id);
                        setScreen('unit');
                    }}
                    onBack={() => setScreen('unit')}
                />
            </div>
        );
    }

    if (screen === 'unit') {
        return (
            <div className="w-full px-4 md:px-8 py-8 flex justify-center animate-fade-in">
                <UnitView
                    unit={activeUnit}
                    progress={progress}
                    onSelectLesson={(lesson) => { setActiveLesson(lesson); setScreen('lesson'); }}
                    onBack={() => setScreen('home')}
                />
            </div>
        );
    }

    return (
        <div className="w-full px-4 md:px-8 py-8 flex justify-center animate-fade-in">
            <HomeView
                curriculum={CURRICULUM}
                progress={progress}
                isUnlocked={isUnlocked}
                onSelectUnit={(unit) => { setActiveUnit(unit); setScreen('unit'); }}
            />
        </div>
    );
}
