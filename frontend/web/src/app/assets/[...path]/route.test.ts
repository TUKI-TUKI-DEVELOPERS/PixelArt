import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, HEAD } from './route';

const context = { params: Promise.resolve({ path: [] as string[] }) };

function mockStorage(response: Response | Error) {
  const fetchMock = response instanceof Error ? vi.fn().mockRejectedValue(response) : vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

const minioImage = (init: ResponseInit = {}) =>
  new Response('png-bytes', {
    status: 200,
    ...init,
    headers: {
      'content-type': 'image/png',
      'content-length': '9',
      etag: '"abc"',
      'last-modified': 'Fri, 15 May 2026 22:51:50 GMT',
      'cache-control': 'public, max-age=31536000, immutable',
      'accept-ranges': 'bytes',
      server: 'MinIO',
      'x-amz-request-id': '18E89D8B52CE99CE',
      'strict-transport-security': 'max-age=31536000; includeSubDomains',
      ...(init.headers as Record<string, string> | undefined),
    },
  });

describe('GET /assets/[...path]', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it.each(['/assets/uploads/vouchers/10.jpg', '/assets/generated/originals/9_1740.png', '/assets/photobook-renders/1.pdf', '/assets/x.png'])(
    'denies %s by default without touching storage',
    async (path) => {
      const fetchMock = mockStorage(minioImage());
      const response = await GET(new NextRequest(`http://localhost:3000${path}`), context);
      expect(response.status).toBe(404);
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it('streams an allowlisted object from the internal bucket with sandbox + nosniff headers', async () => {
    const fetchMock = mockStorage(minioImage());

    const response = await GET(new NextRequest('http://localhost:3000/assets/QRPago/QR_Pago_Pixelart.png?v=3'), context);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('png-bytes');
    expect(String(fetchMock.mock.calls[0][0])).toBe('http://minio:9000/pixelart-assets/QRPago/QR_Pago_Pixelart.png');
    expect(response.headers.get('content-type')).toBe('image/png');
    expect(response.headers.get('etag')).toBe('"abc"');
    expect(response.headers.get('cache-control')).toBe('public, max-age=31536000, immutable');
    expect(response.headers.get('content-security-policy')).toBe('sandbox');
    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
  });

  it('does not leak storage server headers', async () => {
    mockStorage(minioImage());
    const response = await GET(new NextRequest('http://localhost:3000/assets/Home/a.png'), context);
    expect(response.headers.get('server')).toBeNull();
    expect(response.headers.get('x-amz-request-id')).toBeNull();
    expect(response.headers.get('strict-transport-security')).toBeNull();
  });

  it('uses MINIO_INTERNAL_URL and the configured bucket, re-encoding each key segment', async () => {
    vi.stubEnv('MINIO_INTERNAL_URL', 'http://storage.internal:9000');
    vi.stubEnv('NEXT_PUBLIC_MINIO_BUCKET', 'other-bucket');
    const fetchMock = mockStorage(minioImage());
    await GET(new NextRequest('http://localhost:3000/assets/IA_Books/Mam%C3%A1%20mi%20hero%C3%ADna/1.png'), context);
    expect(String(fetchMock.mock.calls[0][0])).toBe('http://storage.internal:9000/other-bucket/IA_Books/Mam%C3%A1%20mi%20hero%C3%ADna/1.png');
  });

  it('forwards conditional and range requests and passes 304/206 through', async () => {
    const fetchMock = mockStorage(new Response(null, { status: 304, headers: { etag: '"abc"' } }));
    const response = await GET(
      new NextRequest('http://localhost:3000/assets/Home/a.png', { headers: { 'if-none-match': '"abc"', range: 'bytes=0-1', cookie: 'pa_admin_token=secret' } }),
      context,
    );
    expect(response.status).toBe(304);
    // Only the conditional/range headers reach storage — never cookies or auth.
    expect(fetchMock.mock.calls[0][1].headers).toEqual({ 'if-none-match': '"abc"', range: 'bytes=0-1' });

    mockStorage(new Response('pn', { status: 206, headers: { 'content-type': 'image/png', 'content-range': 'bytes 0-1/9' } }));
    const partial = await GET(new NextRequest('http://localhost:3000/assets/Home/a.png', { headers: { range: 'bytes=0-1' } }), context);
    expect(partial.status).toBe(206);
    expect(partial.headers.get('content-range')).toBe('bytes 0-1/9');
  });

  it.each([403, 404])('answers 404 when storage answers %i', async (status) => {
    mockStorage(new Response('<Error/>', { status, headers: { 'content-type': 'application/xml' } }));
    const response = await GET(new NextRequest('http://localhost:3000/assets/Home/missing.png'), context);
    expect(response.status).toBe(404);
    expect(response.headers.get('content-type')).not.toContain('xml');
  });

  it('answers 502 when storage is unreachable', async () => {
    mockStorage(new Error('ECONNREFUSED'));
    const response = await GET(new NextRequest('http://localhost:3000/assets/Home/a.png'), context);
    expect(response.status).toBe(502);
  });

  it('supports HEAD without a body', async () => {
    const fetchMock = mockStorage(new Response(null, { status: 200, headers: { 'content-type': 'image/png', 'content-length': '9' } }));
    const response = await HEAD(new NextRequest('http://localhost:3000/assets/Home/a.png', { method: 'HEAD' }), context);
    expect(response.status).toBe(200);
    expect(fetchMock.mock.calls[0][1].method).toBe('HEAD');
    expect(response.headers.get('content-length')).toBe('9');
  });
});
