import { useEffect, useRef, useState } from 'react';

// ml5 is loaded as a global via <script> tag in index.html
/* global ml5 */

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

    const onPitchDetectedRef = useRef(onPitchDetected);
    useEffect(() => { onPitchDetectedRef.current = onPitchDetected; }, [onPitchDetected]);

    const startAudio = async () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
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

    const startPitchDetection = (audioCtx, mediaStream) => {
        const modelUrl = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
        setStatus(STATUS.LOADING);
        setStatusMsg('Loading pitch model…');

        const slowTimer = setTimeout(() => {
            setStatus(s => s === STATUS.LOADING ? STATUS.SLOW : s);
            setStatusMsg('Still loading  ·  may take a minute on first visit');
        }, 10000);

        try {
            ml5.pitchDetection(modelUrl, audioCtx, mediaStream, (err, model) => {
                clearTimeout(slowTimer);
                if (err) {
                    setStatus(STATUS.ERROR);
                    setStatusMsg(`Model error: ${err.message || err}`);
                    return;
                }
                setStatus(STATUS.LISTENING);
                setStatusMsg('Sing or hum clearly');
                getPitch(model);
            });
        } catch (err) {
            clearTimeout(slowTimer);
            setStatus(STATUS.ERROR);
            setStatusMsg(`ml5 error: ${err.message}`);
        }
    };

    const getPitch = (model) => {
        model.getPitch((_, frequency) => {
            if (frequency) {
                setCurrentFreq(frequency);
                onPitchDetectedRef.current?.(frequency);
                setStatus(STATUS.LISTENING);
                setStatusMsg('Sing or hum clearly');
            } else {
                setStatus(STATUS.NO_PITCH);
                setStatusMsg('No pitch detected  ·  try singing louder');
            }
            getPitch(model);
        });
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
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-c-cream-dark text-sm text-center max-w-xs font-playfair italic">
                            Allow mic access, then hum your Sa  ·  make it feel like home.
                        </p>
                        <button
                            onClick={startAudio}
                            className="px-8 py-2.5 bg-c-gold hover:bg-c-gold-light active:scale-95 text-c-bg font-semibold text-sm rounded transition-all"
                        >
                            Start Microphone
                        </button>
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
                        <div className="flex flex-col items-center gap-2">
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
                                </>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <span className="text-c-gold/40 text-xs">◆</span>
                                    <p className="text-xs text-c-cream-dark font-playfair italic">
                                        Sa is home at <span className="text-c-gold-dim not-italic font-mono">{saFrequency.toFixed(2)} Hz</span>
                                    </p>
                                    <button
                                        onClick={handleSetSa}
                                        disabled={!currentFreq}
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
