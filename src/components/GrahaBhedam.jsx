import { useState, useRef, useEffect, useMemo } from 'react';
import { RAGAS, toSargam } from '../utils/ragaLogic';
import { SWARA_SEMITONE, SEMITONE_TO_SWARA, playSequence } from '../utils/audioUtils';

const ragaNames = Object.keys(RAGAS).sort();

const PITCH_MAP = {
    0: { name: 'C4', freq: '261.6 Hz' },
    1: { name: 'C#4', freq: '277.2 Hz' },
    2: { name: 'D4', freq: '293.7 Hz' },
    3: { name: 'D#4', freq: '311.1 Hz' },
    4: { name: 'E4', freq: '329.6 Hz' },
    5: { name: 'F4', freq: '349.2 Hz' },
    6: { name: 'F#4', freq: '370.0 Hz' },
    7: { name: 'G4', freq: '392.0 Hz' },
    8: { name: 'G#4', freq: '415.3 Hz' },
    9: { name: 'A4', freq: '440.0 Hz' },
    10: { name: 'A#4', freq: '466.2 Hz' },
    11: { name: 'B4', freq: '493.9 Hz' },
    12: { name: 'C5', freq: '523.3 Hz' },
};

/**
 * Given a raga's arohanam, compute intervals (semitone distances from Sa).
 * Returns a Set of intervals like {0, 2, 4, 5, 7, 9, 11}.
 */
function getIntervalSet(arohanam) {
    const intervals = new Set();
    for (const note of arohanam) {
        const semi = SWARA_SEMITONE[note];
        if (semi !== undefined) intervals.add(semi);
    }
    return intervals;
}

/**
 * Shift a set of intervals so that `shiftSemitone` becomes the new 0 (Sa).
 * Returns a new Set of intervals modulo 12.
 */
function shiftIntervals(intervalSet, shiftSemitone) {
    const shifted = new Set();
    for (const semi of intervalSet) {
        shifted.add((semi - shiftSemitone + 12) % 12);
    }
    return shifted;
}

/**
 * Check if two interval sets are equal.
 */
function setsEqual(a, b) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
}

/**
 * Build the shifted arohanam note names from shifted intervals.
 */
function intervalsToScale(intervalSet) {
    return [...intervalSet].sort((a, b) => a - b).map(s => SEMITONE_TO_SWARA[s] || `?${s}`);
}

export default function GrahaBhedam() {
    const [selectedRaga, setSelectedRaga] = useState(ragaNames[0]);
    const [playingShift, setPlayingShift] = useState(null);
    const [gamakamEnabled, setGamakamEnabled] = useState(false);
    const [playbackMode, setPlaybackMode] = useState('theoretical'); // 'theoretical' | 'vocal'
    const abortRef = useRef(null);

    useEffect(() => {
        return () => { if (abortRef.current) abortRef.current(); };
    }, []);

    const raga = RAGAS[selectedRaga];
    const arohanam = raga?.arohanam || [];

    // All interval sets in the library for matching
    const libraryIntervalSets = useMemo(() => {
        const map = {};
        for (const [name, r] of Object.entries(RAGAS)) {
            map[name] = getIntervalSet(r.arohanam);
        }
        return map;
    }, []);

    const sourceIntervals = useMemo(() => getIntervalSet(arohanam), [arohanam]);

    const shiftNotes = useMemo(() => {
        const seen = new Set();
        return arohanam.filter(n => {
            if (n === 'Sa' || seen.has(n)) return false;
            seen.add(n);
            return true;
        });
    }, [arohanam]);

    const shifts = useMemo(() => {
        return shiftNotes.map(note => {
            const shiftSemi = SWARA_SEMITONE[note];
            const shifted = shiftIntervals(sourceIntervals, shiftSemi);
            const newScale = intervalsToScale(shifted);

            const matches = [];
            for (const [name, iSet] of Object.entries(libraryIntervalSets)) {
                if (setsEqual(shifted, iSet)) {
                    matches.push(name);
                }
            }

            // Use the matched raga's official arohanam if available for perfect nomenclature
            let displayScale = newScale;
            if (matches.length > 0) {
                const matchRaga = RAGAS[matches[0]];
                if (matchRaga && matchRaga.arohanam) {
                    // Normalize the library arohanam: ensure it starts with Sa and has no trailing Sa
                    // (The playback logic will handle adding the final high Sa)
                    const libraryNotes = matchRaga.arohanam.filter(n => n !== 'Sa');
                    displayScale = ['Sa', ...libraryNotes];
                }
            }

            return {
                shiftNote: note,
                shiftSemi,
                newScale: displayScale,
                matches,
            };
        });
    }, [shiftNotes, sourceIntervals, libraryIntervalSets]);

    const handlePlayOriginal = async () => {
        if (abortRef.current) abortRef.current();
        setPlayingShift('original');

        const { promise, abort } = playSequence(arohanam, 261.63, {
            gapMs: 600,
            duration: 0.55,
            gamakam: gamakamEnabled,
            onNote: () => {},
        });
        abortRef.current = abort;
        await promise;
        setPlayingShift(null);
    };

    const handlePlayShifted = async (shiftEntry) => {
        if (abortRef.current) abortRef.current();
        setPlayingShift(shiftEntry.shiftNote);

        // Ensure the playback starts at Sa and ends at high Sa
        const playbackNotes = [...shiftEntry.newScale];
        if (playbackNotes[playbackNotes.length - 1] !== 'Sa') {
            playbackNotes.push('Sa');
        }

        // Calculate absolute frequency if in theoretical/absolute keys mode, or home Sa if in vocal alignment!
        const finalSaHz = playbackMode === 'theoretical'
            ? 261.63 * Math.pow(2, shiftEntry.shiftSemi / 12)
            : 261.63;

        const { promise, abort } = playSequence(playbackNotes, finalSaHz, {
            gapMs: 600,
            duration: 0.55,
            gamakam: gamakamEnabled,
            onNote: () => {},
        });
        abortRef.current = abort;
        await promise;
        setPlayingShift(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-8 sm:space-y-10 relative z-10">
            {/* Header section with simplified explanation */}
            <div className="text-center space-y-4">
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-c-gold tracking-tight">Graha Bhedam</h2>
                <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-12 bg-c-gold/30" />
                    <p className="text-c-cream-dim text-sm italic font-playfair tracking-wide uppercase">The Art of Modal Shifting</p>
                    <div className="h-px w-12 bg-c-gold/30" />
                </div>
                <p className="text-c-cream-dark text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-playfair opacity-80">
                    Imagine taking a melody and simply changing which note you call "Home" (Sa). 
                    Suddenly, a familiar raagam transforms into an entirely new one.
                </p>

                {/* Control Panel: Gamakam and Playback Mode selectors */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-4 pb-2 border-t border-b border-c-border/30 max-w-2xl mx-auto">
                    {/* Gamakam Toggle */}
                    <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[9px] text-c-gold font-bold uppercase tracking-[0.2em] opacity-70">Aesthetic Ornamentation</span>
                        <div
                            onClick={() => setGamakamEnabled(g => !g)}
                            className="flex items-center gap-3.5 cursor-pointer select-none bg-c-card/35 border border-c-border/40 px-4 py-2 rounded-full hover:border-c-gold/40 hover:bg-c-card/60 transition-all duration-300 shadow-sm"
                        >
                            <span className={`text-[9px] uppercase tracking-wider font-bold transition-all duration-300 ${
                                !gamakamEnabled ? 'text-c-gold opacity-100' : 'text-c-cream-dark opacity-40'
                            }`}>
                                Simple
                            </span>
                            <div className={`relative w-10 h-5 rounded-full overflow-hidden transition-all duration-300 flex-shrink-0 border shadow-inner pointer-events-none ${
                                gamakamEnabled
                                    ? 'bg-c-gold/20 border-c-gold'
                                    : 'bg-transparent border-c-gold/30'
                            }`}>
                                <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                                    gamakamEnabled
                                        ? 'left-5.5 bg-c-gold'
                                        : 'left-0.5 bg-c-cream-dark/60'
                                }`} />
                            </div>
                            <span className={`text-[9px] uppercase tracking-wider font-bold transition-all duration-300 ${
                                gamakamEnabled ? 'text-c-gold opacity-100' : 'text-c-cream-dark opacity-40'
                            }`}>
                                Gamakam
                            </span>
                        </div>
                    </div>

                    {/* Playback Mode Selector */}
                    <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[9px] text-c-gold font-bold uppercase tracking-[0.2em] opacity-70">Shift Playback Mode</span>
                        <div className="flex p-0.5 bg-c-card/45 border border-c-border/40 rounded-full shadow-inner">
                            <button
                                onClick={() => setPlaybackMode('theoretical')}
                                className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                    playbackMode === 'theoretical'
                                        ? 'bg-c-gold text-c-bg shadow-md'
                                        : 'text-c-cream-dim hover:text-c-gold'
                                }`}
                            >
                                Theoretical (Absolute Keys)
                            </button>
                            <button
                                onClick={() => setPlaybackMode('vocal')}
                                className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                    playbackMode === 'vocal'
                                        ? 'bg-c-gold text-c-bg shadow-md'
                                        : 'text-c-cream-dim hover:text-c-gold'
                                }`}
                            >
                                Vocal (Tonic Aligned)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-8">
                {/* Left: Source Selection */}
                <div className="space-y-6">
                    <div className="heritage-card rounded-xl p-8 space-y-6 shadow-2xl border border-c-gold/20">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="heritage-border-corner heritage-corner-tl" />
                            <div className="heritage-border-corner heritage-corner-br" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-c-gold font-bold uppercase tracking-[0.2em] opacity-70">Step 1 · Pick a Source</label>
                            <select
                                value={selectedRaga}
                                onChange={(e) => setSelectedRaga(e.target.value)}
                                className="w-full bg-c-bg border border-c-gold/40 text-c-gold font-playfair font-bold rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-1 focus:ring-c-gold transition-all"
                            >
                                {ragaNames.map((name) => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] text-c-gold font-bold uppercase tracking-[0.2em] opacity-70">Original scale</label>
                                <button
                                    onClick={handlePlayOriginal}
                                    className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${
                                        playingShift === 'original' ? 'text-emerald-400' : 'text-c-gold/60 hover:text-c-gold'
                                    }`}
                                >
                                    {playingShift === 'original' ? '● Playing' : '▶ Listen'}
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {arohanam.map((note, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 group">
                                        <span className="w-10 h-10 flex items-center justify-center rounded-full border border-c-gold/30 bg-c-gold/5 text-c-gold font-mono text-xs font-bold group-hover:bg-c-gold/10 transition-colors">
                                            {toSargam(note)}
                                        </span>
                                        <span className="text-[9px] text-c-cream-dark opacity-50 uppercase">{note}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hall of Fame - Educational */}
                    <div className="bg-c-card/50 border border-c-border p-6 rounded-xl space-y-4">
                        <div className="space-y-1">
                            <h4 className="text-c-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <span>✦</span> Hall of Fame
                            </h4>
                            <p className="text-[10px] text-c-cream-dark italic leading-tight">These famous pairs share the exact same notes, just starting on a different home note.</p>
                        </div>
                        <div className="space-y-3">
                            {[
                                { from: 'Dheerasankarabharanam', label: 'Shankarabharanam', to: 'Mechakalyani', labelTo: 'Kalyani', via: 'Ma1', desc: 'The most famous shift' },
                                { from: 'Mayamalavagowla', label: 'Mayamalavagowla', to: 'Rasikapriya', labelTo: 'Rasikapriya', via: 'Ri1', desc: 'A complex heritage shift' }
                            ].map((ex, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedRaga(ex.from)}
                                    className={`w-full text-left p-3 rounded-lg border transition-all group ${
                                        selectedRaga === ex.from 
                                            ? 'bg-c-gold/10 border-c-gold/50 shadow-md scale-[1.02]' 
                                            : 'bg-c-bg border-c-border hover:border-c-gold/40'
                                    }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-xs font-medium transition-colors ${selectedRaga === ex.from ? 'text-c-gold' : 'text-c-cream group-hover:text-c-gold'}`}>{ex.label}</span>
                                        <span className="text-[10px] text-c-gold/60">Start on {toSargam(ex.via)}</span>
                                    </div>
                                    <p className="text-[10px] text-c-cream-dark italic">Transforms into <span className="text-c-gold font-bold">{ex.labelTo}</span></p>
                                    <p className="text-[8px] text-c-cream-dark opacity-40 uppercase tracking-tighter mt-1">{ex.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Discoveries Table */}
                <div className="space-y-4">
                    <label className="text-[10px] text-c-gold font-bold uppercase tracking-[0.2em] opacity-70 ml-2">Step 2 · Explore the Shifts</label>
                    <div className="space-y-3">
                        {shifts.map((entry) => (
                            <div
                                key={entry.shiftNote}
                                className={`heritage-card rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-5 transition-all relative overflow-hidden group ${
                                    entry.matches.length > 0 
                                        ? 'border-c-gold/40 shadow-[0_0_20px_rgba(200,148,31,0.05)] bg-c-gold/5' 
                                        : 'border-c-border opacity-70 hover:opacity-100'
                                }`}
                            >
                                {/* Left: The Instruction */}
                                <div className="flex flex-col gap-1 min-w-[140px]">
                                    <span className="text-[9px] text-c-cream-dark font-bold uppercase tracking-wider">Treating</span>
                                    <div className="flex items-center gap-2">
                                        <span className="w-8 h-8 flex items-center justify-center rounded border border-c-gold bg-c-gold/10 text-c-gold font-mono text-sm font-bold">
                                            {toSargam(entry.shiftNote)}
                                        </span>
                                        <span className="text-c-cream-dim text-xs italic font-playfair">as Sa</span>
                                    </div>
                                    <div className="mt-1.5 animate-fade-in">
                                        {(() => {
                                            const pInfo = PITCH_MAP[entry.shiftSemi] || { name: 'C4', freq: '261.6 Hz' };
                                            if (playbackMode === 'theoretical') {
                                                return (
                                                    <span className="text-[8px] font-mono font-bold text-[#b8831a] bg-c-gold/15 border border-c-gold/20 px-1.5 py-0.5 rounded block text-center max-w-[110px] truncate shadow-sm">
                                                        🎯 {pInfo.name} ({pInfo.freq})
                                                    </span>
                                                );
                                            } else {
                                                return (
                                                    <span className="text-[8px] font-mono text-c-cream-dark/60 bg-c-bg border border-c-border/40 px-1.5 py-0.5 rounded block text-center max-w-[110px] truncate">
                                                        🏠 C4 (261.6 Hz)
                                                    </span>
                                                );
                                            }
                                        })()}
                                    </div>
                                </div>

                                {/* Center: The Result */}
                                <div className="flex-1 space-y-3 w-full">
                                    <div className="flex items-center gap-3">
                                        {entry.matches.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {entry.matches.map(m => (
                                                    <div key={m} className="animate-fade-in flex items-center gap-2">
                                                        <span className="text-emerald-400 text-lg">✦</span>
                                                        <span className="text-lg font-playfair text-white tracking-wide">{m}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-c-cream-dark font-playfair italic opacity-60">Resulting scale is unique...</span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {entry.newScale.map((note, i) => (
                                            <span key={i} className={`text-[10px] font-mono ${entry.matches.length > 0 ? 'text-c-gold' : 'text-c-cream/60'}`}>
                                                {toSargam(note)}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Action */}
                                <button
                                    onClick={() => handlePlayShifted(entry)}
                                    disabled={playingShift !== null}
                                    className={`w-full px-4 sm:px-5 py-2.5 rounded-full border text-xs font-playfair font-bold transition-all flex items-center justify-center gap-2 ${
                                        playingShift === entry.shiftNote
                                            ? 'bg-c-gold border-c-gold text-c-bg'
                                            : entry.matches.length > 0
                                                ? 'border-c-gold text-c-gold hover:bg-c-gold hover:text-c-bg shadow-sm'
                                                : 'border-c-border text-c-cream-dim hover:border-c-gold hover:text-c-gold'
                                    }`}
                                >
                                    {playingShift === entry.shiftNote ? (
                                        <>
                                            <span className="animate-pulse">●</span>
                                            <span>Playing…</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>▶</span>
                                            <span>Listen</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
