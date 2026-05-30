/**
 * Gemini-powered raga identification endpoint.
 *
 * Drop-in replacement for /api/groq — accepts the same OpenAI-compatible
 * request body and returns the same response shape so groqIdentify.js
 * needs no structural changes.
 *
 * Uses Gemini 2.5 Flash via Vertex AI with responseMimeType=application/json
 * to guarantee structured output without a parsing wrapper.
 */
/* global process */
import { GoogleAuth, UserRefreshClient } from 'google-auth-library';

const GCP_PROJECT  = process.env.GOOGLE_CLOUD_PROJECT  || 'project-24a53985-305d-4031-ae8';
const GCP_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const GEMINI_MODEL = 'gemini-2.5-flash';
const MAX_BODY_BYTES          = 80_000;
const MAX_TOTAL_MESSAGE_CHARS = 50_000;

function getAuthClient() {
  const b64 = process.env.GOOGLE_CREDENTIALS_B64;
  if (b64) {
    const creds = JSON.parse(Buffer.from(b64, 'base64').toString());
    return new UserRefreshClient({
      clientId:     creds.client_id,
      clientSecret: creds.client_secret,
      refreshToken: creds.refresh_token,
    });
  }
  return new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const bodyStr = JSON.stringify(req.body || {});
  if (bodyStr.length > MAX_BODY_BYTES) {
    return res.status(400).json({ error: 'Request too large.' });
  }

  // Accept the same fields as /api/groq (model is ignored — we always use Gemini).
  const { messages, temperature = 0.1 } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages.' });
  }

  const totalChars = messages.reduce((n, m) => n + (m.content?.length || 0), 0);
  if (totalChars > MAX_TOTAL_MESSAGE_CHARS) {
    return res.status(400).json({ error: 'Prompt too long.' });
  }

  // Concatenate all message parts into a single user turn.
  const prompt = messages.map(m => m.content).join('\n\n');

  try {
    const client = getAuthClient();
    const { token } = await client.getAccessToken();

    const geminiRes = await fetch(
      `https://${GCP_LOCATION}-aiplatform.googleapis.com/v1/projects/${GCP_PROJECT}/locations/${GCP_LOCATION}/publishers/google/models/${GEMINI_MODEL}:generateContent`,
      {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            maxOutputTokens:  1400,
            responseMimeType: 'application/json', // Gemini enforces valid JSON output
            thinkingConfig:   { thinkingBudget: 0 }, // skip thinking for speed
          },
        }),
      }
    );

    const data = await geminiRes.json();
    if (!geminiRes.ok) {
      return res.status(500).json({ error: data?.error?.message || JSON.stringify(data) });
    }

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) return res.status(500).json({ error: 'Empty response from Gemini.' });

    // Return in OpenAI-compatible envelope so groqIdentify.js works unchanged.
    return res.status(200).json({ choices: [{ message: { content } }] });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Gemini identify request failed.' });
  }
}
