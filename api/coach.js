/* global process, Buffer */
import { MongoClient } from 'mongodb';
import { GoogleAuth, UserRefreshClient } from 'google-auth-library';
import { requireVerifiedUserId } from './_auth.js';
import { enforceRateLimit } from './_rateLimit.js';
import { applyApiSecurity, rejectDisallowedOrigin } from './_security.js';

const MONGODB_URI = process.env.MONGODB_URI;
let cachedClient = null;

async function getDb() {
  if (cachedClient && !cachedClient.topology?.isConnected()) cachedClient = null;
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db('alapana');
}

function computeMasteryLevel({ totalSessions, identifiedCount }) {
  const successRate = totalSessions > 0 ? identifiedCount / totalSessions : 0;
  if (totalSessions >= 8 && successRate >= 0.7) return 'strong';
  if (totalSessions >= 4 && successRate >= 0.5) return 'stable';
  if (totalSessions >= 2 || identifiedCount > 0) return 'developing';
  return 'exploring';
}

async function buildLearnerModelSummary(db, userId) {
  try {
    const [ragaStatsRaw, confusionPairsRaw] = await Promise.all([
      db.collection('sessions').aggregate([
        { $match: { userId, raga: { $exists: true, $nin: ['', null] } } },
        {
          $group: {
            _id: '$raga',
            totalSessions: { $sum: 1 },
            identifiedCount: {
              $sum: { $cond: [{ $in: ['$outcome', ['identified', 'likely']] }, 1, 0] },
            },
          },
        },
        { $sort: { totalSessions: -1 } },
        { $limit: 10 },
      ]).toArray(),

      db.collection('sessions').aggregate([
        {
          $match: {
            userId,
            confusedWith: { $exists: true, $nin: ['', null] },
            raga: { $exists: true, $nin: ['', null] },
          },
        },
        {
          $group: {
            _id: { raga: '$raga', confusedWith: '$confusedWith' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 4 },
      ]).toArray(),
    ]);

    const ragaStats = ragaStatsRaw.map(r => ({
      raga: r._id,
      totalSessions: r.totalSessions,
      identifiedCount: r.identifiedCount,
      masteryLevel: computeMasteryLevel(r),
    }));

    const parts = [];
    const strong = ragaStats.filter(r => r.masteryLevel === 'strong' || r.masteryLevel === 'stable');
    const developing = ragaStats.filter(r => r.masteryLevel === 'exploring' || r.masteryLevel === 'developing');
    if (strong.length) parts.push(`Strong ragas: ${strong.map(r => `${r.raga}(${r.masteryLevel})`).join(', ')}`);
    if (developing.length) parts.push(`Developing: ${developing.map(r => `${r.raga}(${r.totalSessions} sessions)`).join(', ')}`);
    if (confusionPairsRaw.length) {
      parts.push(
        `Recurring confusions: ${confusionPairsRaw.map(c => `${c._id.raga}↔${c._id.confusedWith}(${c.count}x)`).join(', ')}`
      );
    }
    return parts.length ? `Learner model: ${parts.join(' | ')}` : '';
  } catch {
    return '';
  }
}

async function buildUserContext(userId, appMode, sadhanaCompleted) {
  if (!MONGODB_URI) return '';
  try {
    const db = await getDb();

    // Run profile + learner model queries in parallel
    const [profile, ragaStatsRaw, confusionPairsRaw] = await Promise.all([
      db.collection('profiles').findOne({ userId }, { projection: { _id: 0 } }),
      db.collection('sessions').aggregate([
        { $match: { userId, raga: { $exists: true, $nin: ['', null] } } },
        {
          $group: {
            _id: '$raga',
            totalSessions: { $sum: 1 },
            identifiedCount: {
              $sum: { $cond: [{ $in: ['$outcome', ['identified', 'likely']] }, 1, 0] },
            },
            lastPracticed: { $max: '$timestamp' },
          },
        },
        { $sort: { totalSessions: -1 } },
        { $limit: 8 },
      ]).toArray(),
      db.collection('sessions').aggregate([
        {
          $match: {
            userId,
            confusedWith: { $exists: true, $nin: ['', null] },
            raga: { $exists: true, $nin: ['', null] },
          },
        },
        {
          $group: {
            _id: { raga: '$raga', confusedWith: '$confusedWith' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]).toArray(),
    ]);

    const sessionFilter = profile?.updatedAt
      ? { userId, timestamp: { $gt: profile.updatedAt } }
      : { userId };
    const recentSessions = await db.collection('sessions')
      .find(sessionFilter)
      .sort({ timestamp: -1 })
      .limit(5)
      .toArray();

    const ragaStats = ragaStatsRaw.map(r => ({
      raga: r._id,
      totalSessions: r.totalSessions,
      identifiedCount: r.identifiedCount,
      lastPracticed: r.lastPracticed,
      masteryLevel: computeMasteryLevel(r),
    }));

    // Build an explicit coaching brief rather than a terse metadata block.
    // The agent must use these facts when answering questions about progress,
    // weaknesses, and next steps — not give generic tool suggestions.
    const lines = [];

    // Student profile
    if (profile) {
      lines.push(`STUDENT PROFILE: experience=${profile.experience || 'unknown'}, goal=${profile.goal || 'unknown'}, path=${profile.branch || 'unknown'}, app_mode=${appMode || 'musician'}`);
    } else {
      lines.push(`STUDENT PROFILE: app_mode=${appMode || 'musician'}`);
    }

    // Confusion patterns — this is what answers "what am I getting wrong"
    if (confusionPairsRaw.length > 0) {
      lines.push('');
      lines.push('RECURRING CONFUSION PATTERNS (from MongoDB session history — use these when asked what the student gets wrong):');
      confusionPairsRaw.forEach(c => {
        lines.push(`  • ${c._id.raga} confused with ${c._id.confusedWith}: ${c.count} time${c.count !== 1 ? 's' : ''} recorded`);
      });
    } else {
      lines.push('');
      lines.push('CONFUSION PATTERNS: none recorded yet — the student has not completed enough Viveka identification sessions to establish patterns.');
    }

    // Raga progress
    if (ragaStats.length > 0) {
      lines.push('');
      lines.push('RAGA PROGRESS (from MongoDB):');
      ragaStats.forEach(r => {
        const daysSince = r.lastPracticed
          ? Math.floor((Date.now() - new Date(r.lastPracticed).getTime()) / 86400000)
          : null;
        const recency = daysSince === null ? '' : daysSince === 0 ? ', practiced today' : `, last practiced ${daysSince}d ago`;
        lines.push(`  • ${r.raga}: ${r.masteryLevel} (${r.totalSessions} sessions${recency})`);
      });
    } else {
      lines.push('');
      lines.push('RAGA PROGRESS: no raga-specific history yet.');
    }

    // Recent activity
    if (recentSessions.length > 0) {
      const recent = recentSessions
        .map(s => [s.tool, s.raga].filter(Boolean).join('/'))
        .filter(Boolean)
        .join(', ');
      if (recent) lines.push(`\nRECENT ACTIVITY: ${recent}`);
    }

    if (sadhanaCompleted?.length) {
      lines.push(`SADHANA COMPLETED TODAY: ${sadhanaCompleted.join(', ')}`);
    }

    // Explicit coaching instructions so the agent answers correctly
    lines.push('');
    lines.push('COACHING INSTRUCTIONS:');
    if (confusionPairsRaw.length > 0) {
      lines.push('  - When asked "what am I getting wrong" or "what do I keep messing up": cite the CONFUSION PATTERNS above by name. Do not suggest generic tools.');
    } else {
      lines.push('  - When asked "what am I getting wrong": explain that confusion patterns build up from raga identification practice across tools like Viveka, Dhwani, Gurukul exercises, and Sing-Back. You don\'t have enough session data yet to identify specific patterns — suggest they practice with any tool that matches their current goal and patterns will emerge.');
    }
    if (ragaStats.length > 0) {
      const weak = ragaStats.find(r => r.masteryLevel === 'exploring' || r.masteryLevel === 'developing');
      const strong = ragaStats.find(r => r.masteryLevel === 'stable' || r.masteryLevel === 'strong');
      if (weak) lines.push(`  - When asked "what should I practice": recommend ${weak.raga} as the priority focus area. Suggest the tool that fits their session goal — Gurukul for structured learning, Viveka or Dhwani for identification practice, Shruthi + Keyboard for scale internalization, Sing-Back for ear training.`);
      if (strong) lines.push(`  - ${strong.raga} is strong — can be used as a confidence builder or to explore more advanced prayogams.`);
    }

    return lines.join('\n') + '\n\n';
  } catch {
    return '';
  }
}

function buildConversationContext(history = []) {
  if (!Array.isArray(history) || !history.length) return '';
  const normalized = history
    .filter((entry) => entry && typeof entry.content === 'string' && entry.content.trim())
    .slice(-8)
    .map((entry) => {
      const role = entry.role === 'assistant' ? 'Coach' : 'User';
      const content = entry.content.replace(/\s+/g, ' ').trim();
      return `${role}: ${content}`;
    });
  if (!normalized.length) return '';
  return `Recent conversation:\n${normalized.join('\n')}\n\n`;
}

function getAuthClient() {
  const b64 = process.env.GOOGLE_CREDENTIALS_B64;
  if (b64) {
    const creds = JSON.parse(Buffer.from(b64, 'base64').toString());
    return new UserRefreshClient({
      clientId: creds.client_id,
      clientSecret: creds.client_secret,
      refreshToken: creds.refresh_token,
    });
  }
  return new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
}

// The agent's actual instruction lives in agent/agent.py (SYSTEM_PROMPT, line 8).
// That file is deployed to Vertex AI Agent Engine and controls all agent behavior.
// This API handler only routes messages and pre-fetches MongoDB context for latency.

export default async function handler(req, res) {
  applyApiSecurity(req, res, ['POST', 'OPTIONS']);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (rejectDisallowedOrigin(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = await requireVerifiedUserId(req, res);
  if (!userId) return;
  if (!await enforceRateLimit(req, res, {
    name: 'coach',
    userId,
    limit: 24,
    windowMs: 60_000,
    extraLimits: [
      { label: 'daily', limit: 200, windowMs: 24 * 60 * 60 * 1000 },
    ],
  })) return;
  const { message, history = [], appMode, sadhanaCompleted } = req.body || {};
  if (!message || typeof message !== 'string' || message.length > 2000) {
    return res.status(400).json({ error: 'Invalid message.' });
  }

  const agentEngineResource = process.env.AGENT_ENGINE_RESOURCE;
  if (!agentEngineResource) {
    return res.status(503).json({
      error: 'Agent Engine not configured. Deploy the agent first: python agent/deploy_to_agent_engine.py, then set AGENT_ENGINE_RESOURCE.',
    });
  }

  try {
    const userContext = await buildUserContext(userId, appMode, sadhanaCompleted);
    const conversationContext = buildConversationContext(history);
    const enrichedMessage = `${userContext || ''}${conversationContext || ''}Current user message: ${message}`.trim();

    const client = getAuthClient();
    const { token } = await client.getAccessToken();

    // Create a session keyed by userId so the ADK agent can maintain conversation state.
    // Note: user_id uses snake_case as required by the Vertex AI Agent Engine API.
    const sessionRes = await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/${agentEngineResource}/sessions`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
      }
    );
    const sessionRawText = await sessionRes.text();
    let sessionData = {};
    try { sessionData = JSON.parse(sessionRawText); } catch {}
    // Session creation returns a long-running operation — extract session ID from
    // the middle of the path (…/sessions/{id}/operations/{opId}), not the end.
    const sessionId = sessionData.name?.match(/\/sessions\/(\d+)/)?.[1] || userId;

    const agentRes = await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/${agentEngineResource}:streamQuery`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: {
            message:    enrichedMessage,
            user_id:    userId,
            session_id: sessionId,
          },
        }),
      }
    );

    const rawBody = await agentRes.text();

    if (!agentRes.ok) {
      return res.status(500).json({ error: `Agent Engine error: ${rawBody}` });
    }

    // streamQuery returns NDJSON — each line is an ADK event. Scan for the
    // final model text, which sits in content.parts[0].text of the last
    // non-error event whose finish_reason is STOP (or similar).
    let reply = null;
    for (const line of rawBody.split('\n').reverse()) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const event = JSON.parse(trimmed);
        if (event?.error_code) continue; // skip error events, keep looking
        const text = event?.content?.parts?.[0]?.text
                  || event?.output
                  || event?.response?.parts?.[0]?.text
                  || (event?.actions?.at(-1))?.response?.parts?.[0]?.text;
        if (text) { reply = text; break; }
      } catch { /* skip malformed lines */ }
    }

    if (!reply) return res.status(500).json({ error: 'Empty response from Agent Engine.', _raw: rawBody.slice(0, 2000) });
    return res.status(200).json({ reply, via: 'agent-engine' });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Coach request failed.' });
  }
}
