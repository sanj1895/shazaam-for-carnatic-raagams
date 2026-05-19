import React, { useState } from 'react';

// All 72 Melakarta ragas in order (row = Ri/Ga group, col = Da/Ni group)
const MELAKARTA_NAMES = [
    // Ma1: Shuddha Madhyamam (ragas 1–36)
    // R1G1
    'Kanakangi','Ratnangi','Ganamurti','Vanaspati','Manavati','Tanarupi',
    // R1G2
    'Senavati','Hanumatodi','Dhenuka','Natakapriya','Kokilapriya','Rupapriya',
    // R1G3
    'Gayakapriya','Vakulabharanam','Mayamalavagowla','Chakravakam','Suryakantam','Hatakambari',
    // R2G2
    'Jhankaradhwani','Natabhairavi','Keeravani','Kharaharapriya','Gourimanohari','Varunapriya',
    // R2G3
    'Mararanjani','Charukesi','Sarasangi','Harikambhoji','Dheerasankarabharanam','Naganandini',
    // R3G3
    'Yagapriya','Ragavardhini','Gangeyabhushani','Vagadheeswari','Shulini','Chalanata',

    // Ma2: Prati Madhyamam (ragas 37–72)
    // R1G1
    'Salagam','Jalarnavam','Jhalavarali','Navaneetam','Pavani','Raghupriya',
    // R1G2
    'Gavambhodi','Bhavapriya','Shubhapantuvarali','Shadvidhamargini','Suvarnangi','Divyamani',
    // R1G3
    'Dhavalambari','Namanarayani','Kamavardhini','Ramapriya','Gamanashrama','Vishwambhari',
    // R2G2
    'Shamalangi','Shanmukhapriya','Simhendramadhyamam','Hemavati','Dharmavati','Neetimati',
    // R2G3
    'Kantamani','Rishabhapriya','Latangi','Vachaspati','Mechakalyani','Chitrambari',
    // R3G3
    'Sucharitra','Jyotiswarupini','Dhatuvardani','Nasikabhushani','Kosalam','Rasikapriya',
];

// Ri/Ga combinations (rows 0–5)
const RG = [
    { label: 'R₁ G₁', ri: 'Ri1', ga: 'Ri2'  },
    { label: 'R₁ G₂', ri: 'Ri1', ga: 'Ga2'  },
    { label: 'R₁ G₃', ri: 'Ri1', ga: 'Ga3'  },
    { label: 'R₂ G₂', ri: 'Ri2', ga: 'Ga2'  },
    { label: 'R₂ G₃', ri: 'Ri2', ga: 'Ga3'  },
    { label: 'R₃ G₃', ri: 'Ga2', ga: 'Ga3'  },
];

// Da/Ni combinations (cols 0–5)
const DN = [
    { label: 'D₁ N₁', da: 'Da1', ni: 'Da2'  },
    { label: 'D₁ N₂', da: 'Da1', ni: 'Ni2'  },
    { label: 'D₁ N₃', da: 'Da1', ni: 'Ni3'  },
    { label: 'D₂ N₂', da: 'Da2', ni: 'Ni2'  },
    { label: 'D₂ N₃', da: 'Da2', ni: 'Ni3'  },
    { label: 'D₃ N₃', da: 'Ni2', ni: 'Ni3'  },
];

// Derive scale notes for any melakarta from grid position
const getMelakartaNotes = (row, col, isMa2) => {
    const ma = isMa2 ? 'Ma2' : 'Ma1';
    return ['Sa', RG[row].ri, RG[row].ga, ma, 'Pa', DN[col].da, DN[col].ni];
};

const Cell = ({ number, name, isSelected, isSearchMatch, hasSearchQuery, onClick }) => {
    let opacityStyle = 'opacity-100 scale-100';
    if (hasSearchQuery) {
        opacityStyle = isSearchMatch 
            ? 'opacity-100 ring-2 ring-c-gold/60 shadow-[0_0_15px_rgba(200,148,31,0.25)] scale-102 border-c-gold bg-c-gold-faint/25' 
            : 'opacity-25 scale-95 hover:opacity-50';
    }
    
    return (
        <button
            onClick={onClick}
            className={`w-full h-full text-left p-1.5 sm:p-2 rounded border transition-all duration-300 ${opacityStyle} ${
                isSelected
                    ? 'border-c-gold bg-c-gold-faint shadow-[0_0_10px_rgba(200,148,31,0.15)] font-bold'
                    : 'border-c-border bg-c-surface hover:border-c-border-hi hover:bg-c-card'
            }`}
        >
            <div className="flex items-start justify-between">
                <span className={`text-[8px] sm:text-[9px] font-mono leading-none ${isSelected ? 'text-c-gold' : 'text-c-cream-dark'}`}>
                    {number}
                </span>
            </div>
            <p className={`text-[9px] sm:text-[10px] leading-snug mt-1 font-playfair font-semibold break-words hyphens-auto tracking-tight ${
                isSelected ? 'text-c-gold' : 'text-c-cream-dim'
            }`}
            style={{ wordBreak: 'break-word', hyphens: 'auto' }}
            >
                {name}
            </p>
        </button>
    );
};

const Grid = ({ offset, isMa2, selected, onSelect, searchQuery }) => {
    const hasSearchQuery = searchQuery.trim().length > 0;
    const q = searchQuery.toLowerCase().trim();

    return (
        <div className="overflow-x-auto -mx-2 px-2 pb-2">
            <p className="text-[9px] text-c-cream-dark/50 italic mb-1.5 sm:hidden">← Swipe left/right to view full parent grid →</p>
            <div className="min-w-[760px]">
                {/* Column headers */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                    <div /> {/* Row labels spacer */}
                    {DN.map((d, j) => (
                        <div key={j} className="text-center py-1">
                            <span className="text-[9px] text-c-cream-dark font-mono tracking-wider">{d.label}</span>
                        </div>
                    ))}
                </div>
                {/* Rows */}
                {RG.map((rg, i) => {
                    const rowOffset = offset + i * 6;
                    return (
                        <div key={i} className="grid grid-cols-7 gap-1 mb-1 items-center">
                            {/* Row header */}
                            <div className="w-[68px] flex-shrink-0 text-right pr-2">
                                <span className="text-[9px] text-c-cream-dark font-mono tracking-wider">{rg.label}</span>
                            </div>
                            {DN.map((_, j) => {
                                const number = rowOffset + j + 1;
                                const name = MELAKARTA_NAMES[rowOffset + j];
                                const isSearchMatch = hasSearchQuery && (
                                    name.toLowerCase().includes(q) || 
                                    number.toString() === q
                                );

                                return (
                                    <div key={j} className="h-[68px]">
                                        <Cell
                                            number={number}
                                            name={name}
                                            isSelected={selected?.number === number}
                                            isSearchMatch={isSearchMatch}
                                            hasSearchQuery={hasSearchQuery}
                                            onClick={() => onSelect({
                                                number, name,
                                                notes: getMelakartaNotes(i, j, isMa2),
                                                ragaKey: name,
                                                isMa2,
                                            })}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const MelakartaChart = ({ onSelectRaga }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="w-full max-w-4xl px-1 sm:px-0">
            {/* Header + Search box */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2 sm:px-0">
                <div>
                    <h2 className="font-playfair text-2xl text-c-gold">Melakarta Chart</h2>
                    <p className="text-c-cream-dark text-xs mt-1">
                        The 72 parent ragas of Carnatic music  ·  organized mathematically by Ri/Ga (rows) and Da/Ni (columns).
                        Tap any raga to practice.
                    </p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-64 max-w-xs">
                    <input
                        type="text"
                        placeholder="Search raga name or number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-c-surface border border-c-gold/30 hover:border-c-gold/50 focus:border-c-gold !text-c-cream text-xs px-3.5 py-2 rounded-xl focus:outline-none transition-all placeholder-c-cream-dark/45"
                        style={{ color: '#1E0C04' }}
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-c-cream-dark/60 hover:text-c-cream transition-colors"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Ma1 section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-playfair text-sm text-c-cream-dim italic">Shuddha Madhyamam · Ma₁</h3>
                    <span className="text-c-cream-dark text-[10px] font-mono">ragas 1–36</span>
                    <div className="flex-1 h-px bg-c-border" />
                </div>
                <Grid offset={0} isMa2={false} selected={null} onSelect={onSelectRaga} searchQuery={searchQuery} />
            </div>

            {/* Ma2 section */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-playfair text-sm text-c-cream-dim italic">Prati Madhyamam · Ma₂</h3>
                    <span className="text-c-cream-dark text-[10px] font-mono">ragas 37–72</span>
                    <div className="flex-1 h-px bg-c-border" />
                </div>
                <Grid offset={36} isMa2={true} selected={null} onSelect={onSelectRaga} searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default MelakartaChart;
