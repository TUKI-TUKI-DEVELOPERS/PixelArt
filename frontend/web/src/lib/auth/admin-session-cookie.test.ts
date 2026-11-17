import { describe, expect, it } from 'vitest';
import { adminSessionMaxAgeSeconds, ADMIN_SESSION_FALLBACK_MAX_AGE_SECONDS } from './admin-session-cookie';

function jwtWith(payload: Record<string, unknown>) {
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(payload)}.signature`;
}

describe('adminSessionMaxAgeSeconds', () => {
  const now = 1_800_000_000;

  it('expires the cookie exactly when the JWT expires', () => {
    expect(adminSessionMaxAgeSeconds(jwtWith({ exp: now + 86_400 }), now)).toBe(86_400);
  });

  it('never outlives a 24h fallback when the token has no readable exp', () => {
    expect(ADMIN_SESSION_FALLBACK_MAX_AGE_SECONDS).toBe(86_400);
    expect(adminSessionMaxAgeSeconds('not-a-jwt', now)).toBe(86_400);
    expect(adminSessionMaxAgeSeconds(jwtWith({ sub: 1 }), now)).toBe(86_400);
  });

  it('caps an unexpectedly long-lived token at 24h', () => {
    expect(adminSessionMaxAgeSeconds(jwtWith({ exp: now + 7 * 86_400 }), now)).toBe(86_400);
  });

  it('returns 0 for an already expired token', () => {
    expect(adminSessionMaxAgeSeconds(jwtWith({ exp: now - 10 }), now)).toBe(0);
  });
});
