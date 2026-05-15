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

            {/* Arohanam */}
            <div className="mb-1.5">
                <span className="text-[9px] text-c-cream-dark uppercase tracking-wider mr-2">↑</span>
                <span className="font-mono text-xs text-c-cream-dim tracking-wider">
                    {data.arohanam.map(toSargam).join(' ')}
                </span>
            </div>
            {/* Avarohanam */}
            <div>
                <span className="text-[9px] text-c-cream-dark uppercase tracking-wider mr-2">↓</span>
                <span className="font-mono text-xs text-c-cream-dim tracking-wider">
                    {data.avarohanam.map(toSargam).join(' ')}
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
        <div className="w-full max-w-5xl">
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="font-playfair text-2xl text-c-gold">Raagam Library</h2>
                    <p className="text-c-cream-dark text-xs mt-1">All 72 Melakartas and their derived janyas  ·  explore, listen, feel.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search raagams..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-c-surface border border-c-border rounded-full py-2 pl-4 pr-10 text-xs text-c-cream focus:outline-none focus:border-c-gold/60 transition-colors shadow-inner"
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
                                Consulting Groq AI...
                            </>
                        ) : (
                            <>Ask Groq AI about "{searchQuery}"</>
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
