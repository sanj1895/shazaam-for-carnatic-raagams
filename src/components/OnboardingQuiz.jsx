import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// ── Universal questions (everyone sees these) ────────────────────────────────

const U_QUESTIONS = [
    {
        id: 'learner',
        q: 'Who is this for?',
        options: [
            {
                label: 'Me',
                sub: "I'm learning or practicing for myself",
                value: 'self',
                icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="7" r="4"/>
                        <path d="M4 21v-1a8 8 0 0116 0v1"/>
                    </svg>
                ),
            },
            {
                label: 'Someone else',
                sub: 'My child, student, or family member',
                value: 'other',
                icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="7" r="3"/>
                        <path d="M2 20v-1a6 6 0 0112 0v1"/>
                        <circle cx="17" cy="9" r="2.5"/>
                        <path d="M13 20v-0.5a4.5 4.5 0 019 0V20"/>
                    </svg>
                ),
            },
        ],
    },
    {
        id: 'age',
        qFn: (a) => a.learner === 'other' ? 'How old are they?' : 'How old are you?',
        options: [
            { label: 'Under 8', value: 'very_young' },
            { label: '8–12',    value: 'child' },
            { label: '13–17',   value: 'teen' },
            { label: '18+',     value: 'adult' },
        ],
    },
    {
        id: 'experience',
        qFn: (a) => a.learner === 'other'
            ? 'Which best describes where they are right now?'
            : 'Which best describes where you are right now?',
        options: [
            { label: 'Completely new',             sub: 'Just getting started with Carnatic music',          value: 'new',      guided: 3, workspace: 0 },
            { label: 'Know some basics',            sub: 'Familiar with a few terms or exercises',            value: 'basics',   guided: 2, workspace: 0 },
            { label: 'Already practice',            sub: 'I sing or study somewhat regularly',                value: 'practice', guided: 0, workspace: 2 },
            { label: 'Serious student or performer',sub: 'Looking for tools for deeper work and analysis',    value: 'serious',  guided: 0, workspace: 3 },
        ],
    },
    {
        id: 'goal',
        qFn: (a) => a.learner === 'other'
            ? 'What do they want help with first?'
            : 'What do you want help with first?',
        options: [
            { label: 'Starting correctly',              sub: 'Shruti, swaras, tala, first lessons',          value: 'starting',   guided: 3, workspace: 0 },
            { label: 'Building a daily routine',        sub: 'A consistent, focused practice flow',          value: 'routine',    guided: 2, workspace: 1 },
            { label: 'Exploring ragas',                 sub: 'Understand and study raga structure',          value: 'explore',    guided: 0, workspace: 2 },
            { label: 'Transcribing or analyzing',       sub: 'Work with my own singing and ideas',           value: 'transcribe', guided: 0, workspace: 3 },
        ],
    },
    {
        id: 'preference',
        qFn: (a) => a.learner === 'other'
            ? 'What kind of experience sounds better for them?'
            : 'What kind of experience sounds better right now?',
        options: [
            { label: 'Guide me step by step',      sub: 'One clear next step, no decisions needed',       value: 'guided',    guided: 4, workspace: 0 },
            { label: 'Give me a practice workspace',sub: 'I want to choose from a set of tools',          value: 'workspace', guided: 0, workspace: 4 },
        ],
    },
];

// ── Guided Path placement questions ──────────────────────────────────────────

const GUIDED_QUESTIONS = [
    {
        id: 'studied',
        qFn: (a) => a.learner === 'other' ? 'Have they studied Carnatic music before?' : 'Have you studied Carnatic music before?',
        options: [
            { label: 'Never',        sub: 'Starting completely fresh',          score: 0 },
            { label: 'A little',     sub: 'Some exposure, no formal training',  score: 1 },
            { label: 'Yes, formally',sub: 'Had a guru or classes',              score: 2 },
        ],
    },
    {
        id: 'swaras',
        qFn: (a) => a.learner === 'other' ? 'Can they sing the 7 swaras?' : 'Can you sing the 7 swaras?',
        sub: 'Sa · Ri · Ga · Ma · Pa · Da · Ni',
        options: [
            { label: 'Not yet',                   score: 0 },
            { label: 'A little, not confidently', score: 1 },
            { label: 'Yes, comfortably',           score: 2 },
        ],
    },
    {
        id: 'shruti',
        qFn: (a) => a.learner === 'other' ? 'Can they identify their shruti?' : 'Can you identify your shruti?',
        sub: 'Your personal home note — Sa',
        options: [
            { label: 'Not yet',          score: 0 },
            { label: 'I know what it is',score: 1 },
            { label: 'Yes, I know my Sa',score: 2 },
        ],
    },
    {
        id: 'tala',
        qFn: (a) => a.learner === 'other' ? 'Do they know how to keep Adi Tala?' : 'Do you know how to keep Adi Tala?',
        sub: 'The 8-beat rhythmic cycle used while singing',
        options: [
            { label: 'Not yet',           score: 0 },
            { label: "I've heard of it",  score: 1 },
            { label: 'Yes, I can keep it',score: 2 },
        ],
    },
];

// ── Workspace recommendation question ────────────────────────────────────────

const WORKSPACE_QUESTIONS = [
    {
        id: 'workspace_intent',
        qFn: (a) => a.learner === 'other' ? 'What will they probably use first?' : 'What will you probably use first?',
        options: [
            { label: 'Raga identification',     sub: "Sing and discover which raga you're in",        value: 'identify' },
            { label: 'Phrase transcription',    sub: 'Capture sangatis and musical ideas',            value: 'transcribe' },
            { label: 'Daily practice tools',    sub: 'Shruthi, talam, keyboard warm-up',             value: 'daily_practice' },
            { label: 'Raga study and exploration',sub: 'Scales, relationships, raga encyclopedia',   value: 'study' },
        ],
    },
];

// ── Branch computation ────────────────────────────────────────────────────────

function computeBranch(answers) {
    if (answers.age === 'very_young') return 'guided_path';

    const SCORES = {
        experience: { new: [3, 0], basics: [2, 0], practice: [0, 2], serious: [0, 3] },
        goal:       { starting: [3, 0], routine: [2, 1], explore: [0, 2], transcribe: [0, 3] },
        preference: { guided: [4, 0], workspace: [0, 4] },
    };

    let g = 0, w = 0;
    for (const [key, map] of Object.entries(SCORES)) {
        const val = answers[key];
        if (val && map[val]) { g += map[val][0]; w += map[val][1]; }
    }

    if (g >= w + 2) return 'guided_path';
    if (w >= g + 2) return 'practice_workspace';
    if (answers.preference === 'workspace') return 'practice_workspace';
    return 'guided_path';
}

// ── Recommendation logic ──────────────────────────────────────────────────────

function getRecommendation(branch, answers) {
    const isOther = answers.learner === 'other';
    const pronoun = isOther ? 'They' : 'You';

    if (branch === 'guided_path') {
        if (answers.age === 'very_young') {
            return {
                type: 'guided',
                headline: 'Carnatic Singing Foundations',
                body: `${pronoun}'ll start with shruti, breath, first swaras, and early listening. Built to make the basics feel calm and approachable.`,
                detail: 'Best for complete beginners',
                cta: 'Start Foundations',
                mode: 'beginner',
                action: 'tutor',
                target: { courseId: 'foundations', unitId: 'stage1', lessonId: 'm1_1' },
            };
        }

        const score = ['studied', 'swaras', 'shruti', 'tala'].reduce((sum, k) => sum + (answers[k] ?? 0), 0);

        if (score <= 2) {
            return {
                type: 'guided',
                headline: 'Carnatic Singing Foundations',
                body: `${pronoun}'ll build from the ground up — shruti, breath, first swaras, and early listening. No prior knowledge needed.`,
                detail: 'Best for complete beginners',
                cta: 'Start Foundations',
                mode: 'beginner',
                action: 'tutor',
                target: { courseId: 'foundations', unitId: 'stage1', lessonId: 'm1_1' },
            };
        } else if (score <= 5) {
            return {
                type: 'guided',
                headline: 'Sarali Varisai',
                body: `${pronoun} have some basics already. This path strengthens pitch, timing, and control through foundational Carnatic exercises.`,
                detail: 'Best for learners with some familiarity',
                cta: 'Start Sarali Varisai',
                mode: 'beginner',
                action: 'tutor',
                target: { courseId: 'sarali_varisai', unitId: 'sarali_stage1', lessonId: 's_1' },
            };
        } else {
            return {
                type: 'guided',
                headline: 'Daily Sadhana',
                body: `${pronoun}'re ready for a consistent guided routine. Build momentum with shruti work, exercises, keyboard practice, and ear training.`,
                detail: 'Best for learners past the earliest basics',
                cta: 'Open Daily Sadhana',
                mode: 'beginner',
                action: 'sadhana',
            };
        }
    }

    // Practice Workspace
    const INTENT_MAP = {
        identify:       { headline: 'Start with Dhwani',          body: 'Sing freely and begin with raga identification and swara listening.',                    cta: 'Open Dhwani',          action: 'listen',     secondary: 'You may also want Raga Kosha for deeper study.' },
        transcribe:     { headline: 'Start with Transcribe',       body: 'Capture your sangatis and study your musical ideas against tala.',                        cta: 'Open Transcribe',      action: 'transcribe', secondary: 'You may also want Daily Sadhana for a consistent practice base.' },
        study:          { headline: 'Start with Raga Kosha',       body: 'Explore scales, relationships, and ragas in a more study-driven way.',                   cta: 'Open Raga Kosha',      action: 'library',    secondary: 'You may also want Graha Bhedam and Melakarta for scale relationships.' },
        daily_practice: { headline: 'Start with Practice Setup',   body: 'Begin with shruti, tala, and your practice tools before diving into deeper analysis.',   cta: 'Open Practice Room',   action: 'tutor',      target: { tab: 'practice' }, secondary: 'You may also want Dhwani once you want feedback and analysis.' },
    };

    const rec = INTENT_MAP[answers.workspace_intent] || INTENT_MAP.daily_practice;
    return { type: 'workspace', mode: 'musician', ...rec };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function OnboardingQuiz({ active, onDismiss, onNavigate, onModeSelected }) {
    const [uIdx, setUIdx]       = useState(0);
    const [bIdx, setBIdx]       = useState(0);
    const [stage, setStage]     = useState('universal'); // 'universal' | 'branch' | 'result'
    const [branch, setBranch]   = useState(null);
    const [answers, setAnswers] = useState({});
    const [selected, setSelected]   = useState(null);
    const [advancing, setAdvancing] = useState(false);
    const [exiting, setExiting]     = useState(false);

    useEffect(() => {
        if (active) {
            setUIdx(0); setBIdx(0);
            setStage('universal');
            setBranch(null);
            setAnswers({});
            setSelected(null);
            setAdvancing(false);
        }
    }, [active]);

    if (!active) return null;
    if (typeof document === 'undefined' || !document.body) return null;

    const branchQuestions = branch === 'practice_workspace' ? WORKSPACE_QUESTIONS : GUIDED_QUESTIONS;
    const currentQ = stage === 'universal' ? U_QUESTIONS[uIdx] : branchQuestions[bIdx];
    const questionText = currentQ?.qFn ? currentQ.qFn(answers) : currentQ?.q;

    // Progress
    const branchLen = branch
        ? (branch === 'practice_workspace' ? WORKSPACE_QUESTIONS.length : GUIDED_QUESTIONS.length)
        : GUIDED_QUESTIONS.length;
    const totalQ = U_QUESTIONS.length + branchLen;
    const currentQNum = stage === 'universal' ? uIdx + 1 : U_QUESTIONS.length + bIdx + 1;
    const progress = stage === 'result' ? 1 : (currentQNum - 1) / totalQ;

    const recommendation = stage === 'result' ? getRecommendation(branch, answers) : null;
    const canGoBack = !(stage === 'universal' && uIdx === 0);

    const dismiss = () => {
        setExiting(true);
        setTimeout(() => {
            setExiting(false);
            setUIdx(0); setBIdx(0);
            setStage('universal');
            setBranch(null);
            setAnswers({});
            setSelected(null);
            setAdvancing(false);
            onDismiss?.();
        }, 200);
    };

    const handleSelect = (opt) => {
        if (advancing) return;
        setSelected(opt);
        setAdvancing(true);
        const newAnswers = {
            ...answers,
            [currentQ.id]: opt.score !== undefined ? opt.score : opt.value,
        };
        setAnswers(newAnswers);

        setTimeout(() => {
            if (stage === 'universal') {
                if (uIdx < U_QUESTIONS.length - 1) {
                    setUIdx((i) => i + 1);
                } else {
                    const computedBranch = computeBranch(newAnswers);
                    setBranch(computedBranch);
                    setStage('branch');
                    setBIdx(0);
                }
            } else {
                if (bIdx < branchQuestions.length - 1) {
                    setBIdx((i) => i + 1);
                } else {
                    setStage('result');
                }
            }
            setSelected(null);
            setAdvancing(false);
        }, 320);
    };

    const handleBack = () => {
        if (stage === 'result') {
            setStage('branch');
            setBIdx(branchQuestions.length - 1);
        } else if (stage === 'branch') {
            if (bIdx > 0) {
                setBIdx((i) => i - 1);
            } else {
                setStage('universal');
                setUIdx(U_QUESTIONS.length - 1);
                setBranch(null);
            }
        } else if (stage === 'universal' && uIdx > 0) {
            setUIdx((i) => i - 1);
        }
    };

    const handleBegin = () => {
        // Persist quiz profile so the coach can personalize immediately
        try {
            let userId = localStorage.getItem('alapana_user_id');
            if (!userId) {
                userId = 'user_' + Math.random().toString(36).slice(2, 10);
                localStorage.setItem('alapana_user_id', userId);
            }
            fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    experience: answers.experience,
                    goal: answers.goal,
                    learner: answers.learner,
                    age: answers.age,
                    preference: answers.preference,
                    branch,
                    mode: recommendation.mode,
                    workspace_intent: answers.workspace_intent ?? null,
                }),
            }).catch(() => {});
        } catch {}

        onModeSelected?.(recommendation.mode);
        const dest = recommendation.target
            ? { view: recommendation.action, target: recommendation.target, mode: recommendation.mode }
            : { view: recommendation.action, mode: recommendation.mode };
        dismiss();
        onNavigate?.(dest);
    };

    const switchBranch = (toBranch) => {
        const branchKeys = [...GUIDED_QUESTIONS, ...WORKSPACE_QUESTIONS].map((q) => q.id);
        setAnswers((prev) => Object.fromEntries(Object.entries(prev).filter(([k]) => !branchKeys.includes(k))));
        setBranch(toBranch);
        setStage('branch');
        setBIdx(0);
    };

    // ── Branch pill colours
    const isGuided = branch === 'guided_path';
    const pillBg    = isGuided ? 'rgba(247,214,134,0.10)' : 'rgba(180,210,247,0.08)';
    const pillBorder= isGuided ? 'rgba(247,214,134,0.20)' : 'rgba(180,210,247,0.18)';
    const pillText  = isGuided ? 'rgba(247,214,134,0.85)' : 'rgba(180,210,247,0.85)';
    const pillLabel = isGuided ? 'Guided Path' : 'Practice Workspace';

    return createPortal(
        <div
            className={`fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-4 transition-opacity duration-200 ${exiting ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: 'rgba(10,4,2,0.82)', backdropFilter: 'blur(4px)' }}
        >
            <div
                className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] transition-all duration-200 ${exiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
                style={{ background: '#150801', border: '1px solid rgba(247,214,134,0.18)' }}
            >
                {/* Progress bar */}
                <div className="h-[2px] bg-white/8">
                    <div className="h-full bg-[#f7d686] transition-all duration-500 ease-out" style={{ width: `${progress * 100}%` }} />
                </div>

                <div className="p-5 sm:p-8">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-7">
                        <button
                            onClick={handleBack}
                            className={`text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors flex items-center gap-1 py-2 pr-2 -ml-1 ${!canGoBack ? 'invisible' : ''}`}
                        >
                            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 2L4 6l4 4"/></svg>
                            Back
                        </button>

                        {stage !== 'result' ? (
                            <span className="text-[9px] font-mono text-[#f7d686]/40 uppercase tracking-widest">
                                {currentQNum} / {branch ? totalQ : U_QUESTIONS.length}
                            </span>
                        ) : (
                            <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: pillText }}>
                                {pillLabel}
                            </span>
                        )}

                        <button
                            onClick={dismiss}
                            className="w-9 h-9 flex items-center justify-center rounded-full text-white/25 hover:text-white/60 hover:bg-white/8 transition-all text-xs -mr-1.5"
                        >
                            ✕
                        </button>
                    </div>

                    {stage !== 'result' ? (
                        /* ── Question screen ── */
                        <>
                            {/* Intro header — first universal question */}
                            {stage === 'universal' && uIdx === 0 && (
                                <div className="mb-5 pb-5 border-b border-white/8">
                                    <h2 className="font-playfair text-[18px] text-[#f7d686] font-bold mb-1.5">Find your best starting point</h2>
                                    <p className="text-white/45 text-[12px] font-playfair leading-relaxed">We'll recommend the right Carnatic path based on your experience and goals.</p>
                                </div>
                            )}

                            {/* Branch intro — first question of branch */}
                            {stage === 'branch' && bIdx === 0 && (
                                <div className="mb-5 pb-5 border-b border-white/8">
                                    <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-3"
                                         style={{ background: pillBg, border: `1px solid ${pillBorder}` }}>
                                        <span className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: pillText }}>{pillLabel}</span>
                                    </div>
                                    <p className="text-white/45 text-[12px] font-playfair leading-relaxed">
                                        {branch === 'guided_path'
                                            ? 'A few more questions to find your best starting lesson.'
                                            : 'One last question to point you to the right starting tool.'}
                                    </p>
                                </div>
                            )}

                            <div className="mb-6">
                                <h2 className="font-playfair text-[19px] sm:text-[22px] text-white font-bold leading-snug mb-2">{questionText}</h2>
                                {currentQ.sub && (
                                    <p className="text-[#f7d686]/50 text-[11px] font-mono tracking-widest">{currentQ.sub}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                {currentQ.options.map((opt) => {
                                    const isChosen = selected === opt;
                                    return (
                                        <button
                                            key={opt.label}
                                            onClick={() => handleSelect(opt)}
                                            disabled={advancing}
                                            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                                                isChosen
                                                    ? 'bg-[#f7d686] border-[#f7d686]'
                                                    : 'bg-white/[0.04] border-white/10 hover:border-[#f7d686]/35 hover:bg-white/[0.07]'
                                            }`}
                                        >
                                            {opt.icon && (
                                                <span className={isChosen ? 'text-[#1a0804]' : 'text-[#f7d686]/60'}>
                                                    {opt.icon}
                                                </span>
                                            )}
                                            <span className="flex flex-col min-w-0">
                                                <span className={`font-playfair font-bold text-[13px] leading-tight ${isChosen ? 'text-[#1a0804]' : 'text-white'}`}>
                                                    {opt.label}
                                                </span>
                                                {opt.sub && (
                                                    <span className={`text-[11px] mt-0.5 ${isChosen ? 'text-[#1a0804]/65' : 'text-white/35'}`}>
                                                        {opt.sub}
                                                    </span>
                                                )}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    ) : recommendation.type === 'guided' ? (
                        /* ── Guided Path result ── */
                        <>
                            <div className="text-center mb-5">
                                <span className="text-[9px] font-mono text-[#f7d686]/50 uppercase tracking-[0.25em] block mb-4">Your best starting point</span>
                                <div className="w-14 h-14 rounded-full border border-[#f7d686]/25 bg-[#f7d686]/8 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-[#f7d686]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 18V5l12-2v13"/>
                                        <circle cx="6" cy="18" r="3"/>
                                        <circle cx="18" cy="16" r="3"/>
                                    </svg>
                                </div>
                                <span className="text-[9px] font-mono text-[#f7d686]/50 uppercase tracking-widest block mb-1">Guided Path</span>
                                <h2 className="font-playfair text-2xl text-[#f7d686] font-bold leading-tight">{recommendation.headline}</h2>
                                {recommendation.detail && (
                                    <p className="text-white/35 text-[10px] font-mono mt-1.5 tracking-wider">{recommendation.detail}</p>
                                )}
                            </div>

                            <p className="text-white/60 text-[13px] font-playfair leading-relaxed text-center mb-2">
                                {recommendation.body}
                            </p>

                            <p className="text-[#f7d686]/35 text-[11px] italic text-center mt-3 mb-1 px-1 font-playfair">
                                You can switch to the full practice workspace anytime as your needs grow.
                            </p>

                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    onClick={handleBegin}
                                    className="w-full py-3 bg-[#f7d686] hover:bg-white text-[#150801] font-playfair font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-[0_0_30px_rgba(247,214,134,0.2)]"
                                >
                                    {recommendation.cta} →
                                </button>
                                <button
                                    onClick={() => switchBranch('practice_workspace')}
                                    className="w-full py-2 text-[11px] text-white/25 hover:text-white/50 transition-colors font-playfair italic"
                                >
                                    Actually, show me the full workspace
                                </button>
                            </div>
                        </>
                    ) : (
                        /* ── Practice Workspace result ── */
                        <>
                            <div className="text-center mb-5">
                                <span className="text-[9px] font-mono uppercase tracking-[0.25em] block mb-4" style={{ color: 'rgba(180,210,247,0.5)' }}>Your practice workspace is ready</span>
                                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                                     style={{ border: '1px solid rgba(180,210,247,0.20)', background: 'rgba(180,210,247,0.07)' }}>
                                    <svg className="w-6 h-6" style={{ color: 'rgba(180,210,247,0.85)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7" rx="1"/>
                                        <rect x="14" y="3" width="7" height="7" rx="1"/>
                                        <rect x="3" y="14" width="7" height="7" rx="1"/>
                                        <rect x="14" y="14" width="7" height="7" rx="1"/>
                                    </svg>
                                </div>
                                <span className="text-[9px] font-mono uppercase tracking-widest block mb-1" style={{ color: 'rgba(180,210,247,0.5)' }}>Practice Workspace</span>
                                <h2 className="font-playfair text-2xl font-bold leading-tight" style={{ color: 'rgba(200,226,255,0.92)' }}>{recommendation.headline}</h2>
                            </div>

                            <p className="text-white/60 text-[13px] font-playfair leading-relaxed text-center mb-2">
                                {recommendation.body}
                            </p>

                            {recommendation.secondary && (
                                <p className="text-[11px] font-playfair italic text-center mb-2 px-1" style={{ color: 'rgba(180,210,247,0.35)' }}>
                                    ✦ {recommendation.secondary}
                                </p>
                            )}

                            <p className="text-[#f7d686]/35 text-[11px] italic text-center mb-2 px-1 font-playfair">
                                Prefer more structure? You can switch to Guided Path anytime.
                            </p>

                            <div className="flex flex-col gap-2 mt-3">
                                <button
                                    onClick={handleBegin}
                                    className="w-full py-3 font-playfair font-bold text-sm tracking-wider uppercase rounded-xl transition-all"
                                    style={{ background: 'rgba(180,210,247,0.12)', border: '1px solid rgba(180,210,247,0.24)', color: 'rgba(200,226,255,0.92)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(180,210,247,0.20)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(180,210,247,0.12)'; }}
                                >
                                    {recommendation.cta} →
                                </button>
                                <button
                                    onClick={() => switchBranch('guided_path')}
                                    className="w-full py-2 text-[11px] text-white/25 hover:text-white/50 transition-colors font-playfair italic"
                                >
                                    Actually, I want the guided path
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
