import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { DELETE as deleteProposal } from './route';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('custom photobook proposal deletion proxy', () => {
  it('requires the httpOnly admin cookie', async () => {
    const response = await deleteProposal(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/designs/14'),
      { params: Promise.resolve({ id: '41', designId: '14' }) },
    );

    expect(response.status).toBe(401);
  });

  it('forwards an authenticated deletion to the API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({ surface: 'FRONT_COVER', deletedCount: 1 }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await deleteProposal(
      new NextRequest('http://localhost/admin-api/photobook/custom-requests/41/designs/14', {
        headers: { cookie: 'pa_admin_token=admin-jwt' },
      }),
      { params: Promise.resolve({ id: '41', designId: '14' }) },
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api:3001/api/admin/photobook/custom-requests/41/designs/14',
      expect.objectContaining({ method: 'DELETE', headers: { Authorization: 'Bearer admin-jwt' } }),
    );
    await expect(response.json()).resolves.toEqual({ surface: 'FRONT_COVER', deletedCount: 1 });
  });
});
