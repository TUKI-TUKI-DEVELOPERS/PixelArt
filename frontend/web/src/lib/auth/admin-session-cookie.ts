/** Upper bound for the admin session cookie; matches the API access token TTL (24h). */
export const ADMIN_SESSION_FALLBACK_MAX_AGE_SECONDS = 60 * 60 * 24;

function readExpClaim(token: string): number | null {
  const payload = token.split('.')[1];
  if (!payload) return null;
  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: unknown };
    return typeof claims.exp === 'number' ? claims.exp : null;
  } catch {
    return null;
  }
}

/**
 * Cookie Max-Age aligned with the JWT's own `exp`, so the browser drops the
 * cookie when the token stops being valid. Never longer than 24h.
 * The token is not verified here (the API does that); this only sizes the cookie.
 */
export function adminSessionMaxAgeSeconds(token: string, nowSeconds = Math.floor(Date.now() / 1000)): number {
  const exp = readExpClaim(token);
  if (exp === null) return ADMIN_SESSION_FALLBACK_MAX_AGE_SECONDS;
  return Math.max(0, Math.min(exp - nowSeconds, ADMIN_SESSION_FALLBACK_MAX_AGE_SECONDS));
}
