import { afterEach, describe, expect, it, vi } from 'vitest';
import { deletePromotion, listPromotions, savePromotion } from './promotions';

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

const payload = {
  code: 'NAVIDAD15',
  percent: 15,
  validFrom: '2026-12-01T05:00:00.000Z',
  validUntil: '2026-12-26T05:00:00.000Z',
  isActive: true,
  eligibility: [{ kind: 'PERSONALIZED_CATEGORY' as const, refId: 3 }],
};

describe('admin promotions API', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('uses the same-origin admin BFF, never the public API path', async () => {
    const fetchMock = vi.fn(async (..._args: unknown[]) => json([]));
    vi.stubGlobal('fetch', fetchMock);
    await listPromotions();
    await savePromotion(null, payload);
    await savePromotion(5, payload);
    fetchMock.mockImplementationOnce(async () => new Response(null, { status: 200 }));
    await deletePromotion(5);
    expect(fetchMock.mock.calls.map(([url, init]) => `${(init as RequestInit | undefined)?.method ?? 'GET'} ${url}`)).toEqual([
      'GET /admin-api/promotions',
      'POST /admin-api/promotions',
      'PUT /admin-api/promotions/5',
      'DELETE /admin-api/promotions/5',
    ]);
    expect(JSON.parse((fetchMock.mock.calls[1][1] as RequestInit).body as string)).toEqual(payload);
  });

  it('surfaces the server 409 message (conflicting code)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(json({ message: 'Se cruza en fechas y productos con la promoción FAMILIA10' }, 409)),
    );
    await expect(savePromotion(null, payload)).rejects.toThrow('Se cruza en fechas y productos con la promoción FAMILIA10');
  });

  it('joins class-validator message arrays', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({ message: ['a', 'b'] }, 400)));
    await expect(savePromotion(null, payload)).rejects.toThrow('a · b');
  });
});
