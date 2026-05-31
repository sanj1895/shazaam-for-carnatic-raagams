const RATE_LIMIT_BUCKETS = globalThis.__alapanaRateLimitBuckets || new Map();
globalThis.__alapanaRateLimitBuckets = RATE_LIMIT_BUCKETS;

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

function getClientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers?.['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) return realIp.trim();
  return 'unknown-ip';
}

function pruneExpired(now) {
  for (const [key, value] of RATE_LIMIT_BUCKETS.entries()) {
    if (value.resetAt <= now) RATE_LIMIT_BUCKETS.delete(key);
  }
}

function setLimitHeaders(res, limit, remaining, retryAfterSec, source) {
  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, remaining)));
  res.setHeader('X-RateLimit-Source', source);
  if (retryAfterSec) res.setHeader('Retry-After', String(retryAfterSec));
}

function rejectRateLimited(res, limit, retryAfterSec, source) {
  setLimitHeaders(res, limit, 0, retryAfterSec, source);
  res.status(429).json({
    error: 'Too many requests. Please slow down and try again shortly.',
    retryAfterSec,
  });
  return false;
}

function enforceMemoryRateLimit(req, res, {
  name,
  limit,
  windowMs,
  userId = 'anonymous',
}) {
  const now = Date.now();
  pruneExpired(now);

  const ip = getClientIp(req);
  const key = `${name}:${userId}:${ip}`;
  const existing = RATE_LIMIT_BUCKETS.get(key);

  if (!existing || existing.resetAt <= now) {
    RATE_LIMIT_BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    setLimitHeaders(res, limit, limit - 1, null, 'memory');
    return true;
  }

  if (existing.count >= limit) {
    const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return rejectRateLimited(res, limit, retryAfterSec, 'memory');
  }

  existing.count += 1;
  RATE_LIMIT_BUCKETS.set(key, existing);
  setLimitHeaders(res, limit, limit - existing.count, null, 'memory');
  return true;
}

async function enforceUpstashRateLimit(req, res, {
  name,
  limit,
  windowMs,
  userId = 'anonymous',
}) {
  const ip = getClientIp(req);
  const key = `ratelimit:${name}:${userId}:${ip}`;
  const windowSec = Math.max(1, Math.ceil(windowMs / 1000));

  const response = await fetch(`${UPSTASH_REDIS_REST_URL}/multi-exec`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['SET', key, '0', 'EX', windowSec, 'NX'],
      ['INCR', key],
      ['TTL', key],
    ]),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !Array.isArray(data)) {
    throw new Error(data?.error || 'Upstash rate limit request failed.');
  }

  const incrResult = data[1];
  const ttlResult = data[2];
  if (incrResult?.error) throw new Error(incrResult.error);
  if (ttlResult?.error) throw new Error(ttlResult.error);

  const count = Number(incrResult?.result ?? 0);
  const ttl = Number(ttlResult?.result ?? windowSec);
  const retryAfterSec = Math.max(1, ttl > 0 ? ttl : windowSec);

  if (!Number.isFinite(count) || count <= 0) {
    throw new Error('Upstash returned an invalid counter value.');
  }

  if (count > limit) {
    return rejectRateLimited(res, limit, retryAfterSec, 'upstash');
  }

  setLimitHeaders(res, limit, limit - count, null, 'upstash');
  return true;
}

export async function enforceRateLimit(req, res, options) {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return enforceMemoryRateLimit(req, res, options);
  }

  try {
    return await enforceUpstashRateLimit(req, res, options);
  } catch {
    return enforceMemoryRateLimit(req, res, options);
  }
}
