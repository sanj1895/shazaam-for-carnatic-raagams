import React, { useState } from 'react';
import RagaPracticePanel from './RagaPracticePanel';

const parseYouTubeId = (url) => {
    if (!url) return null;
    try {
        if (url.includes('youtube.com/watch?v='))  return url.split('v=')[1].split('&')[0];
        if (url.includes('youtu.be/'))             return url.split('youtu.be/')[1].split('?')[0];
        if (url.includes('youtube.com/shorts/'))   return url.split('youtube.com/shorts/')[1].split('?')[0];
    } catch (_) {}
    return null;
};

const SectionDivider = () => (
    <div className="flex items-center gap-1.5 my-1">
        <div className="flex-1 h-px bg-c-border" />
        <span className="text-c-border text-[8px]">◆</span>
        <div className="flex-1 h-px bg-c-border" />
    </div>
);

const headerBg = { maroon: 'bg-c-maroon', navy: 'bg-c-navy', teal: 'bg-c-teal' };

// Kolam-inspired circle ornament, SVG drawn inline
const KolamLarge = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.06" className="absolute top-0 right-0">
        <circle cx="60" cy="60" r="55" stroke="white" strokeWidth="0.8" strokeDasharray="5 4"/>
        <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="0.8" strokeDasharray="3 5"/>
        <circle cx="60" cy="60" r="25" stroke="white" strokeWidth="0.8"/>
        <circle cx="60" cy="60" r="10" stroke="white" strokeWidth="0.8"/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
            const r = 55;
            const x = 60 + r * Math.cos((deg * Math.PI) / 180);
            const y = 60 + r * Math.sin((deg * Math.PI) / 180);
            return <circle key={deg} cx={x} cy={y} r="3" fill="white"/>;
        })}
        {[0,60,120,180,240,300].map(deg => {
            const r = 40;
            const x1 = 60 + r * Math.cos((deg * Math.PI) / 180);
            const y1 = 60 + r * Math.sin((deg * Math.PI) / 180);
            const x2 = 60 + r * Math.cos(((deg+60) * Math.PI) / 180);
            const y2 = 60 + r * Math.sin(((deg+60) * Math.PI) / 180);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="0.5"/>;
        })}
        {[0,45,90,135,180,225,270,315].map(deg => {
            const r = 25;
            const x = 60 + r * Math.cos((deg * Math.PI) / 180);
            const y = 60 + r * Math.sin((deg * Math.PI) / 180);
            return <circle key={deg} cx={x} cy={y} r="2" fill="white"/>;
        })}
    </svg>
);

const RagaDetail = ({ raga, hasClearMatch, initialSaHz }) => {
    const [tab, setTab] = useState('about');
    if (!raga) return null;

    const getConfidence = () => {
        if (!raga.matchCount) return null;
        return Math.min(100, Math.round((raga.matchCount / (raga.matchCount + raga.alienCount)) * 100));
    };
    const confidence = getConfidence();
    const videoId = parseYouTubeId(raga.video);
    const bg = headerBg[raga.color] || 'bg-c-maroon';

    const injectAngas = (scale) => {
        if (scale.length === 8 && !scale.includes('|')) {
            return [
                ...scale.slice(0, 4),
                '|',
                ...scale.slice(4, 6),
                '|',
                ...scale.slice(6, 8)
            ];
        }
        return [...scale];
    };

    const displayArohanam = injectAngas(raga.arohanam);
    const displayAvarohanam = injectAngas(raga.avarohanam);

    return (
        <div className="w-full heritage-card rounded-lg overflow-hidden animate-slide-up shadow-2xl max-w-2xl mx-auto">
            {/* Heritage Corners */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="heritage-border-corner heritage-corner-tl" />
                <div className="heritage-border-corner heritage-corner-tr" />
                <div className="heritage-border-corner heritage-corner-bl" />
                <div className="heritage-border-corner heritage-corner-br" />
            </div>
            {/* Header */}
            <div className={`${bg} px-6 py-5 relative overflow-hidden`}>
                <KolamLarge />
                <div className="relative z-10">
                    <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase mb-1 font-playfair italic">
                        {hasClearMatch && raga.matchCount ? 'Identified raga' : 'Raagam'}
                    </p>
                    <h1 className="font-playfair text-4xl md:text-5xl text-white drop-shadow-lg leading-tight mb-2">
                        {raga.name}
                    </h1>
                    <p className="text-white/60 text-xs mt-1 uppercase tracking-[0.1em] font-bold">{raga.type}</p>
                    {confidence !== null && (
                        <div className="flex items-center gap-2 mt-3">
                            <div className="h-0.5 w-20 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-c-gold-dim rounded-full transition-all duration-700"
                                    style={{ width: `${confidence}%` }}
                                />
                            </div>
                            <span className="text-xs text-white/40">{confidence}% match</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-c-border">
                {[{ id: 'about', label: 'About' }, { id: 'practice', label: 'Practice' }].map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => setTab(id)}
                        className={`px-6 py-3 text-xs font-playfair font-bold tracking-widest uppercase transition-all relative ${
                            tab === id ? 'text-c-gold' : 'text-c-cream-dark hover:text-c-cream'
                        }`}
                    >
                        {label}
                        {tab === id && <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-c-gold rounded-full" />}
                    </button>
                ))}
            </div>

            <div className="p-6">
                {tab === 'practice' && (
                    <RagaPracticePanel raga={raga} initialSaHz={initialSaHz} />
                )}
                {tab === 'about' && (<>
                {/* AI source disclaimer */}
                {raga.type?.startsWith('AI Search') && (
                    <div className="flex items-start gap-2 mb-4 px-3 py-2 rounded-lg bg-amber-950/30 border border-amber-700/30">
                        <span className="text-amber-500/70 text-xs mt-0.5">⚠</span>
                        <p className="text-[10px] text-amber-400/70 font-playfair italic leading-relaxed">
                            Scales and compositions sourced from AI — verify against a trusted reference before relying on them.
                        </p>
                    </div>
                )}
                {/* Mood + Description */}
                {raga.mood && (
                    <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-c-gold/50 text-xs">♩</span>
                        <span className="text-c-cream-dim text-xs">{raga.mood}</span>
                    </div>
                )}
                {raga.description && (
                    <p className="text-xs text-c-cream-dim font-playfair italic leading-relaxed mb-5 opacity-80">
                        {raga.description}
                    </p>
                )}

                {/* Arohanam / Avarohanam */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-c-surface border border-c-gold/20 rounded-lg p-5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-c-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="font-playfair font-bold text-c-gold text-sm mb-4 uppercase tracking-[0.2em] border-b border-c-gold/10 pb-2">Arohanam ↑</h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 relative z-10">
                            {displayArohanam.map((note, i) => {
                                if (note === '|' || note === '||') {
                                    return (
                                        <div key={i} className="flex flex-col items-center mx-1">
                                            <span className={`font-mono text-base font-light text-c-gold/40 leading-none ${note === '||' ? 'tracking-widest' : ''}`}>{note}</span>
                                            <div className="w-1 h-1 rounded-full bg-transparent mt-1" />
                                        </div>
                                    );
                                }
                                return (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center">
                                            <span className="font-mono text-base font-bold text-c-cream leading-none">{note}</span>
                                            <div className="w-1 h-1 rounded-full bg-c-gold/30 mt-1" />
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                            {displayArohanam[displayArohanam.length - 1] !== '||' && (
                                <div className="flex flex-col items-center ml-1">
                                    <span className="font-mono text-base font-light text-c-gold/40 tracking-widest leading-none">||</span>
                                    <div className="w-1 h-1 rounded-full bg-transparent mt-1" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-c-surface border border-c-gold/20 rounded-lg p-5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-c-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="font-playfair font-bold text-c-gold text-sm mb-4 uppercase tracking-[0.2em] border-b border-c-gold/10 pb-2">Avarohanam ↓</h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 relative z-10">
                            {displayAvarohanam.map((note, i) => {
                                if (note === '|' || note === '||') {
                                    return (
                                        <div key={i} className="flex flex-col items-center mx-1">
                                            <span className={`font-mono text-base font-light text-c-gold/40 leading-none ${note === '||' ? 'tracking-widest' : ''}`}>{note}</span>
                                            <div className="w-1 h-1 rounded-full bg-transparent mt-1" />
                                        </div>
                                    );
                                }
                                return (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center">
                                            <span className="font-mono text-base font-bold text-c-cream leading-none">{note}</span>
                                            <div className="w-1 h-1 rounded-full bg-c-gold/30 mt-1" />
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                            {displayAvarohanam[displayAvarohanam.length - 1] !== '||' && (
                                <div className="flex flex-col items-center ml-1">
                                    <span className="font-mono text-base font-light text-c-gold/40 tracking-widest leading-none">||</span>
                                    <div className="w-1 h-1 rounded-full bg-transparent mt-1" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Famous compositions */}
                {raga.compositions?.length > 0 && (
                    <>
                        <SectionDivider />
                        <div className="mt-4 mb-5">
                            <h3 className="font-playfair italic text-c-cream-dim text-xs mb-2">Famous compositions</h3>
                            <ul className="space-y-1">
                                {raga.compositions.map((c, i) => (
                                    <li key={i} className="text-xs text-c-cream flex items-start gap-2">
                                        <span className="text-c-gold/40 mt-0.5">◆</span>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <SectionDivider />

                {/* Video */}
                <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden border border-c-border bg-black">
                    {videoId ? (
                        <div className="w-full h-full flex flex-col">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={`${raga.name} reference`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="flex-grow"
                            />
                            <div className="bg-c-card border-t border-c-border py-2 text-center">
                                <a href={raga.video} target="_blank" rel="noopener noreferrer"
                                   className="text-xs text-c-cream-dark hover:text-c-cream-dim underline font-playfair italic">
                                    Watch on YouTube ↗
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-2 text-c-cream-dark bg-c-bg p-8 text-center border-t border-c-border">
                            <div className="w-12 h-12 rounded-full bg-c-surface border border-c-gold/30 flex items-center justify-center mb-2 text-c-gold">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                            <p className="text-base font-playfair text-c-cream">No curated video available</p>
                            <p className="text-sm text-c-cream-dim max-w-[250px] mb-3 leading-relaxed">
                                We haven't handpicked a specific performance for <span className="text-c-gold font-medium">{raga.name}</span> yet.
                            </p>
                            <a 
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(raga.name + ' carnatic raagam')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2.5 mt-1 bg-c-gold-faint border border-c-gold/60 text-c-gold hover:bg-c-gold hover:text-c-bg rounded-full text-xs transition-colors font-playfair tracking-wide flex items-center gap-2 font-medium"
                            >
                                Search YouTube ↗
                            </a>
                        </div>
                    )}
                </div>
                </>)}
            </div>
        </div>
    );
};

export default RagaDetail;
