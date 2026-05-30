/* global process, Buffer */
import { MongoClient } from 'mongodb';
import { GoogleAuth, UserRefreshClient } from 'google-auth-library';
import { getVerifiedUserId } from './_auth.js';

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

async function buildUserContext(userId, appMode, sadhanaCompleted) {
  if (!MONGODB_URI) return '';
  try {
    const db = await getDb();
    const profile = await db.collection('profiles').findOne({ userId }, { projection: { _id: 0 } });
    // Only surface sessions from after the most recent quiz — redoing the quiz starts a clean slate
    const sessionFilter = profile?.updatedAt
      ? { userId, timestamp: { $gt: profile.updatedAt } }
      : { userId };
    const sessions = await db.collection('sessions')
      .find(sessionFilter)
      .sort({ timestamp: -1 })
      .limit(5)
      .toArray();
    const parts = [];
    if (profile) {
      const exp = profile.experience ? `experience=${profile.experience}` : null;
      const goal = profile.goal ? `goal=${profile.goal}` : null;
      const learner = profile.learner ? `learner=${profile.learner}` : null;
      const age = profile.age ? `age=${profile.age}` : null;
      const branch = profile.branch ? `path=${profile.branch}` : null;
      const filtered = [exp, goal, learner, age, branch].filter(Boolean);
      if (filtered.length) parts.push(`Profile: ${filtered.join(', ')}`);
    }
    if (sessions.length) {
      const recent = sessions
        .map(s => [s.tool, s.raga].filter(Boolean).join('/'))
        .filter(Boolean)
        .join(', ');
      if (recent) parts.push(`Recent tools: ${recent}`);
    }
    if (appMode) parts.push(`App mode: ${appMode}`);
    if (sadhanaCompleted?.length) parts.push(`Sadhana done today: ${sadhanaCompleted.join(', ')}`);
    if (!parts.length) return '';
    return `[${parts.join(' | ')}]\n\n`;
  } catch {
    return '';
  }
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

const SYSTEM_PROMPT = `You are Ālāpana Coach — a direct, warm Carnatic music practice guide inside the Ālāpana app.

CRITICAL RULES:
- Never ask more than one question per response
- When someone says they want to improve a raga, IMMEDIATELY give them a plan and tell them which tool to open — do not ask follow-up questions first
- If you need info (time available, level), make a reasonable assumption and state it: "I'll assume you have 20 minutes and are a beginner with this raga"
- Always end with a specific action: which tool to open right now

The app's tools (use these names exactly):
- Gurukul — structured lessons: varisais, alankarams, gitams, kritis. Best for learning scales and compositions
- Dhwani — sing a raga and get it identified by ear
- Viveka — real-time raga identification from your voice
- Transcribe — capture sangatis against tala
- Raga Kosha — browse the full raga library with scales and info
- Shruthi — drone for warming up and practice
- Talam — rhythm cycle keeper
- Keyboard — play swaras on a virtual keyboard
- Sing-Back — ear training, test raga memory

For a beginner with any raga:
→ Start in Raga Kosha to learn the scale
→ Then Gurukul for varisais in that raga
→ Then Dhwani to test recognition

Keep responses under 4 sentences. Be direct. Give the plan first, explain second.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const verifiedUserId = await getVerifiedUserId(req);
  const { message, userId: bodyUserId = 'default', history = [], appMode, sadhanaCompleted } = req.body || {};
  const userId = verifiedUserId || bodyUserId;
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
    const enrichedMessage = userContext ? `${userContext}${message}` : message;

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
