import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import * as route from './route';

describe('/admin-api/[...path] catch-all BFF', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('exposes every method the admin pages use', () => {
    for (const method of ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const) {
      expect(typeof route[method]).toBe('function');
    }
  });

  it('maps /admin-api/<path> to the guarded /api/admin/<path> with the cookie as Bearer auth', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('[]', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await route.GET(
      new NextRequest('http://localhost/admin-api/demo/requests', { headers: { cookie: 'pa_admin_token=admin-jwt' } }),
      { params: Promise.resolve({ path: ['demo', 'requests'] }) },
    );

    expect(response.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe('http://api:3001/api/admin/demo/requests');
    expect(new Headers(init.headers).get('authorization')).toBe('Bearer admin-jwt');
  });

  it('streams private storage objects from the guarded /api/admin/storage/<key> endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('jpeg-bytes', { status: 200, headers: { 'content-type': 'image/jpeg' } }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await route.GET(
      new NextRequest('http://localhost/admin-api/storage/uploads/vouchers/31-ab.jpg?v=5', { headers: { cookie: 'pa_admin_token=admin-jwt' } }),
      { params: Promise.resolve({ path: ['storage', 'uploads', 'vouchers', '31-ab.jpg'] }) },
    );

    expect(await response.text()).toBe('jpeg-bytes');
    expect(String(fetchMock.mock.calls[0][0])).toBe('http://api:3001/api/admin/storage/uploads/vouchers/31-ab.jpg?v=5');
  });

  it('rejects anonymous storage requests without calling the API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const response = await route.GET(new NextRequest('http://localhost/admin-api/storage/uploads/vouchers/31.jpg'), {
      params: Promise.resolve({ path: ['storage', 'uploads', 'vouchers', '31.jpg'] }),
    });
    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects traversal attempts', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const response = await route.GET(
      new NextRequest('http://localhost/admin-api/x', { headers: { cookie: 'pa_admin_token=admin-jwt' } }),
      { params: Promise.resolve({ path: ['..', 'auth', 'me'] }) },
    );
    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
