import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('custom photobook manual artwork upload proxy', () => {
  it('requires the admin cookie without contacting the API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/designs/upload', { method: 'POST' }),
      { params: Promise.resolve({ id: '41' }) },
    );

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an invalid request id without contacting the API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/not-a-number/designs/upload', {
        method: 'POST',
        headers: { cookie: 'pa_admin_token=admin-jwt' },
      }),
      { params: Promise.resolve({ id: 'not-a-number' }) },
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('forwards the multipart artwork and admin authorization to the API', async () => {
    const upstreamBody = { id: 14, surface: 'FRONT_COVER', provider: 'manual' };
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(upstreamBody), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    }));
    vi.stubGlobal('fetch', fetchMock);

    const boundary = '----manual-artwork-boundary';
    const multipartBody = [
      `--${boundary}`,
      'Content-Disposition: form-data; name="surface"',
      '',
      'FRONT_COVER',
      `--${boundary}`,
      'Content-Disposition: form-data; name="file"; filename="front-cover.png"',
      'Content-Type: image/png',
      '',
      'png-content',
      `--${boundary}--`,
      '',
    ].join('\r\n');
    const request = new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/designs/upload', {
      method: 'POST',
      headers: {
        cookie: 'pa_admin_token=admin-jwt',
        'content-type': `multipart/form-data; boundary=${boundary}`,
      },
      body: multipartBody,
    });

    const response = await POST(request, { params: Promise.resolve({ id: '41' }) });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://api:3001/api/admin/photobook/custom-requests/41/designs/upload',
      expect.objectContaining({
        method: 'POST',
        cache: 'no-store',
        headers: { Authorization: 'Bearer admin-jwt' },
      }),
    );
    const forwardedForm = fetchMock.mock.calls[0][1].body as FormData;
    expect(forwardedForm.get('surface')).toBe('FRONT_COVER');
    const forwardedFile = forwardedForm.get('file') as File;
    expect(forwardedFile.name).toBe('front-cover.png');
    expect(forwardedFile.type).toBe('image/png');
    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual(upstreamBody);
  });
});
