import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// ── Icons ──────────────────────────────────────────────────────────────────────
const ICONS = {
  confusion: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="12" r="4.5"/>
      <circle cx="16" cy="12" r="4.5"/>
      <path d="M11.5 9.5 Q12 8 12.5 9.5 Q13 11 12.5 12.5 Q12 14 11.5 12.5 Q11 11 11.5 9.5Z" fill="currentColor" opacity="0.35" stroke="none"/>
    </svg>
  ),
  return: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 14l-4-4 4-4"/>
      <path d="M5 10h11a4 4 0 0 1 0 8h-1"/>
    </svg>
  ),
  pitch: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12 C4.5 5.5 6.5 5.5 9 12 S13.5 18.5 16 12 S20.5 5.5 22 12"/>
    </svg>
  ),
  guided: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="6" x2="20" y2="6"/>
      <line x1="9" y1="12" x2="20" y2="12"/>
      <line x1="9" y1="18" x2="20" y2="18"/>
      <polyline points="4 6 5 7 7 4"/>
      <polyline points="4 12 5 13 7 10"/>
      <polyline points="4 18 5 19 7 16"/>
    </svg>
  ),
  listen: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="12" rx="3"/>
      <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
};

// ── Static fallback options (no learner history) ───────────────────────────────
const DEFAULTS = [
  { id: 'confusion', label: 'I keep confusing ragas',            sub: 'Two ragas sound similar and I cannot tell them apart',     view: 'tutor',   tag: 'Gurukul', iconKey: 'confusion' },
  { id: 'pitch',     label: 'My pitch or shruti feels unstable', sub: 'I want to improve my tuning and ear accuracy',             view: 'shruthi', tag: 'Shruthi', iconKey: 'pitch'     },
  { id: 'guided',    label: 'I want a guided 20-minute session', sub: 'Take me through a structured practice sequence',           view: 'tutor',   tag: 'Gurukul', iconKey: 'guided'    },
  { id: 'listen',    label: 'Listen to me and tell me what to fix', sub: 'Sing a phrase and get real-time feedback',              view: 'listen',  tag: 'Dhwani',  iconKey: 'listen'    },
];

// ── Personalise slots 0 and 1 from real session data ──────────────────────────
function buildOptions(model) {
  const opts = DEFAULTS.map(o => ({ ...o })); // shallow copy so we can mutate
  if (!model) return opts;

  const { confusionPairs = [], ragaStats = [] } = model;

  // Slot 0 — name the actual confused pair if one exists
  if (confusionPairs[0]) {
    const { raga, confusedWith, count } = confusionPairs[0];
    opts[0] = {
      ...opts[0],
      label: `Fix ${raga} vs ${confusedWith}`,
      sub:   `You have confused these ${count} time${count !== 1 ? 's' : ''} — drill the distinguishing phrase in Gurukul`,
    };
  }

  // Slot 1 — name the stale developing raga if one exists; otherwise keep pitch fallback
  const stale = ragaStats.find(r =>
    (r.masteryLevel === 'developing' || r.masteryLevel === 'exploring') &&
    r.lastPracticed &&
    Date.now() - new Date(r.lastPracticed).getTime() > 3 * 24 * 60 * 60 * 1000
  );
  if (stale) {
    const days = Math.floor((Date.now() - new Date(stale.lastPracticed).getTime()) / 86400000);
    opts[1] = {
      id:      'return',
      label:   `Return to ${stale.raga}`,
      sub:     `${days} day${days !== 1 ? 's' : ''} since last practice, still ${stale.masteryLevel} — build it back now`,
      view:    'tutor',
      tag:     'Gurukul',
      iconKey: 'return',
    };
  }

  return opts;
}

// ── Auth helper ────────────────────────────────────────────────────────────────
async function authHeaders(getToken) {
  try {
    const token = getToken ? await getToken() : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  } catch { return {}; }
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function SessionDiagnostic({ active, onNavigate, onDismiss, userId, getToken }) {
  const [model,   setModel]   = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch learner model once each time the modal opens
  useEffect(() => {
    if (!active || !userId || !getToken) return;
    let cancelled = false;
    setLoading(true);
    authHeaders(getToken)
      .then(headers =>
        fetch(`/api/learner-model?userId=${encodeURIComponent(userId)}`, { headers })
          .then(r => r.ok ? r.json() : null)
      )
      .then(data => { if (!cancelled && data) setModel(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [active, userId, getToken]);

  // Reset model when modal closes so next open re-fetches fresh data
  useEffect(() => {
    if (!active) setModel(null);
  }, [active]);

  // Escape key
  useEffect(() => {
    if (!active) return;
    const handler = (e) => { if (e.key === 'Escape') onDismiss?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, onDismiss]);

  if (!active || typeof document === 'undefined' || !document.body) return null;

  const options = buildOptions(model);
  const hasPersonalised = model && (model.confusionPairs?.length > 0 || model.ragaStats?.some(r =>
    (r.masteryLevel === 'developing' || r.masteryLevel === 'exploring') &&
    r.lastPracticed && Date.now() - new Date(r.lastPracticed).getTime() > 3 * 24 * 60 * 60 * 1000
  ));

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
            <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'rgba(247,214,134,0.4)' }}>
              {loading ? 'Reading your history…' : hasPersonalised ? 'Based on your practice history' : 'Session start'}
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

          {/* Options — show skeleton while loading */}
          {loading ? (
            <div className="flex flex-col gap-2">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-full px-4 py-3.5 rounded-xl border border-white/8 bg-white/[0.03] animate-pulse flex items-center gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-white/8 flex-shrink-0" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-3 rounded-full bg-white/8" style={{ width: `${55 + i * 8}%` }} />
                    <div className="h-2.5 rounded-full bg-white/5" style={{ width: `${40 + i * 6}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onNavigate(opt.view)}
                  className="w-full text-left px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] hover:border-[#f7d686]/35 hover:bg-white/[0.07] active:bg-white/[0.10] transition-all duration-200 flex items-center gap-3.5 group"
                >
                  <span className="text-[#f7d686]/55 flex-shrink-0 group-hover:text-[#f7d686]/80 transition-colors">
                    {ICONS[opt.iconKey]}
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
          )}

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
