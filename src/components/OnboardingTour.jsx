import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const STEPS = [
  {
    view: 'home',
    icon: '🪔',
    title: 'Welcome to Alapana',
    body: "Your complete Carnatic music practice tool. Let me take you on a quick tour of each feature.",
    isWelcome: true,
  },
  {
    view: 'sadhana',
    symbol: '🧘‍♀️',
    feature: 'Daily Sadhana',
    title: 'Your daily practice path',
    body: "Every day, Alapana gives you a 4-step practice routine — drone warm-up, scales, keyboard exploration, and ear training. Complete all 4 to build your streak.",
    hint: 'Steps reset each morning',
  },
  {
    view: 'tutor',
    symbol: '📿',
    feature: 'Svara Gurukul',
    title: 'Traditional Vocal Academy',
    body: "Master structured Carnatic exercises (Varisais) through a graded curriculum — from basic notes to complex note patterns, listening and correcting your voice in real-time.",
    hint: "Best place to start if you're a beginner",
  },
  {
    view: 'tutor',
    symbol: '🌊',
    feature: 'Scale Flow Sadhana',
    title: 'Master Arohanam & Avarohanam',
    body: "Practice the ascending (Arohanam) and descending (Avarohanam) scales of any raga in our library with the AI Guru guiding your voice continuously.",
    hint: 'Intermediate and advanced singers can master scales here',
  },
  {
    view: 'shruthi',
    symbol: '〜',
    feature: 'Shruthi',
    title: 'Your practice drone',
    body: "The Shruthi Box plays a continuous drone tone while you practice. Choose between a bellows Harmonium or plucked Tambura sound to stay in tune.",
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
    feature: 'Dhwani',
    title: 'Real-time AI Identification',
    body: "Sing any Carnatic melody and Dhwani listens in real time, detecting your notes and matching them to a raga. There's also an advanced Groq AI mode to capture subtle ornamentations.",
    hint: 'Set your Sa first — it calibrates to your voice',
  },
  {
    view: 'library',
    symbol: '◈',
    feature: 'Raga Kosha',
    title: 'The Treasury of Ragas',
    body: "Browse and search a vast encyclopedia of Carnatic ragas — scale structures, moods, time of day, and signature phrases. Click any raga to practice singing its scale with real-time feedback.",
    hint: 'The Practice tab has AI vocal coaching built in',
  },
  {
    view: 'melakarta',
    symbol: '🗂️',
    feature: 'Melakarta Chart',
    title: 'The parent scale tree',
    body: "Explore the comprehensive 72 Melakarta scale system — the mathematical blueprint for all parent ragas in Carnatic music, laid out in an elegant, interactive grid.",
    hint: 'Tap any melakarta to immediately view and play its scale',
  },
  {
    view: 'bhedam',
    symbol: '🔄',
    feature: 'Graha Bhedam',
    title: 'Discover modal shifts',
    body: "Experience modal shift exploration. Graha Bhedam lets you shift the tonic note (Sa) to other notes in the scale to dynamically unlock entirely new ragas.",
    hint: 'Hear the original scale versus shifted scales in real-time',
  },
  {
    view: null,
    icon: '✦',
    title: "You're all set",
    body: "Tap Start Learning to go through the full curriculum from the beginning, or jump straight to any feature from the navigation bar above.",
    isLast: true,
  },
];

export default function OnboardingTour({ active, onDismiss, onStartLearning, onGoTo }) {
  const [step, setStep]       = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef(null);

  useEffect(() => {
    // Delay mount until next frame to guarantee document.body exists on mobile
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (active) {
      setStep(0);
      setExiting(false);
    }
  }, [active]);

  if (!active || !mounted) return null;

  // Safety check for mobile SSR / early render
  if (typeof document === 'undefined' || !document.body) return null;

  const current = STEPS[step];
  const isFirst = step === 0;
  const isLast  = step === STEPS.length - 1;

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      onDismiss?.();
    }, 200);
  };

  const goToStep = (nextIdx) => {
    if (nextIdx < 0 || nextIdx >= STEPS.length) return;
    const next = STEPS[nextIdx];
    // Navigate to views on desktop only — mobile skips to avoid heavy component mounts
    if (next?.view && window.innerWidth >= 768) {
      onGoTo?.(next.view);
    }
    setStep(nextIdx);
  };

  const progressDots = (
    <div className="flex gap-1.5 items-center flex-wrap">
      {STEPS.map((_, i) => (
        <button
          key={i}
          onClick={() => goToStep(i)}
          className={`rounded-full transition-all duration-150 ${
            i === step ? 'w-5 h-1.5 bg-[#f7d686]' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
          }`}
          aria-label={`Go to step ${i + 1}`}
        />
      ))}
    </div>
  );

  return createPortal(
    <>
      {/* Backdrop — simple dark overlay, NO blur for mobile performance */}
      <div
        className={`fixed inset-0 z-[9990] bg-black/55 transition-opacity duration-200 ${exiting ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleDismiss}
      />

      {/* Tour card */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[9995] flex justify-center px-4 pb-[76px] md:inset-x-auto md:bottom-6 md:right-6 md:left-auto md:pb-0 md:block pointer-events-none transition-all duration-200 ${exiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
      >
        <div className="pointer-events-auto w-full max-w-[400px] relative bg-[#1e0c04] border border-[#f7d686]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden p-5 flex flex-col gap-4">

          {/* Heritage corners */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="heritage-border-corner heritage-corner-tl opacity-50" />
            <div className="heritage-border-corner heritage-corner-tr opacity-50" />
            <div className="heritage-border-corner heritage-corner-bl opacity-50" />
            <div className="heritage-border-corner heritage-corner-br opacity-50" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 relative z-10">
            <span className="text-[9px] font-mono text-[#f7d686]/70 uppercase tracking-[0.2em]">
              Tour · {step + 1} of {STEPS.length}
            </span>
            <button
              onClick={handleDismiss}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all text-xs"
              aria-label="Close tour"
            >
              ✕
            </button>
          </div>

          {/* Icon / Symbol + title */}
          <div className="flex items-center gap-3 relative z-10">
            {current.icon ? (
              <span className="text-3xl flex-shrink-0">{current.icon}</span>
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/10 border border-[#f7d686]/30 flex items-center justify-center text-[#f7d686] text-lg font-playfair font-bold flex-shrink-0">
                {current.symbol}
              </div>
            )}
            <div className="min-w-0">
              {current.feature && (
                <span className="text-[8px] font-mono text-[#f7d686]/70 uppercase tracking-wider block">{current.feature}</span>
              )}
              <h3 className="font-playfair font-bold text-white text-[15px] leading-tight mt-0.5">{current.title}</h3>
            </div>
          </div>

          {/* Body */}
          <div className="relative z-10 space-y-2">
            <p className="text-[13px] text-white/75 font-playfair leading-relaxed">{current.body}</p>
            {current.hint && (
              <p className="text-[11px] text-[#f7d686] font-playfair italic">✦ {current.hint}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 pt-3 border-t border-white/10 relative z-10">
            <div className="flex items-center justify-between">
              {progressDots}
              <span className="text-[9px] font-mono text-white/30 ml-2 flex-shrink-0">{step + 1}/{STEPS.length}</span>
            </div>

            {isLast ? (
              <button
                onClick={() => { handleDismiss(); onStartLearning?.(); }}
                className="w-full py-2.5 bg-[#f7d686] hover:bg-white text-[#1e0c04] font-playfair font-bold text-xs tracking-wider uppercase rounded-xl transition-all"
              >
                Start Learning →
              </button>
            ) : null}

            <div className="flex items-center justify-between">
              <button
                onClick={() => goToStep(step - 1)}
                disabled={isFirst}
                className="text-xs text-white/50 hover:text-white disabled:opacity-0 transition-all font-playfair py-1 px-2"
              >
                ← Back
              </button>
              {isLast ? (
                <button
                  onClick={handleDismiss}
                  className="text-xs text-white/50 hover:text-white transition-all font-playfair italic py-1 px-2"
                >
                  Just explore
                </button>
              ) : (
                <button
                  onClick={() => goToStep(step + 1)}
                  className="text-xs font-playfair font-bold text-[#1e0c04] bg-[#f7d686] hover:bg-white transition-all py-1.5 px-4 rounded-lg tracking-wider uppercase"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
