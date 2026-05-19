import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import AudioInput from './components/AudioInput';
import RagaDisplay from './components/RagaDisplay';
import RagaLibrary from './components/RagaLibrary';
import MelakartaChart from './components/MelakartaChart';
import GroqPanel from './components/GroqPanel';
import SwaraKeyboard from './components/SwaraKeyboard';
import GrahaBhedam from './components/GrahaBhedam';
import SingBackChallenge from './components/SingBackChallenge';
import ShruthiBox from './components/ShruthiBox';
import Talam from './components/Talam';
import Tutor from './components/Tutor';
import { getSwaram, identifyRaga, RAGAS } from './utils/ragaLogic';
import RagaDetail from './components/RagaDetail';

const VeenaIcon = () => (
    <svg width="22" height="68" viewBox="0 0 22 68" fill="none" className="text-c-gold-dim">
        <ellipse cx="11" cy="57" rx="10" ry="9" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="9.5" y="10" width="3" height="47" rx="1.5" fill="currentColor" opacity="0.35"/>
        <line x1="10.5" y1="10" x2="10.5" y2="48" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
        <line x1="12.5" y1="10" x2="12.5" y2="48" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
        <line x1="8.5" y1="40" x2="13.5" y2="40" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="8.5" y1="28" x2="13.5" y2="28" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="8.5" y1="18" x2="13.5" y2="18" stroke="currentColor" strokeWidth="0.9"/>
        <path d="M11 10 Q5 6 7 2 Q9 -1 11 1.5 Q13 4 11 7" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <ellipse cx="11" cy="7" rx="4" ry="3" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
);

const FEATURES = [
    { id: 'tutor',     label: 'Tutor',        desc: 'Learn Carnatic singing from scratch',    symbol: '◈',  mobileSymbol: '🎓', level: 'start' },
    { id: 'shruthi',   label: 'Shruthi',      desc: 'Continuous drone for practice',          symbol: '〜', mobileSymbol: '🎵', level: 'beginner' },
    { id: 'talam',     label: 'Talam',        desc: 'Keep the rhythmic cycle',                symbol: '॥',  mobileSymbol: '🥁', level: 'beginner' },
    { id: 'listen',    label: 'Sing',         desc: 'Sing a melody  ·  find the raga',       symbol: '♬',  mobileSymbol: '🎤', level: 'intermediate' },
    { id: 'keyboard',  label: 'Keyboard',     desc: 'Play swaras on virtual keys',            symbol: '♩',  mobileSymbol: '🎹', level: 'intermediate' },
    { id: 'singback',  label: 'Sing-Back',    desc: 'Challenge your raga memory',             symbol: '◎',  mobileSymbol: '🎯', level: 'intermediate' },
    { id: 'library',   label: 'Library',      desc: 'Browse every Carnatic raga',             symbol: '◈',  mobileSymbol: '📚', level: 'all' },
    { id: 'melakarta', label: 'Melakarta',    desc: 'The complete 72-raga parent chart',      symbol: '⊹',  mobileSymbol: '🗂️', level: 'advanced' },
    { id: 'bhedam',    label: 'Graha Bhedam', desc: 'Discover modal shifts between ragas',    symbol: '↻',  mobileSymbol: '🔄', level: 'advanced' },
];

function App() {
    const [view, setView] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);
    const [saFrequency, setSaFrequency] = useState(null);
    const [detectedNotes, setDetectedNotes] = useState([]);
    const [possibleRagas, setPossibleRagas] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [activeMode, setActiveMode] = useState('standard');
    const [selectedRaga, setSelectedRaga] = useState(null); // { raga, hasClearMatch, type: 'library' | 'identify' | 'melakarta' }

    const noteHistory = useRef([]);
    const sessionFreq = useRef({});
    const step = !isListening ? 1 : !saFrequency ? 2 : 3;

    // Body scroll lock
    useEffect(() => {
        if (selectedRaga) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedRaga]);

    const handlePitchDetected = (frequency) => {
        if (!saFrequency) return;
        const swaram = getSwaram(frequency, saFrequency);
        if (!swaram) return;

        const now = Date.now();
        noteHistory.current.push({ note: swaram, time: now });
        noteHistory.current = noteHistory.current.filter(e => now - e.time < 3000);

        const window = noteHistory.current.filter(e => now - e.time < 900);
        if (window.length < 5) return;
        const matches = window.filter(e => e.note === swaram).length;
        if (matches / window.length >= 0.85) {
            sessionFreq.current[swaram] = (sessionFreq.current[swaram] || 0) + 1;
            setDetectedNotes(prev => {
                if (prev.includes(swaram)) return prev;
                return [...prev, swaram];
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (detectedNotes.length >= 3) {
                setPossibleRagas(identifyRaga(detectedNotes, sessionFreq.current));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [detectedNotes]);

    const handleReset = () => {
        setDetectedNotes([]);
        setPossibleRagas([]);
        noteHistory.current = [];
        sessionFreq.current = {};
    };

    const handleRemoveNote = (note) => {
        noteHistory.current = noteHistory.current.filter(e => e.note !== note);
        delete sessionFreq.current[note];
        setDetectedNotes(prev => {
            const next = prev.filter(n => n !== note);
            if (next.length >= 3) setPossibleRagas(identifyRaga(next, sessionFreq.current));
            else setPossibleRagas([]);
            return next;
        });
    };

    const goTo = (id) => {
        if (id !== 'listen') handleReset();
        setView(id);
    };

    return (
        <>
            {/* ══ UNIFIED MODAL (PORTAL) ══ */}
            {selectedRaga && createPortal(
                <div 
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-c-bg/95 backdrop-blur-md animate-fade-in" 
                    onClick={() => setSelectedRaga(null)}
                >
                    <div 
                        className="bg-c-surface border border-c-border/40 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide relative" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sticky Header - Solid background forced */}
                        <div className="sticky top-0 bg-[#F3EAD6] border-b border-c-border/20 px-6 py-4 flex justify-between items-center z-30">
                            <div className="flex flex-col">
                                <h3 className="font-playfair text-c-gold text-sm italic tracking-widest uppercase">
                                    {selectedRaga.type === 'melakarta' ? `Melakarta ${selectedRaga.raga.number}` : 'Raagam Profile'}
                                </h3>
                                {selectedRaga.hasClearMatch && (
                                    <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-tighter">High Confidence Match</span>
                                )}
                            </div>
                            <button 
                                onClick={() => setSelectedRaga(null)} 
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-c-border/20 hover:bg-c-gold/20 text-c-cream-dim hover:text-c-gold transition-all duration-300"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8">
                            {selectedRaga.type === 'melakarta' && !RAGAS[selectedRaga.raga.ragaKey] ? (
                                <div className="text-center py-6">
                                    <h2 className="font-playfair text-4xl md:text-5xl text-c-gold mb-8">{selectedRaga.raga.name}</h2>
                                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
                                        {selectedRaga.raga.notes.map((note, i) => (
                                            <React.Fragment key={i}>
                                                <span className="font-mono text-base md:text-lg text-c-cream bg-c-card px-4 py-2 rounded-lg border border-c-border/40 shadow-sm">
                                                    {note}
                                                </span>
                                                {i < selectedRaga.raga.notes.length - 1 && (
                                                    <span className="text-c-border text-sm">→</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                        <span className="text-c-border text-sm">→</span>
                                        <span className="font-mono text-base md:text-lg text-c-cream-dark bg-c-card px-4 py-2 rounded-lg border border-c-border/40 shadow-sm opacity-60">
                                            Sa
                                        </span>
                                    </div>
                                    <p className="mt-8 text-xs text-c-cream-dark font-playfair italic max-w-md mx-auto">
                                        This Melakarta hasn't been fully documented with lore and mood yet, but its scale is mathematically defined above.
                                    </p>
                                </div>
                            ) : (
                                <RagaDetail 
                                    raga={selectedRaga.type === 'melakarta' ? { name: selectedRaga.raga.name, ...RAGAS[selectedRaga.raga.ragaKey] } : selectedRaga.raga} 
                                    hasClearMatch={selectedRaga.hasClearMatch} 
                                />
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}

            <div className="min-h-screen bg-c-bg text-c-cream flex flex-col relative">
            {/* Global Texture Overlay for Nostalgic Feel */}
            <div className="texture-overlay" />

            {/* ── Mobile Menu Overlay ── */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div 
                        className="mt-auto bg-c-card border-t border-c-gold/20 p-4 pb-8 animate-fade-in"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-playfair text-c-gold text-sm tracking-widest uppercase">Navigate</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-c-border/20 text-c-cream-dim text-sm">✕</button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {FEATURES.map(({ id, label, mobileSymbol }) => (
                                <button
                                    key={id}
                                    onClick={() => { goTo(id); setMobileMenuOpen(false); }}
                                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                                        view === id
                                            ? 'border-c-gold bg-c-gold/10 text-c-gold'
                                            : 'border-c-border bg-c-surface text-c-cream-dim active:bg-c-gold/10'
                                    }`}
                                >
                                    <span className="text-xl">{mobileSymbol}</span>
                                    <span className="text-[10px] font-playfair font-bold uppercase tracking-wide">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Top Nav ── */}
            <nav className="bg-c-card border-b border-c-border px-4 md:px-6 py-3 md:py-4 flex items-center justify-between sticky top-0 z-40 shadow-md backdrop-blur-md">
                <button
                    onClick={() => { setView('home'); setShowFeatures(false); }}
                    className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
                >
                    <VeenaIcon />
                    <div>
                        <div className="font-playfair text-c-gold text-base md:text-lg leading-none">Alapana</div>
                        <div className="text-c-cream-dark text-[8px] md:text-[9px] tracking-widest uppercase">Carnatic Music</div>
                    </div>
                </button>

                {/* Desktop nav tabs */}
                <div className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide">
                    {FEATURES.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => goTo(id)}
                            className={`px-4 py-2 text-[11px] font-playfair font-bold tracking-[0.1em] uppercase transition-all duration-300 relative flex-shrink-0 ${
                                view === id
                                    ? 'text-c-gold'
                                    : 'text-c-cream-dim hover:text-c-gold/60'
                            }`}
                        >
                            {label}
                            {view === id && (
                                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-c-gold to-transparent" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-c-surface transition-colors"
                >
                    <span className={`block w-5 h-0.5 bg-c-gold transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-c-gold transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-c-gold transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </nav>

            {/* ── Mobile bottom tab bar ── */}
            {view !== 'home' && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-c-card border-t border-c-border flex items-stretch overflow-x-auto scrollbar-hide shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
                    {FEATURES.map(({ id, mobileSymbol, label }) => (
                        <button
                            key={id}
                            onClick={() => goTo(id)}
                            className={`flex flex-col items-center justify-center gap-0.5 flex-shrink-0 px-3 py-2 min-w-[56px] transition-all ${
                                view === id
                                    ? 'text-c-gold border-t-2 border-c-gold -mt-0.5'
                                    : 'text-c-cream-dark border-t-2 border-transparent -mt-0.5'
                            }`}
                        >
                            <span className="text-base">{mobileSymbol}</span>
                            <span className="text-[8px] font-bold uppercase tracking-tight leading-none">{label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* ── Page content ── */}
            <div className="flex-1 flex flex-col items-center w-full pb-16 md:pb-0">

                {/* ══ HOME ══ */}
                {view === 'home' && (
                        <div
                            className="w-full flex flex-col items-center relative overflow-hidden transition-all duration-1000 animate-fade-in"
                            style={{
                                minHeight: 'calc(100vh - 73px)',
                                background: 'radial-gradient(circle at center, #7a2a10 0%, #3a1208 50%, #1a0804 100%)',
                                justifyContent: 'center',
                            }}
                        >
                        {/* Vignette Overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-[1]" />
                        
                        {/* Subtle Noise/Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[2] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                        {/* Glow */}
                        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-c-gold/10 blur-[160px] pointer-events-none rounded-full z-0" />

                        {/* Rotating mandala */}
                        <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[160vw] h-[160vw] opacity-[0.12] z-0">
                            <img
                                src="/hero-mandala.jpg"
                                alt=""
                                className="w-full h-full object-cover"
                                style={{
                                    filter: 'invert(1) sepia(1) saturate(500%) hue-rotate(-20deg) brightness(0.8)',
                                    mixBlendMode: 'screen',
                                    animation: 'spin 240s linear infinite',
                                }}
                            />
                        </div>

                            <div
                                className="relative z-10 flex flex-col items-center text-center px-6 transition-all duration-700 overflow-hidden"
                                style={!showFeatures
                                    ? { minHeight: 'calc(100vh - 73px)', justifyContent: 'center', paddingBottom: '2.5rem', opacity: 1 }
                                    : { height: 0, padding: 0, opacity: 0, margin: 0 }
                                }
                            >
                            <div className="flex items-center gap-6 mb-6 w-full max-w-sm opacity-90">
                                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-c-gold/50 to-transparent" />
                                <div className="drop-shadow-[0_0_12px_rgba(200,148,31,0.6)] scale-110"><VeenaIcon /></div>
                                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-c-gold/50 to-transparent" />
                            </div>

                            <h1
                                className="font-playfair text-5xl sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-c-gold-light via-[#f7d686] to-[#b88014] tracking-wider uppercase leading-none mb-3 drop-shadow-xl"
                                style={{ textShadow: '0 4px 30px rgba(227,168,33,0.4)' }}
                            >
                                Alapana
                            </h1>
                            <p className="text-[#f7d686] text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3 drop-shadow-md">
                                Carnatic Music
                            </p>
                            <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-[280px] sm:max-w-[320px] leading-relaxed font-light italic mb-8 md:mb-10">
                                From discovering ragas to refining every note, everything you need for Carnatic practice lives here.
                            </p>

                            {/* CTAs  ·  fade out once features are shown */}
                            <div
                                className="transition-all duration-500 flex flex-col items-center gap-4"
                                style={{ opacity: showFeatures ? 0 : 1, pointerEvents: showFeatures ? 'none' : 'auto', height: showFeatures ? 0 : 'auto', overflow: 'hidden' }}
                            >
                                {/* Primary: Start Learning */}
                                <button
                                    onClick={() => goTo('tutor')}
                                    className="relative overflow-hidden group bg-c-gold hover:bg-[#f7d686] text-c-bg font-playfair font-bold px-14 py-4 rounded-full text-sm md:text-base tracking-[0.2em] uppercase transition-all duration-500 transform hover:scale-105 shadow-[0_0_40px_rgba(200,148,31,0.35)]"
                                >
                                    <span className="relative z-10">Start Learning</span>
                                </button>
                                <p className="text-white/40 text-[11px] font-playfair italic">New to Carnatic music? Start here.</p>

                                {/* Secondary: All tools */}
                                <button
                                    onClick={() => setShowFeatures(true)}
                                    className="border border-c-gold/30 hover:border-c-gold/60 text-white/50 hover:text-[#f7d686] font-playfair px-8 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-500"
                                >
                                    I already know Carnatic music →
                                </button>
                            </div>
                        </div>

                        {/* Feature grid  ·  revelation transition */}
                        <div
                            className="relative z-10 w-full max-w-5xl px-3 sm:px-5 flex flex-col items-center justify-center transition-all duration-1000 ease-out"
                            style={{
                                opacity: showFeatures ? 1 : 0,
                                transform: showFeatures ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
                                pointerEvents: showFeatures ? 'auto' : 'none',
                                flexGrow: showFeatures ? 1 : 0,
                                minHeight: showFeatures ? '60vh' : 0,
                                paddingBottom: showFeatures ? '2rem' : 0,
                            }}
                        >
                            {/* Suggested path banner */}
                            <div className="w-full max-w-4xl mb-5 px-1">
                                <p className="text-white/35 text-[10px] font-playfair italic text-center tracking-wide">
                                    Suggested path for beginners: <span className="text-c-gold/60">Tutor → Shruthi → Talam → Sing</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 w-full max-w-4xl mx-auto">
                                {FEATURES.map(({ id, label, desc, symbol, level }, idx) => (
                                    <button
                                        key={id}
                                        onClick={() => goTo(id)}
                                        className={`group relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center transition-all duration-500 hover:-translate-y-3 h-full w-full ${
                                            idx === FEATURES.length - 1 ? 'col-span-2 lg:col-span-1' : ''
                                        }`}
                                        style={{
                                            transitionDelay: showFeatures ? `${idx * 60}ms` : '0ms',
                                            opacity: showFeatures ? 1 : 0,
                                            transform: showFeatures ? 'translateY(0)' : 'translateY(20px)',
                                        }}
                                    >
                                    {/* The Plaque Base — extra glow for Tutor */}
                                    <div className={`absolute inset-0 rounded-lg shadow-2xl transition-all duration-300 ${
                                        level === 'start'
                                            ? 'bg-[#1e0c04] border border-c-gold/60 shadow-[0_0_24px_rgba(200,148,31,0.15)] group-hover:border-c-gold'
                                            : 'bg-[#1e0c04] border border-c-gold/30 group-hover:border-c-gold/70'
                                    }`} />

                                    {/* Inner Decorative Border */}
                                    <div className="absolute inset-1.5 border border-c-gold/10 rounded-md pointer-events-none" />

                                    {/* Ornate Corners */}
                                    <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-c-gold/40 rounded-tl-lg group-hover:w-7 group-hover:h-7 transition-all duration-500" />
                                    <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-c-gold/40 rounded-tr-lg group-hover:w-7 group-hover:h-7 transition-all duration-500" />
                                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-c-gold/40 rounded-bl-lg group-hover:w-7 group-hover:h-7 transition-all duration-500" />
                                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-c-gold/40 rounded-br-lg group-hover:w-7 group-hover:h-7 transition-all duration-500" />

                                    {/* Symbol with shadow */}
                                    <div className="relative z-10 text-c-gold text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:scale-110 group-hover:text-[#f7d686] transition-all duration-500">
                                        {symbol}
                                    </div>

                                    {/* Text with vintage spacing */}
                                    <h3 className="relative z-10 font-playfair text-[#f7d686] text-[10px] sm:text-xs md:text-base font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase mb-1 sm:mb-1.5 group-hover:text-white transition-colors duration-300">
                                        {label}
                                    </h3>
                                    <p className="relative z-10 text-white/50 text-[9px] sm:text-[10px] md:text-xs leading-relaxed italic max-w-[120px] sm:max-w-[140px] opacity-70 group-hover:opacity-100 transition-opacity hidden sm:block">
                                        {desc}
                                    </p>

                                    {/* Subtle Teak Texture Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none" />
                                    <div className="absolute inset-0 bg-c-gold/0 group-hover:bg-c-gold/5 transition-colors duration-500 rounded-lg pointer-events-none" />
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>
            )}

                {/* ══ TUTOR ══ */}
                {view === 'tutor' && <Tutor saFrequency={saFrequency} />}

                {/* ══ LISTEN ══ */}
                {view === 'listen' && (
                    <main className="w-full max-w-2xl mx-auto flex flex-col items-center gap-7 px-4 md:px-8 py-10 animate-fade-in">
                        <div className="w-full flex flex-col items-center gap-7">
                            {/* Step guide */}
                            <div className="w-full flex items-center gap-2">
                                {[
                                    { n: 1, label: 'Wake the mic' },
                                    { n: 2, label: 'Find your Sa' },
                                    { n: 3, label: 'Sing freely' },
                                ].map(({ n, label }, i, arr) => (
                                    <React.Fragment key={n}>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors ${
                                                step > n
                                                    ? 'border-c-gold bg-c-gold text-c-bg'
                                                    : step === n
                                                    ? 'border-c-gold/60 bg-c-gold-faint text-c-gold'
                                                    : 'border-c-border bg-transparent text-c-cream-dark'
                                            }`}>
                                                {step > n ? '✓' : n}
                                            </div>
                                            <span className={`text-xs hidden sm:block transition-colors ${
                                                step === n ? 'text-c-cream' : step > n ? 'text-c-cream-dim' : 'text-c-cream-dark'
                                            }`}>
                                                {label}
                                            </span>
                                        </div>
                                        {i < arr.length - 1 && (
                                            <div className={`flex-1 h-px ${step > n ? 'bg-c-gold/30' : 'bg-c-border'}`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <AudioInput
                                onPitchDetected={handlePitchDetected}
                                onSaSet={setSaFrequency}
                                saFrequency={saFrequency}
                                onStart={() => setIsListening(true)}
                            />

                            {saFrequency && (
                                <div className="w-full">
                                    <button
                                        onClick={handleReset}
                                        className="block mx-auto mb-6 text-xs text-c-cream-dark hover:text-c-gold transition-colors underline underline-offset-2 font-playfair italic"
                                    >
                                        Start fresh
                                    </button>

                                    <div className="flex justify-center mb-8">
                                        <div className="bg-c-card border border-c-border p-1 rounded-full flex items-center shadow-lg">
                                            <button
                                                onClick={() => setActiveMode('standard')}
                                                className={`px-6 py-2 rounded-full text-xs font-playfair tracking-wide transition-all ${
                                                    activeMode === 'standard'
                                                        ? 'bg-c-gold text-c-bg'
                                                        : 'text-c-cream-dim hover:text-c-cream'
                                                }`}
                                            >
                                                Standard
                                            </button>
                                            <button
                                                onClick={() => setActiveMode('groq')}
                                                className={`px-6 py-2 rounded-full text-xs font-playfair tracking-wide transition-all ${
                                                    activeMode === 'groq'
                                                        ? 'bg-c-gold text-c-bg'
                                                        : 'text-c-cream-dim hover:text-c-cream'
                                                }`}
                                            >
                                                Groq AI
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-full animate-fade-in">
                                        {activeMode === 'standard' ? (
                                            <div className="flex flex-col items-center w-full">
                                                <p className="text-[11px] text-c-cream-dark text-center font-playfair italic mb-5 opacity-80 max-w-sm">
                                                    Best for straightforward singing. Matches exact notes instantly but won't pick up fluid gamakams.
                                                </p>
                                                <RagaDisplay 
                                                    ragas={possibleRagas} 
                                                    detectedNotes={detectedNotes} 
                                                    onRemoveNote={handleRemoveNote} 
                                                    onSelectRaga={(r, clear) => setSelectedRaga({ raga: r, hasClearMatch: clear, type: 'identify' })}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col w-full">
                                                <p className="text-[11px] text-c-cream-dark text-center font-playfair italic mb-5 opacity-80 max-w-sm mx-auto">
                                                    Best for nuanced singing. Records a 30s phrase and uses AI to identify characteristic gamakams and prayogams.
                                                </p>
                                                <GroqPanel saFrequency={saFrequency} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                )}

                {view === 'library' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <RagaLibrary onSelectRaga={(r) => setSelectedRaga({ raga: r, hasClearMatch: true, type: 'library' })} />
                    </div>
                )}
                {view === 'melakarta' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <MelakartaChart onSelectRaga={(r) => setSelectedRaga({ raga: r, type: 'melakarta' })} />
                    </div>
                )}
                {view === 'keyboard' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <SwaraKeyboard />
                    </div>
                )}
                {view === 'bhedam' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <GrahaBhedam />
                    </div>
                )}
                {view === 'singback' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <SingBackChallenge />
                    </div>
                )}
                {view === 'shruthi' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <ShruthiBox />
                    </div>
                )}
                {view === 'talam' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <Talam />
                    </div>
                )}
            </div>

            <footer className="py-6 text-center text-c-cream-dark text-xs font-playfair italic border-t border-c-border">
                Alapana · Carnatic Music
            </footer>
        </div>
    </>
  );
}

export default App;
