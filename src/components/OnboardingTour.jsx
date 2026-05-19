import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const TOUR_KEY = 'alapana_tour_v1_done';

const STEPS = [
  {
    icon: '🪔',
    title: 'Welcome to Alapana',
    body: 'Your complete Carnatic music practice tool — whether you\'re just starting out or deepening your practice of ragas you already know.',
  },
  {
    symbol: '◈',
    feature: 'Tutor',
    title: 'Learn from scratch',
    body: 'New to Carnatic music? The Tutor walks you through a full curriculum — from your very first note all the way to singing complete raga scales. Every step is interactive.',
    hint: 'Best place to start if you\'re a beginner',
  },
  {
    symbol: '〜',
    feature: 'Shruthi',
    title: 'Your practice drone',
    body: 'The Shruthi Box plays a continuous drone while you practice. Singing against a drone trains your ear to stay in tune — it\'s an essential part of every practice session.',
    hint: 'Keep this running while you sing',
  },
  {
    symbol: '॥',
    feature: 'Talam',
    title: 'Keep the rhythm',
    body: 'Carnatic music is organized into rhythmic cycles called Talam. Use this to feel and keep the 8-beat Adi Tala — the most common cycle in Carnatic music.',
    hint: 'Practice this alongside your scales',
  },
  {
    symbol: '♬',
    feature: 'Sing',
    title: 'Find your raga',
    body: 'Sing any Carnatic melody and Alapana listens in real time, detecting your notes and matching them to a raga. There\'s also an AI mode that records 30 seconds and does a deeper analysis.',
    hint: 'Set your Sa first — it calibrates to your voice',
  },
  {
    symbol: '◈',
    feature: 'Library',
    title: 'Explore every raga',
    body: 'Browse all Carnatic ragas — scales, mood, famous compositions, and a curated performance for each. Open any raga and hit the Practice tab to sing it and get AI feedback on your voice quality.',
    hint: 'The Practice tab has vocal coaching built in',
  },
  {
    icon: '✦',
    title: 'You\'re all set',
    body: 'Tap Start Learning to go through the curriculum, or jump straight to any feature from the navigation bar. Everything is here whenever you need it.',
    isLast: true,
  },
];

export default function OnboardingTour({ onStartLearning }) {
  const [step, setStep]       = useState(0);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(TOUR_KEY)) {
      // Small delay so the app renders first
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => {
      localStorage.setItem(TOUR_KEY, '1');
      setVisible(false);
      setExiting(false);
    }, 250);
  };

  const handleStartLearning = () => {
    dismiss();
    onStartLearning?.();
  };

  if (!visible) return null;

  const current = STEPS[step];
  const isFirst = step === 0;
  const isLast  = step === STEPS.length - 1;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-5 transition-opacity duration-250 ${exiting ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'rgba(30, 12, 4, 0.55)', backdropFilter: 'blur(3px)' }}
    >
      <div className="relative bg-c-surface border border-c-border/50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] max-w-[340px] w-full overflow-hidden animate-slide-up">

        {/* Heritage corners */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="heritage-border-corner heritage-corner-tl" />
          <div className="heritage-border-corner heritage-corner-tr" />
          <div className="heritage-border-corner heritage-corner-bl" />
          <div className="heritage-border-corner heritage-corner-br" />
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-c-border/30 relative z-10">
          <span className="text-[10px] font-mono text-c-cream-dark uppercase tracking-[0.18em]">
            Quick tour · {step + 1} of {STEPS.length}
          </span>
          <button
            onClick={dismiss}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-c-card text-c-cream-dark hover:text-c-gold transition-all text-xs"
            aria-label="Close tour"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 flex flex-col items-center gap-3 relative z-10 text-center min-h-[220px] justify-center">

          {/* Icon or symbol */}
          {current.symbol ? (
            <div className="w-14 h-14 rounded-full bg-c-gold-faint border border-c-border/40 flex items-center justify-center text-c-gold text-2xl font-playfair shadow-inner">
              {current.symbol}
            </div>
          ) : (
            <div className="text-4xl">{current.icon}</div>
          )}

          {/* Feature badge */}
          {current.feature && (
            <span className="px-3 py-0.5 rounded-full bg-c-gold/10 border border-c-gold/25 text-[10px] font-mono text-c-gold uppercase tracking-widest">
              {current.feature}
            </span>
          )}

          {/* Title */}
          <h2 className="font-playfair text-lg font-bold text-c-cream leading-snug">
            {current.title}
          </h2>

          {/* Body */}
          <p className="text-[13px] text-c-cream-dim font-playfair leading-relaxed">
            {current.body}
          </p>

          {/* Hint */}
          {current.hint && (
            <p className="text-[10px] text-c-gold font-playfair italic mt-0.5">
              ✦ {current.hint}
            </p>
          )}
        </div>

        {/* Footer nav */}
        <div className="px-5 pb-5 flex flex-col gap-3 relative z-10">

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === step ? 'w-5 h-1.5 bg-c-gold' : 'w-1.5 h-1.5 bg-c-border/60 hover:bg-c-border'
                }`}
              />
            ))}
          </div>

          {/* CTA on last step */}
          {isLast ? (
            <button
              onClick={handleStartLearning}
              className="w-full py-2.5 bg-c-gold hover:bg-c-gold-light text-c-bg font-playfair font-bold text-sm rounded-xl tracking-wide transition-all shadow-sm"
            >
              Start Learning →
            </button>
          ) : null}

          {/* Back / Next */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={isFirst}
              className="text-xs text-c-cream-dark hover:text-c-cream disabled:opacity-0 transition-colors font-playfair px-2 py-1"
            >
              ← Back
            </button>

            {isLast ? (
              <button
                onClick={dismiss}
                className="text-xs text-c-cream-dark hover:text-c-cream transition-colors font-playfair italic px-2 py-1"
              >
                Just explore
              </button>
            ) : (
              <button
                onClick={() => setStep(s => s + 1)}
                className="text-xs font-playfair font-semibold text-c-gold hover:text-c-gold-light transition-colors px-2 py-1"
              >
                Next →
              </button>
            )}
          </div>

          {/* Skip */}
          {!isLast && (
            <button
              onClick={dismiss}
              className="text-[10px] text-c-cream-dark/60 hover:text-c-cream-dark transition-colors font-playfair italic text-center -mt-1"
            >
              Skip tour
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
