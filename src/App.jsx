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

const GurukulIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        {/* Temple Arch / Aureole (Prabhavali) */}
        <path d="M12 52C12 28 20 12 32 12C44 12 52 28 52 52" strokeWidth="2" stroke="currentColor" opacity="0.8" />
        <path d="M8 56C8 24 18 8 32 8C46 8 56 24 56 56" strokeWidth="1" stroke="currentColor" opacity="0.4" strokeDasharray="3 3" />
        
        {/* Traditional Lighted Diya (Oil Lamp) symbolizing classical knowledge */}
        <path d="M18 46C18 51.5 24.3 56 32 56C39.7 56 46 51.5 46 46C46 46 41 46 32 46C23 46 18 46 18 46Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1.8" />
        <path d="M32 46C32 46 36 43 36 39C36 35 32 30 32 30C32 30 28 35 28 39C28 43 32 46 32 46Z" fill="currentColor" className="text-c-gold animate-pulse" />
        
        {/* Radiating sound rays of wisdom */}
        <line x1="32" y1="25" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="22" y1="29" x2="18" y2="26" stroke="currentColor" strokeWidth="1.5" />
        <line x1="42" y1="29" x2="46" y2="26" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Base steps */}
        <rect x="6" y="56" width="52" height="4" rx="2" fill="currentColor" strokeWidth="1" />
    </svg>
);

const DhwaniIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        {/* The Flute Body (double-lined with proper organic thickness) */}
        <line x1="12" y1="52" x2="52" y2="12" stroke="currentColor" strokeWidth="3" />
        <line x1="13" y1="53" x2="53" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        
        {/* Ornate silk threads binding the ends */}
        <line x1="15" y1="49" x2="17" y2="47" stroke="#C8941F" strokeWidth="3.5" />
        <line x1="47" y1="17" x2="49" y2="15" stroke="#C8941F" strokeWidth="3.5" />
        
        {/* Flute holes aligned exactly along center axis */}
        <circle cx="23" cy="41" r="1" fill="currentColor" />
        <circle cx="27" cy="37" r="1" fill="currentColor" />
        <circle cx="31" cy="33" r="1" fill="currentColor" />
        <circle cx="35" cy="29" r="1" fill="currentColor" />
        <circle cx="39" cy="25" r="1" fill="currentColor" />
        <circle cx="43" cy="21" r="1" fill="currentColor" />
        
        {/* Beautiful dangling Carnatic silk tassel/beads hanging from bottom-left tail */}
        <path d="M12 52 C 10 54, 8 55, 7 57" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="7" cy="57" r="1.5" fill="#C8941F" />
        <path d="M7 57 C 6 59, 5 62, 5 63" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        <path d="M7 57 C 8 59, 9 62, 9 63" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        <path d="M7 57 C 7 59, 7 62, 7 63" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        
        {/* Beautiful radiating soundwaves soaring from the blowhole (top-right) */}
        <path d="M49 9 C 52 7, 53 10, 56 8" stroke="currentColor" strokeWidth="1.2" opacity="0.7" className="animate-pulse" />
        <path d="M46 5 C 50 3, 52 6, 56 4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M52 13 C 55 11, 56 14, 59 12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
);

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

const FEATURES = [
    { id: 'tutor',     label: 'Gurukul',      desc: 'Classical vocal academy & scale flow', symbol: '📿',  mobileSymbol: '📿', level: 'beginner', highlight: true },
    { id: 'listen',    label: 'Dhwani',       desc: 'Sing a melody & identify the raga',       symbol: '♬',  mobileSymbol: '♬', level: 'intermediate', highlight: true },
    { id: 'library',   label: 'Raga Kosha',   desc: 'Explore & practice every raga scale',    symbol: '◈',  mobileSymbol: '◈', level: 'all', highlight: true },
    { id: 'sadhana',   label: 'Sadhana',      desc: 'Your recommended daily practice path',    symbol: '🧘‍♀️', mobileSymbol: '🧘‍♀️', level: 'start' },
    { id: 'shruthi',   label: 'Shruthi',      desc: 'Continuous drone for practice',          symbol: '〜', mobileSymbol: '🎵', level: 'beginner' },
    { id: 'talam',     label: 'Talam',        desc: 'Keep the rhythmic cycle',                symbol: '॥',  mobileSymbol: '🥁', level: 'beginner' },
    { id: 'keyboard',  label: 'Keyboard',     desc: 'Play swaras on virtual keys',            symbol: '♩',  mobileSymbol: '🎹', level: 'intermediate' },
    { id: 'singback',  label: 'Sing-Back',    desc: 'Challenge your raga memory',             symbol: '◎',  mobileSymbol: '🎯', level: 'intermediate' },
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
    const [showGuide, setShowGuide] = useState(false);

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
                    onClick={() => goTo('home')}
                    className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
                >
                    <VeenaIcon />
                    <div>
                        <div className="font-playfair text-c-gold text-base md:text-lg leading-none">Ālāpana</div>
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
                            {mobileSymbol === '📿' ? (
                                <GurukulIcon className="w-4 h-4" />
                            ) : mobileSymbol === '♬' ? (
                                <DhwaniIcon className="w-4 h-4" />
                            ) : mobileSymbol === '◈' ? (
                                <KoshaIcon className="w-4 h-4" />
                            ) : (
                                <span className="text-base">{mobileSymbol}</span>
                            )}
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
                                Ālāpana
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
                                    Suggested path for beginners: <span className="text-c-gold/60">Sadhana → Gurukul → Shruthi → Talam</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 w-full max-w-5xl mx-auto">
                                {FEATURES.map(({ id, label, desc, symbol, level, highlight }, idx) => (
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
                                    {/* The Plaque Base — extra premium gradient glow for highlighted features */}
                                    <div className={`absolute inset-0 rounded-lg shadow-xl transition-all duration-300 ${
                                        highlight
                                            ? 'bg-gradient-to-b from-[#2b1206] to-[#140602] border-2 border-c-gold shadow-[0_0_20px_rgba(200,148,31,0.22)] group-hover:shadow-[0_0_30px_rgba(200,148,31,0.35)] group-hover:border-[#f7d686]'
                                            : 'bg-[#1e0c04] border border-c-gold/30 group-hover:border-c-gold/70'
                                    }`} />

                                    {/* Inner Decorative Border */}
                                    <div className="absolute inset-1.5 border border-c-gold/10 rounded-md pointer-events-none" />

                                    {/* Ornate Corners */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-c-gold/40 rounded-tl-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-c-gold/40 rounded-tr-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-c-gold/40 rounded-bl-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-c-gold/40 rounded-br-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />

                                    {/* Core Indicator Star */}
                                    {highlight && (
                                        <div className="absolute top-1.5 right-1.5 text-[8px] text-c-gold/80 animate-pulse pointer-events-none font-mono">
                                            ✦
                                        </div>
                                    )}

                                    {/* Symbol with shadow */}
                                    <div className={`relative z-10 text-xl sm:text-2xl mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-all duration-500 flex items-center justify-center ${
                                        highlight ? 'text-[#f7d686]' : 'text-c-gold group-hover:text-[#f7d686]'
                                    }`}>
                                        {symbol === '📿' ? (
                                            <GurukulIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                                        ) : symbol === '♬' ? (
                                            <DhwaniIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                                        ) : symbol === '◈' ? (
                                            <KoshaIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                                        ) : (
                                            symbol
                                        )}
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

                            {/* Branded Header Section - Compact */}
                            <div className="w-full flex items-center justify-between border-b border-c-border pb-3 mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-c-card border border-c-gold/30 flex items-center justify-center text-c-gold shadow-md backdrop-blur-md relative flex-shrink-0">
                                        <DhwaniIcon className="w-6 h-6 relative z-10" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <div className="flex items-center gap-2">
                                            <h1 className="font-playfair text-xl font-bold tracking-wider text-[#f7d686] uppercase leading-none">Dhwani</h1>
                                            <span className="text-[8px] uppercase tracking-widest bg-c-gold/15 text-[#f7d686] px-2 py-0.5 rounded font-semibold border border-c-gold/20 leading-none">Vocal</span>
                                        </div>
                                        <p className="text-c-cream-dim text-[11px] mt-1 font-light leading-none">
                                            Real-time vocal resonance and raga identifier.
                                        </p>
                                    </div>
                                </div>

                                {/* Collapsible guide toggler button */}
                                <button
                                    onClick={() => setShowGuide(!showGuide)}
                                    className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-c-gold/15 text-[#f7d686] border border-c-gold/20 hover:bg-c-gold/25 transition-all flex items-center gap-1.5"
                                >
                                    <span>🛈 {showGuide ? "Hide Guide" : "How to Sing"}</span>
                                    <span className="opacity-70">{showGuide ? "▲" : "▼"}</span>
                                </button>
                            </div>

                            {/* Collapsible How-to card */}
                            {showGuide && (
                                <div className="w-full bg-c-gold-faint border border-c-gold/25 rounded-xl p-4 flex gap-3.5 items-start animate-fade-in">
                                    <div className="text-c-gold flex-shrink-0 mt-0.5">
                                        <DhwaniIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <p className="font-playfair text-c-cream text-sm font-bold">Dhwani: Real-time Raga Recognition</p>
                                        <p className="text-c-cream-dim text-xs leading-relaxed text-left">
                                            Sing any Carnatic melody and Ālāpana listens in real time, detecting each note and matching them to a raga. Switch to the optional <span className="text-c-gold font-semibold">Ālaap AI</span> mode to analyze longer, ornamented phrases.
                                        </p>
                                        <ol className="flex flex-col gap-1.5 text-xs text-c-cream-dim leading-relaxed list-none text-left">
                                            <li className="flex gap-2"><span className="text-c-gold font-bold flex-shrink-0">1.</span><span>Allow microphone access and turn on pitch detection.</span></li>
                                            <li className="flex gap-2"><span className="text-c-gold font-bold flex-shrink-0">2.</span><span>Sing your <span className="text-c-gold font-semibold">Sa</span> — the first note of the Carnatic scale, like "Do" in Do-Re-Mi. It's the note your melody always comes back to and feels settled on. Pick a comfortable pitch and sing it steadily so Ālāpana can lock on to it.</span></li>
                                            <li className="flex gap-2"><span className="text-c-gold font-bold flex-shrink-0">3.</span><span>Sing your melody. Hold each note for a moment so it's detected, then watch the raga suggestions appear.</span></li>
                                        </ol>
                                        <p className="text-[10px] text-c-cream-dark italic border-t border-c-gold/15 pt-2 text-left">
                                            <span className="text-c-gold/80">Standard</span> mode works best for clear, straight notes.&ensp;
                                            <span className="text-c-gold/80">Ālaap AI</span> mode records 30 seconds and uses deep AI to catch subtle, fluid ornaments and gamakams.
                                        </p>
                                    </div>
                                </div>
                            )}

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
                                                Ālaap AI
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
                                                    Records a 30-second phrase, then sends the note sequence to the Ālaap AI model for deeper analysis — better at catching fluid ornaments and complex phrases.
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
                        { n: 2, name: 'Svara Gurukul',  tab: 'tutor',    icon: '📿', desc: 'Vocal Academy & Scale Flow',  longDesc: 'Master structured vocal exercises (Varisais) or practice ascending and descending scales under real-time guidance from the AI Guru.', btnText: 'Enter Svara Gurukul' },
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
                Ālāpana · Carnatic Music
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
