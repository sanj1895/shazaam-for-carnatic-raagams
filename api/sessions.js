/* global process */
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient = null;

async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db('alapana');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!MONGODB_URI) return res.status(500).json({ error: 'MongoDB not configured.' });

  try {
    const db = await getDb();
    const sessions = db.collection('sessions');

    if (req.method === 'GET') {
      const userId = req.query.userId || 'default';
      const recent = await sessions
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(15)
        .toArray();
      return res.status(200).json({ sessions: recent });
    }

    if (req.method === 'POST') {
      const { userId = 'default', tool, raga, durationMinutes, notes } = req.body || {};
      await sessions.insertOne({
        userId,
        tool,        // e.g. 'gurukul', 'viveka', 'singback'
        raga,        // e.g. 'Bhairavi'
        durationMinutes,
        notes,
        timestamp: new Date(),
      });
      return res.status(201).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
