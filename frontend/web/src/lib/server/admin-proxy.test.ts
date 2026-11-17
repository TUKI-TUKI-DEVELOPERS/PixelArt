import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { proxyAdminApiRequest } from './admin-proxy';

function mockUpstream(response: Response = new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })) {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function adminRequest(url: string, init: { method?: string; headers?: Record<string, string>; body?: BodyInit } = {}) {
  return new NextRequest(url, {
    ...init,
    headers: { cookie: 'pa_admin_token=admin-jwt', ...(init.headers ?? {}) },
  });
}

describe('proxyAdminApiRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('rejects a request without the admin cookie and never calls the API', async () => {
    const fetchMock = mockUpstream();
    const response = await proxyAdminApiRequest(new NextRequest('http://localhost/admin-api/demo/requests'), {
      prefix: '/api/admin',
      segments: ['demo', 'requests'],
    });
    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([[['demo', '..', 'users']], [['.']], [['demo', '']], [['demo', 'a/b']], [['demo', 'a\\b']]])(
    'rejects unsafe path segments %j',
    async (segments) => {
      const fetchMock = mockUpstream();
      const response = await proxyAdminApiRequest(adminRequest('http://localhost/admin-api/x'), { prefix: '/api/admin', segments });
      expect(response.status).toBe(400);
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it('forwards the cookie as Bearer auth, never a client-supplied Authorization, plus path, query and client IP', async () => {
    const fetchMock = mockUpstream(new Response('[{"id":1}]', { status: 200, headers: { 'content-type': 'application/json; charset=utf-8' } }));
    const response = await proxyAdminApiRequest(
      adminRequest('http://localhost/admin-api/demo/requests/5/proposals?templateId=9', {
        headers: { authorization: 'Bearer attacker', 'x-forwarded-for': '198.51.100.1, 203.0.113.7' },
      }),
      { prefix: '/api/admin', segments: ['demo', 'requests', '5', 'proposals'] },
    );

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe('http://api:3001/api/admin/demo/requests/5/proposals?templateId=9');
    const headers = new Headers(init.headers);
    expect(headers.get('authorization')).toBe('Bearer admin-jwt');
    expect(headers.get('x-forwarded-for')).toBe('198.51.100.1, 203.0.113.7');
    expect(init.method).toBe('GET');
    expect(init.cache).toBe('no-store');
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/json; charset=utf-8');
    expect(await response.text()).toBe('[{"id":1}]');
  });

  it('uses API_INTERNAL_URL when configured', async () => {
    vi.stubEnv('API_INTERNAL_URL', 'http://internal-api:4000');
    const fetchMock = mockUpstream();
    await proxyAdminApiRequest(adminRequest('http://localhost/admin-api/feedback'), { prefix: '/api/admin', segments: ['feedback'] });
    expect(String(fetchMock.mock.calls[0][0])).toBe('http://internal-api:4000/api/admin/feedback');
  });

  it.each(['POST', 'PUT', 'PATCH', 'DELETE'])('streams a %s JSON body unchanged', async (method) => {
    const fetchMock = mockUpstream();
    await proxyAdminApiRequest(
      adminRequest('http://localhost/admin-api/promotions/3', { method, headers: { 'content-type': 'application/json' }, body: '{"isActive":false}' }),
      { prefix: '/api/admin', segments: ['promotions', '3'] },
    );
    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe(method);
    expect(new Headers(init.headers).get('content-type')).toBe('application/json');
    expect(await new Response(init.body as BodyInit).text()).toBe('{"isActive":false}');
  });

  it('preserves multipart bytes and the boundary', async () => {
    const fetchMock = mockUpstream();
    const boundary = '----browser-boundary';
    const multipart = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="x.png"\r\nContent-Type: image/png\r\n\r\npayload\r\n--${boundary}--\r\n`;
    await proxyAdminApiRequest(
      adminRequest('http://localhost/admin-api/demo/requests/5/replace-photo?oldAssetId=7', {
        method: 'POST',
        headers: { 'content-type': `multipart/form-data; boundary=${boundary}` },
        body: multipart,
      }),
      { prefix: '/api/admin', segments: ['demo', 'requests', '5', 'replace-photo'] },
    );
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe('http://api:3001/api/admin/demo/requests/5/replace-photo?oldAssetId=7');
    expect(new Headers(init.headers).get('content-type')).toBe(`multipart/form-data; boundary=${boundary}`);
    expect(await new Response(init.body as BodyInit).text()).toBe(multipart);
  });

  it('passes download headers through but drops transfer encodings the runtime already decoded', async () => {
    mockUpstream(new Response('%PDF', {
      status: 200,
      headers: { 'content-type': 'application/pdf', 'content-disposition': 'attachment; filename="x.pdf"', 'content-encoding': 'gzip', 'content-length': '999' },
    }));
    const response = await proxyAdminApiRequest(adminRequest('http://localhost/admin-api/x'), { prefix: '/api/admin', segments: ['x'] });
    expect(response.headers.get('content-disposition')).toBe('attachment; filename="x.pdf"');
    expect(response.headers.get('content-encoding')).toBeNull();
    expect(response.headers.get('content-length')).toBeNull();
  });

  it('keeps the sandbox and nosniff headers the API sets on private storage objects', async () => {
    mockUpstream(new Response('jpeg-bytes', {
      status: 200,
      headers: { 'content-type': 'image/jpeg', 'content-security-policy': 'sandbox', 'x-content-type-options': 'nosniff', 'cache-control': 'private, no-store' },
    }));
    const response = await proxyAdminApiRequest(adminRequest('http://localhost/admin-api/storage/uploads/vouchers/31.jpg'), {
      prefix: '/api/admin',
      segments: ['storage', 'uploads', 'vouchers', '31.jpg'],
    });
    expect(response.headers.get('content-security-policy')).toBe('sandbox');
    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
    expect(response.headers.get('cache-control')).toBe('private, no-store');
  });

  it('refuses state-changing requests a browser marks as cross-site', async () => {
    const fetchMock = mockUpstream();
    const response = await proxyAdminApiRequest(
      adminRequest('http://localhost/admin-api/demo/requests/5', { method: 'DELETE', headers: { 'sec-fetch-site': 'cross-site' } }),
      { prefix: '/api/admin', segments: ['demo', 'requests', '5'] },
    );
    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('answers 502 when the API is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')));
    const response = await proxyAdminApiRequest(adminRequest('http://localhost/admin-api/x'), { prefix: '/api/admin', segments: ['x'] });
    expect(response.status).toBe(502);
  });
});
