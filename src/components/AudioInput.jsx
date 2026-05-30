import { useEffect, useRef, useState } from 'react';
import { PlayIcon, StopIcon } from './IconLibrary';
import { detectPitch, muteAppAudio, unmuteAppAudio } from '../utils/audioUtils';


const STATUS = {
  READY:    'ready',
  LOADING:  'loading',
  SLOW:     'slow',
  ERROR:    'error',
  LISTENING:'listening',
  NO_PITCH: 'no_pitch',
};

const AudioInput = ({ onPitchDetected, onSaSet, saFrequency, onStart }) => {
    const [stream, setStream]         = useState(null);
    const [status, setStatus]         = useState(STATUS.READY);
    const [statusMsg, setStatusMsg]   = useState('');
    const [currentFreq, setCurrentFreq] = useState(0);
    const [activePreset, setActivePreset] = useState(null);

    const onPitchDetectedRef = useRef(onPitchDetected);
    const activeOscRef = useRef(null);

    useEffect(() => { onPitchDetectedRef.current = onPitchDetected; }, [onPitchDetected]);
    useEffect(() => {
        return () => {
            stopReferenceTone();
            clearInterval(intervalRef.current);
            unmuteAppAudio();
        };
    }, []);

    const playReferenceTone = (freq) => {
        stopReferenceTone();
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            
            gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.1);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            
            activeOscRef.current = { osc, gain, ctx: audioCtx };
        } catch (e) {
            console.error(e);
        }
    };

    const stopReferenceTone = () => {
        if (activeOscRef.current) {
            const { osc, gain, ctx } = activeOscRef.current;
            try {
                gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
                setTimeout(() => {
                    try {
                        osc.stop();
                        ctx.close();
                    } catch(e){}
                }, 200);
            } catch(e){}
            activeOscRef.current = null;
        }
    };

    const startAudio = async () => {
        try {
            // Mute drone/notes before opening mic so they don't bleed into detection.
            muteAppAudio();
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const resumePromise = audioCtx.state === 'suspended' ? audioCtx.resume() : Promise.resolve();

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
            });

            await resumePromise;

            setStream(mediaStream);
            onStart?.();
            startPitchDetection(audioCtx, mediaStream);
        } catch (err) {
            setStatus(STATUS.ERROR);
            setStatusMsg(err.name === 'NotAllowedError'
                ? 'Microphone access denied  ·  please allow mic access and try again.'
                : err.message || String(err));
        }
    };

    const intervalRef = useRef(null);

    const startPitchDetection = (audioCtx, mediaStream) => {
        setStatus(STATUS.LISTENING);
        setStatusMsg('Sing or hum clearly');

        const source = audioCtx.createMediaStreamSource(mediaStream);
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 2.5;
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 4096;
        analyser.smoothingTimeConstant = 0;
        source.connect(gainNode);
        gainNode.connect(analyser);

        intervalRef.current = setInterval(() => {
            const hz = detectPitch(analyser, audioCtx.sampleRate);
            if (hz) {
                setCurrentFreq(hz);
                onPitchDetectedRef.current?.(hz);
                setStatus(STATUS.LISTENING);
                setStatusMsg('Sing or hum clearly');
            } else {
                setStatus(STATUS.NO_PITCH);
                setStatusMsg('No pitch detected  ·  try singing louder');
            }
        }, 80);
    };

    const handleSetSa = () => {
        if (currentFreq > 0) onSaSet(currentFreq);
    };

    const isListening = status === STATUS.LISTENING;
    const isNoPitch   = status === STATUS.NO_PITCH;

    const barColor = status === STATUS.ERROR ? 'bg-red-800'
        : isListening ? 'bg-c-gold-dim'
        : 'bg-c-border';

    const msgClass = {
        [STATUS.ERROR]:    'text-red-400',
        [STATUS.LISTENING]:'text-c-cream-dim',
        [STATUS.LOADING]:  'text-c-gold-dim',
        [STATUS.SLOW]:     'text-c-gold-dim',
        [STATUS.NO_PITCH]: 'text-c-cream-dark',
    }[status] || 'text-c-cream-dark';

    const displayMsg = {
        [STATUS.READY]:    '',
        [STATUS.LOADING]:  'Loading pitch model…',
        [STATUS.SLOW]:     'Still loading  ·  may take a minute on the first visit',
        [STATUS.ERROR]:    statusMsg,
        [STATUS.LISTENING]: saFrequency ? 'Listening  ·  sing freely, let the notes come' : 'Listening  ·  hum your Sa, let it settle',
        [STATUS.NO_PITCH]: 'Nothing yet  ·  come a little closer to the mic',
    }[status] || statusMsg;

    return (
        <div className="w-full border border-c-border bg-c-surface rounded-xl overflow-hidden">
            <div className="border-b border-c-border px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-c-gold/40 text-xs">♩</span>
                    <h2 className="font-playfair text-sm text-c-cream-dim italic">Pitch Detection</h2>
                </div>
                {/* 7-bar waveform  ·  one bar per swaram */}
                {stream && (
                    <div className={`flex items-end gap-[3px] h-5 ${isListening && !isNoPitch ? 'wave-active' : ''}`}>
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className={`wave-bar ${barColor}`} />
                        ))}
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col items-center gap-5">
                {!stream ? (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <p className="text-c-cream-dark text-sm text-center max-w-xs font-playfair italic">
                            Allow mic access and hum your Sa  ·  or choose a preset below:
                        </p>
                        <button
                            onClick={startAudio}
                            className="px-8 py-2.5 bg-c-gold hover:bg-c-gold-light active:scale-95 text-c-bg font-semibold text-sm rounded transition-all"
                        >
                            Start Microphone
                        </button>

                        <div className="w-full flex items-center gap-2 mt-2">
                            <div className="flex-1 h-px bg-c-border/40" />
                            <span className="text-[10px] uppercase tracking-widest text-c-cream-dark/60 font-mono">Reference Presets</span>
                            <div className="flex-1 h-px bg-c-border/40" />
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 w-full">
                            {[
                                { label: 'Gents (C / 130.8 Hz)', freq: 130.81 },
                                { label: 'Ladies (G / 196.0 Hz)', freq: 196.00 },
                                { label: 'Ladies (G# / 207.7 Hz)', freq: 207.65 },
                            ].map((preset) => {
                                const isPlaying = activePreset === preset.freq;
                                return (
                                    <div key={preset.freq} className="flex flex-col gap-1 items-center bg-c-card/25 border border-c-border/30 rounded-lg p-2.5 w-[140px] sm:w-[150px] transition-all">
                                        <span className="text-[10px] font-bold text-c-cream font-mono text-center">{preset.label.split(' ')[0]} Key</span>
                                        <span className="text-[8px] text-c-cream-dark font-mono text-center">({preset.label.split('(')[1].split(')')[0]})</span>
                                        <div className="flex gap-1.5 w-full mt-2">
                                            <button
                                                onClick={() => {
                                                    if (isPlaying) {
                                                        stopReferenceTone();
                                                        setActivePreset(null);
                                                    } else {
                                                        playReferenceTone(preset.freq);
                                                        setActivePreset(preset.freq);
                                                    }
                                                }}
                                                className={`flex-1 py-1 text-[9px] font-mono rounded transition-colors ${
                                                    isPlaying 
                                                        ? 'bg-red-800 text-c-bg' 
                                                        : 'bg-c-surface text-c-cream-dim hover:bg-c-gold-faint border border-c-border/40'
                                                }`}
                                            >
                                                <div className="flex items-center justify-center gap-1">
                                                    {isPlaying ? <><StopIcon className="w-2.5 h-2.5" /> Stop</> : <><PlayIcon className="w-2.5 h-2.5" /> Hear</>}
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    stopReferenceTone();
                                                    setActivePreset(null);
                                                    onSaSet(preset.freq);
                                                }}
                                                className="flex-1 py-1 text-[9px] bg-c-gold hover:bg-c-gold-light text-c-bg font-bold rounded transition-all active:scale-95"
                                            >
                                                Select
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-5 w-full">
                        {/* Status message */}
                        <p className={`text-xs ${msgClass} font-playfair italic text-center`}>{displayMsg}</p>

                        {/* Frequency */}
                        <div className="text-center">
                            <div className="font-playfair text-5xl text-c-cream tabular-nums">
                                {currentFreq ? currentFreq.toFixed(1) : ' · '}
                            </div>
                            {currentFreq > 0 && (
                                <div className="text-c-cream-dark text-xs mt-1 tracking-widest uppercase">Hz</div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="w-full flex items-center gap-2">
                            <div className="flex-1 h-px bg-c-border" />
                            <span className="text-c-border text-[8px]">◆</span>
                            <div className="flex-1 h-px bg-c-border" />
                        </div>

                        {/* Set Sa */}
                        <div className="flex flex-col items-center gap-2 w-full">
                            {!saFrequency ? (
                                <>
                                    <p className="text-[11px] text-c-cream-dark text-center max-w-[220px] font-playfair italic">
                                        Hum your Sa  ·  your root, your home note  ·  then lock it in:
                                    </p>
                                    <button
                                        onClick={handleSetSa}
                                        disabled={!currentFreq}
                                        className="px-6 py-2 border border-c-gold/50 hover:border-c-gold hover:bg-c-gold-faint disabled:opacity-25 disabled:cursor-not-allowed text-c-gold text-sm rounded transition-all"
                                    >
                                        Set as Sa
                                    </button>

                                    <div className="w-full flex items-center gap-2 mt-4">
                                        <div className="flex-1 h-px bg-c-border/40" />
                                        <span className="text-[10px] uppercase tracking-widest text-c-cream-dark/60 font-mono">Or Use Reference Preset</span>
                                        <div className="flex-1 h-px bg-c-border/40" />
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-2 w-full mt-1">
                                        {[
                                            { label: 'Gents (C / 130.8 Hz)', freq: 130.81 },
                                            { label: 'Ladies (G / 196.0 Hz)', freq: 196.00 },
                                            { label: 'Ladies (G# / 207.7 Hz)', freq: 207.65 },
                                        ].map((preset) => {
                                            const isPlaying = activePreset === preset.freq;
                                            return (
                                                <div key={preset.freq} className="flex items-center gap-1.5 bg-c-card/20 border border-c-border/30 rounded-lg p-1.5 transition-all">
                                                    <button
                                                        onClick={() => {
                                                            if (isPlaying) {
                                                                stopReferenceTone();
                                                                setActivePreset(null);
                                                            } else {
                                                                playReferenceTone(preset.freq);
                                                                setActivePreset(preset.freq);
                                                            }
                                                        }}
                                                        className={`px-2 py-1 text-[9px] font-mono rounded transition-colors ${
                                                            isPlaying 
                                                                ? 'bg-red-800 text-c-bg' 
                                                                : 'bg-c-surface text-c-cream-dim hover:bg-c-gold-faint border border-c-border/40'
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            {isPlaying ? <StopIcon className="w-2.5 h-2.5" /> : <PlayIcon className="w-2.5 h-2.5" />}
                                                            {preset.label.split(' ')[0]}
                                                        </div>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            stopReferenceTone();
                                                            setActivePreset(null);
                                                            onSaSet(preset.freq);
                                                        }}
                                                        className="px-2 py-1 text-[9px] bg-c-gold hover:bg-c-gold-light text-c-bg font-bold rounded transition-colors"
                                                    >
                                                        Use
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <span className="text-c-gold/40 text-xs">◆</span>
                                    <p className="text-xs text-c-cream-dark font-playfair italic">
                                        Sa is home at <span className="text-c-gold-dim not-italic font-mono">{saFrequency.toFixed(2)} Hz</span>
                                    </p>
                                    <button
                                        onClick={() => {
                                            stopReferenceTone();
                                            setActivePreset(null);
                                            onSaSet(0);
                                        }}
                                        className="text-[10px] text-c-cream-dark hover:text-c-gold disabled:opacity-25 underline underline-offset-2 transition-colors"
                                    >
                                        reset
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudioInput;
