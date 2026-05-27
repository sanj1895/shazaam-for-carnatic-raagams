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
import OnboardingQuiz from './components/OnboardingQuiz';
import { CuratedIcon, FireIcon, DhwaniIcon, SadhanaIcon } from './components/IconLibrary';
import SketchyRule from './components/SketchyRule';

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

const renderTabIcon = (id, className = "w-5 h-5") => {
    return <CuratedIcon icon={id} className={className} />;
};

const FEATURES = [
    { id: 'tutor',     label: 'Gurukul',      desc: 'Classical vocal academy & scale flow', symbol: '📿',  mobileSymbol: '📿', level: 'beginner', highlight: true },
    { id: 'listen',    label: 'Dhwani',       desc: 'Sing a melody & identify the raga',       symbol: '♬',  mobileSymbol: '♬', level: 'intermediate', highlight: true },
    { id: 'transcribe',label: 'Transcribe',   desc: 'Transcribe your sangatis against tala',    symbol: '✍︎', mobileSymbol: '✍︎', level: 'intermediate', highlight: true },
    { id: 'library',   label: 'Raga Kosha',   desc: 'Explore & practice every raga scale',    symbol: '◈',  mobileSymbol: '◈', level: 'all', highlight: true },
    { id: 'sadhana',   label: 'Sadhana',      desc: 'Your recommended daily practice path',    symbol: '🧘‍♀️', mobileSymbol: '🧘‍♀️', level: 'start' },
    { id: 'shruthi',   label: 'Shruthi',      desc: 'Continuous drone for practice',          symbol: '〜', mobileSymbol: '🎵', level: 'beginner' },
    { id: 'talam',     label: 'Talam',        desc: 'Keep the rhythmic cycle',                symbol: '॥',  mobileSymbol: '🥁', level: 'beginner' },
    { id: 'keyboard',  label: 'Keyboard',     desc: 'Play swaras on virtual keys',            symbol: '♩',  mobileSymbol: '🎹', level: 'intermediate' },
    { id: 'singback',  label: 'Sing-Back',    desc: 'Challenge your raga memory',             symbol: '◎',  mobileSymbol: '🎯', level: 'intermediate' },
    { id: 'melakarta', label: 'Melakarta',    desc: 'The complete 72-raga parent chart',      symbol: '⊹',  mobileSymbol: '🗂️', level: 'advanced' },
    { id: 'bhedam',    label: 'Graha Bhedam', desc: 'Discover modal shifts between ragas',    symbol: '↻',  mobileSymbol: '🔄', level: 'advanced' },
];

const APP_MODES = {
    beginner: {
        id: 'beginner',
        label: 'Guided Basics',
        shortLabel: 'Basics',
        subtitle: 'A quieter, guided path for shruti, swaras, tala, and early lessons.',
        primaryCta: 'Start Guided Basics',
    },
    musician: {
        id: 'musician',
        label: 'Practice Workspace',
        shortLabel: 'Workspace',
        subtitle: 'A modern Carnatic practice workspace for trained musicians.',
        primaryCta: 'Open Workspace',
    },
};

const MODE_FEATURE_ORDER = {
    beginner: ['tutor', 'sadhana', 'shruthi', 'talam', 'keyboard', 'singback'],
    musician: ['listen', 'transcribe', 'library', 'tutor', 'keyboard', 'shruthi', 'talam', 'melakarta', 'bhedam'],
};

const MODE_HOME_GROUPS = {
    beginner: [
        { label: 'Start Here', ids: ['tutor', 'sadhana'] },
        { label: 'Practice Basics', ids: ['shruthi', 'talam', 'keyboard', 'singback'] },
    ],
    musician: [
        { label: 'Core Workspace', ids: ['listen', 'transcribe', 'library'] },
        { label: 'Practice Tools', ids: ['tutor', 'keyboard', 'shruthi', 'talam'] },
        { label: 'Advanced Reference', ids: ['melakarta', 'bhedam'] },
    ],
};

const MODE_ALLOWED_VIEWS = {
    beginner: new Set(['home', 'tutor', 'sadhana', 'shruthi', 'talam', 'keyboard', 'singback']),
    musician: new Set(['home', 'tutor', 'listen', 'transcribe', 'library', 'keyboard', 'shruthi', 'talam', 'melakarta', 'bhedam']),
};

function loadAppMode() {
    try {
        return localStorage.getItem('alapana_app_mode') || 'musician';
    } catch {
        return 'musician';
    }
}

const SADHANA_TABS = ['shruthi', 'tutor', 'keyboard', 'singback'];

function parseHashRoute(hashValue = window.location.hash) {
    const normalized = hashValue.replace(/^#\/?/, '').trim();
    if (!normalized) return { view: 'home', segments: [] };
    const segments = normalized.split('/').filter(Boolean).map((segment) => decodeURIComponent(segment));
    return { view: segments[0] || 'home', segments };
}

function parseTutorHashTarget(segments = []) {
    if (!segments.length || segments[0] !== 'tutor') return null;
    const target = {};
    for (let i = 1; i < segments.length; i += 2) {
        const key = segments[i];
        const value = segments[i + 1];
        if (!value) break;
        if (key === 'tab') target.tab = value;
        if (key === 'course') target.courseId = value;
        if (key === 'unit') target.unitId = value;
        if (key === 'lesson') target.lessonId = value;
    }
    return Object.keys(target).length ? target : null;
}

function buildHashForView(view, tutorTarget = null) {
    if (!view || view === 'home') return '#/home';
    if (view !== 'tutor') return `#/${view}`;

    const segments = ['tutor'];
    if (tutorTarget?.tab && tutorTarget.tab !== 'curriculum') {
        segments.push('tab', tutorTarget.tab);
    }
    if (tutorTarget?.courseId) {
        segments.push('course', tutorTarget.courseId);
    }
    if (tutorTarget?.unitId) {
        segments.push('unit', tutorTarget.unitId);
    }
    if (tutorTarget?.lessonId) {
        segments.push('lesson', tutorTarget.lessonId);
    }
    return `#/${segments.map((segment) => encodeURIComponent(segment)).join('/')}`;
}

function getLocalDateString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getYesterdayDateString() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function loadSadhanaState() {
    const today = getLocalDateString();
    const yesterday = getYesterdayDateString();
    try {
        const s = JSON.parse(localStorage.getItem('alapana_sadhana_v1') || 'null');
        if (!s) {
            const newState = { date: today, completed: [], streak: 0 };
            localStorage.setItem('alapana_sadhana_v1', JSON.stringify(newState));
            return newState;
        }
        if (s.date === today) return s;
        const streak = (s.date === yesterday && s.completed.length >= SADHANA_TABS.length)
            ? (s.streak || 0) + 1 : 0;
        const newState = { date: today, completed: [], streak };
        localStorage.setItem('alapana_sadhana_v1', JSON.stringify(newState));
        return newState;
    } catch {
        const newState = { date: today, completed: [], streak: 0 };
        localStorage.setItem('alapana_sadhana_v1', JSON.stringify(newState));
        return newState;
    }
}

function App() {
    const [view, setView] = useState(() => parseHashRoute().view);
    const [appMode, setAppMode] = useState(loadAppMode);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showFeatures, setShowFeatures] = useState(() => parseHashRoute().view !== 'home');
    const [saFrequency, setSaFrequency] = useState(null);
    const [detectedNotes, setDetectedNotes] = useState([]);
    const [possibleRagas, setPossibleRagas] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [activeMode, setActiveMode] = useState('standard');
    const [tourActive, setTourActive] = useState(false);
    const [quizActive, setQuizActive] = useState(false);
    const [tutorLaunchTarget, setTutorLaunchTarget] = useState(() => {
        const route = parseHashRoute();
        return route.view === 'tutor' ? parseTutorHashTarget(route.segments) : null;
    });
    const [sadhana, setSadhana] = useState(loadSadhanaState);
    const [sadhanaToast, setSadhanaToast] = useState(null); // { title, stepName }
    const [selectedRaga, setSelectedRaga] = useState(null); // { raga, hasClearMatch, type: 'library' | 'identify' | 'melakarta' }
    const [showGuide, setShowGuide] = useState(false);

    const modeConfig = APP_MODES[appMode] || APP_MODES.musician;
    const visibleFeatures = MODE_FEATURE_ORDER[appMode]
        .map((id) => FEATURES.find((feature) => feature.id === id))
        .filter(Boolean);
    const homeGroups = MODE_HOME_GROUPS[appMode] || MODE_HOME_GROUPS.musician;

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

    useEffect(() => {
        try {
            localStorage.setItem('alapana_app_mode', appMode);
        } catch {}
    }, [appMode]);

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

    const switchAppMode = (nextMode, options = {}) => {
        const { destination = 'home', reveal = true } = options;
        setAppMode(nextMode);
        setShowFeatures(reveal);
        const allowedViews = MODE_ALLOWED_VIEWS[nextMode] || MODE_ALLOWED_VIEWS.musician;
        const nextView = allowedViews.has(destination) ? destination : 'home';
        if (nextView === 'home') {
            goTo('home');
        } else {
            goTo(nextView);
        }
    };

    const markSadhanaStep = (tab) => {
        const detailsMap = {
            shruthi: { title: 'Warm-Up Complete', stepName: 'Step 1' },
            tutor: { title: 'AI Vocal Practice Complete', stepName: 'Step 2' },
            keyboard: { title: 'Scale Exploration Complete', stepName: 'Step 3' },
            singback: { title: 'Ear Training Challenge Complete', stepName: 'Step 4' },
        };

        // Read current state synchronously before the update — reliable in React 18 concurrent mode
        if (sadhana.completed.includes(tab)) return;

        setSadhana(prev => {
            if (prev.completed.includes(tab)) return prev;
            const next = { ...prev, completed: [...prev.completed, tab] };
            localStorage.setItem('alapana_sadhana_v1', JSON.stringify(next));
            return next;
        });

        if (detailsMap[tab]) {
            setSadhanaToast({
                title: detailsMap[tab].title,
                stepName: detailsMap[tab].stepName
            });
            setTimeout(() => setSadhanaToast(null), 4000);
        }
    };

    const viewRef = useRef(view);
    viewRef.current = view;

    useEffect(() => {
        const allowedViews = MODE_ALLOWED_VIEWS[appMode] || MODE_ALLOWED_VIEWS.musician;
        if (!allowedViews.has(view)) {
            goTo('home');
        }
    }, [appMode, view]);

    // Listen for hashchange events (back/forward navigation only — not goTo-triggered changes)
    useEffect(() => {
        const handleHashChange = () => {
            const route = parseHashRoute();
            const targetView = route.view || 'home';
            const allowedViews = MODE_ALLOWED_VIEWS[appMode] || MODE_ALLOWED_VIEWS.musician;
            if (!allowedViews.has(targetView)) {
                window.location.hash = '#/home';
                return;
            }
            if (targetView !== viewRef.current) {
                if (targetView !== 'listen') handleReset();
                setView(targetView);
                setShowFeatures(targetView !== 'home');
            }
            setTutorLaunchTarget(targetView === 'tutor' ? parseTutorHashTarget(route.segments) : null);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [appMode]);

    const goTo = (id, options = {}) => {
        const allowedViews = MODE_ALLOWED_VIEWS[appMode] || MODE_ALLOWED_VIEWS.musician;
        if (!allowedViews.has(id) && id !== 'home') {
            id = 'home';
        }
        const { tutorTarget = null } = options;
        if (id !== 'listen') handleReset();
        setTutorLaunchTarget(id === 'tutor' ? tutorTarget : null);
        setView(id);
        if (id === 'home') {
            setShowFeatures(false);
        } else {
            setShowFeatures(true);
        }
        const nextHash = buildHashForView(id, tutorTarget);
        if (window.location.hash !== nextHash) {
            window.location.hash = nextHash;
        }
    };

    const handleTutorNavigation = (target = null, options = {}) => {
        const { replace = false } = options;
        const normalizedTarget = target && Object.keys(target).length ? target : null;
        setTutorLaunchTarget(normalizedTarget);
        const nextHash = buildHashForView('tutor', normalizedTarget);
        if (window.location.hash === nextHash) return;
        if (replace) {
            window.history.replaceState(null, '', nextHash);
        } else {
            window.location.hash = nextHash;
        }
    };

    return (
        <>
            <OnboardingQuiz
                active={quizActive}
                onDismiss={() => setQuizActive(false)}
                onModeSelected={(mode) => setAppMode(mode)}
                onNavigate={(dest) => {
                    setQuizActive(false);
                    if (typeof dest === 'string') {
                        goTo(dest);
                        return;
                    }
                    goTo(dest.view, { tutorTarget: dest.target || null });
                }}
            />
            <OnboardingTour
                active={tourActive} 
                onDismiss={() => {
                    setTourActive(false);
                    setShowFeatures(false);
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
                        <div className="flex items-center gap-1 rounded-full border border-c-border bg-c-surface p-1 mb-4">
                            {Object.values(APP_MODES).map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => {
                                        switchAppMode(mode.id, { destination: 'home', reveal: true });
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex-1 px-3 py-2 rounded-full text-[10px] font-playfair uppercase tracking-[0.18em] transition-all ${
                                        appMode === mode.id
                                            ? 'bg-c-gold text-c-bg'
                                            : 'text-c-cream-dim'
                                    }`}
                                >
                                    {mode.shortLabel}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {visibleFeatures.map(({ id, label, mobileSymbol }) => (
                                <button
                                    key={id}
                                    onClick={() => { goTo(id); setMobileMenuOpen(false); }}
                                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                                        view === id
                                            ? 'border-c-gold bg-c-gold/10 text-c-gold'
                                            : 'border-c-border bg-c-surface text-c-cream-dim active:bg-c-gold/10'
                                    }`}
                                >
                                    <span className="text-c-gold">{renderTabIcon(id, "w-5 h-5")}</span>
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
                    {visibleFeatures.map(({ id, label }) => (
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
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-1 rounded-full border border-c-border bg-c-surface px-1 py-1">
                        {Object.values(APP_MODES).map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => switchAppMode(mode.id, { destination: 'home', reveal: true })}
                                className={`px-3 py-1 rounded-full text-[10px] font-playfair uppercase tracking-[0.18em] transition-all ${
                                    appMode === mode.id
                                        ? 'bg-c-gold text-c-bg'
                                        : 'text-c-cream-dim hover:text-c-gold'
                                }`}
                            >
                                {mode.shortLabel}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-c-surface transition-colors"
                    >
                        <span className={`block w-5 h-0.5 bg-c-gold transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-c-gold transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-c-gold transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* ── Mobile bottom tab bar ── */}
            {view !== 'home' && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-c-card border-t border-c-border flex items-stretch overflow-x-auto scrollbar-hide shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
                    {visibleFeatures.map(({ id, mobileSymbol, label }) => (
                        <button
                            key={id}
                            onClick={() => goTo(id)}
                            className={`flex flex-col items-center justify-center gap-0.5 flex-shrink-0 px-3 py-2 min-w-[56px] transition-all ${
                                view === id
                                    ? 'text-c-gold border-t-2 border-c-gold -mt-0.5'
                                    : 'text-c-cream-dark border-t-2 border-transparent -mt-0.5'
                            }`}
                        >
                            {renderTabIcon(id, "w-4 h-4")}
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
                            className="w-full flex flex-col items-center relative overflow-y-auto scrollbar-hide transition-all duration-1000 animate-fade-in"
                            style={{
                                minHeight: 'calc(100vh - 73px)',
                                background: 'radial-gradient(circle at center, #7a2a10 0%, #3a1208 50%, #1a0804 100%)',
                            }}
                        >
                        {/* Vignette Overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-[1]" />
                        
                        {/* Subtle Noise/Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[2] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                        {/* Glow */}
                        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-c-gold/10 blur-[160px] pointer-events-none rounded-full z-0" />

                        {/* Hero mandala — fades out when features panel opens */}
                        <div className="absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[110vw] h-[110vw] z-0"
                            style={{
                                maskImage: 'radial-gradient(ellipse 48% 48% at 50% 50%, black 40%, transparent 80%)',
                                WebkitMaskImage: 'radial-gradient(ellipse 48% 48% at 50% 50%, black 40%, transparent 80%)',
                                opacity: showFeatures ? 0 : 0.12,
                                transition: 'opacity 1.4s ease-in-out',
                            }}
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

                        {/* New mandala — fades in when features panel opens, spins counter-clockwise */}
                        <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[160vw] h-[160vw] z-0"
                            style={{
                                maskImage: 'radial-gradient(ellipse 45% 45% at 50% 50%, black 30%, transparent 75%)',
                                WebkitMaskImage: 'radial-gradient(ellipse 45% 45% at 50% 50%, black 30%, transparent 75%)',
                                opacity: showFeatures ? 0.15 : 0,
                                transition: 'opacity 1.4s ease-in-out',
                            }}
                        >
                            <img
                                src="/newmandala.png"
                                alt=""
                                className="w-full h-full object-contain"
                                style={{
                                    filter: 'invert(1) sepia(1) saturate(500%) hue-rotate(-20deg) brightness(0.8)',
                                    mixBlendMode: 'screen',
                                    animation: 'spin 240s linear infinite reverse',
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
                            <p className="text-c-gold/70 text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.24em] mb-3 mt-1">
                                A modern Carnatic practice workspace for trained musicians
                            </p>
                            <p className="text-white/82 text-base sm:text-lg md:text-2xl max-w-[720px] leading-snug font-light mb-3">
                                Your Carnatic practice room, online.
                            </p>
                            <p className="text-white/58 text-[11px] sm:text-xs md:text-sm max-w-[700px] leading-relaxed mb-3 tracking-wide">
                                Build your repertoire, practice with shruti and tala, review lessons, track progress, and keep everything in one workspace.
                            </p>
                            <p className="text-white/36 text-[10px] sm:text-[11px] md:text-xs max-w-[620px] leading-relaxed mb-6 tracking-wide">
                                Built for students who know the basics, performers, teachers, and serious learners.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-[10px] sm:text-[11px]">
                                <span className="text-white/42">Workspace focus:</span>
                                <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/15 p-1">
                                    {Object.values(APP_MODES).map((mode) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => {
                                                setAppMode(mode.id);
                                                setShowFeatures(false);
                                            }}
                                            className={`px-3 py-1 rounded-full font-playfair transition-all ${
                                                appMode === mode.id
                                                    ? 'bg-c-gold/90 text-c-bg'
                                                    : 'text-white/60 hover:text-[#f7d686]'
                                            }`}
                                        >
                                            {mode.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* CTAs  ·  fade out once features are shown */}
                            <div
                                className="transition-all duration-500 flex flex-col items-center gap-4 animate-fade-in"
                                style={{ opacity: showFeatures ? 0 : 1, pointerEvents: showFeatures ? 'none' : 'auto', height: showFeatures ? 0 : 'auto', overflow: showFeatures ? 'hidden' : 'visible' }}
                            >
                                <button
                                    onClick={() => {
                                        if (appMode === 'beginner') {
                                            setQuizActive(true);
                                            return;
                                        }
                                        setShowFeatures(true);
                                    }}
                                    className="group bg-c-gold hover:bg-[#f7d686] text-c-bg font-playfair font-bold px-14 py-4 rounded-full text-sm md:text-base tracking-[0.2em] uppercase transition-all duration-500 transform hover:scale-105 shadow-[0_0_40px_rgba(200,148,31,0.35)] cursor-pointer"
                                >
                                    {modeConfig.primaryCta}
                                </button>
                                <p className="text-white/42 text-[11px] font-playfair italic max-w-[540px]">
                                    {appMode === 'beginner'
                                        ? 'New to Carnatic? Start with a guided path through shruti, swaras, tala, and first lessons.'
                                        : 'New to Carnatic? Guided basics are still available inside Gurukul as a softer entry path.'}
                                </p>

                                <button
                                    onClick={() => setShowFeatures(true)}
                                    className="border border-c-gold/25 hover:border-c-gold/50 text-white/46 hover:text-[#f7d686] font-playfair px-7 py-2 rounded-full text-[11px] tracking-[0.16em] uppercase transition-all duration-500 cursor-pointer"
                                >
                                    Enter the workspace →
                                </button>

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
                                    <span className="text-c-gold opacity-80">{renderTabIcon('tutor', "w-3.5 h-3.5")}</span> Take a Guided Tour
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
                            <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto kolam-bg rounded-2xl px-4 py-6">
                                {homeGroups.map(({ label, ids }, groupIdx) => {
                                    const group = visibleFeatures.filter(f => ids.includes(f.id));
                                    return (
                                        <div key={label} className="flex flex-col gap-3">
                                            {/* Group label */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-px bg-c-gold/20" />
                                                <span className="bg-c-gold/15 border border-c-gold/45 rounded-full px-4 py-1 text-[9px] font-mono uppercase tracking-[0.25em] text-c-gold font-bold flex-shrink-0">{label}</span>
                                                <div className="flex-1 h-px bg-c-gold/20" />
                                            </div>
                                            <div className={`grid gap-3 ${
                                                ids.length === 2
                                                    ? 'grid-cols-2 max-w-xs mx-auto w-full'
                                                : ids.length === 5
                                                    ? 'grid-cols-2 sm:grid-cols-6 max-w-3xl mx-auto w-full'
                                                : ids.length === 3
                                                    ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto w-full'
                                                    : 'grid-cols-2 sm:grid-cols-4'
                                            }`}>
                                                {group.map(({ id, label: fLabel, desc, highlight }, idx) => (
                                                    <button
                                                        key={id}
                                                        onClick={() => goTo(id)}
                                                        className={`group relative flex flex-col items-center justify-center p-3.5 sm:p-4 text-center transition-all duration-500 hover:-translate-y-1.5 h-full w-full ${
                                                            ids.length === 5
                                                                ? 'sm:col-span-2'
                                                                : ''
                                                        } ${
                                                            ids.length === 5 && idx === 4
                                                                ? 'col-span-2 justify-self-center max-w-[calc(50%-0.375rem)] sm:max-w-none'
                                                                : ''
                                                        } ${
                                                            ids.length === 5 && idx === 3
                                                                ? 'sm:col-start-2'
                                                                : ids.length === 5 && idx === 4
                                                                ? 'sm:col-start-4'
                                                                : ''
                                                        }`}
                                                        style={{
                                                            transitionDelay: showFeatures ? `${(groupIdx * 4 + idx) * 55}ms` : '0ms',
                                                            opacity: showFeatures ? 1 : 0,
                                                            transform: showFeatures ? 'translateY(0)' : 'translateY(20px)',
                                                        }}
                                                    >
                                                        <div className={`absolute inset-0 rounded-lg shadow-xl transition-all duration-300 ${highlight ? 'bg-gradient-to-b from-[#2b1206] to-[#140602] border-2 border-c-gold shadow-[0_0_20px_rgba(200,148,31,0.22)] group-hover:shadow-[0_0_30px_rgba(200,148,31,0.35)] group-hover:border-[#f7d686]' : 'bg-[#1e0c04] border border-c-gold/30 group-hover:border-c-gold/70'}`} />
                                                        <div className="absolute inset-1.5 border border-c-gold/10 rounded-md pointer-events-none" />
                                                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-c-gold/40 rounded-tl-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-c-gold/40 rounded-tr-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-c-gold/40 rounded-bl-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-c-gold/40 rounded-br-lg group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                                                        {highlight && <div className="absolute top-1.5 right-1.5 text-[8px] text-c-gold/80 animate-pulse pointer-events-none font-mono">✦</div>}
                                                        <div className={`relative z-10 mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-all duration-500 flex items-center justify-center ${highlight ? 'text-[#f7d686]' : 'text-c-gold group-hover:text-[#f7d686]'}`}>
                                                            {renderTabIcon(id, "w-8 h-8 sm:w-10 sm:h-10")}
                                                        </div>
                                                        <h3 className="relative z-10 font-playfair text-[#f7d686] text-xs sm:text-sm font-bold tracking-[0.1em] uppercase mb-1 group-hover:text-white transition-colors duration-300">{fLabel}</h3>
                                                        <p className="relative z-10 text-white/50 text-[9px] sm:text-[10px] leading-relaxed italic max-w-[120px] opacity-70 group-hover:opacity-100 transition-opacity hidden sm:block">{desc}</p>
                                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
            )}

                {/* ══ TUTOR ══ */}
                {view === 'tutor' && (
                    <Tutor
                        saFrequency={saFrequency}
                        appMode={appMode}
                        onSadhanaComplete={markSadhanaStep}
                        launchTarget={tutorLaunchTarget}
                        onNavigationChange={handleTutorNavigation}
                        onLaunchHandled={() => {}}
                    />
                )}
                {view === 'transcribe' && <Tutor saFrequency={saFrequency} appMode={appMode} transcribeOnly={true} />}

                {/* ══ LISTEN ══ */}
                {view === 'listen' && (
                    <main className="w-full max-w-3xl mx-auto flex flex-col items-center gap-7 px-4 md:px-8 py-10 animate-fade-in">
                        <div className="w-full flex flex-col items-center gap-7">

                            {/* Branded Header Section - Compact */}
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-c-card border border-c-gold/30 flex items-center justify-center text-c-gold shadow-md backdrop-blur-md relative flex-shrink-0">
                                        <DhwaniIcon className="w-6 h-6 relative z-10" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <div className="flex items-center gap-2">
                                            <h1 className="font-playfair text-xl font-bold tracking-wider text-c-gold uppercase leading-none">Dhwani</h1>
                                            <span className="text-[8px] uppercase tracking-widest bg-c-gold/15 text-c-gold px-2 py-0.5 rounded font-semibold border border-c-gold/20 leading-none">Vocal</span>
                                        </div>
                                        <p className="text-c-cream-dim text-[11px] mt-1 font-light leading-none">
                                            Real-time vocal resonance and raga identifier.
                                        </p>
                                    </div>
                                </div>

                                {/* Collapsible guide toggler button */}
                                <button
                                    onClick={() => setShowGuide(!showGuide)}
                                    className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-c-gold/15 text-c-gold border border-c-gold/30 hover:bg-c-gold/25 transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                    <span>{showGuide ? "Hide Guide" : "How to Sing"}</span>
                                    <span className="opacity-80">{showGuide ? "▲" : "▼"}</span>
                                </button>
                            </div>
                            <SketchyRule className="mt-2 opacity-60" />

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
                        { n: 1, name: 'Tune & Warm Up',  tab: 'shruthi',  desc: 'Drone Baseline Alignment',    longDesc: 'Open the Shruthi Box and sustain a warm "ah" sound along with the drone for 30 seconds to lock in your pitch center.', btnText: 'Launch Shruthi Box' },
                        { n: 2, name: 'Svara Gurukul',  tab: 'tutor',    desc: 'Vocal Academy & Scale Flow',  longDesc: 'Master structured vocal exercises (Varisais) or practice ascending and descending scales under real-time guidance from the AI Guru.', btnText: 'Enter Svara Gurukul' },
                        { n: 3, name: 'Explore Scales',  tab: 'keyboard', desc: 'Swarasthana Visualization',   longDesc: 'Play individual swaras on the virtual keyboard to hear and internalize the exact intervals of a scale.', btnText: 'Open Swara Keyboard' },
                        { n: 4, name: 'Ear Training',    tab: 'singback', desc: 'Phrase Reproduction',         longDesc: 'Listen to a phrase and reproduce it by ear. Aim for 80 %+ to sharpen pitch memory and muscle memory together.', btnText: 'Launch Sing-Back' },
                    ];
                    const doneCount = sadhana.completed.length;
                    const pct = Math.round((doneCount / steps.length) * 100);
                    return (
                    <div className="w-full max-w-3xl p-4 md:p-8 flex flex-col items-center animate-fade-in mx-auto">
                        <div className="w-full flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-c-card border border-c-gold/30 flex items-center justify-center text-c-gold shadow-md flex-shrink-0">
                                <SadhanaIcon className="w-7 h-7" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-playfair text-2xl font-bold tracking-wider text-c-gold uppercase leading-none">Daily Sadhana</h2>
                                    <span className="text-[8px] uppercase tracking-widest bg-c-gold/15 text-c-gold px-2 py-0.5 rounded font-semibold border border-c-gold/20 leading-none">Daily Practice</span>
                                </div>
                                <p className="text-c-cream-dim text-[11px] mt-1 font-light leading-relaxed">
                                    A daily sequence to build pitch, scale accuracy, and raga memory. Resets each morning.
                                </p>
                            </div>
                        </div>
                        <SketchyRule className="mt-2 mb-2 opacity-60" />

                        {/* Progress card */}
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
                                    <span className="text-xs text-c-cream font-mono flex items-center gap-1">Streak: <strong className="flex items-center gap-0.5"><FireIcon className="w-3.5 h-3.5 text-orange-500" /> {sadhana.streak} {sadhana.streak === 1 ? 'day' : 'days'}</strong></span>
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

                        {/* Steps grid */}
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
                                            <span className="relative w-7 h-7 flex items-center justify-center flex-shrink-0">
                                                <svg viewBox="0 0 28 28" fill="none" className={`absolute inset-0 w-full h-full ${done ? 'text-emerald-600' : 'text-c-gold'}`}>
                                                    <path d="M14 2.5 C20.5 1.8, 26.2 7.5, 26.5 14 C26.8 20.5, 21 26.3, 14 26.5 C7 26.7, 1.7 21, 1.8 14 C1.9 7 7.5 3.2 14 2.5Z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" style={{ fillOpacity: done ? 0.9 : 0.12 }}/>
                                                </svg>
                                                <span className={`relative z-10 text-[10px] font-mono font-bold ${done ? 'text-white' : 'text-c-gold'}`}>
                                                    {done ? '✓' : item.n}
                                                </span>
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
                                                <span className="text-c-gold"><CuratedIcon icon={item.tab} className="w-5 h-5" /></span> {item.name}
                                            </h4>
                                            <span className="text-[10px] text-c-gold font-mono uppercase tracking-wider block mt-0.5">{item.desc}</span>
                                        </div>
                                        <p className="text-xs text-c-cream-dim leading-relaxed font-playfair">
                                            {item.longDesc}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => goTo(item.tab)}
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
