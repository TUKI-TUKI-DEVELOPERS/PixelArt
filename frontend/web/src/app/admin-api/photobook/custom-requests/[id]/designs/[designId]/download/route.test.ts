import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('custom photobook proposal download proxy', () => {
  it('forwards the protected PNG as an attachment', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('png-content', {
      status: 200,
      headers: {
        'content-type': 'image/png',
        'content-disposition': 'attachment; filename="tapa-frontal-14.png"',
      },
    }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await GET(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/designs/14/download', {
        headers: { cookie: 'pa_admin_token=admin-jwt' },
      }),
      { params: Promise.resolve({ id: '41', designId: '14' }) },
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api:3001/api/admin/photobook/custom-requests/41/designs/14/download',
      expect.objectContaining({ headers: { Authorization: 'Bearer admin-jwt' } }),
    );
    expect(response.headers.get('content-disposition')).toBe('attachment; filename="tapa-frontal-14.png"');
    await expect(response.text()).resolves.toBe('png-content');
  });
});
