import React, { useState } from 'react';
import { RAGAS, toSargam } from '../utils/ragaLogic';
import { askGroqAboutRaga } from '../utils/groqIdentify';
import RagaDetail from './RagaDetail';

// Mini veena for library cards
const MiniVeena = ({ color }) => {
    const stroke = color === 'maroon' ? '#C8941F' : color === 'navy' ? '#8BAED4' : '#6BBFA8';
    return (
        <svg width="28" height="80" viewBox="0 0 28 80" fill="none" opacity="0.35">
            <ellipse cx="14" cy="68" rx="12" ry="10" stroke={stroke} strokeWidth="1.2"/>
            <rect x="12" y="8" width="4" height="60" rx="2" fill={stroke} opacity="0.3"/>
            <line x1="13" y1="8" x2="13" y2="58" stroke={stroke} strokeWidth="0.7" opacity="0.6"/>
            <line x1="15" y1="8" x2="15" y2="58" stroke={stroke} strokeWidth="0.7" opacity="0.6"/>
            <line x1="10" y1="48" x2="18" y2="48" stroke={stroke} strokeWidth="1"/>
            <line x1="10" y1="34" x2="18" y2="34" stroke={stroke} strokeWidth="1"/>
            <line x1="10" y1="22" x2="18" y2="22" stroke={stroke} strokeWidth="1"/>
            <path d="M14 8 Q8 4 10 1 Q12 -1 14 1.5 Q16 4 14 7" stroke={stroke} strokeWidth="1.2" fill="none"/>
        </svg>
    );
};

const KoshaIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        {/* The open ancient scroll/book with double borders */}
        <path d="M12 18 C 12 12, 28 12, 32 18 C 36 12, 52 12, 52 18 V 48 C 52 42, 36 42, 32 48 C 28 42, 12 42, 12 48 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1.8" />
        <path d="M10 16 C 10 10, 28 10, 32 16 C 36 10, 54 10, 54 16 V 46 C 54 40, 36 40, 32 46 C 28 40, 10 40, 10 46 Z" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        
        {/* Spine lines */}
        <line x1="32" y1="16" x2="32" y2="48" stroke="currentColor" strokeWidth="2" />
        
        {/* Left page text lines representing sargam scripts */}
        <line x1="18" y1="24" x2="26" y2="24" stroke="currentColor" opacity="0.6" strokeWidth="1.2" />
        <line x1="16" y1="30" x2="28" y2="30" stroke="currentColor" opacity="0.6" strokeWidth="1.2" />
        <line x1="18" y1="36" x2="24" y2="36" stroke="currentColor" opacity="0.6" strokeWidth="1.2" />
        
        {/* Right page rising soundwave/note representing melody escaping the page */}
        <path d="M36 34 Q 40 24, 44 32 T 50 30" stroke="currentColor" strokeWidth="1.5" className="text-c-gold" />
        
        {/* Softly glowing golden star representing divine knowledge - breathing, NOT bouncing out! */}
        <path d="M44 21 L45 23 L47 23 L45 24 L46 26 L44 25 L42 26 L43 24 L41 23 L43 23 Z" fill="#C8941F" className="animate-pulse" />
        
        {/* Ornate halo arches */}
        <path d="M14 9 C 24 5, 40 5, 50 9" stroke="currentColor" opacity="0.25" strokeDasharray="3 3" />
        <path d="M14 53 C 24 57, 40 57, 50 53" stroke="currentColor" opacity="0.25" strokeDasharray="3 3" />
    </svg>
);

// Decorative kolam-style mandala for card background
const KolamPattern = () => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.07" className="absolute top-0 right-0">
        <circle cx="40" cy="40" r="35" stroke="white" strokeWidth="0.8" strokeDasharray="4 3"/>
        <circle cx="40" cy="40" r="24" stroke="white" strokeWidth="0.8" strokeDasharray="3 4"/>
        <circle cx="40" cy="40" r="13" stroke="white" strokeWidth="0.8"/>
        {[0,45,90,135,180,225,270,315].map(deg => {
            const r = 35;
            const x = 40 + r * Math.cos((deg * Math.PI) / 180);
            const y = 40 + r * Math.sin((deg * Math.PI) / 180);
            return <circle key={deg} cx={x} cy={y} r="2.5" fill="white"/>;
        })}
        {[0,60,120,180,240,300].map(deg => {
            const r = 24;
            const x1 = 40 + r * Math.cos((deg * Math.PI) / 180);
            const y1 = 40 + r * Math.sin((deg * Math.PI) / 180);
            const x2 = 40 + r * Math.cos(((deg+60) * Math.PI) / 180);
            const y2 = 40 + r * Math.sin(((deg+60) * Math.PI) / 180);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="0.6"/>;
        })}
    </svg>
);

const headerBg = {
    maroon: 'bg-c-maroon',
    navy:   'bg-c-navy',
    teal:   'bg-c-teal',
};

const formatScale = (scale) => {
    const sargam = scale.map(toSargam);
    if (sargam.length === 8) {
        return `${sargam.slice(0,4).join(' ')} | ${sargam.slice(4,6).join(' ')} | ${sargam.slice(6,8).join(' ')}`;
    }
    return sargam.join(' ');
};

const RagaCard = ({ name, data, onClick }) => (
    <button
        onClick={() => onClick({ name, ...data })}
        className="w-full text-left heritage-card rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl group"
    >
        {/* Heritage Corners */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="heritage-border-corner heritage-corner-tl" />
            <div className="heritage-border-corner heritage-corner-tr" />
            <div className="heritage-border-corner heritage-corner-bl" />
            <div className="heritage-border-corner heritage-corner-br" />
        </div>

        {/* Colored header */}
        <div className={`${headerBg[data.color] || 'bg-c-maroon'} px-4 py-4 relative overflow-hidden border-b border-c-gold/20`}>
            <KolamPattern />
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h3 className="font-playfair text-lg text-white tracking-wide leading-tight group-hover:text-c-gold-faint transition-colors">{name}</h3>
                    <p className="text-white/60 text-[10px] mt-0.5 tracking-[0.1em] uppercase font-bold">{data.type}</p>
                </div>
                <div className="scale-75 origin-right">
                    <MiniVeena color={data.color} />
                </div>
            </div>
        </div>

        {/* Body */}
        <div className="px-4 py-3">
            <div className="mb-2">
                <span className="text-[10px] text-c-cream-dim">{data.mood}</span>
            </div>
            {data.description && (
                <p className="text-[10px] text-c-cream-dark font-playfair italic leading-relaxed mb-2 line-clamp-2">
                    {data.description}
                </p>
            )}

            <div className="mb-1.5">
                <span className="text-[9px] text-c-cream-dark uppercase tracking-wider mr-2">↑</span>
                <span className="font-mono text-xs text-c-cream-dim tracking-wider">
                    {formatScale(data.arohanam)} <span className="text-c-gold/40 font-light ml-0.5 tracking-widest">||</span>
                </span>
            </div>
            {/* Avarohanam */}
            <div>
                <span className="text-[9px] text-c-cream-dark uppercase tracking-wider mr-2">↓</span>
                <span className="font-mono text-xs text-c-cream-dim tracking-wider">
                    {formatScale(data.avarohanam)} <span className="text-c-gold/40 font-light ml-0.5 tracking-widest">||</span>
                </span>
            </div>
        </div>

        {/* Hover cue */}
        <div className="border-t border-c-gold/10 px-4 py-2.5 text-[10px] text-c-gold font-playfair font-bold uppercase tracking-widest bg-c-gold/5 group-hover:bg-c-gold/10 transition-colors">
            View details →
        </div>
    </button>
);

// Decorative running sargam text at the bottom
const SargamScroll = () => {
    const text = 'S R G M P D N S· S R G M P D N S· S R G M P D N S· ';
    const repeated = text.repeat(6);
    return (
        <div className="w-full overflow-hidden border-t border-c-border mt-8 py-2">
            <div className="font-mono text-[10px] text-c-cream-dark tracking-[0.3em] whitespace-nowrap animate-[marquee_30s_linear_infinite]">
                {repeated}
            </div>
        </div>
    );
};

const RagaLibrary = ({ onSelectRaga }) => {
    const [filter, setFilter] = useState('all'); // 'all' | 'melakarta' | 'janya'
    const [searchQuery, setSearchQuery] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState(null);

    const handleAskAi = async () => {
        if (!searchQuery) return;
        setAiLoading(true);
        setAiError(null);
        try {
            const apiKey = import.meta.env.VITE_GROQ_API_KEY;
            if (!apiKey) throw new Error('Groq API key not configured.');
            const raga = await askGroqAboutRaga(searchQuery, apiKey);
            if (raga.error) {
                throw new Error(raga.error);
            }
            onSelectRaga(raga);
        } catch (err) {
            setAiError(err.message);
        } finally {
            setAiLoading(false);
        }
    };

    const allRagas = Object.entries(RAGAS);

    const filtered = allRagas.filter(([name, data]) => {
        const matchesFilter = filter === 'all' || (filter === 'melakarta' && data.type.startsWith('Melakarta')) || (filter === 'janya' && data.type.startsWith('Janya'));
        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="w-full max-w-5xl raga-library-container">
            {/* Compact Space-Efficient Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-c-border pb-4 mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-c-card border border-c-gold/30 flex items-center justify-center text-c-gold shadow-md backdrop-blur-md relative flex-shrink-0">
                        <KoshaIcon className="w-7 h-7 relative z-10" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h1 className="font-playfair text-2xl font-bold tracking-wider text-c-gold uppercase leading-none">Raga Kosha</h1>
                            <span className="text-[8px] uppercase tracking-widest bg-c-gold/15 text-c-gold px-2 py-0.5 rounded font-semibold border border-c-gold/20 leading-none">The Treasury</span>
                        </div>
                        <p className="text-c-cream-dim text-[11px] mt-1 font-light leading-relaxed">
                            Practice and explore all 72 Melakarta parents and derived Janya ragams.
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-56">
                    <input
                        type="text"
                        placeholder="Search raagams..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-c-surface border border-c-border rounded-full py-1.5 pl-4 pr-10 text-xs text-c-cream focus:outline-none focus:border-c-gold/60 transition-colors shadow-inner"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-c-cream-dark hover:text-c-cream text-[10px]"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Modal for Selected Raga Detail - REMOVED, now in App.jsx */}

            {/* Filter tabs */}
            <div className="flex items-center gap-1 mb-6 border-b border-c-border">
                {[
                    { id: 'all',       label: `All (${allRagas.length})` },
                    { id: 'melakarta', label: `Melakartas (${allRagas.filter(([,d]) => d.type.startsWith('Melakarta')).length})` },
                    { id: 'janya',     label: `Janyas (${allRagas.filter(([,d]) => d.type.startsWith('Janya')).length})` },
                ].map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => setFilter(id)}
                        className={`px-4 py-2 text-xs font-playfair tracking-wide transition-colors relative ${
                            filter === id ? 'text-c-gold' : 'text-c-cream-dim hover:text-c-cream'
                        }`}
                    >
                        {label}
                        {filter === id && <span className="absolute bottom-0 left-0 right-0 h-px bg-c-gold" />}
                    </button>
                ))}
            </div>

            {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(([name, data]) => (
                        <RagaCard
                            key={name}
                            name={name}
                            data={data}
                            onClick={onSelectRaga}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full py-12 flex flex-col items-center justify-center border border-dashed border-c-border rounded-xl">
                    <p className="text-c-cream-dim text-sm font-playfair italic mb-4">
                        "{searchQuery}" isn't in our local dictionary yet.
                    </p>
                    <button
                        onClick={handleAskAi}
                        disabled={aiLoading}
                        className={`px-6 py-2 border rounded-full text-xs font-playfair tracking-wide flex items-center gap-2 ${
                            aiLoading ? 'border-c-border text-c-cream-dark opacity-50 cursor-not-allowed' : 'border-c-gold/60 bg-c-gold-faint text-c-gold hover:bg-c-gold hover:text-c-bg transition-colors'
                        }`}
                    >
                        {aiLoading ? (
                            <>
                                <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                                Consulting AI...
                            </>
                        ) : (
                            <>Ask AI about "{searchQuery}"</>
                        )}
                    </button>
                    {aiError && (
                        <p className="text-red-400 text-[10px] mt-3 bg-red-950/30 border border-red-900/50 px-3 py-1 rounded">{aiError}</p>
                    )}
                </div>
            )}

            <SargamScroll />
        </div>
    );
};

export default RagaLibrary;
