import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('custom photobook reference download proxy', () => {
  it('rejects non-numeric request and asset ids without calling the API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await GET(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/nope/references/7/download', {
        headers: { cookie: 'pa_admin_token=admin-jwt' },
      }),
      { params: Promise.resolve({ id: 'nope', assetId: '7' }) },
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ message: 'Referencia inválida' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('forwards the authenticated binary attachment and preserves its headers', async () => {
    const binary = new Uint8Array([0, 255, 17, 128]);
    const fetchMock = vi.fn().mockResolvedValue(new Response(binary, {
      status: 200,
      headers: {
        'content-type': 'image/webp',
        'content-disposition': 'attachment; filename="referencia-cliente.webp"',
      },
    }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await GET(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/references/7/download', {
        headers: { cookie: 'pa_admin_token=admin-jwt' },
      }),
      { params: Promise.resolve({ id: '41', assetId: '7' }) },
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api:3001/api/admin/photobook/custom-requests/41/references/7/download',
      expect.objectContaining({ headers: { Authorization: 'Bearer admin-jwt' } }),
    );
    expect(response.headers.get('content-type')).toBe('image/webp');
    expect(response.headers.get('content-disposition')).toBe('attachment; filename="referencia-cliente.webp"');
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(binary);
  });

  it('uses safe fallback headers when the API omits download metadata', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(new Uint8Array([4, 5]), { status: 200 })));

    const response = await GET(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/references/7/download', {
        headers: { cookie: 'pa_admin_token=admin-jwt' },
      }),
      { params: Promise.resolve({ id: '41', assetId: '7' }) },
    );

    expect(response.headers.get('content-type')).toBe('application/octet-stream');
    expect(response.headers.get('content-disposition')).toBe('attachment; filename="referencia-7.jpg"');
  });
});
