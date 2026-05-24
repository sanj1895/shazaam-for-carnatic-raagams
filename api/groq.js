/* global process */

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';

const ALLOWED_MODELS = new Set([
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'llama-3.1-70b-versatile',
  'llama3-8b-8192',
  'llama3-70b-8192',
  'mixtral-8x7b-32768',
  'gemma-7b-it',
  'gemma2-9b-it',
]);

const RATE_WINDOWS = {
  GET: [
    { name: 'minute', windowMs: 60_000, limit: 30 },
  ],
  POST: [
    { name: 'minute', windowMs: 60_000, limit: 8 },
    { name: 'hour', windowMs: 60 * 60_000, limit: 60 },
  ],
};

const MAX_BODY_BYTES = 70_000;
const MAX_TOTAL_MESSAGE_CHARS = 45_000;
const MAX_MESSAGE_COUNT = 4;
const MAX_TEMPERATURE = 1;
const DEFAULT_MAX_TOKENS = 900;
const MAX_TOKENS = 1_200;

const rateStore = globalThis.__ALAPANA_GROQ_RATE_STORE__ || new Map();
globalThis.__ALAPANA_GROQ_RATE_STORE__ = rateStore;

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function getAllowedOrigins(req) {
  const configured = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  const host = req.headers.host;
  const sameOrigin = host ? [`https://${host}`, `http://${host}`] : [];
  return new Set([...configured, ...sameOrigin]);
}

function isAllowedOrigin(req) {
  if (req.method === 'GET') return true;

  const allowedOrigins = getAllowedOrigins(req);
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) return true;

  const referer = req.headers.referer;
  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      return allowedOrigins.has(refererOrigin);
    } catch {
      return false;
    }
  }

  return false;
}

function applyRateLimit(req) {
  const ip = getClientIp(req);
  const windows = RATE_WINDOWS[req.method] || [];
  const now = Date.now();

  for (const windowDef of windows) {
    const key = `${req.method}:${ip}:${windowDef.name}`;
    const current = rateStore.get(key);
    if (!current || now >= current.resetAt) {
      rateStore.set(key, { count: 1, resetAt: now + windowDef.windowMs });
      continue;
    }

    if (current.count >= windowDef.limit) {
      const retryAfter = Math.ceil((current.resetAt - now) / 1000);
      return { limited: true, retryAfter };
    }

    current.count += 1;
  }

  if (rateStore.size > 10_000) {
    for (const [key, value] of rateStore.entries()) {
      if (now >= value.resetAt) rateStore.delete(key);
    }
  }

  return { limited: false };
}

function validateChatBody(body) {
  const bodyBytes = JSON.stringify(body || {}).length;
  if (bodyBytes > MAX_BODY_BYTES) {
    return { error: 'Request is too large.' };
  }

  const { model, messages, temperature = 0.1, response_format, max_tokens } = body || {};
  if (!ALLOWED_MODELS.has(model)) {
    return { error: 'Model is not allowed.' };
  }
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGE_COUNT) {
    return { error: 'Invalid message count.' };
  }
  if (typeof temperature !== 'number' || temperature < 0 || temperature > MAX_TEMPERATURE) {
    return { error: 'Invalid temperature.' };
  }
  if (max_tokens !== undefined && (!Number.isInteger(max_tokens) || max_tokens < 1 || max_tokens > MAX_TOKENS)) {
    return { error: 'Invalid max_tokens.' };
  }
  if (response_format !== undefined) {
    const isJsonObject = response_format?.type === 'json_object' && Object.keys(response_format).length === 1;
    if (!isJsonObject) return { error: 'Invalid response_format.' };
  }

  let totalChars = 0;
  const sanitizedMessages = [];
  for (const message of messages) {
    if (!['system', 'user', 'assistant'].includes(message?.role)) {
      return { error: 'Invalid message role.' };
    }
    if (typeof message.content !== 'string' || message.content.length === 0) {
      return { error: 'Invalid message content.' };
    }
    totalChars += message.content.length;
    sanitizedMessages.push({ role: message.role, content: message.content });
  }
  if (totalChars > MAX_TOTAL_MESSAGE_CHARS) {
    return { error: 'Prompt is too long.' };
  }

  return {
    value: {
      model,
      messages: sanitizedMessages,
      temperature,
      max_tokens: Math.min(max_tokens || DEFAULT_MAX_TOKENS, MAX_TOKENS),
      ...(response_format ? { response_format } : {}),
    }
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden origin.' });
  }

  const rateLimit = applyRateLimit(req);
  if (rateLimit.limited) {
    res.setHeader('Retry-After', String(rateLimit.retryAfter));
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key is not configured on the server.' });
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${GROQ_BASE_URL}/models`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const data = await response.json();
      if (Array.isArray(data.data)) {
        data.data = data.data.filter(model => ALLOWED_MODELS.has(model.id));
      }
      return res.status(response.status).json(data);
    }

    const validation = validateChatBody(req.body);
    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }

    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(validation.value),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Groq request failed.' });
  }
}
