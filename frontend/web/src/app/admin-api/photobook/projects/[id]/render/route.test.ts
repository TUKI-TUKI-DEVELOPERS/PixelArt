import { describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from './route';

describe('GET /admin-api/photobook/projects/:id/render', () => {
  it('returns 401 when the httpOnly admin cookie is missing', async () => {
    const response = await GET(
      new NextRequest('http://localhost/admin-api/photobook/projects/77/render'),
      { params: Promise.resolve({ id: '77' }) },
    );

    expect(response.status).toBe(401);
  });

  it('forwards the admin cookie as bearer authentication to the internal API', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ pdfUrl: 'https://assets.test/interior.pdf', coverWrapUrl: 'https://assets.test/wrap.pdf' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await GET(
      new NextRequest('http://localhost/admin-api/photobook/projects/77/render', {
        headers: { cookie: 'pa_admin_token=admin-jwt' },
      }),
      { params: Promise.resolve({ id: '77' }) },
    );

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://api:3001/api/admin/photobook/projects/77/render',
      expect.objectContaining({
        cache: 'no-store',
        headers: { Authorization: 'Bearer admin-jwt' },
      }),
    );
  });

  it('queues a re-render through POST with bearer authentication', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"queued":true}', { status: 201, headers: { 'content-type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(
      new NextRequest('http://localhost/admin-api/photobook/projects/77/render', { method: 'POST', headers: { cookie: 'pa_admin_token=admin-jwt' } }),
      { params: Promise.resolve({ id: '77' }) },
    );

    expect(response.status).toBe(201);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe('http://api:3001/api/admin/photobook/projects/77/render');
    expect(init.method).toBe('POST');
    expect(new Headers(init.headers).get('authorization')).toBe('Bearer admin-jwt');
  });

  it('rejects a non-numeric project id on POST', async () => {
    const response = await POST(
      new NextRequest('http://localhost/admin-api/photobook/projects/x/render', { method: 'POST', headers: { cookie: 'pa_admin_token=admin-jwt' } }),
      { params: Promise.resolve({ id: 'x' }) },
    );
    expect(response.status).toBe(400);
  });
});
