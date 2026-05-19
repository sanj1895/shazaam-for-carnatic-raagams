import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const TOUR_KEY = 'alapana_tour_v1_done';

const STEPS = [
  {
    view: null,
    icon: '🪔',
    title: 'Welcome to Alapana',
    body: "Your complete Carnatic music practice tool. Let me take you on a quick tour — I'll navigate to each feature so you can see it for yourself.",
    isWelcome: true,
  },
  {
    view: 'tutor',
    symbol: '◈',
    feature: 'Tutor',
    title: 'Learn from scratch',
    body: "New to Carnatic music? The Tutor walks you through a full curriculum — from your very first note all the way to singing complete raga scales. Every step is interactive and listens to your voice.",
    hint: "Best place to start if you're a beginner",
  },
  {
    view: 'shruthi',
    symbol: '〜',
    feature: 'Shruthi',
    title: 'Your practice drone',
    body: "The Shruthi Box plays a continuous drone tone while you practice. Singing against a drone trains your ear to stay in tune — it's an essential part of every Carnatic session.",
    hint: 'Keep this running in the background while you sing',
  },
  {
    view: 'talam',
    symbol: '॥',
    feature: 'Talam',
    title: 'Keep the rhythm',
    body: "Carnatic music is organized into rhythmic cycles called Talam. Practice feeling and keeping the 8-beat Adi Tala — the most common cycle in Carnatic music.",
    hint: 'Try tapping along as you sing',
  },
  {
    view: 'listen',
    symbol: '♬',
    feature: 'Sing',
    title: 'Find your raga',
    body: "Sing any Carnatic melody and Alapana listens in real time, detecting your notes and matching them to a raga. There's also a Groq AI mode that records 30 seconds for a deeper analysis.",
    hint: 'Set your Sa first — it calibrates to your voice',
  },
  {
    view: 'library',
    symbol: '◈',
    feature: 'Library',
    title: 'Explore every raga',
    body: "Browse all Carnatic ragas — scales, mood, famous compositions, and a curated performance for each. Open any raga and hit the Practice tab to sing it and get AI feedback on your voice quality.",
    hint: 'The Practice tab has AI vocal coaching built in',
  },
  {
    view: null,
    icon: '✦',
    title: "You're all set",
    body: "Tap Start Learning to go through the full curriculum from the beginning, or jump straight to any feature from the navigation bar above.",
    isLast: true,
  },
];

export default function OnboardingTour({ onStartLearning, onGoTo }) {
  const [step, setStep]       = useState(0);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(TOUR_KEY)) {
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

  const goToStep = (nextIdx) => {
    const next = STEPS[nextIdx];
    if (next?.view) onGoTo?.(next.view);
    setStep(nextIdx);
  };

  const handleStartLearning = () => {
    dismiss();
    onStartLearning?.();
  };

  if (!visible) return null;

  const current = STEPS[step];
  const isFirst = step === 0;
  const isLast  = step === STEPS.length - 1;
  const isFeatureStep = !current.isWelcome && !current.isLast;

  const progressDots = (
    <div className="flex gap-1.5 items-center">
      {STEPS.map((_, i) => (
        <button
          key={i}
          onClick={() => goToStep(i)}
          className={`rounded-full transition-all duration-200 ${
            i === step ? 'w-5 h-1.5 bg-c-gold' : 'w-1.5 h-1.5 bg-c-border/60 hover:bg-c-border'
          }`}
        />
      ))}
    </div>
  );

  // Welcome / last step — centered blocking modal
  if (!isFeatureStep) {
    return createPortal(
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center p-5 transition-opacity duration-250 ${exiting ? 'opacity-0' : 'opacity-100'}`}
        style={{ background: 'rgba(30, 12, 4, 0.55)', backdropFilter: 'blur(3px)' }}
      >
        <div className="relative bg-c-surface border border-c-border/50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] max-w-[340px] w-full overflow-hidden animate-slide-up">
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="heritage-border-corner heritage-corner-tl" />
            <div className="heritage-border-corner heritage-corner-tr" />
            <div className="heritage-border-corner heritage-corner-bl" />
            <div className="heritage-border-corner heritage-corner-br" />
          </div>

          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-c-border/30 relative z-10">
            <span className="text-[10px] font-mono text-c-cream-dark uppercase tracking-[0.18em]">
              {isLast ? 'Tour complete' : 'Quick tour'} · {step + 1} of {STEPS.length}
            </span>
            <button
              onClick={dismiss}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-c-card text-c-cream-dark hover:text-c-gold transition-all text-xs"
              aria-label="Close tour"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-6 flex flex-col items-center gap-3 relative z-10 text-center">
            <div className="text-4xl">{current.icon}</div>
            <h2 className="font-playfair text-lg font-bold text-c-cream leading-snug">{current.title}</h2>
            <p className="text-[13px] text-c-cream-dim font-playfair leading-relaxed">{current.body}</p>
          </div>

          <div className="px-5 pb-5 flex flex-col gap-3 relative z-10">
            <div className="flex justify-center">{progressDots}</div>

            {isLast && (
              <button
                onClick={handleStartLearning}
                className="w-full py-2.5 bg-c-gold hover:bg-c-gold-light text-c-bg font-playfair font-bold text-sm rounded-xl tracking-wide transition-all shadow-sm"
              >
                Start Learning →
              </button>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => goToStep(step - 1)}
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
                  onClick={() => goToStep(step + 1)}
                  className="text-xs font-playfair font-semibold text-c-gold hover:text-c-gold-light transition-colors px-2 py-1"
                >
                  Take the tour →
                </button>
              )}
            </div>

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

  // Feature steps — floating card docked at bottom, app visible and interactive behind it
  return createPortal(
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] flex justify-center px-4 pb-[72px] md:pb-5 pointer-events-none transition-opacity duration-250 ${exiting ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="pointer-events-auto relative bg-c-surface/96 backdrop-blur-md border border-c-border/60 rounded-2xl shadow-[0_-4px_40px_rgba(0,0,0,0.2)] max-w-[460px] w-full overflow-hidden animate-slide-up">

        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-c-gold/60 to-transparent" />

        <div className="px-4 pt-4 pb-3 flex flex-col gap-2.5">

          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-full bg-c-gold-faint border border-c-gold/30 flex items-center justify-center text-c-gold text-base font-playfair flex-shrink-0">
                {current.symbol}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono text-c-gold uppercase tracking-[0.18em]">{current.feature}</span>
                <h3 className="font-playfair font-bold text-c-cream text-[13px] leading-tight">{current.title}</h3>
              </div>
            </div>
            <button
              onClick={dismiss}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-c-card text-c-cream-dark hover:text-c-gold transition-all text-xs flex-shrink-0 mt-0.5"
              aria-label="Close tour"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <p className="text-[12px] text-c-cream-dim font-playfair leading-relaxed">{current.body}</p>

          {/* Hint */}
          {current.hint && (
            <p className="text-[10px] text-c-gold/80 font-playfair italic">✦ {current.hint}</p>
          )}

          {/* Footer: dots + nav */}
          <div className="flex items-center justify-between pt-2 border-t border-c-border/20">
            <div className="flex items-center gap-2">
              {progressDots}
              <span className="text-[9px] font-mono text-c-cream-dark/40">{step + 1}/{STEPS.length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => goToStep(step - 1)}
                className="text-[11px] text-c-cream-dark hover:text-c-cream transition-colors font-playfair px-2 py-1"
              >
                ← Back
              </button>
              <button
                onClick={() => goToStep(step + 1)}
                className="text-[11px] font-playfair font-semibold text-c-bg bg-c-gold hover:bg-c-gold-light transition-colors px-3 py-1.5 rounded-lg"
              >
                Next →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
