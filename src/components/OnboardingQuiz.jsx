import { useState } from 'react';
import { createPortal } from 'react-dom';

const QUESTIONS = [
    {
        id: 'learner',
        q: 'Who will be learning?',
        options: [
            {
                label: 'Me',
                sub: "I'm learning for myself",
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
        qFn: (answers) => answers.learner === 'other' ? 'How old are they?' : 'How old are you?',
        options: [
            { label: 'Under 8', value: 'very_young' },
            { label: '8 – 12', value: 'child' },
            { label: '13 – 17', value: 'teen' },
            { label: '18+', value: 'adult' },
        ],
    },
    {
        id: 'studied',
        qFn: (answers) => answers.learner === 'other' ? 'Have they studied Carnatic music before?' : 'Have you studied Carnatic music before?',
        options: [
            { label: 'Never', sub: 'Starting completely fresh', score: 0 },
            { label: 'A little', sub: 'Some exposure, no formal training', score: 1 },
            { label: 'Yes, formally', sub: 'Had a guru or classes', score: 2 },
        ],
    },
    {
        id: 'swaras',
        qFn: (answers) => answers.learner === 'other' ? 'Can they sing the 7 swaras?' : 'Can you sing the 7 swaras?',
        sub: 'Sa  ·  Ri  ·  Ga  ·  Ma  ·  Pa  ·  Da  ·  Ni',
        options: [
            { label: 'Not yet', score: 0 },
            { label: "Heard them, not confidently", score: 1 },
            { label: 'Yes, can sing them', score: 2 },
        ],
    },
    {
        id: 'shruti',
        qFn: (answers) => answers.learner === 'other' ? 'Can they identify their Shruti?' : 'Can you identify your Shruti?',
        sub: 'Your personal home note — Sa',
        options: [
            { label: "What's Shruti?", score: 0 },
            { label: 'I know what it is', score: 1 },
            { label: 'Yes, I know my Sa', score: 2 },
        ],
    },
    {
        id: 'tala',
        qFn: (answers) => answers.learner === 'other' ? 'Do they know how to keep Tala?' : 'Do you know how to keep Tala?',
        sub: 'Clapping the rhythmic cycle while singing',
        options: [
            { label: "What's Tala?", score: 0 },
            { label: "I've heard of it", score: 1 },
            { label: 'Yes, Adi Tala', score: 2 },
        ],
    },
];

const SCORE_KEYS = ['studied', 'swaras', 'shruti', 'tala'];

function getPath(totalScore, learner, age) {
    const isOther = learner === 'other';
    const pronoun = isOther ? 'They' : 'You';
    const possessive = isOther ? 'Their' : 'Your';
    const isVeryYoung = age === 'very_young';
    const isChild = age === 'child';

    if (isVeryYoung) {
        return {
            level: 'Beginner',
            headline: 'Carnatic Singing Foundations',
            body: `${pronoun}'ll start with the very basics — finding Sa, gentle breathing, and first sounds. Designed to be playful and encouraging.`,
            detail: '5 structured stages · First notes in under 15 minutes',
            note: isOther ? 'Activities are designed to be accessible and joyful for very young learners.' : null,
            action: 'tutor',
            cta: 'Start Foundations',
            mode: 'beginner',
            target: { courseId: 'foundations', unitId: 'stage1', lessonId: 'm1_1' },
        };
    }

    if (totalScore <= 2) {
        return {
            level: 'Beginner',
            headline: 'Carnatic Singing Foundations',
            body: `${pronoun}'ll build everything from the ground up — posture, breath, shruti, and first swaras. No prior knowledge needed.`,
            detail: '5 structured stages · First notes in under 15 minutes',
            note: isChild && isOther ? 'The exercises are designed to be accessible and engaging for young learners.' : null,
            action: 'tutor',
            cta: 'Start Foundations',
            mode: 'beginner',
            target: { courseId: 'foundations', unitId: 'stage1', lessonId: 'm1_1' },
        };
    } else if (totalScore <= 5) {
        return {
            level: 'Developing',
            headline: 'Sarali Varisai',
            body: `${pronoun} have the basics. We'll refine pitch, timing, and control through the foundational scale exercises — the backbone of all Carnatic training.`,
            detail: '14 progressive exercises · Multiple speeds',
            note: isChild && isOther ? "Sarali Varisai is ideal for building a young learner's musical ear and muscle memory." : null,
            action: 'tutor',
            cta: 'Start Sarali Varisai',
            mode: 'beginner',
            target: { courseId: 'sarali_varisai', unitId: 'sarali_stage1', lessonId: 's_1' },
        };
    } else {
        return {
            level: 'Intermediate',
            headline: 'Daily Sadhana',
            body: `${pronoun}'re past the basics. ${possessive} structured daily practice is ready — plus the full workspace tools: Transcribe, Dhwani, and Raga Kosha.`,
            detail: '4 daily steps · Build your streak',
            note: null,
            action: 'sadhana',
            cta: 'Open Daily Sadhana',
            mode: 'beginner',
        };
    }
}

export default function OnboardingQuiz({ active, onDismiss, onNavigate, onModeSelected }) {
    const [qIdx, setQIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selected, setSelected] = useState(null);
    const [advancing, setAdvancing] = useState(false);
    const [done, setDone] = useState(false);
    const [exiting, setExiting] = useState(false);

    if (!active) return null;
    if (typeof document === 'undefined' || !document.body) return null;

    const q = QUESTIONS[qIdx];
    const questionText = q.qFn ? q.qFn(answers) : q.q;
    const isLast = qIdx === QUESTIONS.length - 1;
    const totalScore = SCORE_KEYS.reduce((sum, k) => sum + (answers[k] ?? 0), 0);
    const path = done ? getPath(totalScore, answers.learner ?? 'self', answers.age ?? 'adult') : null;

    const dismiss = () => {
        setExiting(true);
        setTimeout(() => {
            setExiting(false);
            setQIdx(0);
            setAnswers({});
            setSelected(null);
            setAdvancing(false);
            setDone(false);
            onDismiss?.();
        }, 200);
    };

    const handleSelect = (opt) => {
        if (advancing) return;
        setSelected(opt);
        setAdvancing(true);
        const newAnswers = { ...answers, [q.id]: opt.score !== undefined ? opt.score : opt.value };
        setAnswers(newAnswers);
        setTimeout(() => {
            if (isLast) {
                setDone(true);
            } else {
                setQIdx((i) => i + 1);
            }
            setSelected(null);
            setAdvancing(false);
        }, 360);
    };

    const handleBack = () => {
        if (done) { setDone(false); return; }
        if (qIdx > 0) { setQIdx((i) => i - 1); setSelected(null); }
    };

    const handleBegin = () => {
        onModeSelected?.(path.mode || 'beginner');
        const dest = path.target
            ? { view: path.action, target: path.target, mode: path.mode || 'beginner' }
            : { view: path.action, mode: path.mode || 'beginner' };
        dismiss();
        onNavigate?.(dest);
    };

    const progress = done ? 1 : qIdx / QUESTIONS.length;

    return createPortal(
        <div
            className={`fixed inset-0 z-[9990] flex items-center justify-center p-4 transition-opacity duration-200 ${exiting ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: 'rgba(10,4,2,0.82)', backdropFilter: 'blur(4px)' }}
        >
            <div
                className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] transition-all duration-200 ${exiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
                style={{ background: '#150801', border: '1px solid rgba(247,214,134,0.18)' }}
            >
                {/* Gold progress bar */}
                <div className="h-[2px] bg-white/8">
                    <div
                        className="h-full bg-[#f7d686] transition-all duration-500 ease-out"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>

                <div className="p-6 sm:p-8">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-7">
                        <button
                            onClick={handleBack}
                            className={`text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors flex items-center gap-1 ${(qIdx === 0 && !done) ? 'invisible' : ''}`}
                        >
                            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 2L4 6l4 4"/></svg>
                            Back
                        </button>

                        {!done && (
                            <span className="text-[9px] font-mono text-[#f7d686]/40 uppercase tracking-widest">
                                {qIdx + 1} of {QUESTIONS.length}
                            </span>
                        )}

                        <button
                            onClick={dismiss}
                            className="w-6 h-6 flex items-center justify-center rounded-full text-white/25 hover:text-white/60 hover:bg-white/8 transition-all text-xs"
                        >
                            ✕
                        </button>
                    </div>

                    {!done ? (
                        /* ── Question screen ── */
                        <>
                            {qIdx === 0 && (
                                <div className="mb-5 pb-5 border-b border-white/8">
                                    <h2 className="font-playfair text-[18px] text-[#f7d686] font-bold mb-1.5">Find your best starting point</h2>
                                    <p className="text-white/45 text-[12px] font-playfair leading-relaxed">We'll recommend the right Carnatic path based on your experience and comfort level.</p>
                                </div>
                            )}
                            <div className="mb-6">
                                <h2 className="font-playfair text-[22px] text-white font-bold leading-snug mb-2">{questionText}</h2>
                                {q.sub && (
                                    <p className="text-[#f7d686]/50 text-[11px] font-mono tracking-widest">{q.sub}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                {q.options.map((opt) => {
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
                    ) : (
                        /* ── Result screen ── */
                        <>
                            <div className="text-center mb-6">
                                <span className="text-[9px] font-mono text-[#f7d686]/50 uppercase tracking-[0.25em] block mb-5">Your Learning Path</span>

                                {/* Ornamental ring */}
                                <div className="w-14 h-14 rounded-full border border-[#f7d686]/25 bg-[#f7d686]/8 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-[#f7d686]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 18V5l12-2v13"/>
                                        <circle cx="6" cy="18" r="3"/>
                                        <circle cx="18" cy="16" r="3"/>
                                    </svg>
                                </div>

                                <span className="text-[9px] font-mono text-[#f7d686]/50 uppercase tracking-widest block mb-1">{path.level}</span>
                                <h2 className="font-playfair text-2xl text-[#f7d686] font-bold leading-tight">{path.headline}</h2>
                                <p className="text-white/35 text-[10px] font-mono mt-1.5 tracking-wider">{path.detail}</p>
                            </div>

                            <p className="text-white/60 text-[13px] font-playfair leading-relaxed text-center mb-3">
                                {path.body}
                            </p>

                            {path.note && (
                                <p className="text-[#f7d686]/50 text-[11px] italic text-center mb-4 px-2">
                                    ✦ {path.note}
                                </p>
                            )}

                            <p className="text-[#f7d686]/38 text-[11px] italic text-center mt-4 mb-1 px-1 font-playfair">
                                You can always switch to the full practice tools as you grow.
                            </p>
                            <div className="flex flex-col gap-2 mt-3">
                                <button
                                    onClick={handleBegin}
                                    className="w-full py-3 bg-[#f7d686] hover:bg-white text-[#150801] font-playfair font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-[0_0_30px_rgba(247,214,134,0.2)]"
                                >
                                    {path.cta} →
                                </button>
                                <button
                                    onClick={dismiss}
                                    className="w-full py-2 text-[11px] text-white/25 hover:text-white/50 transition-colors font-playfair italic"
                                >
                                    Just explore on my own
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
