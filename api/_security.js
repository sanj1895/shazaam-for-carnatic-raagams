const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://alapana.vercel.app',
];

function getAllowedOrigins() {
  const configured = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...configured, ...(vercelUrl ? [vercelUrl] : [])]);
}

export function applyApiSecurity(req, res, methods) {
  const allowedOrigins = getAllowedOrigins();
  const origin = req.headers?.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
}

export function rejectDisallowedOrigin(req, res) {
  const origin = req.headers?.origin;
  if (!origin) return false;
  const allowedOrigins = getAllowedOrigins();
  if (allowedOrigins.has(origin)) return false;
  res.status(403).json({ error: 'Origin not allowed.' });
  return true;
}
