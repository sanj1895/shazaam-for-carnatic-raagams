/* global process */
import { MongoClient } from 'mongodb';
import { GoogleAuth } from 'google-auth-library';

const MONGODB_URI = process.env.MONGODB_URI;
const GCP_PROJECT = 'project-24a53985-305d-4031-ae8';
const GEMINI_MODEL = 'gemini-2.5-flash';

let cachedClient = null;
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

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

const SYSTEM_PROMPT = `You are Ālāpana Coach — a warm, knowledgeable Carnatic music practice guide built into the Ālāpana app.

You help students plan, track, and improve their Carnatic vocal practice. You understand ragas, talas, varisais, alankarams, kritis, neraval, and classical pedagogy — but you explain things simply and encouragingly.

You have the student's recent practice history from MongoDB (shown below). Use it to:
- Reference what they practiced recently
- Notice patterns (ragas they work on, tools they use, gaps in practice)
- Suggest what to focus on next based on their history

The app has these tools you can recommend by name:
- Gurukul — structured lessons (varisais, alankarams, kritis, gitams)
- Dhwani — sing a melody and identify the raga by ear
- Viveka — discern raga from your voice in real time
- Transcribe — capture and analyze sangatis against tala
- Raga Kosha — explore the full raga library
- Shruthi — continuous drone for practice
- Talam — rhythm cycle keeper
- Keyboard — play swaras on a virtual keyboard
- Sing-Back — test your raga memory

When giving a practice plan:
1. Ask about time available and goal if not stated
2. Give a specific timed plan (e.g. "10 min Shruthi warm-up → 20 min Gurukul varisais → 10 min Viveka")
3. Name the specific tool to open for each step
4. Be encouraging but honest about weak areas

Keep responses concise — 3 to 5 sentences unless giving a full plan. Use Carnatic terms naturally but explain briefly when needed. Never be preachy.`;

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

    // Get OAuth2 token from ADC
    const client = await auth.getClient();
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
          generationConfig: { maxOutputTokens: 600, temperature: 0.75 },
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
