import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

describe('GET /admin-api/assets/:id/url', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns 401 without the admin cookie', async () => {
    const response = await GET(new NextRequest('http://localhost/admin-api/assets/5/url'), { params: Promise.resolve({ id: '5' }) });
    expect(response.status).toBe(401);
  });

  it('rejects non-numeric ids', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const response = await GET(
      new NextRequest('http://localhost/admin-api/assets/by-key/url', { headers: { cookie: 'pa_admin_token=admin-jwt' } }),
      { params: Promise.resolve({ id: 'by-key' }) },
    );
    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('forwards to the guarded asset URL endpoint with Bearer auth', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"url":"/assets/a.jpg"}', { status: 200, headers: { 'content-type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);
    const response = await GET(
      new NextRequest('http://localhost/admin-api/assets/5/url', { headers: { cookie: 'pa_admin_token=admin-jwt' } }),
      { params: Promise.resolve({ id: '5' }) },
    );
    expect(await response.json()).toEqual({ url: '/assets/a.jpg' });
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe('http://api:3001/api/assets/5/url');
    expect(new Headers(init.headers).get('authorization')).toBe('Bearer admin-jwt');
  });
});
