const RATE_LIMIT_BUCKETS = globalThis.__alapanaRateLimitBuckets || new Map();
globalThis.__alapanaRateLimitBuckets = RATE_LIMIT_BUCKETS;

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

export function enforceRateLimit(req, res, {
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
    res.setHeader('X-RateLimit-Limit', String(limit));
    res.setHeader('X-RateLimit-Remaining', String(limit - 1));
    return true;
  }

  if (existing.count >= limit) {
    const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    res.setHeader('Retry-After', String(retryAfterSec));
    res.setHeader('X-RateLimit-Limit', String(limit));
    res.setHeader('X-RateLimit-Remaining', '0');
    res.status(429).json({
      error: 'Too many requests. Please slow down and try again shortly.',
      retryAfterSec,
    });
    return false;
  }

  existing.count += 1;
  RATE_LIMIT_BUCKETS.set(key, existing);
  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, limit - existing.count)));
  return true;
}
