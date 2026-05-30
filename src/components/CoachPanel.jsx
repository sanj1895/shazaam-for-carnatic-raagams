import React, { useState, useRef, useEffect, useCallback } from 'react';

const WELCOME = "Namaskaram! I'm your Ālāpana practice coach. Tell me what you want to work on today — or ask me to plan a session based on your history.";

// Only navigate when the coach explicitly says to open a tool — never on incidental mentions
const OPEN = /open(?:ing)?:?\s+/i;
const TOOL_PATTERNS = [
  { pattern: new RegExp(OPEN.source + 'avabodha', 'i'),                          view: 'avabodha' },
  { pattern: new RegExp(OPEN.source + '(?:gurukul|svara gurukul)', 'i'),          view: 'tutor' },
  { pattern: new RegExp(OPEN.source + '(?:raga kosha|raga library|kosha)', 'i'), view: 'library' },
  { pattern: new RegExp(OPEN.source + 'viveka', 'i'),                             view: 'viveka' },
  { pattern: new RegExp(OPEN.source + 'dhwani', 'i'),                             view: 'listen' },
  { pattern: new RegExp(OPEN.source + 'transcri(?:be|ption)', 'i'),               view: 'transcribe' },
  { pattern: new RegExp(OPEN.source + 'shru(?:thi|ti)', 'i'),                     view: 'shruthi' },
  { pattern: new RegExp(OPEN.source + 'tala(?:m)?', 'i'),                         view: 'talam' },
  { pattern: new RegExp(OPEN.source + 'keyboard', 'i'),                           view: 'keyboard' },
  { pattern: new RegExp(OPEN.source + 'sing.?back', 'i'),                         view: 'singback' },
];

function detectToolNavigation(text) {
  for (const { pattern, view } of TOOL_PATTERNS) {
    if (pattern.test(text)) return view;
  }
  return null;
}

function cleanAssistantText(text) {
  return String(text || '')
    .replace(/^\[[^\]]+\]\s*/i, '')
    .replace(/```+/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/^[ \t]*[-*#>]+\s?/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function authHeaders(getToken) {
  try {
    const token = getToken ? await getToken() : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  } catch { return {}; }
}

export default function CoachPanel({ userId, getToken, onNavigate, appMode, sadhanaState }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const userIdRef = useRef(userId);
  useEffect(() => { userIdRef.current = userId; }, [userId]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const sendMessageRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open, messages]);

  const sendMessage = useCallback(async (text) => {
    if (!text || loading) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...await authHeaders(getToken) },
        body: JSON.stringify({
          message: text,
          userId: userIdRef.current,
          history: messages.slice(-8),
          appMode,
          sadhanaCompleted: sadhanaState?.completed || [],
        }),
      });
      const data = await res.json();
      const rawReply = data.reply || 'Sorry, I had trouble responding. Please try again.';
      const reply = cleanAssistantText(rawReply);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      if (onNavigate) {
        const nav = detectToolNavigation(reply);
        if (nav) setTimeout(() => onNavigate(nav), 800);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Check your internet and try again.' }]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, appMode, sadhanaState, onNavigate]);

  // Keep a stable ref so the auto-send effect can call sendMessage without
  // re-triggering every time its dependencies change
  useEffect(() => { sendMessageRef.current = sendMessage; }, [sendMessage]);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    sendMessage(text);
  }, [input, sendMessage]);


  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Save a practice session to MongoDB
  const saveSession = useCallback(async (sessionData) => {
    try {
      await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...await authHeaders(getToken) },
        body: JSON.stringify({ userId: userIdRef.current, ...sessionData }),
      });
    } catch {}
  }, [getToken]);

  // Expose saveSession so App.jsx can call it
  useEffect(() => {
    window.__alapanaCoach = { saveSession };
    return () => { delete window.__alapanaCoach; };
  }, [saveSession]);

  const mobileBottomOffset = 'calc(env(safe-area-inset-bottom, 0px) + 5.5rem)';

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open practice coach"
        className="fixed right-4 md:right-6 z-50 w-13 h-13 rounded-full shadow-[0_4px_24px_rgba(199,139,34,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        style={{
          background: 'linear-gradient(135deg, #c78b22, #e8b84b)',
          width: '52px',
          height: '52px',
          bottom: mobileBottomOffset,
        }}
      >
        <span className="text-xl" style={{ color: '#1a0a00' }}>🪈</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden animate-fade-in"
          style={{
            bottom: `calc(${mobileBottomOffset} + 1rem)`,
            right: 'max(1rem, env(safe-area-inset-right, 0px))',
            width: 'min(360px, calc(100vw - 2rem))',
            maxHeight: 'calc(100dvh - 140px - env(safe-area-inset-bottom, 0px))',
            background: 'rgba(14,7,2,0.97)',
            border: '1px solid rgba(199,139,34,0.25)',
            borderRadius: '20px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(199,139,34,0.15)', background: 'rgba(20,9,2,0.8)' }}
          >
            <div>
              <div className="font-playfair text-sm" style={{ color: '#e8c96a' }}>Ālāpana Coach</div>
              <div className="text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(243,234,214,0.4)' }}>
                Practice Guide · MongoDB Memory
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(243,234,214,0.5)' }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth: 'none' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="rounded-2xl px-3 py-2 text-[12.5px] leading-[1.72]"
                  style={{
                    maxWidth: '86%',
                    ...(m.role === 'user'
                      ? { background: '#c78b22', color: '#1a0800', fontWeight: 500 }
                      : {
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(243,234,214,0.92)',
                          whiteSpace: 'pre-wrap',
                        }),
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl px-3 py-2 text-[12px]"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(243,234,214,0.4)' }}
                >
                  <span className="animate-pulse">thinking…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts (shown only at start) */}
          {messages.length === 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {[
                'Plan a 30-min session',
                'What should I practice today?',
                'I want to improve Bhairavi',
              ].map(prompt => (
                <button
                  key={prompt}
                  onClick={() => { setInput(prompt); setTimeout(() => inputRef.current?.focus(), 50); }}
                  className="text-[10.5px] px-2.5 py-1 rounded-full transition-colors"
                  style={{ background: 'rgba(199,139,34,0.12)', border: '1px solid rgba(199,139,34,0.25)', color: 'rgba(199,139,34,0.9)' }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="px-3 py-2.5 flex gap-2 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(199,139,34,0.12)' }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask your coach…"
              className="flex-1 rounded-xl px-3 py-2 text-[12.5px] outline-none transition-colors"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(199,139,34,0.2)',
                color: 'rgba(243,234,214,0.95)',
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all disabled:opacity-30"
              style={{ background: '#c78b22', color: '#1a0800', flexShrink: 0 }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
