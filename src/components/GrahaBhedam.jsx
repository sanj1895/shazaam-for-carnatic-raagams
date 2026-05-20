import { useState, useRef, useEffect, useMemo } from 'react';
import { RAGAS, toSargam } from '../utils/ragaLogic';
import { SWARA_SEMITONE, SEMITONE_TO_SWARA, playSequence } from '../utils/audioUtils';
import { PlayIcon, StopIcon, CuratedIcon } from './IconLibrary';
import SketchyRule from './SketchyRule';

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
    const [explainerOpen, setExplainerOpen] = useState(false);
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
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 relative z-10">
            {/* Header with controls merged into one row */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Left: identity */}
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-c-card border border-c-gold/30 flex items-center justify-center text-c-gold shadow-md flex-shrink-0">
                        <CuratedIcon icon="bhedam" className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h2 className="font-playfair text-2xl font-bold tracking-wider text-c-gold uppercase leading-none">Graha Bhedam</h2>
                            <span className="text-[8px] uppercase tracking-widest bg-c-gold/15 text-c-gold px-2 py-0.5 rounded font-semibold border border-c-gold/20 leading-none">Modal Shift</span>
                        </div>
                        <p className="text-c-cream-dim text-[11px] mt-1 font-light leading-relaxed">
                            Shift which note you call Sa — watch one raga transform into another.
                        </p>
                    </div>
                </div>
                {/* Right: Controls */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-5 flex-shrink-0">
                    {/* Gamakam Toggle */}
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-[9px] text-c-gold font-bold uppercase tracking-[0.2em] opacity-70">Ornamentation</span>
                        <div
                            onClick={() => setGamakamEnabled(g => !g)}
                            className="flex items-center gap-2.5 cursor-pointer select-none bg-c-card/35 border border-c-border/40 px-3 py-1.5 rounded-full hover:border-c-gold/40 hover:bg-c-card/60 transition-all duration-300"
                        >
                            <span className={`text-[9px] uppercase tracking-wider font-bold transition-all duration-300 ${!gamakamEnabled ? 'text-c-gold opacity-100' : 'text-c-cream-dark opacity-40'}`}>Simple</span>
                            <div className={`relative w-8 h-4 rounded-full overflow-hidden transition-all duration-300 flex-shrink-0 border pointer-events-none ${gamakamEnabled ? 'bg-c-gold/20 border-c-gold' : 'bg-transparent border-c-gold/30'}`}>
                                <span className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 ${gamakamEnabled ? 'left-4 bg-c-gold' : 'left-0.5 bg-c-cream-dark/60'}`} />
                            </div>
                            <span className={`text-[9px] uppercase tracking-wider font-bold transition-all duration-300 ${gamakamEnabled ? 'text-c-gold opacity-100' : 'text-c-cream-dark opacity-40'}`}>Gamakam</span>
                        </div>
                    </div>
                    {/* Playback Mode */}
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-[9px] text-c-gold font-bold uppercase tracking-[0.2em] opacity-70">Playback</span>
                        <div className="flex p-0.5 bg-c-card/45 border border-c-border/40 rounded-full shadow-inner">
                            <button
                                onClick={() => setPlaybackMode('theoretical')}
                                className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${playbackMode === 'theoretical' ? 'bg-c-gold text-c-bg shadow-md' : 'text-c-cream-dim hover:text-c-gold'}`}
                            >Absolute Keys</button>
                            <button
                                onClick={() => setPlaybackMode('vocal')}
                                className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${playbackMode === 'vocal' ? 'bg-c-gold text-c-bg shadow-md' : 'text-c-cream-dim hover:text-c-gold'}`}
                            >Vocal</button>
                        </div>
                    </div>
                </div>
            </div>
            <SketchyRule className="opacity-60" />

            {/* Collapsible explainer */}
            <div className="border border-c-border/50 rounded-xl overflow-hidden bg-c-card/30">
                <button
                    onClick={() => setExplainerOpen(o => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-c-gold/5 transition-colors group"
                >
                    <div className="flex items-center gap-2.5">
                        <span className="text-c-gold/70 text-sm">✦</span>
                        <span className="text-xs font-playfair font-bold text-c-cream-dim group-hover:text-c-cream transition-colors tracking-wide">What is Graha Bhedam?</span>
                    </div>
                    <svg
                        className={`w-3.5 h-3.5 text-c-gold/50 transition-transform duration-200 flex-shrink-0 ${explainerOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                {explainerOpen && (
                    <div className="px-5 pb-5 pt-1 space-y-3 animate-fade-in border-t border-c-border/30">
                        <p className="text-xs text-c-cream-dim font-playfair leading-relaxed">
                            In Carnatic music, every raga is defined by which notes it uses relative to the home note — called <span className="text-c-cream font-semibold">Sa</span>. Graha Bhedam asks: what if we kept the exact same set of notes but called a <em>different</em> note Sa?
                        </p>
                        <p className="text-xs text-c-cream-dim font-playfair leading-relaxed">
                            The intervals between notes shift, and what was one raga becomes a completely different one — same keyboard keys, different tonal center. It's the Carnatic equivalent of modal transposition in Western music.
                        </p>
                        <div className="bg-c-surface border border-c-gold/20 rounded-lg px-4 py-3 space-y-1.5">
                            <p className="text-[10px] text-c-gold font-mono font-bold uppercase tracking-widest">Classic example</p>
                            <p className="text-xs text-c-cream-dim font-playfair leading-relaxed">
                                <span className="text-c-cream font-semibold">Shankarabharanam</span> and <span className="text-c-cream font-semibold">Kalyani</span> share the exact same notes. Treat Ma (the 4th note of Shankarabharanam) as Sa, and Kalyani emerges — a completely different mood and feeling, yet not a single new pitch was introduced.
                            </p>
                        </div>
                        <p className="text-[10px] text-c-cream-dark font-playfair italic">
                            Select a raga below, then listen to each shift — you'll often recognise the resulting raga even if you didn't know the theory.
                        </p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4 lg:gap-6">
                {/* Left: Source Selection + Hall of Fame (merged, compact) */}
                <div className="heritage-card rounded-xl shadow-2xl border border-c-gold/20 flex flex-col divide-y divide-c-gold/10">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="heritage-border-corner heritage-corner-tl" />
                        <div className="heritage-border-corner heritage-corner-br" />
                    </div>

                    {/* Source picker */}
                    <div className="p-5 space-y-4 relative z-10">
                        <div className="space-y-2">
                            <label className="text-[10px] text-c-gold font-bold uppercase tracking-[0.2em] opacity-70">Step 1 · Pick a Source</label>
                            <select
                                value={selectedRaga}
                                onChange={(e) => setSelectedRaga(e.target.value)}
                                className="w-full bg-c-bg border border-c-gold/40 text-c-gold font-playfair font-bold rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-c-gold transition-all"
                            >
                                {ragaNames.map((name) => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] text-c-gold font-bold uppercase tracking-[0.2em] opacity-70">Original scale</label>
                                <button
                                    onClick={handlePlayOriginal}
                                    className={`text-[10px] uppercase tracking-widest font-bold transition-colors flex items-center gap-1.5 ${
                                        playingShift === 'original' ? 'text-emerald-400' : 'text-c-gold/60 hover:text-c-gold'
                                    }`}
                                >
                                    {playingShift === 'original' ? <><PlayIcon className="w-3 h-3 animate-pulse" /> Playing</> : <><PlayIcon className="w-3 h-3" /> Listen</>}
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {arohanam.map((note, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 group">
                                        <span className="w-9 h-9 flex items-center justify-center rounded-full border border-c-gold/30 bg-c-gold/5 text-c-gold font-mono text-xs font-bold group-hover:bg-c-gold/10 transition-colors">
                                            {toSargam(note)}
                                        </span>
                                        <span className="text-[8px] text-c-cream-dark opacity-50 uppercase">{note}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hall of Fame — compact inline section */}
                    <div className="p-5 space-y-3 relative z-10">
                        <div className="flex items-center gap-2">
                            <span className="text-c-gold/60 text-[10px]">✦</span>
                            <h4 className="text-c-gold text-[10px] font-bold uppercase tracking-widest">Hall of Fame</h4>
                            <span className="text-[9px] text-c-cream-dark italic">— try a famous pair</span>
                        </div>
                        <div className="space-y-2">
                            {[
                                { from: 'Dheerasankarabharanam', label: 'Shankarabharanam', labelTo: 'Kalyani', via: 'Ma1' },
                                { from: 'Mayamalavagowla', label: 'Mayamalavagowla', labelTo: 'Rasikapriya', via: 'Ri1' }
                            ].map((ex, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedRaga(ex.from)}
                                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all group flex items-center justify-between gap-2 ${
                                        selectedRaga === ex.from
                                            ? 'bg-c-gold/10 border-c-gold/50'
                                            : 'bg-c-bg border-c-border hover:border-c-gold/40'
                                    }`}
                                >
                                    <span className={`text-xs font-medium transition-colors truncate ${selectedRaga === ex.from ? 'text-c-gold' : 'text-c-cream group-hover:text-c-gold'}`}>{ex.label}</span>
                                    <span className="text-[9px] text-c-gold/60 flex-shrink-0">→ {ex.labelTo} via {toSargam(ex.via)}</span>
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
                                                        [Tonic] {pInfo.name} ({pInfo.freq})
                                                    </span>
                                                );
                                            } else {
                                                return (
                                                    <span className="text-[8px] font-mono text-c-cream-dark/60 bg-c-bg border border-c-border/40 px-1.5 py-0.5 rounded block text-center max-w-[110px] truncate">
                                                        [Tonic] C4 (261.6 Hz)
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
                                            <PlayIcon className="w-4 h-4 animate-pulse" />
                                            <span>Playing…</span>
                                        </>
                                    ) : (
                                        <>
                                            <PlayIcon className="w-4 h-4" />
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
