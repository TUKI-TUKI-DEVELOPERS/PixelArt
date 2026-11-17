import { afterEach, describe, expect, it, vi } from 'vitest';
import nextConfig from '../next.config';

async function siteWideHeaders(): Promise<Record<string, string>> {
  const rules = await nextConfig.headers!();
  const siteWide = rules.find((rule) => rule.source === '/:path*');
  expect(siteWide).toBeDefined();
  return Object.fromEntries(siteWide!.headers.map(({ key, value }) => [key, value]));
}

describe('next.config security headers', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('sends the baseline security headers on every route', async () => {
    const headers = await siteWideHeaders();
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['Permissions-Policy']).toContain('camera=()');
  });

  it('does not enforce a site-wide CSP (GSAP, Three.js, fonts and images rely on the defaults)', async () => {
    expect(await siteWideHeaders()).not.toHaveProperty('Content-Security-Policy');
  });

  it('only sends HSTS in production', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(await siteWideHeaders()).not.toHaveProperty('Strict-Transport-Security');

    vi.stubEnv('NODE_ENV', 'production');
    expect((await siteWideHeaders())['Strict-Transport-Security']).toBe('max-age=31536000');
  });

  it('no longer rewrites /assets/* straight to the bucket (that rewrite would shadow the gated route handler)', async () => {
    const rewrites = await nextConfig.rewrites!();
    const list = Array.isArray(rewrites) ? rewrites : [...(rewrites.beforeFiles ?? []), ...(rewrites.afterFiles ?? []), ...(rewrites.fallback ?? [])];
    expect(list.some((rule) => rule.source.startsWith('/assets'))).toBe(false);
    expect(list.some((rule) => rule.source === '/api/:path*')).toBe(true);
  });
});
