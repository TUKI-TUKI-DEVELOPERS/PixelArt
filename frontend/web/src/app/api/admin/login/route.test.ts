import { afterEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

function jwtExpiringIn(seconds: number) {
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${encode({ alg: 'HS256' })}.${encode({ exp: Math.floor(Date.now() / 1000) + seconds })}.sig`;
}

function loginRequest(headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/admin/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify({ email: 'admin@pixelart.pe', password: 'secret' }),
  });
}

describe('POST /api/admin/login', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('sets the httpOnly session cookie for as long as the JWT is valid (24h), not 7 days', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ accessToken: jwtExpiringIn(86_400) }), { status: 201 })));

    const response = await POST(loginRequest());

    const cookie = response.headers.get('set-cookie') ?? '';
    expect(cookie).toMatch(/pa_admin_token=/);
    expect(cookie).toMatch(/HttpOnly/i);
    const maxAge = Number(/Max-Age=(\d+)/i.exec(cookie)?.[1]);
    expect(maxAge).toBeGreaterThan(86_390);
    expect(maxAge).toBeLessThanOrEqual(86_400);
  });

  it('forwards the client address so the API rate limits per client, not per Next server', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ accessToken: jwtExpiringIn(60) }), { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);

    await POST(loginRequest({ 'x-forwarded-for': '203.0.113.7' }));

    expect(new Headers(fetchMock.mock.calls[0][1].headers).get('x-forwarded-for')).toBe('203.0.113.7');
  });

  it('surfaces the API rate limit as 429 with a Spanish message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"statusCode":429}', { status: 429 })));

    const response = await POST(loginRequest());

    expect(response.status).toBe(429);
    expect((await response.json()).message).toMatch(/Demasiados intentos/);
    expect(response.headers.get('set-cookie')).toBeNull();
  });

  it('answers 401 with a Spanish message on bad credentials', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"statusCode":401}', { status: 401 })));

    const response = await POST(loginRequest());

    expect(response.status).toBe(401);
    expect((await response.json()).message).toMatch(/incorrectos/);
  });
});
