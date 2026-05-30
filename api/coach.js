/**
 * Ālāpana Coach API
 *
 * Required path (production):
 *   React app → this endpoint → Vertex AI Agent Engine (Google Cloud Agent Builder)
 *                                       → ADK agent → Gemini 2.5 Flash + MongoDB MCP
 *
 * Deploy the agent first: python agent/deploy_to_agent_engine.py
 * Then set AGENT_ENGINE_RESOURCE in your environment.
 */
/* global process, Buffer */
import { GoogleAuth, UserRefreshClient } from 'google-auth-library';

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

  const { message, userId = 'default', history = [] } = req.body || {};
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
    const sessionData = await sessionRes.json();
    const sessionId = sessionData.name?.split('/').pop() || userId;

    // All fields must be nested inside `input` — userId/sessionId are not valid
    // top-level fields for the Reasoning Engine streamQuery proto.
    // ADK agents expect input.message (string), not the Gemini messages array format.
    const agentRes = await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/${agentEngineResource}:streamQuery`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: {
            message,
            user_id:    userId,
            session_id: sessionId,
          },
        }),
      }
    );

    if (!agentRes.ok) {
      const errBody = await agentRes.text();
      return res.status(500).json({ error: `Agent Engine error: ${errBody}` });
    }

    // streamQuery returns NDJSON — scan lines in reverse to find the final text.
    const rawBody = await agentRes.text();
    let reply = null;
    for (const line of rawBody.split('\n').reverse()) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const event = JSON.parse(trimmed);
        const text = event?.output
                  || event?.response?.parts?.[0]?.text
                  || event?.content?.parts?.[0]?.text
                  || (event?.actions?.at(-1))?.response?.parts?.[0]?.text;
        if (text) { reply = text; break; }
      } catch { /* skip malformed lines */ }
    }

    if (!reply) return res.status(500).json({ error: 'Empty response from Agent Engine.' });
    return res.status(200).json({ reply, via: 'agent-engine' });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Coach request failed.' });
  }
}
