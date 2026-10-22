import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('custom photobook proposal deselection proxy', () => {
  it('requires the httpOnly admin cookie', async () => {
    const response = await POST(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/designs/14/deselect'),
      { params: Promise.resolve({ id: '41', designId: '14' }) },
    );

    expect(response.status).toBe(401);
  });

  it('rejects non-numeric request and design ids without calling the API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/designs/not-a-number/deselect', {
        headers: { cookie: 'pa_admin_token=admin-jwt' },
      }),
      { params: Promise.resolve({ id: '41', designId: 'not-a-number' }) },
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ message: 'Propuesta inválida' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('forwards an authenticated deselection to the API', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      id: 14,
      surface: 'FRONT_COVER',
      isSelected: false,
      removedDerivedBackCover: false,
    }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/designs/14/deselect', {
        headers: { cookie: 'pa_admin_token=admin-jwt' },
      }),
      { params: Promise.resolve({ id: '41', designId: '14' }) },
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api:3001/api/admin/photobook/custom-requests/41/designs/14/deselect',
      expect.objectContaining({ method: 'POST', headers: { Authorization: 'Bearer admin-jwt' } }),
    );
    await expect(response.json()).resolves.toMatchObject({ id: 14, isSelected: false });
  });
});
