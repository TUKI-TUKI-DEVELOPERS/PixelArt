import { afterEach, describe, expect, it, vi } from 'vitest';
import { previewCheckoutPromo, submitCheckout } from './checkout';

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

describe('previewCheckoutPromo', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('posts code and package to the preview endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ code: 'NAVIDAD15', percent: 15, discountCents: 1950, totalCents: 11050 }));
    vi.stubGlobal('fetch', fetchMock);

    const result = await previewCheckoutPromo('tok-1', { code: 'NAVIDAD15', packageType: 'PREMIUM' });

    expect(result).toEqual({ code: 'NAVIDAD15', percent: 15, discountCents: 1950, totalCents: 11050 });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/checkout/tok-1/promo-preview');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ code: 'NAVIDAD15', package: 'PREMIUM' });
  });

  it('throws the Spanish message from the API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({ message: 'Este código ha vencido', reason: 'expired' }, 422)));
    await expect(previewCheckoutPromo('tok', { code: 'X', packageType: 'STANDARD' })).rejects.toThrow('Este código ha vencido');
  });

  it('falls back to a generic message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('boom', { status: 500 })));
    await expect(previewCheckoutPromo('tok', { code: 'X', packageType: 'STANDARD' })).rejects.toThrow(
      'No se pudo validar el código',
    );
  });
});

describe('submitCheckout', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('sends promoCode only when present', async () => {
    const fetchMock = vi.fn(async (..._args: unknown[]) => json({ success: true, totalAmountCents: 11050, currency: 'PEN', message: 'ok' }));
    vi.stubGlobal('fetch', fetchMock);
    const file = new File(['x'], 'v.jpg', { type: 'image/jpeg' });

    await submitCheckout('tok', { additionalTemplateIds: [1, 2], packageType: 'STANDARD', paymentProof: file, promoCode: 'NAVIDAD15' });
    expect(((fetchMock.mock.calls[0][1] as RequestInit).body as FormData).get('promoCode')).toBe('NAVIDAD15');

    await submitCheckout('tok', { additionalTemplateIds: [1, 2], packageType: 'STANDARD', paymentProof: file });
    expect(((fetchMock.mock.calls[1][1] as RequestInit).body as FormData).has('promoCode')).toBe(false);
  });
});
