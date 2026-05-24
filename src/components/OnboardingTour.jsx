import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CuratedIcon } from './IconLibrary';

const STEPS = [
  {
    view: 'home',
    title: 'Welcome to Ālāpana',
    body: "Your complete Carnatic music practice companion. Let me take you on a quick tour of each feature.",
    isWelcome: true,
  },
  // ── START HERE ──
  {
    view: 'tutor',
    feature: 'Svara Gurukul',
    title: 'Learn the notes step by step',
    body: "A graded vocal curriculum that takes you from your very first swara to complex note patterns. Each lesson plays the phrase, then listens and guides your voice in real time.",
    hint: "Best place to start if you're a complete beginner",
  },
  {
    view: 'sadhana',
    feature: 'Daily Sadhana',
    title: 'Your daily practice routine',
    body: "Sadhana ties all the features together into a 4-step daily ritual — drone warm-up, vocal curriculum, keyboard exploration, and ear training. Complete all 4 to build your streak.",
    hint: 'Steps reset each morning — consistency is everything',
  },
  // ── PRACTICE ──
  {
    view: 'shruthi',
    feature: 'Shruthi Box',
    title: 'Your practice drone',
    body: "The Shruthi Box plays a continuous drone tone so your ear locks onto the tonic (Sa) before you sing a single note. Choose Harmonium or Tambura.",
    hint: 'Keep this running in the background while you sing',
  },
  {
    view: 'talam',
    feature: 'Talam',
    title: 'Feel the rhythmic cycle',
    body: "Carnatic music is organized into rhythmic cycles called Talam. Practice internalizing the 8-beat Adi Tala — the most common cycle — by tapping along as you sing.",
    hint: 'Try it while you practice scales in Svara Gurukul',
  },
  {
    view: 'transcribe',
    feature: 'Transcribe',
    title: 'Capture your own sangatis',
    body: "Sing your own kriti variations against a selected tala, and the app transcribes your swaras with rhythm-aware notation. You can preview tempo, set Sa, and play back your transcription.",
    hint: 'Great for writing down improvisations and comparing sangati versions',
  },
  {
    view: 'keyboard',
    feature: 'Swara Keyboard',
    title: 'Play swaras on virtual keys',
    body: "Tap any swara to hear it at your exact Sa. Use the keyboard to understand raga scales visually and aurally before trying to sing them.",
    hint: 'Select a raga to highlight its notes on the keyboard',
  },
  {
    view: 'singback',
    feature: 'Sing-Back',
    title: 'Challenge your raga memory',
    body: "A phrase plays — you reproduce it by ear. Aim for 80%+ accuracy to sharpen pitch memory and muscle memory together.",
    hint: 'Gets harder as your ear improves',
  },
  // ── EXPLORE ──
  {
    view: 'listen',
    feature: 'Dhwani',
    title: 'Sing and discover your raga',
    body: "Sing freely and Dhwani listens in real time — it maps every note onto a swara and builds a picture of which raga you might be singing. Use Ālaap AI for a deeper phrase analysis.",
    hint: 'Set your Sa first so it calibrates to your voice',
  },
  {
    view: 'library',
    feature: 'Raga Kosha',
    title: 'The treasury of ragas',
    body: "Browse and search an encyclopedia of Carnatic ragas — scales, moods, time of day, famous compositions, and reference performances. The Practice tab has AI vocal coaching built in.",
    hint: 'Search any raga by name or browse by parent melakarta',
  },
  {
    view: 'melakarta',
    feature: 'Melakarta Chart',
    title: 'The 72-raga parent system',
    body: "All Carnatic ragas descend from 72 mathematically derived parent scales called Melakartas. This interactive grid lets you explore the full system and play any parent scale instantly.",
    hint: 'Tap any cell to view and hear its scale',
  },
  {
    view: 'bhedam',
    feature: 'Graha Bhedam',
    title: 'One scale, many ragas',
    body: "Shift which note you call Sa and the same set of notes transforms into a completely different raga. Graha Bhedam makes this modal alchemy audible and visual.",
    hint: 'Hear how Shankarabharanam becomes Kalyani',
  },
  {
    view: null,
    title: "You're ready to begin",
    body: "Open Svara Gurukul to start structured training, or jump into Transcribe and the other tools from the navigation.",
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
            <div className="w-10 h-10 rounded-full bg-white/10 border border-[#f7d686]/30 flex items-center justify-center text-[#f7d686] flex-shrink-0">
              <CuratedIcon icon={current.view || 'tutor'} className="w-5 h-5" />
            </div>
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
