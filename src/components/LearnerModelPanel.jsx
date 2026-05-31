import { useState, useEffect, useCallback } from 'react';

// Four visually distinct levels on the parchment theme.
// cool-grey (exploring) → amber (developing) → gold (stable) → green (strong)
const MASTERY_STYLES = {
  strong:     { label: 'Strong',     dot: 'bg-emerald-700', badge: 'text-emerald-800 bg-emerald-700/10 border-emerald-700/30', bar: 'bg-emerald-700' },
  stable:     { label: 'Stable',     dot: 'bg-c-gold',      badge: 'text-c-gold bg-c-gold/10 border-c-gold/40',               bar: 'bg-c-gold' },
  developing: { label: 'Developing', dot: 'bg-amber-700',   badge: 'text-amber-800 bg-amber-700/10 border-amber-700/30',      bar: 'bg-amber-700' },
  exploring:  { label: 'Exploring',  dot: 'bg-slate-500',   badge: 'text-slate-600 bg-slate-500/10 border-slate-400',         bar: 'bg-slate-400' },
};

function daysSince(dateStr) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function buildTimelineGrid(practiceTimeline) {
  const today = new Date();
  const grid = [];
  for (let i = 20; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const entry = practiceTimeline.find(t => t.date === key);
    grid.push({
      date: key,
      count: entry?.count || 0,
      ragas: entry?.ragas || [],
      dayLabel: DAY_LABELS[d.getDay()],
      isToday: i === 0,
    });
  }
  // Return as 3 weeks of 7 days
  return [
    { label: '3 weeks ago', days: grid.slice(0, 7) },
    { label: '2 weeks ago', days: grid.slice(7, 14) },
    { label: 'This week',   days: grid.slice(14, 21) },
  ];
}

async function authHeaders(getToken) {
  try {
    const token = getToken ? await getToken() : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export default function LearnerModelPanel({ userId, getToken }) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchModel = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = await authHeaders(getToken);
      const res = await fetch(`/api/learner-model?userId=${encodeURIComponent(userId || 'default')}`, { headers });
      if (!res.ok) throw new Error('Could not load your musical memory.');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [userId, getToken]);

  useEffect(() => { fetchModel(); }, [fetchModel]);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center gap-4 py-16 animate-fade-in">
        <div className="w-8 h-8 border-2 border-c-border border-t-c-gold rounded-full animate-spin" />
        <p className="text-c-cream-dim text-sm font-playfair italic">Loading your musical memory…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center gap-4 py-12">
        <p className="text-red-700 text-sm font-playfair">{error}</p>
        <button onClick={fetchModel} className="text-xs text-c-gold underline underline-offset-2">Retry</button>
      </div>
    );
  }

  const { ragaStats = [], confusionPairs = [], practiceTimeline = [], totalSessions = 0, activeDays = 0 } = data || {};
  const timelineWeeks = buildTimelineGrid(practiceTimeline);
  const allDays = timelineWeeks.flatMap(w => w.days);
  const maxCount = Math.max(...allDays.map(d => d.count), 1);
  const isEmpty = ragaStats.length === 0 && confusionPairs.length === 0;

  // Derive 1-3 "next focus" recommendations from the learner model
  const nextFocus = [];
  if (confusionPairs[0]) {
    const { raga, confusedWith, count } = confusionPairs[0];
    nextFocus.push({ text: `Distinguish ${raga} from ${confusedWith} — you've confused them ${count} time${count !== 1 ? 's' : ''}`, urgency: 'high' });
  }
  const stale = ragaStats.find(r =>
    (r.masteryLevel === 'developing' || r.masteryLevel === 'exploring') &&
    r.lastPracticed &&
    Date.now() - new Date(r.lastPracticed).getTime() > 3 * 24 * 60 * 60 * 1000
  );
  if (stale) nextFocus.push({ text: `Return to ${stale.raga} — ${daysSince(stale.lastPracticed)} and still developing`, urgency: 'medium' });
  const ready = ragaStats.find(r => r.masteryLevel === 'stable' && r.identifiedCount >= 3);
  if (ready) nextFocus.push({ text: `Advance ${ready.raga} — you're stable here, try a more complex phrase`, urgency: 'low' });

  return (
    <main className="w-full max-w-3xl mx-auto flex flex-col gap-8 px-4 md:px-8 py-10 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-c-card border border-c-border flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-c-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div>
          <h1 className="font-playfair text-xl font-bold text-c-gold tracking-wide">Your Musical Memory</h1>
          <p className="text-[10px] font-mono uppercase tracking-widest text-c-cream-dim">
            Progressive learner model · powered by MongoDB
          </p>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Sessions', value: totalSessions },
          { label: 'Ragas Practiced', value: ragaStats.length },
          { label: 'Active Days (3w)', value: activeDays },
        ].map(({ label, value }) => (
          <div key={label} className="bg-c-card border border-c-border rounded-xl p-3 flex flex-col items-center gap-0.5">
            <span className="font-playfair text-2xl font-bold text-c-cream-dim">{value}</span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-c-cream-dark text-center">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Your Next Focus ── */}
      {nextFocus.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="font-playfair text-base font-semibold text-c-cream-dim">What to Work on Next</h2>
          <div className="flex flex-col gap-2">
            {nextFocus.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${
                item.urgency === 'high'   ? 'bg-amber-700/8 border-amber-700/25' :
                item.urgency === 'medium' ? 'bg-c-card border-c-border' :
                                            'bg-c-card border-c-border'
              }`}>
                <span className={`text-base leading-none mt-0.5 flex-shrink-0 ${
                  item.urgency === 'high' ? 'text-amber-700' : item.urgency === 'medium' ? 'text-c-gold' : 'text-emerald-700'
                }`}>
                  {item.urgency === 'high' ? '→' : item.urgency === 'medium' ? '↩' : '↑'}
                </span>
                <p className="text-sm text-c-cream-dim font-playfair leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-[9px] font-mono text-c-cream-dark/60 uppercase tracking-widest">
            Derived from your MongoDB practice history
          </p>
        </section>
      )}

      {isEmpty ? (
        <div className="w-full bg-c-card border border-c-border rounded-xl p-8 flex flex-col items-center gap-3 text-center">
          <p className="font-playfair text-c-cream-dim italic">Your musical memory is just beginning.</p>
          <p className="text-xs text-c-cream-dark leading-relaxed max-w-xs">
            Use Viveka to identify ragas, practice with Gurukul, or explore Raga Kosha.
            Every session builds your personal learner model here.
          </p>
          <p className="text-[9px] font-mono uppercase tracking-widest text-c-cream-dark/70 mt-1">
            MongoDB stores your patterns · coach learns from them
          </p>
        </div>
      ) : (
        <>
          {/* ── Raga Mastery ── */}
          {ragaStats.length > 0 && (
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="font-playfair text-base font-semibold text-c-cream-dim">Your Progress by Raga</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  {['strong', 'stable', 'developing', 'exploring'].map(level => (
                    <div key={level} className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${MASTERY_STYLES[level].dot}`} />
                      <span className="text-[9px] font-mono text-c-cream-dark uppercase tracking-widest">{MASTERY_STYLES[level].label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ragaStats.map(raga => {
                  const style = MASTERY_STYLES[raga.masteryLevel] || MASTERY_STYLES.exploring;
                  const successPct = raga.totalSessions > 0
                    ? Math.round((raga.identifiedCount / raga.totalSessions) * 100)
                    : 0;
                  return (
                    <div key={raga.raga} className="bg-c-card border border-c-border rounded-xl px-4 py-3 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-0.5 ${style.dot}`} />
                          <span className="font-playfair font-semibold text-c-cream-dim text-sm truncate">{raga.raga}</span>
                        </div>
                        <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border flex-shrink-0 ${style.badge}`}>
                          {style.label}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-c-cream-dark font-mono">
                            {raga.totalSessions} session{raga.totalSessions !== 1 ? 's' : ''}
                            {raga.identifiedCount > 0 && ` · ${successPct}% identified`}
                          </span>
                          {raga.lastPracticed && (
                            <span className="text-[9px] text-c-cream-dark/70 font-mono">{daysSince(raga.lastPracticed)}</span>
                          )}
                        </div>
                        <div className="w-full h-1 bg-c-border/60 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${style.bar}`}
                            style={{ width: `${Math.min((raga.totalSessions / 10) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      {raga.confusedCount > 0 && (
                        <p className="text-[9px] text-amber-800 font-mono">
                          {raga.confusedCount} ambiguous result{raga.confusedCount !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Common Confusions ── */}
          {confusionPairs.length > 0 && (
            <section className="flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <h2 className="font-playfair text-base font-semibold text-c-cream-dim">What You Keep Getting Wrong</h2>
                <p className="text-[10px] text-c-cream-dark font-mono">
                  MongoDB remembers these · your coach addresses them directly
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {confusionPairs.map((pair, i) => (
                  <div
                    key={i}
                    className="bg-c-card border border-c-border rounded-xl px-4 py-3.5 flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0 flex items-center gap-2 justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-playfair font-semibold text-c-cream-dim text-sm truncate">{pair.raga}</span>
                        <span className="text-c-gold text-xs flex-shrink-0">↔</span>
                        <span className="font-playfair font-semibold text-c-cream-dim text-sm truncate">{pair.confusedWith}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex gap-0.5">
                          {Array.from({ length: Math.min(pair.count, 5) }).map((_, j) => (
                            <div key={j} className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-amber-800">{pair.count}×</span>
                      </div>
                    </div>
                    {pair.lastOccurred && (
                      <span className="text-[9px] font-mono text-c-cream-dark/70 flex-shrink-0">
                        {daysSince(pair.lastOccurred)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-[9px] text-c-cream-dark font-playfair italic text-center mt-1">
                Ask your coach to help you distinguish these ragas
              </p>
            </section>
          )}

          {/* ── Practice Timeline ── */}
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <h2 className="font-playfair text-base font-semibold text-c-cream-dim">How Consistently You're Practicing</h2>
              <p className="text-[10px] text-c-cream-dark font-mono">
                Each column is one day · taller bar = more sessions
              </p>
            </div>

            <div className="bg-c-card border border-c-border rounded-xl p-4 flex flex-col gap-3">
              {activeDays === 0 ? (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <div className="flex gap-1 items-end h-8 opacity-30">
                    {Array.from({ length: 21 }).map((_, i) => (
                      <div key={i} className="flex-1 bg-c-border rounded-sm" style={{ height: '4px' }} />
                    ))}
                  </div>
                  <p className="text-[11px] text-c-cream-dark font-playfair italic mt-1">
                    No sessions yet in the last 21 days
                  </p>
                  <p className="text-[10px] text-c-cream-dark/70 font-mono">
                    Practice with Viveka, Gurukul, or any tool to start your timeline
                  </p>
                </div>
              ) : (
                <div className="flex gap-3">
                  {timelineWeeks.map((week) => (
                    <div key={week.label} className="flex-1 flex flex-col gap-1.5">
                      {/* bars */}
                      <div className="flex items-end gap-0.5 h-10">
                        {week.days.map((day) => {
                          const heightPct = day.count === 0 ? 0 : Math.max((day.count / maxCount) * 100, 18);
                          return (
                            <div
                              key={day.date}
                              className="flex-1 flex flex-col items-center justify-end"
                              title={day.count > 0
                                ? `${day.dayLabel} ${day.date}: ${day.count} session${day.count !== 1 ? 's' : ''}${day.ragas.filter(Boolean).length ? ` · ${day.ragas.filter(Boolean).join(', ')}` : ''}`
                                : `${day.dayLabel} — no practice`}
                            >
                              <div
                                className={`w-full rounded-sm transition-all ${
                                  day.count === 0
                                    ? 'bg-c-border/50'
                                    : day.isToday
                                    ? 'bg-c-gold'
                                    : 'bg-c-gold-dim'
                                }`}
                                style={{ height: day.count === 0 ? '3px' : `${heightPct}%` }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      {/* day labels — only for this week */}
                      {week.label === 'This week' ? (
                        <div className="flex gap-0.5">
                          {week.days.map((day) => (
                            <div key={day.date} className="flex-1 text-center">
                              <span className={`text-[7px] font-mono uppercase ${day.isToday ? 'text-c-gold font-bold' : 'text-c-cream-dark/60'}`}>
                                {day.isToday ? 'now' : day.dayLabel}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-[10px]" />
                      )}
                      {/* week label */}
                      <p className="text-[8px] font-mono text-c-cream-dark uppercase tracking-widest text-center">
                        {week.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* ── MongoDB attribution ── */}
      <div className="flex items-center justify-center gap-2 pt-2 pb-4">
        <div className="w-3 h-3 flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="#3D6B2A">
            <path d="M12.004.063C5.982.063 1.1 4.946 1.1 10.968c0 3.694 1.808 6.97 4.61 9.007l.003.002c.022 5.078 4.28 3.959 4.28 3.959v-3.01c0-.618.504-1.12 1.124-1.12h1.77c.62 0 1.123.502 1.123 1.12v3.01s4.258 1.12 4.281-3.959l.002-.002c2.803-2.037 4.61-5.313 4.61-9.007C22.903 4.946 18.022.063 12.004.063z"/>
          </svg>
        </div>
        <span className="text-[9px] font-mono text-c-cream-dark uppercase tracking-widest">
          Built on MongoDB · learner model updates with every session
        </span>
      </div>

    </main>
  );
}
