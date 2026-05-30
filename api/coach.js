/* global process */
import { MongoClient } from 'mongodb';
import { GoogleAuth, UserRefreshClient } from 'google-auth-library';

const MONGODB_URI = process.env.MONGODB_URI;
const GCP_PROJECT = 'project-24a53985-305d-4031-ae8';
const GEMINI_MODEL = 'gemini-2.5-flash';

let cachedClient = null;

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

async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db('alapana');
}

async function getRecentSessions(userId) {
  try {
    const db = await getDb();
    return await db.collection('sessions')
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();
  } catch {
    return [];
  }
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

  try {
    const sessions = await getRecentSessions(userId);

    const historyBlock = sessions.length > 0
      ? `\n\n--- Student's recent practice history (from MongoDB) ---\n${sessions.map(s =>
          `${new Date(s.timestamp).toLocaleDateString()}: ${s.tool || 'unknown tool'}${s.raga ? ` · Raga: ${s.raga}` : ''}${s.durationMinutes ? ` · ${s.durationMinutes} min` : ''}${s.notes ? ` · Notes: ${s.notes}` : ''}`
        ).join('\n')}\n---`
      : '\n\n[No practice history yet — new student.]';

    // Get OAuth2 token from ADC or env credentials
    const client = getAuthClient();
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;

    const contents = [
      ...history.slice(-6).map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const geminiRes = await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/projects/${GCP_PROJECT}/locations/us-central1/publishers/google/models/${GEMINI_MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT + historyBlock }] },
          contents,
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.7,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );

    const data = await geminiRes.json();
    if (!geminiRes.ok) {
      return res.status(500).json({ error: JSON.stringify(data) });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) return res.status(500).json({ error: 'Empty response from Gemini.' });

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Coach request failed.' });
  }
}
