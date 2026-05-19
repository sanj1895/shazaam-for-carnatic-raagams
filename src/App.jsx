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
import OnboardingTour from './components/OnboardingTour';

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
    { id: 'sadhana',   label: 'Sadhana',      desc: 'Your recommended daily practice path',    symbol: '🧘‍♀️', mobileSymbol: '🧘‍♀️', level: 'start' },
    { id: 'tutor',     label: 'Tutor',        desc: 'Learn Carnatic singing from scratch',    symbol: '◈',  mobileSymbol: '🎓', level: 'beginner' },
    { id: 'shruthi',   label: 'Shruthi',      desc: 'Continuous drone for practice',          symbol: '〜', mobileSymbol: '🎵', level: 'beginner' },
    { id: 'talam',     label: 'Talam',        desc: 'Keep the rhythmic cycle',                symbol: '॥',  mobileSymbol: '🥁', level: 'beginner' },
    { id: 'listen',    label: 'Sing',         desc: 'Sing a melody  ·  find the raga',       symbol: '♬',  mobileSymbol: '🎤', level: 'intermediate' },
    { id: 'keyboard',  label: 'Keyboard',     desc: 'Play swaras on virtual keys',            symbol: '♩',  mobileSymbol: '🎹', level: 'intermediate' },
    { id: 'singback',  label: 'Sing-Back',    desc: 'Challenge your raga memory',             symbol: '◎',  mobileSymbol: '🎯', level: 'intermediate' },
    { id: 'library',   label: 'Library',      desc: 'Browse every Carnatic raga',             symbol: '◈',  mobileSymbol: '📚', level: 'all' },
    { id: 'melakarta', label: 'Melakarta',    desc: 'The complete 72-raga parent chart',      symbol: '⊹',  mobileSymbol: '🗂️', level: 'advanced' },
    { id: 'bhedam',    label: 'Graha Bhedam', desc: 'Discover modal shifts between ragas',    symbol: '↻',  mobileSymbol: '🔄', level: 'advanced' },
];

const SADHANA_TABS = ['shruthi', 'tutor', 'keyboard', 'singback'];

function loadSadhanaState() {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    try {
        const s = JSON.parse(localStorage.getItem('alapana_sadhana_v1') || 'null');
        if (!s) return { date: today, completed: [], streak: 0 };
        if (s.date === today) return s;
        const streak = (s.date === yesterday && s.completed.length >= SADHANA_TABS.length)
            ? (s.streak || 0) + 1 : 0;
        return { date: today, completed: [], streak };
    } catch { return { date: today, completed: [], streak: 0 }; }
}

function App() {
    const [view, setView] = useState(() => {
        const hash = window.location.hash.replace(/^#\/?/, '');
        return hash || 'home';
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showFeatures, setShowFeatures] = useState(() => {
        const hash = window.location.hash.replace(/^#\/?/, '');
        return hash && hash !== 'home' ? true : false;
    });
    const [saFrequency, setSaFrequency] = useState(null);
    const [detectedNotes, setDetectedNotes] = useState([]);
    const [possibleRagas, setPossibleRagas] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [activeMode, setActiveMode] = useState('standard');
    const [tourActive, setTourActive] = useState(false);
    const [sadhana, setSadhana] = useState(loadSadhanaState);
    const [sadhanaToast, setSadhanaToast] = useState(null); // { title, stepName }
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

    const markSadhanaStep = (tab) => {
        const detailsMap = {
            shruthi: { title: 'Warm-Up Complete', stepName: 'Step 1' },
            tutor: { title: 'AI Vocal Practice Complete', stepName: 'Step 2' },
            keyboard: { title: 'Scale Exploration Complete', stepName: 'Step 3' },
            singback: { title: 'Ear Training Challenge Complete', stepName: 'Step 4' },
        };

        let didCompleteNew = false;
        setSadhana(prev => {
            if (prev.completed.includes(tab)) return prev;
            didCompleteNew = true;
            const next = { ...prev, completed: [...prev.completed, tab] };
            localStorage.setItem('alapana_sadhana_v1', JSON.stringify(next));
            return next;
        });

        if (didCompleteNew && detailsMap[tab]) {
            setSadhanaToast({
                title: detailsMap[tab].title,
                stepName: detailsMap[tab].stepName
            });
            setTimeout(() => {
                setSadhanaToast(null);
            }, 4000);
        }
    };

    const viewRef = useRef(view);
    viewRef.current = view;

    // Listen for hashchange events (back/forward navigation only — not goTo-triggered changes)
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace(/^#\/?/, '');
            const targetView = hash || 'home';
            if (targetView !== viewRef.current) {
                if (targetView !== 'listen') handleReset();
                setView(targetView);
                setShowFeatures(targetView !== 'home');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const goTo = (id) => {
        if (id !== 'listen') handleReset();
        setView(id);
        if (id === 'home') {
            setShowFeatures(false);
        } else {
            setShowFeatures(true);
        }
        window.location.hash = `#/${id}`;
    };

    return (
        <>
            <OnboardingTour 
                active={tourActive} 
                onDismiss={() => {
                    setTourActive(false);
                    setShowFeatures(false);
                    goTo('home');
                }} 
                onStartLearning={() => {
                    setTourActive(false);
                    goTo('tutor');
                }} 
                onGoTo={goTo}
            />

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
                                    initialSaHz={saFrequency}
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

                        {/* Rotating mandala — radial mask to remove hard rectangle edge */}
                        <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[160vw] h-[160vw] opacity-[0.12] z-0"
                            style={{ maskImage: 'radial-gradient(ellipse 45% 45% at 50% 50%, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 45% 45% at 50% 50%, black 30%, transparent 75%)' }}
                        >
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
                                id="tour-logo"
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
                                className="transition-all duration-500 flex flex-col items-center gap-4 animate-fade-in"
                                style={{ opacity: showFeatures ? 0 : 1, pointerEvents: showFeatures ? 'none' : 'auto', height: showFeatures ? 0 : 'auto', overflow: showFeatures ? 'hidden' : 'visible' }}
                            >
                                {/* Primary: Start Learning */}
                                <button
                                    onClick={() => goTo('tutor')}
                                    className="group bg-c-gold hover:bg-[#f7d686] text-c-bg font-playfair font-bold px-14 py-4 rounded-full text-sm md:text-base tracking-[0.2em] uppercase transition-all duration-500 transform hover:scale-105 shadow-[0_0_40px_rgba(200,148,31,0.35)] cursor-pointer"
                                >
                                    Start Learning
                                </button>
                                <p className="text-white/40 text-[11px] font-playfair italic">New to Carnatic music? Start here.</p>

                                {/* Secondary: All tools */}
                                <button
                                    onClick={() => setShowFeatures(true)}
                                    className="border border-c-gold/30 hover:border-c-gold/60 text-white/50 hover:text-[#f7d686] font-playfair px-8 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer"
                                >
                                    I already know Carnatic music →
                                </button>

                                {/* Tour Trigger Option */}
                                <button
                                    onClick={() => {
                                        if (window.innerWidth < 768) {
                                            const confirmTour = window.confirm(
                                                "💻 Laptop Recommended!\n\nFor the best experience, we highly recommend taking the Guided Tour on a laptop or desktop computer, as it can cause performance issues or lag on some mobile devices.\n\nWould you like to try it on mobile anyway?"
                                            );
                                            if (!confirmTour) return;
                                        }
                                        setTourActive(true);
                                    }}
                                    className="text-c-gold/80 hover:text-c-gold font-playfair px-6 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer mt-1 hover:scale-105 active:scale-95"
                                >
                                    <span>🪔</span> Take a Guided Tour
                                </button>
                            </div>
                        </div>

                        {/* Feature grid  ·  revelation transition */}
                        <div
                            className="relative z-10 w-full max-w-6xl px-3 sm:px-5 flex flex-col items-center justify-center transition-all duration-1000 ease-out"
                            style={{
                                opacity: showFeatures ? 1 : 0,
                                transform: showFeatures ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
                                pointerEvents: showFeatures ? 'auto' : 'none',
                                flexGrow: showFeatures ? 1 : 0,
                                minHeight: showFeatures ? '50vh' : 0,
                                paddingBottom: showFeatures ? '1rem' : 0,
                            }}
                        >
                            {/* Suggested path banner */}
                            <div className="w-full max-w-5xl mb-4 px-1">
                                <p className="text-white/35 text-[10px] font-playfair italic text-center tracking-wide">
                                    Suggested path for beginners: <span className="text-c-gold/60">Sadhana → Tutor → Shruthi → Talam</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 w-full max-w-5xl mx-auto">
                                {FEATURES.map(({ id, label, desc, symbol, level }, idx) => (
                                    <button
                                        key={id}
                                        onClick={() => goTo(id)}
                                        className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 md:p-5 text-center transition-all duration-500 hover:-translate-y-1.5 h-full w-full"
                                        style={{
                                            transitionDelay: showFeatures ? `${idx * 50}ms` : '0ms',
                                            opacity: showFeatures ? 1 : 0,
                                            transform: showFeatures ? 'translateY(0)' : 'translateY(20px)',
                                        }}
                                    >
                                    {/* The Plaque Base — extra glow for Tutor */}
                                    <div className={`absolute inset-0 rounded-lg shadow-xl transition-all duration-300 ${
                                        level === 'start'
                                            ? 'bg-[#1e0c04] border border-c-gold/60 shadow-[0_0_20px_rgba(200,148,31,0.15)] group-hover:border-c-gold'
                                            : 'bg-[#1e0c04] border border-c-gold/30 group-hover:border-c-gold/70'
                                    }`} />

                                    {/* Inner Decorative Border */}
                                    <div className="absolute inset-1.5 border border-c-gold/10 rounded-md pointer-events-none" />

                                    {/* Ornate Corners */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-c-gold/40 rounded-tl-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-c-gold/40 rounded-tr-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-c-gold/40 rounded-bl-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-c-gold/40 rounded-br-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />

                                    {/* Symbol with shadow */}
                                    <div className="relative z-10 text-c-gold text-xl sm:text-2xl mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:scale-110 group-hover:text-[#f7d686] transition-all duration-500">
                                        {symbol}
                                    </div>

                                    {/* Text with vintage spacing */}
                                    <h3 className="relative z-10 font-playfair text-[#f7d686] text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.12em] uppercase mb-1 group-hover:text-white transition-colors duration-300">
                                        {label}
                                    </h3>
                                    <p className="relative z-10 text-white/50 text-[9px] sm:text-[10px] leading-relaxed italic max-w-[130px] opacity-70 group-hover:opacity-100 transition-opacity hidden sm:block">
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
                {view === 'tutor' && <Tutor saFrequency={saFrequency} onSadhanaComplete={markSadhanaStep} />}

                {/* ══ LISTEN ══ */}
                {view === 'listen' && (
                    <main className="w-full max-w-2xl mx-auto flex flex-col items-center gap-7 px-4 md:px-8 py-10 animate-fade-in">
                        <div className="w-full flex flex-col items-center gap-7">

                            {/* How-to card */}
                            <div className="w-full bg-c-gold-faint border border-c-gold/25 rounded-xl p-4 flex gap-3 items-start">
                                <span className="text-c-gold text-base flex-shrink-0 mt-0.5">♬</span>
                                <div className="flex flex-col gap-2.5">
                                    <p className="font-playfair text-c-cream text-sm font-bold">Sing freely — find your raga</p>
                                    <p className="text-c-cream-dim text-xs leading-relaxed">
                                        Sing any Carnatic melody and Alapana listens in real time, detecting each note and matching them to a raga.
                                    </p>
                                    <ol className="flex flex-col gap-1.5 text-xs text-c-cream-dim leading-relaxed list-none">
                                        <li className="flex gap-2"><span className="text-c-gold font-bold flex-shrink-0">1.</span><span>Allow microphone access and turn on pitch detection.</span></li>
                                        <li className="flex gap-2"><span className="text-c-gold font-bold flex-shrink-0">2.</span><span>Sing your <span className="text-c-gold font-semibold">Sa</span> — the first note of the Carnatic scale, like "Do" in Do-Re-Mi. It's the note your melody always comes back to and feels settled on. Pick a comfortable pitch and sing it steadily so Alapana can lock on to it.</span></li>
                                        <li className="flex gap-2"><span className="text-c-gold font-bold flex-shrink-0">3.</span><span>Sing your melody. Hold each note for a moment so it's detected, then watch the raga suggestions appear.</span></li>
                                    </ol>
                                    <p className="text-[10px] text-c-cream-dark italic border-t border-c-gold/15 pt-2">
                                        <span className="text-c-gold/80">Standard</span> mode works best for clear, straight notes.&ensp;
                                        <span className="text-c-gold/80">Groq AI</span> mode records 30 seconds and uses AI to catch subtle ornaments — use it once you're comfortable.
                                    </p>
                                </div>
                            </div>

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
                                            <div className="flex flex-col items-center w-full pitch-detector-container">
                                                <p className="text-[11px] text-c-cream-dark text-center font-playfair italic mb-5 opacity-80 max-w-sm">
                                                    Detects notes in real time as you sing. Great for beginners — just hold each note clearly and the raga builds up live.
                                                </p>
                                                <RagaDisplay 
                                                    ragas={possibleRagas} 
                                                    detectedNotes={detectedNotes} 
                                                    onRemoveNote={handleRemoveNote} 
                                                    onSelectRaga={(r, clear) => setSelectedRaga({ raga: r, hasClearMatch: clear, type: 'identify' })}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col w-full groq-ai-container">
                                                <p className="text-[11px] text-c-cream-dark text-center font-playfair italic mb-5 opacity-80 max-w-sm mx-auto">
                                                    Records a 30-second phrase, then sends the note sequence to Groq AI for deeper analysis — better at catching fluid ornaments and complex phrases.
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
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in raga-library-container">
                        <RagaLibrary onSelectRaga={(r) => setSelectedRaga({ raga: r, hasClearMatch: true, type: 'library' })} />
                    </div>
                )}
                {view === 'melakarta' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in raga-melakarta-chart">
                        <MelakartaChart onSelectRaga={(r) => setSelectedRaga({ raga: r, type: 'melakarta' })} />
                    </div>
                )}
                {view === 'keyboard' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in swara-keyboard-container">
                        <SwaraKeyboard onSadhanaComplete={markSadhanaStep} />
                    </div>
                )}
                {view === 'bhedam' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <GrahaBhedam />
                    </div>
                )}
                {view === 'singback' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <SingBackChallenge onSadhanaComplete={markSadhanaStep} />
                    </div>
                )}
                {view === 'shruthi' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <ShruthiBox onSadhanaComplete={markSadhanaStep} />
                    </div>
                )}
                {view === 'talam' && (
                    <div className="w-full p-4 md:p-8 flex flex-col items-center animate-fade-in">
                        <Talam />
                    </div>
                )}
                {view === 'sadhana' && (() => {
                    const steps = [
                        { n: 1, name: 'Tune & Warm Up',  tab: 'shruthi',  icon: '🎶', desc: 'Drone Baseline Alignment',    longDesc: 'Open the Shruthi Box and sustain a warm "ah" sound along with the drone for 30 seconds to lock in your pitch center.', btnText: 'Launch Shruthi Box' },
                        { n: 2, name: 'AI Vocal Tutor',  tab: 'tutor',    icon: '🎓', desc: 'Classical Scale Practice',    longDesc: 'Sing ascending/descending scales under real-time guidance from the AI Guru to build pitch stability and timing.', btnText: 'Start AI Tutor' },
                        { n: 3, name: 'Explore Scales',  tab: 'keyboard', icon: '🎹', desc: 'Swarasthana Visualization',   longDesc: 'Play individual swaras on the virtual keyboard to hear and internalize the exact intervals of a scale.', btnText: 'Open Swara Keyboard' },
                        { n: 4, name: 'Ear Training',    tab: 'singback', icon: '🎯', desc: 'Phrase Reproduction',         longDesc: 'Listen to a phrase and reproduce it by ear. Aim for 80 %+ to sharpen pitch memory and muscle memory together.', btnText: 'Launch Sing-Back' },
                    ];
                    const doneCount = sadhana.completed.length;
                    const pct = Math.round((doneCount / steps.length) * 100);
                    return (
                    <div className="w-full max-w-3xl p-4 md:p-8 flex flex-col items-center animate-fade-in mx-auto">
                        <div className="text-center mb-6">
                            <span className="text-[10px] uppercase tracking-widest text-c-gold font-mono">Daily Vocal Routine</span>
                            <h2 className="font-playfair text-3xl font-bold text-c-cream mt-1">Daily Sadhana</h2>
                            <div className="w-16 h-px bg-c-gold/30 mx-auto mt-2" />
                            <p className="text-c-cream-dim text-xs font-playfair italic max-w-md mx-auto mt-3">
                                A daily sequence to build pitch, scale accuracy, and raga memory step by step. Resets each morning.
                            </p>
                        </div>

                        {/* Progress card — light theme */}
                        <div className="w-full border border-c-border bg-c-card rounded-xl p-5 relative overflow-hidden mb-6 tour-sadhana-console">
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="heritage-border-corner heritage-corner-tl" />
                                <div className="heritage-border-corner heritage-corner-tr" />
                                <div className="heritage-border-corner heritage-corner-bl" />
                                <div className="heritage-border-corner heritage-corner-br" />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-c-border/50 pb-4 mb-4 relative z-10">
                                <div>
                                    <span className="text-[9px] uppercase tracking-widest text-c-gold font-mono">Today's Progress</span>
                                    <h3 className="font-playfair text-lg font-bold text-c-cream mt-0.5">{doneCount} of {steps.length} steps done</h3>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-1.5 border border-c-border rounded-full bg-c-surface">
                                    <span className="text-xs text-c-cream font-mono">Streak: <strong>🔥 {sadhana.streak} {sadhana.streak === 1 ? 'day' : 'days'}</strong></span>
                                </div>
                            </div>
                            <div className="space-y-1.5 relative z-10">
                                <div className="flex justify-between text-xs font-mono text-c-cream-dim">
                                    <span>Daily target</span>
                                    <span className="text-c-gold font-bold">{pct}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-c-surface border border-c-border/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-c-gold-dim to-c-gold rounded-full transition-all duration-700"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                {doneCount === steps.length && (
                                    <p className="text-[11px] text-emerald-700 font-playfair italic text-center pt-1">
                                        ✦ Today's sadhana complete — well done!
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Steps grid — light theme */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {steps.map((item) => {
                                const done = sadhana.completed.includes(item.tab);
                                return (
                                <div
                                    key={item.n}
                                    className={`border rounded-xl p-5 flex flex-col justify-between transition-all duration-300 ${
                                        done
                                            ? 'border-emerald-600/30 bg-emerald-50/60'
                                            : 'border-c-border bg-c-surface hover:border-c-gold/50'
                                    }`}
                                >
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-mono font-bold ${done ? 'bg-emerald-600 text-white' : 'bg-c-gold/15 text-c-gold'}`}>
                                                {done ? '✓' : item.n}
                                            </span>
                                            <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                                                done
                                                    ? 'border-emerald-600/30 bg-emerald-600/10 text-emerald-700'
                                                    : 'border-c-gold/30 bg-c-gold/5 text-c-gold'
                                            }`}>
                                                {done ? '✓ Done' : 'Pending'}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-playfair text-sm font-bold text-c-cream flex items-center gap-1.5">
                                                <span>{item.icon}</span> {item.name}
                                            </h4>
                                            <span className="text-[10px] text-c-gold font-mono uppercase tracking-wider block mt-0.5">{item.desc}</span>
                                        </div>
                                        <p className="text-xs text-c-cream-dim leading-relaxed font-playfair">
                                            {item.longDesc}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => { markSadhanaStep(item.tab); goTo(item.tab); }}
                                        className={`w-full mt-4 py-2.5 rounded font-playfair font-bold text-xs tracking-wider uppercase transition-all active:scale-[0.98] cursor-pointer ${
                                            done
                                                ? 'bg-c-card border border-c-border text-c-cream-dim hover:bg-c-surface'
                                                : 'bg-c-gold text-c-bg hover:bg-c-gold-light'
                                        }`}
                                    >
                                        {done ? 'Practice again →' : `${item.btnText} →`}
                                    </button>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                    );
                })()}
            </div>

            <footer className="py-6 text-center text-c-cream-dark text-xs font-playfair italic border-t border-c-border">
                Alapana · Carnatic Music
            </footer>
        </div>

        {/* ── GORGEOUS GOLDEN SADHANA TOAST ── */}
        {sadhanaToast && (
            <>
                <style>{`
                    @keyframes sadhanaSlideUp {
                        0% { transform: translate(-50%, 30px); opacity: 0; }
                        100% { transform: translate(-50%, 0); opacity: 1; }
                    }
                `}</style>
                <div 
                    className="fixed bottom-24 left-1/2 z-[11000] max-w-sm w-[90%] pointer-events-none"
                    style={{
                        transform: 'translateX(-50%)',
                        animation: 'sadhanaSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    }}
                >
                    <div className="bg-[#1e0c04]/95 border-2 border-[#f7d686] rounded-xl shadow-[0_10px_35px_rgba(247,214,134,0.3),_0_0_20px_rgba(0,0,0,0.8)] p-4 flex items-center gap-3.5 relative overflow-hidden backdrop-blur-md">
                        {/* Heritage Corners */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="heritage-border-corner heritage-corner-tl opacity-65" />
                            <div className="heritage-border-corner heritage-corner-tr opacity-65" />
                            <div className="heritage-border-corner heritage-corner-bl opacity-65" />
                            <div className="heritage-border-corner heritage-corner-br opacity-65" />
                        </div>
                        
                        {/* Gold pulsing symbol */}
                        <div className="w-10 h-10 rounded-full bg-[#f7d686]/10 border border-[#f7d686]/30 flex items-center justify-center text-[#f7d686] text-xl font-bold flex-shrink-0 animate-pulse">
                            ✨
                        </div>

                        <div className="flex-1 min-w-0 z-10">
                            <div className="text-[9px] font-mono text-[#f7d686]/80 uppercase tracking-[0.2em] font-bold">
                                Sadhana {sadhanaToast.stepName} Done
                            </div>
                            <h4 className="font-playfair text-white text-xs font-bold mt-0.5 leading-tight tracking-wide">
                                {sadhanaToast.title}!
                            </h4>
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
  );
}

export default App;
