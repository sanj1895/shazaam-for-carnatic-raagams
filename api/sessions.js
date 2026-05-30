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

async function writeSessionViaMCP(userId, sessionData) {
  const agentEngineResource = process.env.AGENT_ENGINE_RESOURCE;
  if (!agentEngineResource) return false;
  try {
    const client = getAuthClient();
    const { token } = await client.getAccessToken();
    const { tool = '', raga = '', durationMinutes = 0, notes = '' } = sessionData;

    const sessionRes = await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/${agentEngineResource}/sessions`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
        signal: AbortSignal.timeout(8000),
      }
    );
    let sessionData2 = {};
    try { sessionData2 = await sessionRes.json(); } catch {}
    const sessionId = sessionData2.name?.match(/\/sessions\/(\d+)/)?.[1] || userId;

    await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/${agentEngineResource}:streamQuery`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: {
            message: `Record this practice session in the 'sessions' collection of the 'alapana' database using MongoDB insertOne: { userId: "${userId}", tool: "${tool}", raga: "${raga}", durationMinutes: ${durationMinutes}, notes: "${notes}", timestamp: current UTC time }.`,
            user_id: userId,
            session_id: sessionId,
          },
        }),
        signal: AbortSignal.timeout(20000),
      }
    );
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!MONGODB_URI) return res.status(500).json({ error: 'MongoDB not configured.' });

  try {
    const verifiedUserId = await getVerifiedUserId(req);

    if (req.method === 'GET') {
      const db = await getDb();
      const userId = verifiedUserId || req.query.userId || 'default';
      const recent = await db.collection('sessions')
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(15)
        .toArray();
      return res.status(200).json({ sessions: recent });
    }

    if (req.method === 'POST') {
      const { userId: bodyUserId = 'default', tool, raga, durationMinutes, notes } = req.body || {};
      const userId = verifiedUserId || bodyUserId;
      const sessionData = { tool: tool || '', raga: raga || '', durationMinutes: durationMinutes || 0, notes: notes || '' };

      // Primary path: write through Agent Engine → MongoDB MCP
      const wroteViaMCP = await writeSessionViaMCP(userId, sessionData);

      // Fallback: direct MongoDB write if MCP path failed or isn't configured
      if (!wroteViaMCP) {
        const db = await getDb();
        await db.collection('sessions').insertOne({ userId, ...sessionData, timestamp: new Date() });
      }

      return res.status(201).json({ ok: true, via: wroteViaMCP ? 'agent-mcp' : 'direct' });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
