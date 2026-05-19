import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const STEPS = [
  {
    view: 'home',
    selector: '#tour-logo',
    icon: '🪔',
    title: 'Welcome to Alapana',
    body: "Your complete digital Carnatic music companion. Let's take a quick guided tour to explore the practice console step-by-step!",
    isWelcome: true,
  },
  {
    view: 'sadhana',
    selector: '.tour-sadhana-console',
    symbol: '🧘‍♀️',
    feature: 'Daily Sadhana',
    title: 'Your Practice Path',
    body: "Every day, Alapana builds a custom vocal sequence for you — from warmups to ear training. Complete this routine to build your daily streak!",
    hint: "Best way to build muscle memory and stay consistent",
  },
  {
    view: 'shruthi',
    selector: '#tour-shruthi-box',
    symbol: '〜',
    feature: 'Shruthi Box',
    title: 'Continuous Reference Drone',
    body: "The Shruthi Box plays high-fidelity reference drones. Singing along with the drone trains your ear and is the absolute foundation of Carnatic singing.",
    hint: 'Lock in your comfort pitch baseline first',
  },
  {
    view: 'tutor',
    selector: '#tour-tutor-container',
    symbol: '◈',
    feature: 'AI Vocal Tutor',
    title: 'Step-by-Step AI Guide',
    body: "Learn classical scales like Sarali Varisais. The AI Guru tracks your vocal pitch line in real time to evaluate stability, timing, and gamakam.",
    hint: 'Look for the golden real-time scrolling pitch wave!',
  },
  {
    view: 'keyboard',
    selector: '#tour-swara-keyboard',
    symbol: '♩',
    feature: 'Swara Keyboard',
    title: 'Microtonal Swaras Keyboard',
    body: "Play individual relative swaras on a virtual keyboard and explore Sanskrit translations in the Swara Guide to understand scales deeply.",
    hint: 'Tap "Swara Guide" to explore Sanskrit definitions',
  },
  {
    view: 'home',
    selector: '#tour-logo',
    icon: '✦',
    title: "You're all set!",
    body: "You are ready to begin your vocal journey. Tap Start Learning to begin, or click any tab to explore Alapana at your own pace.",
    isLast: true,
  },
];

export default function OnboardingTour({ active, onDismiss, onStartLearning, onGoTo }) {
  const [step, setStep]       = useState(0);
  const [exiting, setExiting] = useState(false);
  const [highlightRect, setHighlightRect] = useState(null);

  // Sync active state
  useEffect(() => {
    if (active) {
      setStep(0);
      setExiting(false);
      onGoTo?.('home');
    }
  }, [active]);

  // Handle dynamic spotlight positioning
  useEffect(() => {
    if (!active) {
      setHighlightRect(null);
      return;
    }

    const current = STEPS[step];
    const updateRect = () => {
      if (!current?.selector) {
        setHighlightRect(null);
        return;
      }
      const el = document.querySelector(current.selector);
      if (el) {
        setHighlightRect(el.getBoundingClientRect());
      } else {
        setHighlightRect(null);
      }
    };

    updateRect();
    const t1 = setTimeout(updateRect, 100);
    const t2 = setTimeout(updateRect, 400);

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [step, active]);

  if (!active) return null;

  const current = STEPS[step];
  const isFirst = step === 0;
  const isLast  = step === STEPS.length - 1;
  const isFeatureStep = !current.isWelcome && !current.isLast;

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      onDismiss?.();
    }, 250);
  };

  const goToStep = (nextIdx) => {
    if (nextIdx < 0 || nextIdx >= STEPS.length) return;
    const next = STEPS[nextIdx];
    if (next?.view) {
      onGoTo?.(next.view);
    }
    setStep(nextIdx);
  };

  const progressDots = (
    <div className="flex gap-1.5 items-center">
      {STEPS.map((_, i) => (
        <button
          key={i}
          onClick={() => goToStep(i)}
          className={`rounded-full transition-all duration-200 ${
            i === step ? 'w-5 h-1.5 bg-c-gold' : 'w-1.5 h-1.5 bg-c-border/60 hover:bg-c-border'
          }`}
          aria-label={`Go to step ${i + 1}`}
        />
      ))}
    </div>
  );

  return createPortal(
    <>
      {/* 1. Dynamic Spotlit Backdrop Layer */}
      <div 
        className={`fixed inset-0 z-[9990] pointer-events-none transition-opacity duration-300 ${exiting ? 'opacity-0' : 'opacity-100'}`}
      >
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="tour-spotlight-mask">
              {/* White overlay dims everything */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {/* Black rounded cutout reveals target cleanly */}
              {highlightRect && (
                <rect
                  x={highlightRect.x - 12}
                  y={highlightRect.y - 12}
                  width={highlightRect.width + 24}
                  height={highlightRect.height + 24}
                  rx="16"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          {/* Dimmer backdrop overlay utilizing target mask */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(24, 10, 3, 0.78)"
            mask="url(#tour-spotlight-mask)"
            className="transition-all duration-300 pointer-events-auto"
            onClick={handleDismiss}
          />
        </svg>
      </div>

      {/* 2. Highlight border stroke */}
      {highlightRect && (
        <div
          className={`fixed pointer-events-none z-[9991] rounded-2xl border-2 border-c-gold/80 transition-all duration-300 shadow-[0_0_24px_rgba(200,148,31,0.45)] ${exiting ? 'opacity-0' : 'opacity-100'}`}
          style={{
            left: highlightRect.x - 12,
            top: highlightRect.y - 12,
            width: highlightRect.width + 24,
            height: highlightRect.height + 24,
            position: 'fixed',
          }}
        />
      )}

      {/* 3. Tour Control Card Container */}
      <div
        className={`fixed inset-x-0 bottom-0 md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-8 z-[9995] flex justify-center px-4 pb-[76px] md:pb-0 pointer-events-none transition-all duration-300 ${exiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
      >
        <div className="pointer-events-auto relative bg-[#1e0c04] border border-c-gold/40 rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.6)] max-w-[380px] w-full overflow-hidden animate-slide-up p-5 flex flex-col gap-4">
          
          {/* Heritage Corners */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="heritage-border-corner heritage-corner-tl opacity-50" />
            <div className="heritage-border-corner heritage-corner-tr opacity-50" />
            <div className="heritage-border-corner heritage-corner-bl opacity-50" />
            <div className="heritage-border-corner heritage-corner-br opacity-50" />
          </div>

          {/* Header info */}
          <div className="flex items-center justify-between border-b border-c-gold/20 pb-2.5 z-10 relative">
            <span className="text-[9px] font-mono text-c-gold uppercase tracking-[0.2em]">
              Guided Tour · Step {step + 1} of {STEPS.length}
            </span>
            <button
              onClick={handleDismiss}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-c-card text-c-cream-dark hover:text-c-gold transition-all text-xs"
              aria-label="Close tour"
            >
              ✕
            </button>
          </div>

          {/* Icon or Symbol */}
          <div className="flex items-center gap-3 z-10 relative">
            {current.icon ? (
              <span className="text-3xl">{current.icon}</span>
            ) : (
              <div className="w-10 h-10 rounded-full bg-c-gold/15 border border-c-gold/40 flex items-center justify-center text-c-gold text-lg font-playfair font-bold">
                {current.symbol}
              </div>
            )}
            <div>
              {current.feature && (
                <span className="text-[8px] font-mono text-c-gold uppercase tracking-wider block">{current.feature}</span>
              )}
              <h3 className="font-playfair font-bold text-c-cream text-base leading-tight mt-0.5">{current.title}</h3>
            </div>
          </div>

          {/* Body Content */}
          <div className="z-10 relative space-y-2.5">
            <p className="text-[13px] text-c-cream-dim font-playfair leading-relaxed">{current.body}</p>
            {current.hint && (
              <p className="text-[11px] text-c-gold font-playfair italic">✦ {current.hint}</p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col gap-3 pt-3 border-t border-c-gold/15 z-10 relative">
            <div className="flex justify-between items-center">
              {progressDots}
              <span className="text-[10px] font-mono text-c-cream-dark/50">{step + 1}/{STEPS.length}</span>
            </div>

            {isLast ? (
              <button
                onClick={() => {
                  setExiting(true);
                  setTimeout(() => {
                    setExiting(false);
                    onStartLearning?.();
                  }, 250);
                }}
                className="w-full py-2.5 bg-c-gold hover:bg-c-gold-light text-c-bg font-playfair font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md transform hover:scale-[1.02] cursor-pointer"
              >
                Start Learning →
              </button>
            ) : (
              <div className="flex items-center justify-between mt-1">
                <button
                  onClick={() => goToStep(step - 1)}
                  disabled={isFirst}
                  className="text-xs text-c-cream-dark hover:text-c-cream disabled:opacity-0 transition-all font-playfair py-1 px-2"
                >
                  ← Back
                </button>
                <button
                  onClick={() => goToStep(step + 1)}
                  className="text-xs font-playfair font-bold text-c-bg bg-c-gold hover:bg-c-gold-light transition-all py-1.5 px-4 rounded-lg tracking-wider uppercase cursor-pointer"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
