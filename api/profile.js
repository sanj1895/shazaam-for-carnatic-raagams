/* global process */
import { MongoClient } from 'mongodb';
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!MONGODB_URI) return res.status(500).json({ error: 'MongoDB not configured.' });

  try {
    const verifiedUserId = await getVerifiedUserId(req);
    const db = await getDb();

    if (req.method === 'GET') {
      const userId = verifiedUserId || req.query.userId || 'default';
      const profile = await db.collection('profiles').findOne({ userId }, { projection: { _id: 0 } });
      return res.status(200).json({ profile: profile || null });
    }

    if (req.method === 'POST') {
      const { userId: bodyUserId = 'default', ...profileData } = req.body || {};
      const userId = verifiedUserId || bodyUserId;
      await db.collection('profiles').updateOne(
        { userId },
        { $set: { userId, ...profileData, updatedAt: new Date() } },
        { upsert: true }
      );
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
