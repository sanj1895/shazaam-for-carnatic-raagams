import React, { useState } from 'react';
import { RAGAS } from '../utils/ragaLogic';
import RagaDetail from './RagaDetail';

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

const Cell = ({ number, name, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full h-full text-left p-2 rounded border transition-colors ${
            isSelected
                ? 'border-c-gold bg-c-gold-faint'
                : 'border-c-border bg-c-surface hover:border-c-border-hi hover:bg-c-card'
        }`}
    >
        <div className="flex items-start justify-between gap-1">
            <span className={`text-[9px] font-mono leading-none ${isSelected ? 'text-c-gold' : 'text-c-cream-dark'}`}>
                {number}
            </span>
        </div>
        <p className={`text-[10px] leading-tight mt-1 font-playfair ${
            isSelected ? 'text-c-gold' : 'text-c-cream-dim'
        }`}>
            {name}
        </p>
    </button>
);

const Grid = ({ offset, isMa2, selected, onSelect }) => (
    <div className="overflow-x-auto -mx-1 px-1 pb-2">
        <p className="text-[9px] text-c-cream-dark/50 italic mb-1 sm:hidden">← Scroll to see all columns</p>
        <div className="min-w-[520px]">
            {/* Column headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
                <div /> {/* Row labels spacer */}
                {DN.map((d, j) => (
                    <div key={j} className="text-center">
                        <span className="text-[9px] text-c-cream-dark font-mono">{d.label}</span>
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
                            <span className="text-[9px] text-c-cream-dark font-mono">{rg.label}</span>
                        </div>
                        {DN.map((_, j) => {
                            const number = rowOffset + j + 1;
                            const name = MELAKARTA_NAMES[rowOffset + j];
                            return (
                                <div key={j} className="h-14">
                                    <Cell
                                        number={number}
                                        name={name}
                                        isSelected={selected?.number === number}
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

const MelakartaChart = ({ onSelectRaga }) => {
    return (
        <div className="w-full max-w-4xl px-1 sm:px-0">
            <div className="mb-4 sm:mb-6 px-2 sm:px-0">
                <h2 className="font-playfair text-2xl text-c-gold">Melakarta Chart</h2>
                <p className="text-c-cream-dark text-xs mt-1">
                    The 72 parent ragas of Carnatic music  ·  organized by Ri/Ga (rows) and Da/Ni (columns).
                    Tap any raga to explore it.
                </p>
            </div>

            {/* Ma1 section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-playfair text-sm text-c-cream-dim italic">Shuddha Madhyamam · Ma₁</h3>
                    <span className="text-c-cream-dark text-xs">ragas 1–36</span>
                    <div className="flex-1 h-px bg-c-border" />
                </div>
                <Grid offset={0} isMa2={false} selected={null} onSelect={onSelectRaga} />
            </div>

            {/* Ma2 section */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-playfair text-sm text-c-cream-dim italic">Prati Madhyamam · Ma₂</h3>
                    <span className="text-c-cream-dark text-xs">ragas 37–72</span>
                    <div className="flex-1 h-px bg-c-border" />
                </div>
                <Grid offset={36} isMa2={true} selected={null} onSelect={onSelectRaga} />
            </div>

            {/* Detail panel for selected raga - REMOVED, now in App.jsx */}
        </div>
    );
};

export default MelakartaChart;
