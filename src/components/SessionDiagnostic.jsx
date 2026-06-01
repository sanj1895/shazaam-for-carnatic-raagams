import { useEffect } from 'react';
import { createPortal } from 'react-dom';

// Each option routes directly to an existing tool view.
// 'viveka' and 'listen' require musician mode — the parent handles that via goToAdvanced.
const OPTIONS = [
  {
    id: 'confusion',
    label: 'I keep confusing ragas',
    sub: 'Two ragas sound similar and I cannot tell them apart',
    view: 'viveka',
    tag: 'Viveka',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="12" r="4.5"/>
        <circle cx="16" cy="12" r="4.5"/>
        <path d="M11.5 9.5 Q12 8 12.5 9.5 Q13 11 12.5 12.5 Q12 14 11.5 12.5 Q11 11 11.5 9.5Z" fill="currentColor" opacity="0.4" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 'pitch',
    label: 'My pitch or shruti feels unstable',
    sub: 'I want to improve my tuning and ear accuracy',
    view: 'shruthi',
    tag: 'Shruthi',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12 C4.5 5.5 6.5 5.5 9 12 S13.5 18.5 16 12 S20.5 5.5 22 12"/>
      </svg>
    ),
  },
  {
    id: 'guided',
    label: 'I want a guided 20-minute session',
    sub: 'Take me through a structured practice sequence',
    view: 'tutor',
    tag: 'Gurukul',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="9" y1="6" x2="20" y2="6"/>
        <line x1="9" y1="12" x2="20" y2="12"/>
        <line x1="9" y1="18" x2="20" y2="18"/>
        <polyline points="4 6 5 7 7 4"/>
        <polyline points="4 12 5 13 7 10"/>
        <polyline points="4 18 5 19 7 16"/>
      </svg>
    ),
  },
  {
    id: 'listen',
    label: 'Listen to me and tell me what to fix',
    sub: 'Sing a phrase and get real-time feedback',
    view: 'listen',
    tag: 'Dhwani',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="12" rx="3"/>
        <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
];

export default function SessionDiagnostic({ active, onNavigate, onDismiss }) {
  useEffect(() => {
    if (!active) return;
    const handler = (e) => { if (e.key === 'Escape') onDismiss?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, onDismiss]);

  if (!active || typeof document === 'undefined' || !document.body) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      style={{ background: 'rgba(10,4,2,0.84)', backdropFilter: 'blur(5px)' }}
      onClick={onDismiss}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] animate-fade-in"
        style={{ background: '#150801', border: '1px solid rgba(247,214,134,0.18)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-8">

          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-[9px] font-mono text-[#f7d686]/40 uppercase tracking-widest">
              Session start
            </span>
            <button
              onClick={onDismiss}
              className="w-9 h-9 flex items-center justify-center rounded-full text-white/25 hover:text-white/65 hover:bg-white/8 transition-all text-xs"
              aria-label="Skip and open workspace"
            >
              ✕
            </button>
          </div>

          {/* Question */}
          <h2 className="font-playfair text-[22px] sm:text-[26px] text-white font-bold leading-tight mb-1.5">
            What feels difficult today?
          </h2>
          <p className="text-white/38 text-[12px] font-playfair leading-relaxed mb-6">
            Pick one — I will take you directly to the right tool.
          </p>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onNavigate(opt.view)}
                className="w-full text-left px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] hover:border-[#f7d686]/35 hover:bg-white/[0.07] active:bg-white/[0.10] transition-all duration-200 flex items-center gap-3.5 group"
              >
                <span className="text-[#f7d686]/55 flex-shrink-0 group-hover:text-[#f7d686]/80 transition-colors">
                  {opt.icon}
                </span>
                <span className="flex flex-col min-w-0 flex-1">
                  <span className="font-playfair font-bold text-[13px] text-white leading-tight">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-white/33 mt-0.5 leading-snug">
                    {opt.sub}
                  </span>
                </span>
                <span
                  className="flex-shrink-0 text-[8px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(247,214,134,0.7)', borderColor: 'rgba(247,214,134,0.2)', background: 'rgba(247,214,134,0.06)' }}
                >
                  {opt.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className="mt-5 w-full text-center text-[11px] font-playfair italic text-white/22 hover:text-white/50 transition-colors py-2"
          >
            Just open the workspace →
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
