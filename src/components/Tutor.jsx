import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RAGAS } from '../utils/ragaLogic';
import { CURRICULUM } from '../utils/tutorCurriculum';
import {
    getAudioCtx, playNote, playSequence, detectPitch as detectPitchAudio,
    SWARA_SEMITONE, noteFreq, getOctaveSequence, startDrone,
} from '../utils/audioUtils';

// ─── Audio helpers (thin wrappers over audioUtils) ────────────────────────────

// Extended semitone map including upper-octave Sa for sing exercises
const SEMITONES = { ...SWARA_SEMITONE, 'Ṡ': 12 };

const swaraFreq = (swara, sa) => noteFreq(swara === 'Ṡ' ? 'Sa' : swara, sa) * (swara === 'Ṡ' ? 2 : 1);

const playSingleTone = (freq, duration = 0.7) => {
    try {
        const ctx = getAudioCtx();
        // Use raw oscillator approach for the tutor's simpler sound
        const master = ctx.createGain();
        master.connect(ctx.destination);
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
        master.gain.setValueAtTime(0, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.07);
        master.gain.setValueAtTime(0.28, ctx.currentTime + Math.max(0.07, duration - 0.12));
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    } catch (err) {
        console.warn('Tutor playTone failed:', err);
    }
};

const playSequenceAsync = async (swaras, sa, onIdx, signal) => {
    const octaves = getOctaveSequence(swaras);
    for (let i = 0; i < swaras.length; i++) {
        if (signal?.aborted) return;
        onIdx(i);
        const swara = swaras[i];
        const freq = swaraFreq(swara, sa) * Math.pow(2, octaves[i]);
        playSingleTone(freq, 0.7);
        await new Promise(r => setTimeout(r, 750));
    }
    onIdx(-1);
};

const centsDiff = (freq, target) => 1200 * Math.log2(freq / target);

// Match freq to the nearest octave of targetSemitone — so singer can use their natural range
const centsToNearest = (freq, targetSt, sa) => {
    let base = sa * Math.pow(2, targetSt / 12);
    while (base * 1.5 < freq) base *= 2;
    while (base / 1.5 > freq) base /= 2;
    return centsDiff(freq, base);
};

// CURRICULUM is imported from tutorCurriculum.js

// ─── Info card exercise ───────────────────────────────────────────────────────

function ExerciseInfo({ title, body, onDone }) {
    return (
        <div className="flex flex-col gap-5 w-full max-w-md">
            <div className="bg-c-surface border border-c-border rounded-xl p-6">
                <h3 className="font-playfair text-lg text-c-gold mb-4 leading-snug">{title}</h3>
                <p className="text-sm text-c-cream-dim font-playfair leading-relaxed whitespace-pre-line">{body}</p>
            </div>
            <button onClick={onDone}
                    className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold tracking-wide hover:opacity-90 transition-opacity self-center">
                Got it
            </button>
        </div>
    );
}

// ─── Quiz exercise ────────────────────────────────────────────────────────────

function ExerciseQuiz({ question, choices, correct, explanation, onDone }) {
    const [selected, setSelected] = useState(null);
    const isCorrect = selected === correct;

    return (
        <div className="flex flex-col gap-5 w-full max-w-md">
            <p className="text-c-cream text-sm font-playfair text-center leading-relaxed px-2">{question}</p>
            <div className="flex flex-col gap-2">
                {choices.map(choice => {
                    const isSel = selected === choice;
                    const isAns = choice === correct;
                    return (
                        <button key={choice} disabled={!!selected} onClick={() => setSelected(choice)}
                                className={`w-full text-left px-5 py-3 rounded-xl border text-sm font-playfair transition-all duration-150 ${
                                    !selected          ? 'border-c-border bg-c-card text-c-cream hover:border-c-gold/50 hover:bg-c-gold/5' :
                                    isSel && isAns     ? 'border-emerald-700/50 bg-emerald-800/15 text-emerald-900 font-bold' :
                                    isSel && !isAns    ? 'border-red-700/50 bg-red-950/15 text-red-900 font-bold' :
                                    isAns              ? 'border-emerald-600/40 bg-emerald-800/10 text-emerald-800 font-semibold' :
                                                         'border-c-border/30 text-c-cream-dark opacity-40'
                                }`}>
                            {choice}
                        </button>
                    );
                })}
            </div>
            {selected && (
                <div className="flex flex-col gap-3 animate-fade-in">
                    <div className={`px-4 py-3 rounded-lg border ${isCorrect ? 'bg-emerald-800/10 border-emerald-700/30' : 'bg-red-950/10 border-red-800/30'}`}>
                        <p className={`text-sm font-playfair font-bold mb-1 ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
                            {isCorrect ? 'Correct' : `The answer is: ${correct}`}
                        </p>
                        <p className="text-xs text-c-cream-dim leading-relaxed font-playfair italic">{explanation}</p>
                    </div>
                    <button onClick={onDone}
                            className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold tracking-wide hover:opacity-90 transition-opacity self-center">
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Shared: Listen exercise ──────────────────────────────────────────────────

function ExerciseListen({ swara, sa, instruction, displayLabel, onDone }) {
    useEffect(() => {
        const t = setTimeout(() => playSingleTone(swaraFreq(swara, sa)), 200);
        return () => clearTimeout(t);
    }, [swara, sa]);

    return (
        <div className="flex flex-col items-center gap-7 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm leading-relaxed">{instruction}</p>
            <div className="flex flex-col items-center gap-2">
                <div className="text-[64px] font-mono font-bold text-c-gold leading-none">{displayLabel || swara}</div>
                <button onClick={() => playSingleTone(swaraFreq(swara, sa))}
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

    useEffect(() => { run(); return () => abortRef.current?.abort(); }, [run]);

    const renderSwaras = () => {
        if (swaras.length === 16) {
            const line1 = swaras.slice(0, 8);
            const line2 = swaras.slice(8, 16);
            return (
                <div className="flex flex-col gap-3 items-center w-full px-4">
                    {/* Arohanam Line */}
                    <div className="flex justify-center gap-2.5">
                        {line1.map((s, idx) => {
                            const i = idx;
                            return (
                                <div key={i} className={`px-3.5 py-2.5 rounded-lg border font-mono text-sm font-bold transition-all duration-100 ${
                                    i === activeIdx ? 'border-c-gold bg-c-gold text-c-bg scale-115 font-extrabold shadow-lg shadow-c-gold/20' : 'border-c-border text-c-cream-dark bg-c-surface'
                                }`}>{s}</div>
                            );
                        })}
                    </div>
                    {/* Avarohanam Line */}
                    <div className="flex justify-center gap-2.5">
                        {line2.map((s, idx) => {
                            const i = idx + 8;
                            return (
                                <div key={i} className={`px-3.5 py-2.5 rounded-lg border font-mono text-sm font-bold transition-all duration-100 ${
                                    i === activeIdx ? 'border-c-gold bg-c-gold text-c-bg scale-115 font-extrabold shadow-lg shadow-c-gold/20' : 'border-c-border text-c-cream-dark bg-c-surface'
                                }`}>{s}</div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-wrap justify-center gap-2">
                {swaras.map((s, i) => (
                    <div key={i} className={`px-3.5 py-2.5 rounded-lg border font-mono text-sm font-bold transition-all duration-100 ${
                        i === activeIdx ? 'border-c-gold bg-c-gold text-c-bg scale-115 font-extrabold shadow-lg shadow-c-gold/20' : 'border-c-border text-c-cream-dark bg-c-surface'
                    }`}>{s}</div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center gap-7 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm leading-relaxed">{instruction}</p>
            {renderSwaras()}
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
        const t = setTimeout(() => playSingleTone(swaraFreq(play, sa)), 300);
        return () => clearTimeout(t);
    }, [play, sa]);

    return (
        <div className="flex flex-col items-center gap-7 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm">{instruction}</p>
            <button onClick={() => playSingleTone(swaraFreq(play, sa))}
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
                                    isSelected && correct  ? 'border-emerald-700/50 bg-emerald-800/15 text-emerald-900' :
                                    isSelected && !correct ? 'border-red-700/50 bg-red-950/15 text-red-900' :
                                    correct ? 'border-emerald-600/40 bg-emerald-800/10 text-emerald-800 font-semibold' :
                                    'border-c-border/30 text-c-cream-dark opacity-40'
                                }`}>
                            {choice}
                        </button>
                    );
                })}
            </div>
            {selected && (
                <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <p className={`text-sm font-playfair italic font-bold ${selected === play ? 'text-emerald-800' : 'text-red-800'}`}>
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

// ─── Shared: Compare exercise ──────────────────────────────────────────────────

function ExerciseCompare({ note1, note2, question, choices, correct, sa, onDone }) {
    const [selected, setSelected] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playBoth = () => {
        if (isPlaying) return;
        setIsPlaying(true);
        playSingleTone(swaraFreq(note1, sa));
        setTimeout(() => {
            playSingleTone(swaraFreq(note2, sa));
            setTimeout(() => setIsPlaying(false), 1000);
        }, 1200);
    };

    useEffect(() => {
        const t = setTimeout(playBoth, 300);
        return () => clearTimeout(t);
    }, [note1, note2, sa]);

    return (
        <div className="flex flex-col items-center gap-7 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center max-w-sm">{question}</p>
            <button onClick={playBoth} disabled={isPlaying}
                    className="w-16 h-16 rounded-full border-2 border-c-gold/40 bg-c-gold-faint flex items-center justify-center text-c-gold hover:bg-c-gold hover:text-c-bg transition-colors text-2xl disabled:opacity-50">
                ▶
            </button>
            <div className="flex gap-3 flex-wrap justify-center">
                {choices.map(choice => {
                    const isSelected = selected === choice;
                    const isCorrectChoice = choice === correct;
                    return (
                        <button key={choice} disabled={!!selected}
                                onClick={() => setSelected(choice)}
                                className={`px-8 py-3 rounded-xl border font-mono text-sm font-bold transition-all duration-200 ${
                                    !selected ? 'border-c-border bg-c-card text-c-cream hover:border-c-gold/60' :
                                    isSelected && isCorrectChoice  ? 'border-emerald-700/50 bg-emerald-800/15 text-emerald-900' :
                                    isSelected && !isCorrectChoice ? 'border-red-700/50 bg-red-950/15 text-red-900' :
                                    isCorrectChoice ? 'border-emerald-600/40 bg-emerald-800/10 text-emerald-800 font-semibold' :
                                    'border-c-border/30 text-c-cream-dark opacity-40'
                                }`}>
                            {choice}
                        </button>
                    );
                })}
            </div>
            {selected && (
                <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <p className={`text-sm font-playfair italic font-bold ${selected === correct ? 'text-emerald-800' : 'text-red-800'}`}>
                        {selected === correct ? 'Correct' : `The correct answer was: ${correct}`}
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

// ─── Shared: Taalam exercise ──────────────────────────────────────────────────

function ExerciseTaalam({ instruction, onDone }) {
    const gestures = [
        { label: 'Clap', icon: '👏', gifUrl: '/gestures/clap.gif' },
        { label: 'Pinky', icon: '🖐', gifUrl: '/gestures/pinky.gif' },
        { label: 'Ring', icon: '🖐', gifUrl: '/gestures/ring.gif' },
        { label: 'Middle', icon: '🖐', gifUrl: '/gestures/middle.gif' },
        { label: 'Clap', icon: '👏', gifUrl: '/gestures/clap.gif' },
        { label: 'Wave', icon: '👋', gifUrl: '/gestures/wave.gif' },
        { label: 'Clap', icon: '👏', gifUrl: '/gestures/clap.gif' },
        { label: 'Wave', icon: '👋', gifUrl: '/gestures/wave.gif' }
    ];
    
    const [phase, setPhase] = useState('idle'); // idle, watching, ready, practicing, success
    const [beat, setBeat] = useState(-1);
    const [hits, setHits] = useState(Array(8).fill(null)); 
    
    const nextBeatTime = useRef(0);
    const currentBeatIdx = useRef(-1);
    const audioCtx = useRef(null);
    const timer = useRef(null);
    const beatsPlayed = useRef(0);
    
    const bpm = 50;
    const beatDuration = 60 / bpm;
    
    const cleanup = () => {
        clearTimeout(timer.current);
        if (audioCtx.current && audioCtx.current.state !== 'closed') audioCtx.current.close();
    };
    useEffect(() => () => cleanup(), []);
    
    const scheduleNextBeat = (mode) => {
        if (!audioCtx.current) return;
        const now = audioCtx.current.currentTime;
        
        while (nextBeatTime.current < now + 0.1) {
            if (mode === 'watching' && beatsPlayed.current >= 8) {
                setTimeout(() => {
                    cleanup();
                    setPhase('ready');
                    setBeat(-1);
                }, beatDuration * 1000);
                return;
            }

            const b = (currentBeatIdx.current + 1) % 8;
            currentBeatIdx.current = b;
            beatsPlayed.current++;
            
            // Play tick
            const osc = audioCtx.current.createOscillator();
            const gain = audioCtx.current.createGain();
            osc.frequency.value = (b === 0 || b === 4 || b === 6) ? 1000 : 600;
            osc.connect(gain);
            gain.connect(audioCtx.current.destination);
            gain.gain.setValueAtTime(0.5, nextBeatTime.current);
            gain.gain.exponentialRampToValueAtTime(0.01, nextBeatTime.current + 0.05);
            osc.start(nextBeatTime.current);
            osc.stop(nextBeatTime.current + 0.05);
            
            // Schedule UI update
            const delay = (nextBeatTime.current - now) * 1000;
            const capturedBeat = b;
            setTimeout(() => {
                setBeat(capturedBeat);
                if (mode === 'practicing') {
                    setHits(prev => {
                        const newHits = [...prev];
                        const prevBeat = (capturedBeat - 1 + 8) % 8;
                        if (newHits[prevBeat] === null && currentBeatIdx.current !== 0) {
                            newHits[prevBeat] = 'miss';
                        }
                        return newHits;
                    });
                }
            }, delay);
            
            nextBeatTime.current += beatDuration;
        }
        timer.current = setTimeout(() => scheduleNextBeat(mode), 50);
    };
    
    const start = (mode) => {
        cleanup();
        setPhase(mode);
        setHits(Array(8).fill(null));
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.current = ctx;
        nextBeatTime.current = ctx.currentTime + 0.5;
        currentBeatIdx.current = -1;
        beatsPlayed.current = 0;
        scheduleNextBeat(mode);
    };
    
    const handleTap = () => {
        if (phase !== 'practicing') return;
        const now = audioCtx.current.currentTime;
        const expected = nextBeatTime.current - beatDuration;
        const diff = Math.abs(now - expected);
        
        if (diff < 0.3) {
            setHits(prev => {
                const newHits = [...prev];
                newHits[beat] = 'hit';
                return newHits;
            });
        }
    };
    
    useEffect(() => {
        if (phase === 'practicing' && hits.every(h => h === 'hit')) {
            setTimeout(() => {
                cleanup();
                setPhase('success');
            }, 1000);
        }
    }, [hits, phase]);
    
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center leading-relaxed">
                {phase === 'idle' && "Let's learn the 8-beat Adi Tala."}
                {phase === 'watching' && "Watch the gestures and listen to the pulse."}
                {phase === 'ready' && "Now it's your turn. Tap exactly on the beat."}
                {phase === 'practicing' && instruction}
            </p>
            
            <div className="grid grid-cols-4 gap-3 w-full">
                {gestures.map((g, i) => (
                    <div key={i} className={`relative flex flex-col items-center justify-center p-2 h-24 rounded-xl border transition-all duration-200 overflow-hidden ${
                        beat === i ? 'border-c-gold shadow-[0_0_12px_rgba(234,179,8,0.4)] scale-105 z-10' : 'border-c-border opacity-60'
                    }`}>
                        {/* Animated Gesture Icon */}
                        <div className="z-20 flex flex-col items-center">
                            <span className={`text-3xl mb-1 transition-all duration-150 ${
                                beat === i ? (
                                    g.label === 'Clap' ? 'scale-125 -rotate-12' : 
                                    g.label === 'Wave' ? 'scale-110 rotate-12 origin-bottom' : 
                                    '-translate-y-2 scale-110'
                                ) : 'scale-100 rotate-0'
                            }`}>{g.icon}</span>
                            <span className={`text-[10px] font-mono font-bold ${beat === i ? 'text-c-gold' : 'text-c-cream-dark'}`}>{g.label}</span>
                        </div>
                        
                        {(phase === 'practicing' || phase === 'success') && (
                            <div className={`absolute bottom-2 right-2 w-2 h-2 rounded-full z-20 ${
                                hits[i] === 'hit' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 
                                hits[i] === 'miss' ? 'bg-red-500' : 'bg-c-border/50'
                            }`} />
                        )}
                    </div>
                ))}
            </div>
            
            {phase === 'idle' && (
                <button onClick={() => start('watching')} className="px-8 py-2.5 border border-c-gold/60 bg-c-gold-faint text-c-gold rounded-full font-playfair text-sm hover:bg-c-gold hover:text-c-bg transition-colors">
                    Watch Demonstration
                </button>
            )}
            
            {phase === 'ready' && (
                <button onClick={() => start('practicing')} className="px-8 py-2.5 bg-c-gold text-c-bg rounded-full font-playfair font-bold tracking-wide hover:opacity-90 transition-opacity">
                    I'm Ready to Practice
                </button>
            )}
            
            {phase === 'practicing' && (
                <button onClick={handleTap} className="w-40 h-40 rounded-full bg-c-gold text-c-bg font-playfair text-xl font-bold tracking-widest shadow-xl shadow-c-gold/20 active:scale-95 transition-transform">
                    TAP
                </button>
            )}
            
            {phase === 'success' && (
                <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <div className="text-emerald-800 text-sm font-playfair italic font-bold">Perfect Rhythm!</div>
                    <button onClick={onDone} className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold">
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Shared: Tuning exercise ──────────────────────────────────────────────────

function ExerciseTuning({ instruction, sa, onDone }) {
    const [phase, setPhase] = useState('idle');
    const [cents, setCents] = useState(30);
    const audioCtx = useRef(null);
    const targetOsc = useRef(null);
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    
    const start = () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.current = ctx;
        
        // Drone (Sa, Pa, High Sa)
        [sa, sa * 1.5, sa * 2].forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.value = 0.03; 
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
        });
        
        // Target Osc
        const tOsc = ctx.createOscillator();
        const tGain = ctx.createGain();
        tOsc.type = 'sawtooth';
        tOsc.frequency.value = sa * Math.pow(2, 30 / 1200); 
        tGain.gain.value = 0.05;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600;
        
        tOsc.connect(filter);
        filter.connect(tGain);
        tGain.connect(ctx.destination);
        tOsc.start();
        targetOsc.current = tOsc;
        
        setPhase('playing');
    };
    
    useEffect(() => {
        if (targetOsc.current && audioCtx.current) {
            targetOsc.current.frequency.setTargetAtTime(sa * Math.pow(2, cents / 1200), audioCtx.current.currentTime, 0.05);
        }
        if (Math.abs(cents) < 2 && phase === 'playing') {
            setTimeout(() => {
                setPhase('success');
                if (audioCtx.current && audioCtx.current.state !== 'closed') audioCtx.current.close();
            }, 2000);
        }
    }, [cents, phase, sa]);
    
    // Acoustic Beats Wave Visualizer
    useEffect(() => {
        if (phase !== 'playing') {
            if (animRef.current) cancelAnimationFrame(animRef.current);
            return;
        }
        
        let t = 0;
        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas) {
                animRef.current = requestAnimationFrame(draw);
                return;
            }
            const ctx = canvas.getContext('2d');
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            
            // Draw a subtle grid background
            ctx.strokeStyle = 'rgba(200, 168, 114, 0.07)';
            ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 30) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke();
            
            // Cents difference and beat calculations
            const diffCents = Math.abs(cents);
            const beatFreq = diffCents * 0.15; // e.g. 40 cents delta = 6 Hz wobble
            
            ctx.beginPath();
            ctx.lineWidth = 2.5;
            
            // Interactive color gradient: Emerald Green (in tune) vs Amber Red (out of tune)
            const grad = ctx.createLinearGradient(0, 0, W, 0);
            if (diffCents < 2) {
                grad.addColorStop(0, '#059669'); // Solid vibrant forest green
                grad.addColorStop(1, '#047857');
                ctx.strokeStyle = grad;
                ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
                ctx.shadowBlur = 12;
            } else {
                grad.addColorStop(0, '#b45309'); // Rich Amber
                grad.addColorStop(1, '#dc2626'); // High-contrast Red
                ctx.strokeStyle = grad;
                ctx.shadowBlur = 0;
            }
            
            // Plot the wave: superposed waves create standard acoustic beats (interference)
            for (let x = 0; x < W; x++) {
                const pct = x / W;
                // High-speed carrier frequency representing the tone pitch
                const carrier = Math.sin(pct * Math.PI * 26 + t * 0.12);
                
                // Beating envelope that pulsates proportional to the cents offset
                let envelope = 1;
                if (diffCents >= 2) {
                    envelope = 0.55 + 0.45 * Math.sin(pct * Math.PI * beatFreq * 2 - t * (beatFreq * 0.08));
                }
                
                const y = H/2 + carrier * envelope * (H * 0.35);
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            
            // Draw the outer envelope guideline (softer dashed line representing beats boundaries)
            if (diffCents >= 2) {
                ctx.shadowBlur = 0;
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(180, 83, 9, 0.25)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                for (let x = 0; x < W; x++) {
                    const pct = x / W;
                    const envelope = 0.55 + 0.45 * Math.sin(pct * Math.PI * beatFreq * 2 - t * (beatFreq * 0.08));
                    const yTop = H/2 - envelope * (H * 0.35);
                    if (x === 0) ctx.moveTo(x, yTop);
                    else ctx.lineTo(x, yTop);
                }
                ctx.stroke();
                
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(180, 83, 9, 0.25)';
                for (let x = 0; x < W; x++) {
                    const pct = x / W;
                    const envelope = 0.55 + 0.45 * Math.sin(pct * Math.PI * beatFreq * 2 - t * (beatFreq * 0.08));
                    const yBot = H/2 + envelope * (H * 0.35);
                    if (x === 0) ctx.moveTo(x, yBot);
                    else ctx.lineTo(x, yBot);
                }
                ctx.stroke();
                ctx.setLineDash([]);
            }
            
            t += 1;
            animRef.current = requestAnimationFrame(draw);
        };
        
        draw();
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [phase, cents]);
    
    const cleanup = () => {
        if (audioCtx.current && audioCtx.current.state !== 'closed') {
            audioCtx.current.close();
        }
    };
    useEffect(() => () => cleanup(), []);
    
    const [showSkip, setShowSkip] = useState(false);
    useEffect(() => {
        if (phase !== 'success') {
            const timer = setTimeout(() => setShowSkip(true), 20000);
            return () => clearTimeout(timer);
        }
    }, [phase]);
    
    const diffCents = Math.abs(cents);
    const beatHz = (diffCents * 0.15).toFixed(1);
    
    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto bg-c-surface border border-c-border p-6 rounded-2xl shadow-lg relative overflow-hidden heritage-card">
            <div className="heritage-border-corner heritage-corner-tl" />
            <div className="heritage-border-corner heritage-corner-tr" />
            <div className="heritage-border-corner heritage-corner-bl" />
            <div className="heritage-border-corner heritage-corner-br" />

            <p className="text-c-cream text-xs font-sans font-bold text-center leading-relaxed px-1 mt-1">{instruction}</p>
            
            {phase === 'idle' && (
                <button type="button" onClick={start} className="px-8 py-2.5 bg-c-gold text-c-bg rounded-full font-playfair text-sm font-bold hover:opacity-90 transition-opacity mt-4 shadow-md">
                    Start Tuning Demonstration
                </button>
            )}
            
            {phase === 'playing' && (
                <div className="w-full flex flex-col items-center gap-4 animate-fade-in mt-1">
                    
                    {/* Live Oscilloscope canvas representing physical acoustic beats */}
                    <div className="relative w-full h-32 bg-c-bg border border-c-border/40 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                        <canvas 
                            ref={canvasRef} 
                            width={320} 
                            height={128} 
                            className="w-full h-full block"
                        />
                        {/* Real-time status badge */}
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold border font-mono select-none uppercase tracking-wide bg-c-surface">
                            {diffCents < 2 ? (
                                <span className="text-emerald-800">✅ Stable</span>
                            ) : (
                                <span className="text-amber-800 animate-pulse">⚠️ Wobbling</span>
                            )}
                        </div>
                    </div>
                    
                    {/* Beats Status Text */}
                    <div className="text-center">
                        {diffCents < 2 ? (
                            <div className="text-emerald-800 text-xs font-bold font-sans animate-fade-in flex items-center justify-center gap-1">
                                <span>✨</span> perfectly in tune: Beats eliminated!
                            </div>
                        ) : (
                            <div className="text-amber-800 text-xs font-bold font-sans flex items-center justify-center gap-1">
                                <span>🔊</span> Wobble frequency: {beatHz} Hz (Acoustic beats)
                            </div>
                        )}
                    </div>

                    <div className="text-[10px] text-c-cream-dim text-center px-2 leading-relaxed">
                        Listen to the wobbling volume interference. Move the slider until the wave stabilizes and the beats stop completely!
                    </div>

                    <input 
                        type="range" min="-40" max="40" step="1" value={cents}
                        onChange={(e) => setCents(Number(e.target.value))}
                        className="w-full accent-c-gold"
                    />
                    <div className="flex justify-between w-full text-[9px] text-c-cream-dark uppercase tracking-wider font-semibold font-mono">
                        <span>Flat (-40¢)</span>
                        <span className={diffCents < 2 ? 'text-emerald-800 font-bold' : ''}>Perfect (0¢)</span>
                        <span>Sharp (+40¢)</span>
                    </div>
                </div>
            )}
            
            {phase === 'success' && (
                <div className="flex flex-col items-center gap-3 animate-fade-in py-2">
                    <div className="text-emerald-800 text-sm font-playfair font-bold text-center">
                        🎉 Splendid! You've matched the pitches perfectly and quieted the acoustic wobbles.
                    </div>
                    <button type="button" onClick={onDone} className="px-10 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold shadow-md transition-colors">
                        Continue
                    </button>
                </div>
            )}
            
            {showSkip && phase !== 'success' && (
                <button type="button" onClick={onDone} className="px-6 py-2 border border-c-border rounded-full text-[10px] text-c-cream-dim hover:text-c-cream transition-colors animate-fade-in">
                    Having trouble? Skip for now
                </button>
            )}
        </div>
    );
}

// ─── Shared: Base Shruti (Sa) Calibrator ──────────────────────────────────────

function ExerciseShrutiSetup({ instruction, sa, setSa, onDone }) {
    const [phase, setPhase] = useState('idle'); // idle | calibrating | success
    const [tempSa, setTempSa] = useState(sa);
    const [stableSamples, setStableSamples] = useState([]);
    const [micError, setMicError] = useState('');
    const [dronePlaying, setDronePlaying] = useState(false);
    
    const streamRef = useRef(null);
    const rafRef = useRef(null);
    const droneStopRef = useRef(null);
    const samplesRef = useRef([]);

    const getNoteName = (freq) => {
        const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const midi = Math.round(69 + 12 * Math.log2(freq / 440));
        const noteName = NOTES[((midi % 12) + 12) % 12];
        const octave = Math.floor(midi / 12) - 1;
        return `${noteName}${octave}`;
    };

    const cleanup = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        streamRef.current?.getTracks().forEach(t => t.stop());
        if (droneStopRef.current) {
            droneStopRef.current();
            droneStopRef.current = null;
        }
        setDronePlaying(false);
    };

    useEffect(() => () => cleanup(), []);

    const toggleDrone = () => {
        if (dronePlaying) {
            if (droneStopRef.current) {
                droneStopRef.current();
                droneStopRef.current = null;
            }
            setDronePlaying(false);
        } else {
            const stop = startDrone(tempSa);
            droneStopRef.current = stop;
            setDronePlaying(true);
        }
    };

    // Update drone frequency dynamically if changed while playing
    useEffect(() => {
        if (dronePlaying) {
            if (droneStopRef.current) droneStopRef.current();
            const stop = startDrone(tempSa);
            droneStopRef.current = stop;
        }
    }, [tempSa, dronePlaying]);

    const startCalibration = async () => {
        setMicError('');
        setPhase('calibrating');
        samplesRef.current = [];
        setStableSamples([]);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const ctx = getAudioCtx();
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 4096;
            source.connect(analyser);

            let lastTime = 0;
            const loop = (time) => {
                if (!streamRef.current) return;

                if (time - lastTime > 50) { // check every 50ms
                    lastTime = time;
                    const freq = detectPitchAudio(analyser, ctx.sampleRate);
                    if (freq && freq >= 110 && freq <= 320) {
                        samplesRef.current.push(freq);
                        setStableSamples([...samplesRef.current]);

                        // When we collect 40 stable samples (~2 seconds of sustained sound)
                        if (samplesRef.current.length >= 40) {
                            cleanup();
                            // Compute median frequency
                            const sorted = [...samplesRef.current].sort((a, b) => a - b);
                            const median = sorted[Math.floor(sorted.length / 2)];
                            const rounded = Math.round(median * 10) / 10;
                            setSa(rounded);
                            setTempSa(rounded);
                            setPhase('success');
                            return;
                        }
                    }
                }
                rafRef.current = requestAnimationFrame(loop);
            };
            rafRef.current = requestAnimationFrame(loop);
        } catch (e) {
            setPhase('idle');
            setMicError('Microphone access denied. Please allow microphone access to calibrate.');
        }
    };

    const handleManualChange = (val) => {
        setTempSa(val);
        setSa(val);
    };

    const selectRegister = (val) => {
        setTempSa(val);
        setSa(val);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-c-surface border border-c-border p-6 rounded-2xl flex flex-col gap-5 shadow-lg relative overflow-hidden heritage-card animate-fade-in">
            <div className="heritage-border-corner heritage-corner-tl" />
            <div className="heritage-border-corner heritage-corner-tr" />
            <div className="heritage-border-corner heritage-corner-bl" />
            <div className="heritage-border-corner heritage-corner-br" />

            <div className="text-center">
                <h4 className="font-playfair text-lg text-c-gold font-bold">Base Shruti (Sa) Calibrator</h4>
                <p className="text-xs text-c-cream-dim mt-1 px-2 leading-relaxed">
                    Every voice has a unique home note (Sa). A male voice is usually lower (C3-D3) while a female or child voice is higher (G3-C4). Adjust yours below to sing comfortably!
                </p>
            </div>

            {/* Current Pitch Display */}
            <div className="flex flex-col items-center justify-center bg-c-gold-faint border border-c-gold/20 py-4 rounded-xl">
                <span className="text-[10px] text-c-cream-dark uppercase tracking-widest font-mono">Current Base Sa</span>
                <span className="text-4xl font-playfair font-black text-c-gold leading-none mt-1.5">{getNoteName(tempSa)}</span>
                <span className="text-xs font-mono text-c-cream-dim mt-1">{tempSa} Hz</span>
            </div>

            {/* Preset Register buttons */}
            <div className="flex flex-col gap-2">
                <span className="text-[10px] text-c-cream-dark uppercase tracking-wider font-semibold">Voice Register Presets</span>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { label: '👨🏽 Male (Low)', hz: 130.81 },
                        { label: '👩🏽 Female (Mid)', hz: 220.00 },
                        { label: '👧🏽 Kids (High)', hz: 261.63 }
                    ].map(preset => (
                        <button 
                            type="button"
                            key={preset.label}
                            onClick={() => selectRegister(preset.hz)}
                            className={`py-2 px-1 text-[11px] rounded-lg border font-semibold transition-all ${
                                Math.abs(tempSa - preset.hz) < 5
                                ? 'bg-c-gold text-c-bg border-c-gold'
                                : 'bg-c-bg text-c-cream border-c-border/40 hover:border-c-gold/50'
                            }`}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Manual Slider */}
            <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex justify-between items-center text-[10px] text-c-cream-dark uppercase font-semibold">
                    <span>Manual Adjust</span>
                    <span className="font-mono text-c-gold">{tempSa} Hz</span>
                </div>
                <input 
                    type="range" min="110" max="300" step="1"
                    value={tempSa}
                    onChange={(e) => handleManualChange(Number(e.target.value))}
                    className="w-full accent-c-gold"
                />
                <div className="flex justify-between text-[9px] text-c-cream-dim font-mono">
                    <span>Low (110 Hz)</span>
                    <span>High (300 Hz)</span>
                </div>
            </div>

            {/* Audio Testing Control */}
            <div className="flex gap-2 justify-center">
                <button 
                    type="button"
                    onClick={toggleDrone}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                        dronePlaying 
                        ? 'bg-red-500/10 text-red-700 border-red-500/30 animate-pulse'
                        : 'bg-c-gold-faint text-c-gold border-c-gold/30 hover:bg-c-gold hover:text-c-bg'
                    }`}
                >
                    <span>{dronePlaying ? '⏹️ Stop Drone' : '🔈 Play Drone'}</span>
                </button>
            </div>

            {/* Calibration interface */}
            <div className="border-t border-c-border/30 pt-4 flex flex-col items-center gap-3">
                {phase === 'idle' && (
                    <div className="flex flex-col items-center gap-2 w-full">
                        <button 
                            type="button"
                            onClick={startCalibration}
                            className="w-full py-2.5 bg-c-gold text-c-bg rounded-full font-bold text-sm tracking-wide shadow-md hover:bg-c-gold-light transition-all flex items-center justify-center gap-2"
                        >
                            <span>🎙️ Sing comfortable note to Calibrate</span>
                        </button>
                        {micError && <p className="text-red-500 text-[11px] font-semibold text-center mt-1">{micError}</p>}
                    </div>
                )}

                {phase === 'calibrating' && (
                    <div className="w-full flex flex-col items-center gap-3 text-center py-2 animate-fade-in animate-pulse">
                        <p className="text-xs text-c-cream font-semibold">Sing a steady, comfortable "Sa" or "Aaaa" into your mic...</p>
                        
                        {/* Progress Bar of collected samples */}
                        <div className="w-full bg-c-bg h-2 rounded-full overflow-hidden border border-c-border/30">
                            <div 
                                className="h-full bg-emerald-600 transition-all duration-100" 
                                style={{ width: `${Math.min(100, (stableSamples.length / 40) * 100)}%` }}
                            />
                        </div>
                        <div className="text-[10px] text-c-cream-dark font-mono">
                            Calibrating pitch stability: {stableSamples.length} / 40 samples
                        </div>
                        
                        <button 
                            type="button"
                            onClick={() => { cleanup(); setPhase('idle'); }}
                            className="px-4 py-1 border border-c-border text-[10px] text-c-cream-dim rounded-full hover:text-c-cream hover:border-c-gold/50"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {phase === 'success' && (
                    <div className="w-full flex flex-col items-center gap-3 animate-fade-in py-1">
                        <div className="text-emerald-800 text-sm font-playfair font-bold text-center flex items-center gap-1.5">
                            <span>✅</span> Calibrated perfectly! Sa matches: {getNoteName(tempSa)} ({tempSa} Hz)
                        </div>
                        <button 
                            type="button"
                            onClick={() => { cleanup(); onDone(); }}
                            className="px-12 py-2 bg-emerald-700 text-white rounded-full text-xs font-bold hover:bg-emerald-800 transition-colors shadow-sm"
                        >
                            Continue Lesson
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Shared: Free Sing exercise (Volume only) ─────────────────────────────────

function ExerciseFreeSing({ instruction, duration = 5, onDone }) {
    const holdMs = duration * 1000;
    const [phase, setPhase] = useState('idle');
    const [level, setLevel] = useState(0); 
    const [heldPct, setHeldPct] = useState(0);
    const [micError, setMicError] = useState('');
    
    const streamRef = useRef(null);
    const intervalRef = useRef(null);
    const heldRef = useRef(0);
    
    const cleanup = () => {
        clearInterval(intervalRef.current);
        streamRef.current?.getTracks().forEach(t => t.stop());
    };
    useEffect(() => () => cleanup(), []);
    
    const startMic = async () => {
        setMicError('');
        heldRef.current = 0;
        setHeldPct(0);
        setLevel(0);
        
        // --- PHASE 2: CALIBRATION NOISE FLOOR ---
        // If window.MIC_NOISE_FLOOR exists, we use it, otherwise 0
        const noiseFloor = window.MIC_NOISE_FLOOR || 0;
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const ctx = getAudioCtx();
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 2048;
            source.connect(analyser);
            const buf = new Float32Array(analyser.fftSize);
            setPhase('listening');
            
            intervalRef.current = setInterval(() => {
                analyser.getFloatTimeDomainData(buf);
                const rms = Math.sqrt(buf.reduce((s, v) => s + v * v, 0) / buf.length);
                const rawLevel = Math.min(100, rms * 1500);
                
                // Subtract the noise floor so that background hum doesn't trigger the volume
                const currentLevel = Math.max(0, rawLevel - noiseFloor);
                setLevel(currentLevel);
                
                if (currentLevel > 5) {
                    heldRef.current += 100;
                    setHeldPct(Math.min(100, (heldRef.current / holdMs) * 100));
                    if (heldRef.current >= holdMs) {
                        cleanup();
                        setPhase('success');
                    }
                } else {
                    heldRef.current = Math.max(0, heldRef.current - 50);
                    setHeldPct(prev => Math.max(0, prev - 2));
                }
            }, 100);
        } catch {
            setMicError('Microphone access denied.');
        }
    };
    
    const [showSkip, setShowSkip] = useState(false);
    useEffect(() => {
        if (phase !== 'success') {
            const timer = setTimeout(() => setShowSkip(true), 20000);
            return () => clearTimeout(timer);
        }
    }, [phase]);
    
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-xs mx-auto">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center leading-relaxed">{instruction}</p>
            
            <div className="relative w-40 h-40 flex items-center justify-center my-4">
                <div 
                    className="absolute rounded-full bg-c-gold/20 transition-all duration-75"
                    style={{ width: `${50 + level*0.5}%`, height: `${50 + level*0.5}%` }}
                />
                <div 
                    className="absolute rounded-full bg-c-gold/40 transition-all duration-75"
                    style={{ width: `${30 + level*0.3}%`, height: `${30 + level*0.3}%` }}
                />
                <div className="w-16 h-16 rounded-full bg-c-gold shadow-lg shadow-c-gold/20 flex items-center justify-center z-10 text-c-bg">
                    <span className="font-mono text-xs font-bold">{phase === 'listening' ? 'Sing!' : 'Volume'}</span>
                </div>
            </div>
            
            {phase === 'idle' && (
                <button onClick={startMic} className="px-8 py-2.5 border border-c-gold/60 bg-c-gold-faint text-c-gold rounded-full font-playfair text-sm hover:bg-c-gold hover:text-c-bg transition-colors">
                    Start Exercise
                </button>
            )}
            
            {phase === 'listening' && (
                <div className="w-full h-1.5 bg-c-border rounded-full overflow-hidden animate-fade-in">
                    <div className="h-full bg-emerald-500 transition-all duration-100" style={{ width: `${heldPct}%` }} />
                </div>
            )}
            
            {phase === 'success' && (
                <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <div className="text-emerald-400 text-sm font-playfair italic">Great job!</div>
                    <button onClick={onDone} className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold">
                        Continue
                    </button>
                </div>
            )}
            
            {showSkip && phase !== 'success' && (
                <button onClick={onDone} className="mt-4 px-6 py-2 border border-c-border rounded-full text-xs text-c-cream-dim hover:text-c-cream transition-colors animate-fade-in">
                    Having trouble? Skip for now
                </button>
            )}
            
            {micError && <p className="text-red-400 text-xs font-playfair italic text-center">{micError}</p>}
        </div>
    );
}

// ─── Shared: Sing exercise ────────────────────────────────────────────────────

const TOLERANCE = 50;

function ExerciseSing({ swara, sa, instruction, duration = 1.5, displayLabel, humanAudioUrl, onDone }) {
    const holdMs = duration * 1000;
    const [phase, setPhase] = useState('idle');
    const [micError, setMicError] = useState('');

    const streamRef  = useRef(null);
    const rafRef     = useRef(null);
    const heldRef    = useRef(0);
    const historyRef = useRef([]); 
    const canvasRef  = useRef(null);
    const targetSt   = SEMITONES[swara] ?? 0;

    const cleanup = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        streamRef.current?.getTracks().forEach(t => t.stop());
    };
    useEffect(() => () => cleanup(), []);

    const startMic = async () => {
        setMicError('');
        heldRef.current = 0;
        historyRef.current = [];
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const ctx = getAudioCtx();
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 4096;
            source.connect(analyser);
            setPhase('listening');

            let lastTime = 0;
            const draw = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const c = canvas.getContext('2d');
                const W = canvas.width;
                const H = canvas.height;
                c.clearRect(0, 0, W, H);
                
                // Center line
                c.beginPath();
                c.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                c.moveTo(0, H/2);
                c.lineTo(W, H/2);
                c.stroke();

                // Tolerance band (+/- 50 cents) in a 300 cents total view (+/- 150)
                const pTol = (TOLERANCE / 150); 
                c.fillStyle = 'rgba(16, 185, 129, 0.1)';
                c.fillRect(0, H/2 - (H*pTol/2), W, H*pTol);

                // History line
                c.beginPath();
                c.lineWidth = 3;
                c.lineJoin = 'round';
                let first = true;
                const pts = historyRef.current;
                const MAX_PTS = 150;
                
                for (let i = 0; i < pts.length; i++) {
                    if (pts[i] === 999) {
                        first = true;
                        continue;
                    }
                    const x = (i / MAX_PTS) * W;
                    const clamped = Math.max(-150, Math.min(150, pts[i]));
                    const y = H/2 - (clamped / 150) * (H/2);
                    
                    if (Math.abs(pts[i]) <= TOLERANCE) {
                        c.strokeStyle = '#10b981';
                    } else {
                        c.strokeStyle = '#ef4444';
                    }
                    
                    if (first) {
                        c.moveTo(x, y);
                        first = false;
                    } else {
                        c.lineTo(x, y);
                    }
                }
                c.stroke();
            };

            const loop = (time) => {
                if (!streamRef.current) return;
                
                if (time - lastTime > 40) { // ~25fps pitch check
                    lastTime = time;
                    const freq = detectPitchAudio(analyser, ctx.sampleRate);
                    let diff = 999;
                    if (freq && freq > 50 && freq < 2200) {
                        diff = centsToNearest(freq, targetSt, sa);
                        if (Math.abs(diff) <= TOLERANCE) {
                            heldRef.current += 40;
                        } else {
                            heldRef.current = Math.max(0, heldRef.current - 15);
                        }
                    } else {
                        heldRef.current = Math.max(0, heldRef.current - 15);
                    }
                    
                    historyRef.current.push(diff);
                    if (historyRef.current.length > 150) historyRef.current.shift();
                    
                    if (heldRef.current >= holdMs) {
                        cleanup();
                        setPhase('success');
                        return;
                    }
                }
                
                draw();
                rafRef.current = requestAnimationFrame(loop);
            };
            rafRef.current = requestAnimationFrame(loop);
            
        } catch {
            setMicError('Microphone access denied. Please allow mic access and try again.');
        }
    };

    const [showSkip, setShowSkip] = useState(false);
    useEffect(() => {
        if (phase !== 'success') {
            const timer = setTimeout(() => setShowSkip(true), 20000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center leading-relaxed">{instruction}</p>

            <div className="flex flex-col items-center gap-1.5">
                <div className="text-[60px] font-mono font-bold text-c-gold leading-none">{displayLabel || swara}</div>
                <button onClick={() => {
                    if (humanAudioUrl) {
                        const a = new Audio(humanAudioUrl);
                        a.play().catch(() => {
                            // fallback if missing
                            let f = sa * Math.pow(2, targetSt / 12);
                            while (f < 150) f *= 2;
                            while (f > 650) f /= 2;
                            playSingleTone(f);
                        });
                    } else {
                        let f = sa * Math.pow(2, targetSt / 12);
                        while (f < 150) f *= 2;
                        while (f > 650) f /= 2;
                        playSingleTone(f);
                    }
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
                <div className="flex flex-col gap-3 w-full animate-fade-in">
                    <p className="text-[10px] text-c-cream-dim text-center font-mono text-red-400">↑ Too High (Sharp) - Lower Your Voice</p>
                    <canvas ref={canvasRef} width={320} height={100} className="w-full bg-[#111] rounded-xl border border-c-border shadow-inner" />
                    <p className="text-[10px] text-c-cream-dim text-center font-mono text-blue-400">↓ Too Low (Flat) - Raise Your Voice</p>
                </div>
            )}

            {phase === 'success' && (
                <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <div className="w-12 h-12 rounded-full border border-emerald-700/50 bg-emerald-800/15 flex items-center justify-center text-emerald-800 text-xl">✓</div>
                    <p className="text-emerald-800 text-sm font-playfair italic font-bold">Held it</p>
                    <button onClick={onDone} className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold tracking-wide hover:opacity-90 transition-opacity">
                        Continue
                    </button>
                </div>
            )}
            
            {showSkip && phase !== 'success' && (
                <button onClick={onDone} className="mt-4 px-6 py-2 border border-c-border rounded-full text-xs text-c-cream-dim hover:text-c-cream transition-colors animate-fade-in">
                    Having trouble? Skip for now
                </button>
            )}
            
            {micError && <p className="text-red-400 text-xs font-playfair italic text-center">{micError}</p>}
        </div>
    );
}

// ─── Shared: Sing Sequence exercise ──────────────────────────────────────────

function playTick(ctx, time) {
    // 1. Warm woodbody resonant tone (sine wave for round, sweet organic sound)
    const oscBody = ctx.createOscillator();
    const gainBody = ctx.createGain();
    oscBody.type = 'sine';
    oscBody.frequency.setValueAtTime(600, time);
    oscBody.frequency.exponentialRampToValueAtTime(300, time + 0.06);
    
    gainBody.gain.setValueAtTime(0.5, time);
    gainBody.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
    
    oscBody.connect(gainBody);
    gainBody.connect(ctx.destination);
    
    // 2. High-pitch clean acoustic transient click to cut through drone & singing
    const oscClick = ctx.createOscillator();
    const gainClick = ctx.createGain();
    oscClick.type = 'sine';
    oscClick.frequency.setValueAtTime(1600, time);
    
    gainClick.gain.setValueAtTime(0.35, time);
    gainClick.gain.exponentialRampToValueAtTime(0.001, time + 0.015);
    
    oscClick.connect(gainClick);
    gainClick.connect(ctx.destination);
    
    oscBody.start(time);
    oscBody.stop(time + 0.06);
    
    oscClick.start(time);
    oscClick.stop(time + 0.015);
}

function ExerciseSingSequence({ swaras, sa, speed = 1, instruction, mode = 'swaras', onDone }) {
    const BEAT_MS = 800;
    const NOTE_MS = BEAT_MS / speed;

    const [phase, setPhase] = useState('idle'); // idle | guide | countdown | singing | success | fail
    const [countdown, setCountdown] = useState(3);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [statuses, setStatuses] = useState(swaras.map(() => null));
    const [micError, setMicError] = useState('');
    
    const [isPlayingGuide, setIsPlayingGuide] = useState(false);
    
    const streamRef = useRef(null);
    const intervalRef = useRef(null);
    const guideAbortRef = useRef(null);
    const scoresRef = useRef(swaras.map(() => ({ hits: 0, total: 0 })));

    const cleanup = () => {
        clearInterval(intervalRef.current);
        guideAbortRef.current?.abort();
        setActiveIdx(-1);
        streamRef.current?.getTracks().forEach(t => t.stop());
    };
    useEffect(() => () => cleanup(), []);

    const playGuide = async () => {
        cleanup();
        setStatuses(swaras.map(() => null));
        setIsPlayingGuide(true);
        try {
            const ctrl = new AbortController();
            guideAbortRef.current = ctrl;
            await playSequenceAsync(swaras, sa, setActiveIdx, ctrl.signal);
            if (!ctrl.signal.aborted) {
                setActiveIdx(-1);
            }
        } finally {
            setIsPlayingGuide(false);
        }
    };

    const startRecording = async () => {
        cleanup();
        setMicError('');
        setStatuses(swaras.map(() => null));
        scoresRef.current = swaras.map(() => ({ hits: 0, total: 0 }));
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            
            const ctx = getAudioCtx();
            
            setPhase('countdown');
            setCountdown(3);
            playTick(ctx, ctx.currentTime); // Play woodblock click on "3"
            
            let c = 3;
            const iv = setInterval(() => {
                c--;
                if (c > 0) {
                    setCountdown(c);
                    playTick(ctx, ctx.currentTime); // Play woodblock click on "2" and "1"
                } else {
                    clearInterval(iv);
                    beginListening(stream);
                }
            }, BEAT_MS); // Click in perfect sync with the singing beat tempo!
        } catch (err) {
            setMicError('Mic access required. Please allow mic and try again.');
            setPhase('idle');
        }
    };
    
    const beginListening = (stream) => {
        const ctx = getAudioCtx();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 4096;
        source.connect(analyser);

        setPhase('singing');
        setActiveIdx(0); // Start at first note immediately
        playTick(ctx, ctx.currentTime); // Play the first singing click instantly

        const startMs = Date.now();
        let lastBeat = 0;

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startMs;
            const currentIdx = Math.floor(elapsed / NOTE_MS);
            
            if (currentIdx >= swaras.length) {
                cleanup();
                // Evaluate
                const finalStatuses = scoresRef.current.map(s => (s.total > 0 && s.hits / s.total > 0.3) ? 'hit' : 'miss');
                setStatuses(finalStatuses);
                setActiveIdx(-1);
                const hitCount = finalStatuses.filter(s => s === 'hit').length;
                if (hitCount / swaras.length >= 0.7) {
                    setPhase('success');
                } else {
                    setPhase('fail');
                }
                return;
            }

            if (currentIdx !== activeIdx) {
                setActiveIdx(currentIdx);
                const beatIdx = Math.floor(currentIdx / speed);
                if (beatIdx !== lastBeat) {
                    playTick(ctx, ctx.currentTime);
                    lastBeat = beatIdx;
                }
            }

                // Check pitch
                const swara = swaras[currentIdx];
                if (swara && swara !== ',') {
                    const targetSt = SEMITONES[swara] ?? 0;
                    const buf = new Float32Array(analyser.fftSize);
                    analyser.getFloatTimeDomainData(buf);
                    const rms = Math.sqrt(buf.reduce((s, v) => s + v * v, 0) / buf.length);
                    const freq = detectPitchAudio(analyser, ctx.sampleRate);
                    
                    scoresRef.current[currentIdx].total++;
                    if (freq && rms > 0.003) {
                        const diff = Math.abs(centsToNearest(freq, targetSt, sa));
                        if (diff <= 50) {
                            scoresRef.current[currentIdx].hits++;
                        }
                    }
                    
                    // Live update status for current note
                    if (scoresRef.current[currentIdx].total > 2) {
                        const ratio = scoresRef.current[currentIdx].hits / scoresRef.current[currentIdx].total;
                        setStatuses(prev => {
                            const copy = [...prev];
                            copy[currentIdx] = ratio > 0.3 ? 'hit' : 'miss';
                            return copy;
                        });
                    }
                } else if (swara === ',') {
                    scoresRef.current[currentIdx].total++;
                    scoresRef.current[currentIdx].hits++;
                    if (scoresRef.current[currentIdx].total > 2) {
                        setStatuses(prev => {
                            const copy = [...prev];
                            copy[currentIdx] = 'hit';
                            return copy;
                        });
                    }
                }

            }, 50);
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <p className="text-c-cream-dark text-sm font-playfair italic text-center leading-relaxed">{instruction}</p>
            
            {(() => {
                if (swaras.length === 16) {
                    const line1 = swaras.slice(0, 8);
                    const line2 = swaras.slice(8, 16);
                    return (
                        <div className="flex flex-col gap-3.5 items-center w-full px-4">
                            {/* Arohanam Line */}
                            <div className="flex justify-center gap-2">
                                {line1.map((s, idx) => {
                                    const i = idx;
                                    return (
                                        <div key={i} className={`w-9 h-11 flex items-center justify-center font-mono text-sm font-bold border rounded-md transition-all duration-75 ${
                                            i === activeIdx ? 'scale-115 shadow-lg border-c-gold bg-c-gold/25 text-c-gold font-extrabold' :
                                            statuses[i] === 'hit' ? 'border-emerald-800/30 bg-emerald-800/15 text-emerald-800 font-bold' :
                                            statuses[i] === 'miss' ? 'border-red-700/30 bg-red-950/15 text-red-800 font-bold' :
                                            'border-c-border/50 bg-c-card text-c-cream-dim'
                                        }`}>
                                            {mode === 'akaram' && s !== ',' ? 'A' : (s === ',' ? '-' : s.replace(/[0-9]/g, ''))}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Avarohanam Line */}
                            <div className="flex justify-center gap-2">
                                {line2.map((s, idx) => {
                                    const i = idx + 8;
                                    return (
                                        <div key={i} className={`w-9 h-11 flex items-center justify-center font-mono text-sm font-bold border rounded-md transition-all duration-75 ${
                                            i === activeIdx ? 'scale-115 shadow-lg border-c-gold bg-c-gold/25 text-c-gold font-extrabold' :
                                            statuses[i] === 'hit' ? 'border-emerald-800/30 bg-emerald-800/15 text-emerald-800 font-bold' :
                                            statuses[i] === 'miss' ? 'border-red-700/30 bg-red-950/15 text-red-800 font-bold' :
                                            'border-c-border/50 bg-c-card text-c-cream-dim'
                                        }`}>
                                            {mode === 'akaram' && s !== ',' ? 'A' : (s === ',' ? '-' : s.replace(/[0-9]/g, ''))}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="flex flex-wrap justify-center gap-1.5 max-w-2xl px-4">
                        {swaras.map((s, i) => (
                            <div key={i} className={`w-9 h-11 flex items-center justify-center font-mono text-sm font-bold border rounded-md transition-all duration-75 ${
                                i === activeIdx ? 'scale-115 shadow-lg border-c-gold bg-c-gold/25 text-c-gold font-extrabold' :
                                statuses[i] === 'hit' ? 'border-emerald-800/30 bg-emerald-800/15 text-emerald-800 font-bold' :
                                statuses[i] === 'miss' ? 'border-red-700/30 bg-red-950/15 text-red-800 font-bold' :
                                'border-c-border/50 bg-c-card text-c-cream-dim'
                            }`}>
                                {mode === 'akaram' && s !== ',' ? 'A' : (s === ',' ? '-' : s.replace(/[0-9]/g, ''))}
                            </div>
                        ))}
                    </div>
                );
            })()}

            {phase === 'idle' && (
                <div className="flex gap-4 items-center">
                    <button onClick={playGuide}
                            disabled={isPlayingGuide}
                            className={`px-6 py-2.5 border border-c-border bg-c-surface text-c-cream-dim text-sm rounded-full font-playfair hover:border-c-gold/40 hover:text-c-gold transition-all flex items-center gap-1.5 ${isPlayingGuide ? 'opacity-60 cursor-not-allowed animate-pulse' : ''}`}>
                        <span>{isPlayingGuide ? '🔊 Playing...' : '🔈 Hear Sequence'}</span>
                    </button>
                    <button onClick={startRecording}
                            className="px-8 py-2.5 border border-c-gold/60 bg-c-gold-faint text-c-gold rounded-full font-playfair text-sm hover:bg-c-gold hover:text-c-bg transition-colors flex items-center gap-1.5">
                        <span>🎙️ Start Singing</span>
                    </button>
                </div>
            )}

            {phase === 'guide' && (
                <div className="flex flex-col items-center gap-2 animate-pulse">
                    <p className="text-c-gold text-lg font-mono">🔊 guide tone playing...</p>
                    <p className="text-[10px] text-c-cream-dim uppercase tracking-widest">Listen closely to match the scale</p>
                </div>
            )}
            
            {phase === 'countdown' && (
                <div className="flex flex-col items-center gap-2 animate-fade-in">
                    <p className="text-c-gold text-4xl font-mono animate-bounce">{countdown}</p>
                    <p className="text-[10px] text-c-cream-dim uppercase tracking-widest">Get Ready</p>
                </div>
            )}
            
            {phase === 'singing' && (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-c-gold text-xs font-mono animate-pulse">Listening...</p>
                    <p className="text-[10px] text-c-cream-dim">Follow the metronome tick</p>
                </div>
            )}

            {phase === 'success' && (
                <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <div className="text-emerald-800 text-sm font-playfair italic font-bold">Great job!</div>
                    <button onClick={onDone} className="px-10 py-2.5 bg-c-gold text-c-bg rounded-full text-sm font-playfair font-bold">
                        Continue
                    </button>
                </div>
            )}
            
            {phase === 'fail' && (
                <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <div className="text-red-400 text-sm font-playfair italic">Keep practicing to improve accuracy.</div>
                    <button onClick={() => setPhase('idle')} className="px-8 py-2 border border-c-gold text-c-gold rounded-full text-sm font-playfair font-bold hover:bg-c-gold hover:text-c-bg transition-colors">
                        Try Again
                    </button>
                </div>
            )}
            
            {micError && <p className="text-red-400 text-xs font-playfair italic">{micError}</p>}
        </div>
    );
}

// ─── Shared: Mic Calibration ──────────────────────────────────────────────────

function MicCalibration({ onDone }) {
    const [phase, setPhase] = useState('idle'); 
    const [progress, setProgress] = useState(0); 
    const [micError, setMicError] = useState('');
    
    const start = async () => {
        setMicError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const ctx = getAudioCtx();
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 2048;
            source.connect(analyser);
            const buf = new Float32Array(analyser.fftSize);
            
            setPhase('listening');
            
            let samples = [];
            let elapsed = 0;
            const interval = setInterval(() => {
                analyser.getFloatTimeDomainData(buf);
                const rms = Math.sqrt(buf.reduce((s, v) => s + v * v, 0) / buf.length);
                samples.push(Math.min(100, rms * 1500));
                
                elapsed += 50;
                setProgress((elapsed / 3000) * 100);
                
                if (elapsed >= 3000) {
                    clearInterval(interval);
                    stream.getTracks().forEach(t => t.stop());
                    
                    samples.sort((a,b) => a-b);
                    const floor = samples[Math.floor(samples.length * 0.9)] || 0;
                    window.MIC_NOISE_FLOOR = floor + 2; 
                    
                    setPhase('success');
                    setTimeout(onDone, 1500);
                }
            }, 50);
        } catch {
            setMicError('Mic access required.');
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] max-w-sm mx-auto text-center gap-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-c-gold-faint flex items-center justify-center text-3xl">🎙️</div>
            <h2 className="text-xl font-playfair font-bold text-c-gold">Mic Calibration</h2>
            {phase === 'idle' && (
                <>
                    <p className="text-c-cream-dim text-sm italic">Before we sing, let's measure the background noise in your room so we only track your voice.</p>
                    <button onClick={start} className="px-8 py-2.5 bg-c-gold text-c-bg rounded-full font-bold mt-2 hover:opacity-90 transition-opacity">Start Calibration</button>
                    {micError && <p className="text-red-400 text-xs mt-2">{micError}</p>}
                </>
            )}
            {phase === 'listening' && (
                <div className="w-full flex flex-col gap-4">
                    <p className="text-c-cream animate-pulse">Shh... please stay completely silent.</p>
                    <div className="w-full h-2 bg-c-border rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-75" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            )}
            {phase === 'success' && (
                <p className="text-emerald-400 italic">Calibration complete!</p>
            )}
        </div>
    );
}

// ─── Lesson runner ────────────────────────────────────────────────────────────

function LessonRunner({ lesson, sa, setSa, onComplete, onBack }) {
    const [idx, setIdx] = useState(0);
    const exercises = lesson.exercises;
    const ex = exercises[idx];
    const pct = Math.round((idx / exercises.length) * 100);

    const requiresMic = exercises.some(e => e.type === 'sing' || e.type === 'free_sing' || e.type === 'sing_sequence');
    const [calibrated, setCalibrated] = useState(!!window.MIC_NOISE_FLOOR);
    
    if (requiresMic && !calibrated) {
        return (
            <div className="w-full max-w-lg mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={onBack} className="text-c-cream-dark hover:text-c-gold text-lg leading-none transition-colors">✕</button>
                </div>
                <MicCalibration onDone={() => setCalibrated(true)} />
            </div>
        );
    }

    const next = () => idx + 1 >= exercises.length ? onComplete() : setIdx(i => i + 1);
    const prev = () => idx > 0 ? setIdx(i => i - 1) : onBack();

    const renderEx = () => {
        const key = `${lesson.id}-${idx}`;
        if (ex.type === 'info')            return <ExerciseInfo           key={key} {...ex} onDone={next} />;
        if (ex.type === 'quiz')            return <ExerciseQuiz           key={key} {...ex} onDone={next} />;
        if (ex.type === 'listen')          return <ExerciseListen         key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'listen_sequence') return <ExerciseListenSequence key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'identify')        return <ExerciseIdentify       key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'compare')         return <ExerciseCompare        key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'free_sing')       return <ExerciseFreeSing       key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'taalam')          return <ExerciseTaalam         key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'tune')            return <ExerciseTuning         key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'shruti_setup')    return <ExerciseShrutiSetup    key={key} {...ex} sa={sa} setSa={setSa} onDone={next} />;
        if (ex.type === 'sing')            return <ExerciseSing           key={key} {...ex} sa={sa} onDone={next} />;
        if (ex.type === 'sing_sequence')   return <ExerciseSingSequence   key={key} {...ex} sa={sa} onDone={next} />;
    };

    return (
        <div className="w-full max-w-lg mx-auto flex flex-col gap-5">
            <div className="flex items-center gap-3">
                <button onClick={prev} className="text-c-cream-dark hover:text-c-gold text-xl leading-none transition-colors" title="Previous Exercise">←</button>
                <div className="flex-1 h-2 bg-c-border rounded-full overflow-hidden">
                    <div className="h-full bg-c-gold rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[11px] text-c-cream-dark font-mono tabular-nums">{idx + 1}/{exercises.length}</span>
                <button onClick={onBack} className="text-c-cream-dark hover:text-c-gold text-lg leading-none transition-colors" title="Exit Lesson">✕</button>
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
    const [phase, setPhase] = useState('listen_aro'); // listen_aro | sing_aro_notes | listen_ava | sing_ava_notes | sing_aro_seq | sing_ava_seq | sing_full_seq | quiz | done
    const [singIdx, setSingIdx] = useState(0);

    // Sequence completion tracking
    const [passedFullSeq, setPassedFullSeq] = useState(false);

    useEffect(() => {
        if (phase === 'done') {
            try {
                const existing = JSON.parse(localStorage.getItem('mastered_ragas') || '[]');
                if (!existing.includes(ragaName)) {
                    existing.push(ragaName);
                    localStorage.setItem('mastered_ragas', JSON.stringify(existing));
                    // Dispatch a custom event to notify of localstorage update
                    window.dispatchEvent(new Event('localStorage-mastered-ragas-updated'));
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, [phase, ragaName]);

    // Quiz states
    const [quizNote, setQuizNote] = useState(null);
    const [quizChoices, setQuizChoices] = useState([]);
    const [selectedQuizChoice, setSelectedQuizChoice] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);

    const arohanam = raga.arohanam.map((note, idx) => {
        if (idx === raga.arohanam.length - 1 && note === 'Sa') {
            return 'Ṡ';
        }
        return note;
    });

    const avarohanam = raga.avarohanam.map((note, idx) => {
        if (idx === 0 && note === 'Sa') {
            return 'Ṡ';
        }
        return note;
    });

    const fullScale = [...arohanam, ...avarohanam];

    const steps = [
        { key: 'listen_aro', label: '1. Aro Listen', icon: '🔊' },
        { key: 'sing_aro_notes', label: '2. Aro Notes', icon: '🎵' },
        { key: 'listen_ava', label: '3. Ava Listen', icon: '🔉' },
        { key: 'sing_ava_notes', label: '4. Ava Notes', icon: '🎶' },
        { key: 'sing_aro_seq', label: '5. Aro Flow', icon: '📈' },
        { key: 'sing_ava_seq', label: '6. Ava Flow', icon: '📉' },
        { key: 'sing_full_seq', label: '7. Scale Flow', icon: '🔄' },
        { key: 'quiz', label: '8. Ear Test', icon: '🧠' },
        { key: 'done', label: '9. Done', icon: '🏆' },
    ];

    const initQuiz = () => {
        const options = arohanam.filter(n => n !== 'Sa' && n !== 'Ṡ');
        const correct = options[Math.floor(Math.random() * options.length)];
        setQuizNote(correct);

        // choices: the correct note + 2 other random notes from the scale
        const wrong = options.filter(n => n !== correct);
        const choices = [correct];
        while (choices.length < Math.min(3, options.length + 1)) {
            const w = wrong[Math.floor(Math.random() * wrong.length)];
            if (w && !choices.includes(w)) choices.push(w);
        }
        // Shuffle choices
        setQuizChoices(choices.sort(() => Math.random() - 0.5));
        setSelectedQuizChoice(null);
        setQuizAnswered(false);
    };

    const playQuizNote = () => {
        if (!quizNote) return;
        const freq = swaraFreq(quizNote, sa);
        playSingleTone(freq, 1.2);
    };

    const handleSingAroDone = () => {
        if (singIdx + 1 >= arohanam.length) {
            setPhase('listen_ava');
        } else {
            setSingIdx(i => i + 1);
        }
    };

    const handleSingAvaDone = () => {
        if (singIdx + 1 >= avarohanam.length) {
            setPhase('sing_aro_seq');
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

            {/* Pipeline progress bar tracker (Clickable Tabs) */}
            <div className="w-full flex justify-between items-center px-2 py-3 border-b border-c-border/40 mb-2 overflow-x-auto gap-2">
                {steps.map((s, idx) => {
                    const activeIdx = steps.findIndex(st => st.key === phase);
                    const isActive = s.key === phase;
                    const isPast = steps.findIndex(st => st.key === s.key) < activeIdx;
                    return (
                        <button
                            key={s.key}
                            onClick={() => {
                                if (s.key === 'done') {
                                    if (!passedFullSeq) {
                                        alert("To graduate and unlock the final trophy, you must successfully sing and pass the Scale Flow (Step 7: ascending and descending combined sequence)!");
                                        return;
                                    }
                                }
                                setPhase(s.key);
                                setSingIdx(0);
                                if (s.key === 'quiz') {
                                    initQuiz();
                                }
                            }}
                            className="flex flex-col items-center gap-1 flex-1 min-w-[36px] focus:outline-none group"
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                                isActive ? 'bg-c-gold text-c-bg font-bold scale-110 shadow-lg shadow-c-gold/20' :
                                isPast ? 'bg-c-gold/20 text-c-gold border border-c-gold/30 hover:bg-c-gold/30' :
                                'bg-c-surface border border-c-border text-c-cream-dark hover:border-c-gold/45 hover:text-c-gold'
                            }`} title={s.label}>
                                {s.icon}
                            </div>
                            {isActive ? (
                                <span className="text-[8px] font-playfair font-bold text-c-gold whitespace-nowrap animate-pulse">{s.label.split('. ')[1]}</span>
                            ) : (
                                <span className="text-[7px] text-c-cream-dark font-sans opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{s.label.split('. ')[1]}</span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="min-h-[340px] flex items-center justify-center py-4">
                {phase === 'listen_aro' && (
                    <ExerciseListenSequence
                        key="raga-listen-aro"
                        swaras={arohanam}
                        sa={sa}
                        instruction={`Step 1: Listen to the ascending ${ragaName} scale (Arohanam).`}
                        onDone={() => { setPhase('sing_aro_notes'); setSingIdx(0); }}
                    />
                )}

                {phase === 'sing_aro_notes' && (
                    <ExerciseSing
                        key={`sing-aro-${singIdx}`}
                        swara={arohanam[singIdx]}
                        sa={sa}
                        instruction={`Step 2: Sing note ${singIdx + 1} of ${arohanam.length} (Arohanam Ascending)`}
                        onDone={handleSingAroDone}
                    />
                )}

                {phase === 'listen_ava' && (
                    <ExerciseListenSequence
                        key="raga-listen-ava"
                        swaras={avarohanam}
                        sa={sa}
                        instruction={`Step 3: Listen to the descending ${ragaName} scale (Avarohanam).`}
                        onDone={() => { setPhase('sing_ava_notes'); setSingIdx(0); }}
                    />
                )}

                {phase === 'sing_ava_notes' && (
                    <ExerciseSing
                        key={`sing-ava-${singIdx}`}
                        swara={avarohanam[singIdx]}
                        sa={sa}
                        instruction={`Step 4: Sing note ${singIdx + 1} of ${avarohanam.length} (Avarohanam Descending)`}
                        onDone={handleSingAvaDone}
                    />
                )}

                {phase === 'sing_aro_seq' && (
                    <ExerciseSingSequence
                        key="sing-seq-aro"
                        swaras={arohanam}
                        sa={sa}
                        instruction="Step 5: Sing the entire Arohanam sequence in one continuous, metered flow!"
                        onDone={() => setPhase('sing_ava_seq')}
                    />
                )}

                {phase === 'sing_ava_seq' && (
                    <ExerciseSingSequence
                        key="sing-seq-ava"
                        swaras={avarohanam}
                        sa={sa}
                        instruction="Step 6: Sing the entire Avarohanam sequence in one continuous, metered flow!"
                        onDone={() => setPhase('sing_full_seq')}
                    />
                )}

                {phase === 'sing_full_seq' && (
                    <ExerciseSingSequence
                        key="sing-seq-full"
                        swaras={fullScale}
                        sa={sa}
                        instruction="Step 7: The Ultimate Scale Challenge! Sing the entire scale ascending and descending back-to-back!"
                        onDone={() => {
                            setPassedFullSeq(true);
                            initQuiz();
                            setPhase('quiz');
                        }}
                    />
                )}

                {phase === 'quiz' && (
                    <div className="flex flex-col items-center gap-5 w-full max-w-sm bg-c-surface border border-c-border rounded-2xl p-6 text-center animate-fade-in">
                        <span className="text-3xl">🧠</span>
                        <h4 className="font-playfair text-lg text-c-gold font-bold">Step 8: Ear Challenge Test</h4>
                        <p className="text-xs text-c-cream-dark leading-relaxed">
                            Identify the swara pitch played from the scale of {ragaName}!
                        </p>
                        
                        <button onClick={playQuizNote}
                                className="px-6 py-2 bg-c-gold text-c-bg rounded-full text-xs font-bold font-playfair hover:opacity-90 transition-opacity my-2 flex items-center gap-1.5 justify-center mx-auto">
                            <span>🔈</span> Hear Note
                        </button>

                        <div className="flex justify-center gap-2.5 w-full mt-2">
                            {quizChoices.map(c => {
                                const isSelected = selectedQuizChoice === c;
                                const isCorrect = c === quizNote;
                                let btnStyle = "border-c-border text-c-cream-dim hover:border-c-gold/45 bg-c-bg";
                                if (quizAnswered) {
                                    if (isCorrect) btnStyle = "bg-emerald-850/15 border-emerald-800/30 text-emerald-850 font-bold";
                                    else if (isSelected) btnStyle = "bg-rose-950/15 border-rose-800/30 text-rose-850 font-bold";
                                    else btnStyle = "opacity-40 border-c-border text-c-cream-dark";
                                } else if (isSelected) {
                                    btnStyle = "border-c-gold text-c-gold bg-c-gold/5";
                                }
                                
                                return (
                                    <button key={c}
                                            disabled={quizAnswered}
                                            onClick={() => {
                                                setSelectedQuizChoice(c);
                                                setQuizAnswered(true);
                                            }}
                                            className={`flex-1 py-3 border rounded-xl text-sm font-mono transition-all ${btnStyle}`}>
                                        {c}
                                    </button>
                                );
                            })}
                        </div>

                        {quizAnswered && (
                            <div className="mt-4 animate-fade-in w-full">
                                <p className={`text-sm font-bold ${selectedQuizChoice === quizNote ? 'text-emerald-850' : 'text-rose-850'}`}>
                                    {selectedQuizChoice === quizNote ? '🎉 Spot on! Correct answer!' : `❌ Almost! That was actually ${quizNote}.`}
                                </p>
                                <button onClick={() => {
                                            if (!passedFullSeq) {
                                                alert("To graduate and unlock the final trophy, you must successfully sing and pass the Scale Flow (Step 7)!");
                                                return;
                                            }
                                            setPhase('done');
                                        }}
                                        className="px-8 py-2.5 bg-c-gold text-c-bg rounded-full text-xs font-bold font-playfair hover:opacity-95 transition-opacity mt-4 w-full">
                                    Finish & Graduate
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {phase === 'done' && (
                    <div className="flex flex-col items-center gap-5 animate-fade-in text-center">
                        <div className="w-16 h-16 rounded-full border border-c-gold/40 bg-c-gold-faint flex items-center justify-center text-c-gold text-2xl shadow-lg shadow-c-gold/10">🏆</div>
                        <div>
                            <p className="font-playfair text-xl text-c-gold font-bold">Raga Mastered!</p>
                            <p className="text-xs text-c-cream-dark mt-1 font-playfair italic">{raga.mood && `${raga.mood} · `}{raga.type}</p>
                            <p className="text-xs text-c-cream-dim mt-2 max-w-xs leading-relaxed mx-auto">
                                Incredible work! You've successfully heard, sung, sequenced, and ear-identified the notes of {ragaName}.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 mt-1 w-full max-w-sm text-left">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-c-gold/60 uppercase font-mono tracking-wider">Arohanam (Ascending):</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {arohanam.map((n, i) => (
                                        <span key={i} className="px-2 py-1 rounded border border-c-gold/30 text-xs font-mono text-c-gold bg-c-gold/5">{n}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-c-gold/60 uppercase font-mono tracking-wider">Avarohanam (Descending):</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {avarohanam.map((n, i) => (
                                        <span key={i} className="px-2 py-1 rounded border border-c-gold/30 text-xs font-mono text-c-gold bg-c-gold/5">{n}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button onClick={() => { setPhase('listen_aro'); setSingIdx(0); }}
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
            {(phase === 'sing_aro_notes' || phase === 'sing_ava_notes') && (
                <div className="flex justify-center gap-1.5">
                    {(phase === 'sing_aro_notes' ? arohanam : avarohanam).map((n, i) => (
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
    const [masteredRagas, setMasteredRagas] = useState([]);

    useEffect(() => {
        const loadMastered = () => {
            try {
                const list = JSON.parse(localStorage.getItem('mastered_ragas') || '[]');
                setMasteredRagas(list);
            } catch {}
        };
        loadMastered();
        window.addEventListener('localStorage-mastered-ragas-updated', loadMastered);
        return () => window.removeEventListener('localStorage-mastered-ragas-updated', loadMastered);
    }, []);

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
            <div className="bg-c-gold-faint border border-c-gold/30 p-3 rounded-lg flex gap-3 items-start mb-2">
                <span className="text-c-gold mt-0.5">ℹ️</span>
                <p className="text-xs text-c-cream-dim leading-relaxed">
                    This section is for users who are already well-versed and want to practice different raagams. Beginners should complete the Curriculum first!
                </p>
            </div>
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
                {filtered.map(([name, data]) => {
                    const isMastered = masteredRagas.includes(name);
                    return (
                        <button key={name} onClick={() => setSelected([name, data])}
                                className={`text-left flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300 ${
                                    isMastered 
                                    ? 'border-emerald-800/35 bg-emerald-900/[0.05] shadow-md shadow-emerald-900/5 hover:border-emerald-700' 
                                    : 'border-c-border bg-c-surface hover:border-c-gold/40'
                                }`}>
                            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                                isMastered 
                                ? 'bg-emerald-700 shadow-sm shadow-emerald-700/60 scale-110' 
                                : ''
                            }`} style={isMastered ? undefined : { background: colorMap[data.color] || '#5c1a0a' }} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className={`font-playfair text-sm truncate ${isMastered ? 'text-emerald-900 font-extrabold' : 'text-c-cream'}`}>{name}</span>
                                    {isMastered && (
                                        <span className="text-[9px] bg-emerald-800/10 text-emerald-800 border border-emerald-800/20 px-1.5 py-0.5 rounded-full font-sans tracking-wide uppercase flex items-center gap-0.5 select-none scale-90 font-bold">
                                            <span>🏆</span> Mastered
                                        </span>
                                    )}
                                </div>
                                <div className={`text-[10px] truncate ${isMastered ? 'text-emerald-800/70 font-semibold' : 'text-c-cream-dark'}`}>{data.type}{data.mood ? ` · ${data.mood}` : ''}</div>
                            </div>
                            <span className={`text-xs transition-colors ${isMastered ? 'text-emerald-800 font-bold' : 'text-c-cream-dark'}`}>→</span>
                        </button>
                    );
                })}
            </div>
            {filtered.length === 0 && (
                <p className="text-c-cream-dark text-sm font-playfair italic text-center py-8">No ragas match "{search}"</p>
            )}
        </div>
    );
}

// ─── Curriculum home ──────────────────────────────────────────────────────────

function CurriculumHome({ progress, isUnlocked, onSelectUnit, onReset }) {
    let totalLessons = 0;
    let completedLessons = 0;
    CURRICULUM.forEach(u => {
        totalLessons += u.lessons.length;
        u.lessons.forEach(l => {
            if (progress[`${u.id}/${l.id}`]) completedLessons++;
        });
    });

    return (
        <div className="w-full max-w-2xl flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 mb-2 bg-c-surface p-4 rounded-xl border border-c-border">
                <div className="flex justify-between items-end">
                    <span className="font-playfair text-c-gold">Your Journey</span>
                    <span className="text-[10px] text-c-cream-dim font-mono">{completedLessons}/{totalLessons} Lessons</span>
                </div>
                <div className="w-full h-2 bg-c-bg rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${totalLessons ? (completedLessons/totalLessons)*100 : 0}%` }} />
                </div>
            </div>
            
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
            
            {completedLessons > 0 && (
                <button onClick={onReset} className="mt-4 py-2 text-xs text-c-cream-dim hover:text-red-400 transition-colors">
                    Reset Progress
                </button>
            )}
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
                            <div className="flex-1 min-w-0">
                                <div className="font-playfair text-sm text-c-cream">{lesson.title}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    {lesson.tag && <span className="text-[9px] px-1.5 py-0.5 rounded bg-c-border/40 text-c-cream-dark uppercase tracking-wide">{lesson.tag}</span>}
                                    <span className="text-[10px] text-c-cream-dark">{lesson.exercises.length} exercises</span>
                                </div>
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
    const [sa, setSa] = useState(() => {
        try {
            return Number(localStorage.getItem('tutor_base_sa') || saFrequency || 261.63);
        } catch {
            return saFrequency || 261.63;
        }
    });
    
    const [tunerOpen, setTunerOpen] = useState(false);
    const [tab, setTab]         = useState('curriculum'); // curriculum | practice
    const [screen, setScreen]   = useState('home');       // home | unit | lesson
    const [activeUnit, setActiveUnit]     = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [progress, setProgress] = useState(() => {
        try { return JSON.parse(localStorage.getItem('tutor_progress_v2') || '{}'); } catch { return {}; }
    });

    const updateSa = (newSa) => {
        setSa(newSa);
        try {
            localStorage.setItem('tutor_base_sa', String(newSa));
        } catch {}
    };

    const getWesternNoteName = (freq) => {
        if (!freq || freq <= 0) return 'Unknown';
        const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const midi = Math.round(69 + 12 * Math.log2(freq / 440));
        const noteName = NOTES[((midi % 12) + 12) % 12];
        const octave = Math.floor(midi / 12) - 1;
        return `${noteName}${octave}`;
    };

    const saveProgress = (unitId, lessonId) => {
        const next = { ...progress, [`${unitId}/${lessonId}`]: true };
        setProgress(next);
        localStorage.setItem('tutor_progress_v2', JSON.stringify(next));
    };
    
    const resetProgress = () => {
        if(window.confirm('Are you sure you want to reset your entire progress?')) {
            setProgress({});
            localStorage.setItem('tutor_progress_v2', '{}');
        }
    };

    const isUnlocked = (unitIdx) => {
        if (unitIdx === 0) return true;
        const prev = CURRICULUM[unitIdx - 1];
        return prev.lessons.every(l => progress[`${prev.id}/${l.id}`]);
    };

    return (
        <div className="w-full px-4 md:px-8 py-8 flex flex-col items-center gap-6 animate-fade-in">

            {/* Base Sa (Shruti) quick setup bar */}
            {screen === 'home' && (
                <div className="w-full max-w-2xl bg-c-surface border border-c-border/60 rounded-xl p-3.5 flex flex-col gap-3 transition-all duration-300 shadow-sm relative overflow-hidden heritage-card">
                    <div className="heritage-border-corner heritage-corner-tl" style={{ top: 2, left: 2 }} />
                    <div className="heritage-border-corner heritage-corner-tr" style={{ top: 2, right: 2 }} />
                    <div className="heritage-border-corner heritage-corner-bl" style={{ bottom: 2, left: 2 }} />
                    <div className="heritage-border-corner heritage-corner-br" style={{ bottom: 2, right: 2 }} />
                    
                    <div className="flex items-center justify-between z-10">
                        <div className="flex items-center gap-2.5">
                            <span className="text-lg">🎼</span>
                            <div>
                                <div className="text-[9px] text-c-cream-dark uppercase tracking-widest font-mono font-extrabold">Your Custom Base Sa (Shruti)</div>
                                <div className="text-sm font-playfair font-black text-c-gold">
                                    {getWesternNoteName(sa)} <span className="font-sans text-[11px] font-normal text-c-cream-dim">({sa} Hz)</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            type="button"
                            onClick={() => setTunerOpen(!tunerOpen)}
                            className="px-4 py-1 text-xs border border-c-gold/40 text-c-gold rounded-full hover:bg-c-gold hover:text-c-bg font-playfair font-bold transition-all z-20"
                        >
                            {tunerOpen ? 'Close Tuner' : '🔧 Adjust Shruti'}
                        </button>
                    </div>
                    
                    {tunerOpen && (
                        <div className="border-t border-c-border/20 pt-4 pb-2 animate-fade-in flex justify-center z-10">
                            <ExerciseShrutiSetup 
                                sa={sa}
                                setSa={updateSa}
                                onDone={() => setTunerOpen(false)}
                                instruction="Set your base pitch using the calibrator below."
                            />
                        </div>
                    )}
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
                            onReset={resetProgress}
                        />
                    ) : (
                        <RagaPractice sa={sa} setSa={updateSa} />
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
                    setSa={updateSa}
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
