import React from 'react';
import RagaDetail from './RagaDetail';

// Which unique notes does a raga use (excluding duplicate 'Sa')
const ragaUniqueNotes = (raga) =>
    [...new Set([...raga.arohanam, ...raga.avarohanam])].filter(n => n !== 'Sa');

// Progress tracker: show every note of the leading candidate, gold if found
const RagaProgress = ({ raga, detectedNotes }) => {
    const found = new Set(detectedNotes);
    const notes = ragaUniqueNotes(raga);
    const foundCount = notes.filter(n => found.has(n)).length;

    return (
        <div className="w-full heritage-card rounded-lg overflow-hidden animate-fade-in shadow-lg">
            {/* Heritage Corners */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="heritage-border-corner heritage-corner-tl" />
                <div className="heritage-border-corner heritage-corner-tr" />
                <div className="heritage-border-corner heritage-corner-bl" />
                <div className="heritage-border-corner heritage-corner-br" />
            </div>

            <div className="border-b border-c-gold/10 px-5 py-3 flex items-center justify-between bg-c-gold/5">
                <div className="flex items-center gap-2">
                    <span className="text-c-gold/40 text-xs">♫</span>
                    <span className="font-playfair text-sm text-c-cream-dim italic">Getting closer…</span>
                </div>
                <span className="text-c-cream-dark text-xs">{foundCount}/{notes.length} swarams of {raga.name}</span>
            </div>
            <div className="px-5 py-4 flex flex-wrap gap-2">
                {/* Always show Sa as found */}
                <div className="flex flex-col items-center gap-1">
                    <span className="px-2.5 py-1 border border-c-gold/50 bg-c-gold-faint rounded text-xs font-mono text-c-gold">Sa</span>
                    <span className="w-1 h-1 rounded-full bg-c-gold/60" />
                </div>
                {notes.map(note => {
                    const isFound = found.has(note);
                    return (
                        <div key={note} className="flex flex-col items-center gap-1">
                            <span className={`px-2.5 py-1 border rounded text-xs font-mono transition-colors ${
                                isFound
                                    ? 'border-c-gold/50 bg-c-gold-faint text-c-gold'
                                    : 'border-c-border bg-transparent text-c-cream-dark'
                            }`}>
                                {note}
                            </span>
                            <span className={`w-1 h-1 rounded-full ${isFound ? 'bg-c-gold/60' : 'bg-c-border'}`} />
                        </div>
                    );
                })}
            </div>
            {foundCount < notes.length && (
                <div className="px-5 pb-3">
                    <p className="text-[11px] text-c-cream-dark font-playfair italic">
                        Still listening for: {notes.filter(n => !found.has(n)).join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
};

const RagaDisplay = ({ ragas = [], detectedNotes = [], onRemoveNote, onSelectRaga }) => {
    const hasClearMatch = ragas.length === 1 || (ragas.length > 1 && ragas[0].score > ragas[1].score + 2);

    const getConfidence = (raga) => {
        if (!raga) return 0;
        return Math.min(100, Math.round((raga.matchCount / (raga.matchCount + raga.alienCount)) * 100));
    };

    const hint = (() => {
        if (detectedNotes.length === 0) return null;
        if (detectedNotes.length < 4) return `${4 - detectedNotes.length} more swaram${4 - detectedNotes.length !== 1 ? 's' : ''} and the search begins`;
        if (ragas.length === 0) return 'Still searching  ·  try singing Ri, Da, or Ni';
        return null;
    })();

    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-5 relative z-10">

            {/* Detected Notes */}
            <div className="w-full heritage-card rounded-lg overflow-hidden shadow-lg animate-fade-in">
                {/* Heritage Corners */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="heritage-border-corner heritage-corner-tl" />
                    <div className="heritage-border-corner heritage-corner-tr" />
                    <div className="heritage-border-corner heritage-corner-bl" />
                    <div className="heritage-border-corner heritage-corner-br" />
                </div>

                <div className="border-b border-c-gold/10 px-5 py-3 flex items-center justify-between bg-c-gold/5">
                    <div className="flex items-center gap-2">
                        <span className="text-c-gold/40 text-xs">♪</span>
                        <h3 className="font-playfair text-sm text-c-cream-dim italic">Swarams heard</h3>
                    </div>
                    {detectedNotes.length > 0 && (
                        <span className="text-c-cream-dark text-[10px]">tap a note to remove it</span>
                    )}
                </div>
                <div className="p-5">
                    {detectedNotes.length === 0 ? (
                        <p className="text-c-cream-dark text-sm text-center py-2 font-playfair italic">
                            Start singing your raga  ·  hold each swaram for a full breath.
                        </p>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex flex-wrap justify-center gap-2">
                                {detectedNotes.map((note) => (
                                    <button
                                        key={note}
                                        onClick={() => onRemoveNote?.(note)}
                                        className="group relative px-3 py-1.5 border border-c-gold/30 bg-c-gold-faint rounded text-sm font-mono text-c-gold animate-fade-in hover:border-red-900/60 hover:bg-red-950/40 hover:text-red-400 transition-colors shadow-sm"
                                        title={`Remove ${note}`}
                                    >
                                        <span className="group-hover:opacity-0 transition-opacity">{note}</span>
                                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 text-xs">✕</span>
                                    </button>
                                ))}
                            </div>
                            {hint && (
                                <p className="text-xs text-c-cream-dark mt-1 font-playfair italic">{hint}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Progress tracker  ·  show while still ambiguous but candidates exist */}
            {ragas.length > 0 && !hasClearMatch && (
                <RagaProgress raga={ragas[0]} detectedNotes={detectedNotes} />
            )}

            {/* Candidates list */}
            {ragas.length > 0 && (
                <div className="w-full heritage-card rounded-lg overflow-hidden animate-fade-in shadow-lg">
                    {/* Heritage Corners */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="heritage-border-corner heritage-corner-tl" />
                        <div className="heritage-border-corner heritage-corner-tr" />
                        <div className="heritage-border-corner heritage-corner-bl" />
                        <div className="heritage-border-corner heritage-corner-br" />
                    </div>

                    <div className="border-b border-c-gold/10 px-5 py-3 flex items-center gap-2 bg-c-gold/5">
                        <span className="text-c-gold/40 text-xs">♫</span>
                        <h2 className="font-playfair text-sm text-c-cream-dim italic">
                            {hasClearMatch ? 'Raagam Identified' : 'Could be one of these'}
                        </h2>
                    </div>
                    <div className="p-5">
                        <p className="text-c-cream-dark text-xs mb-4 text-center">
                            {hasClearMatch 
                                ? 'We have a high-confidence match. Tap to see the full profile:' 
                                : 'Sing a few more swarams to narrow it down, or pick one to explore:'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {[...ragas].sort((a,b) => getConfidence(b) - getConfidence(a) || b.score - a.score).map((raga) => (
                                <button
                                    key={raga.name}
                                    onClick={() => onSelectRaga(raga, hasClearMatch)}
                                    className={`group px-5 py-2.5 rounded border text-sm font-playfair transition-all duration-300 transform hover:scale-105 flex items-center gap-3 ${
                                        (hasClearMatch && raga.name === ragas[0].name)
                                            ? 'bg-c-gold border-c-gold text-c-bg shadow-lg z-10'
                                            : 'border-c-border bg-c-card text-c-cream-dim hover:border-c-gold/50 hover:text-c-gold'
                                    }`}
                                >
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="font-bold tracking-wide uppercase text-[11px]">{raga.name}</span>
                                        <span className={`text-[9px] mt-0.5 ${hasClearMatch ? 'text-c-bg/70' : 'text-c-cream-dark'}`}>
                                            {getConfidence(raga)}% Match
                                        </span>
                                    </div>
                                    <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* The Unified Raga Detail Modal - REMOVED, now in App.jsx */}
        </div>
    );
};

export default RagaDisplay;
