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

function setHeaders(res, primaryRule, remaining, retryAfterSec, scope) {
  res.setHeader('X-RateLimit-Limit', String(primaryRule.limit));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, remaining)));
  res.setHeader('X-RateLimit-Window', String(primaryRule.windowMs));
  res.setHeader('X-RateLimit-Scope', scope);
  if (retryAfterSec) res.setHeader('Retry-After', String(retryAfterSec));
}

function rejectRateLimited(res, primaryRule, retryAfterSec, scope) {
  setHeaders(res, primaryRule, 0, retryAfterSec, scope);
  res.status(429).json({
    error: 'Too many requests. Please slow down and try again shortly.',
    retryAfterSec,
    scope,
  });
  return false;
}

export async function enforceRateLimit(req, res, {
  name,
  limit,
  windowMs,
  userId = 'anonymous',
  extraLimits = [],
}) {
  const now = Date.now();
  pruneExpired(now);

  const ip = getClientIp(req);
  const rules = [{ label: 'burst', limit, windowMs }, ...extraLimits];
  const primaryRule = rules[0];

  let primaryRemaining = primaryRule.limit - 1;

  for (const rule of rules) {
    const key = `${name}:${rule.label}:${userId}:${ip}`;
    const existing = RATE_LIMIT_BUCKETS.get(key);

    if (!existing || existing.resetAt <= now) {
      RATE_LIMIT_BUCKETS.set(key, { count: 1, resetAt: now + rule.windowMs });
      if (rule === primaryRule) primaryRemaining = rule.limit - 1;
      continue;
    }

    if (existing.count >= rule.limit) {
      const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
      return rejectRateLimited(res, primaryRule, retryAfterSec, rule.label);
    }

    existing.count += 1;
    RATE_LIMIT_BUCKETS.set(key, existing);
    if (rule === primaryRule) primaryRemaining = rule.limit - existing.count;
  }

  setHeaders(res, primaryRule, primaryRemaining, null, 'ok');
  return true;
}
