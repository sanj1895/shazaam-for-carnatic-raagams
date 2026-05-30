/* global process, Buffer */
import { MongoClient } from 'mongodb';
import { GoogleAuth, UserRefreshClient } from 'google-auth-library';

const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient = null;

async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db('alapana');
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!MONGODB_URI) return res.status(500).json({ error: 'MongoDB not configured.' });

  try {
    if (req.method === 'GET') {
      // Direct MongoDB read — used for dev/debug inspection of practice history.
      const db = await getDb();
      const userId = req.query.userId || 'default';
      const recent = await db.collection('sessions')
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(15)
        .toArray();
      return res.status(200).json({ sessions: recent });
    }

    if (req.method === 'POST') {
      const { userId = 'default', tool, raga, durationMinutes, notes } = req.body || {};
      const agentEngineResource = process.env.AGENT_ENGINE_RESOURCE;

      if (!agentEngineResource) {
        return res.status(503).json({ error: 'Agent Engine not configured. Set AGENT_ENGINE_RESOURCE.' });
      }

      // Route writes through Agent Engine → ADK agent → MongoDB MCP insertOne.
      const client = getAuthClient();
      const { token } = await client.getAccessToken();

      const sessionRes = await fetch(
        `https://us-central1-aiplatform.googleapis.com/v1/${agentEngineResource}/sessions`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        }
      );
      const sessionData = await sessionRes.json();
      const sessionId = sessionData.name?.split('/').pop() || userId;

      const recordMsg = `Record this practice session in the 'sessions' collection of the 'alapana' database using MongoDB insertOne: { userId: "${userId}", tool: "${tool || ''}", raga: "${raga || ''}", durationMinutes: ${durationMinutes || 0}, notes: "${notes || ''}", timestamp: current UTC time }.`;

      await fetch(
        `https://us-central1-aiplatform.googleapis.com/v1/${agentEngineResource}:streamQuery`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { messages: [{ role: 'user', parts: [{ text: recordMsg }] }] },
            userId,
            sessionId,
          }),
        }
      );

      return res.status(201).json({ ok: true, via: 'agent-mcp' });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
