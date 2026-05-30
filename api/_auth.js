/* global process */
import { verifyToken } from '@clerk/backend';

/**
 * Returns the verified Clerk userId from the Authorization header,
 * or null if absent/invalid (guest request).
 */
export async function getVerifiedUserId(req) {
  const authHeader = req.headers?.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    return payload.sub || null;
  } catch {
    return null;
  }
}
