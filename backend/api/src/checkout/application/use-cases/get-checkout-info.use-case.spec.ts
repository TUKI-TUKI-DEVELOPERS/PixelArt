import { PublicLink } from '../../../public-links/domain/public-link';
import { GetCheckoutInfoUseCase } from './get-checkout-info.use-case';

const order = {
  id: 100,
  status: 'AWAITING_PAYMENT_PROOF',
  demoRequestId: 55,
  personalizedModelId: 9,
  customerFullName: 'Cliente',
  baseAmountCents: 12900,
  rushFeeCents: 0,
  extraTemplatesAmountCents: 0,
  discountAmountCents: 0,
  promotionId: null,
  promotionCode: null,
  promotionPercent: null,
  currency: 'PEN',
};

function makeUseCase(orderOverrides: Record<string, unknown> = {}) {
  const link = new PublicLink(7, 'CHECKOUT', 'tok', new Date(Date.now() + 3_600_000), null, null, 100, null, new Date());
  return new GetCheckoutInfoUseCase(
    { findByToken: jest.fn().mockResolvedValue(link) } as any,
    { findById: jest.fn().mockResolvedValue({ ...order, ...orderOverrides }) } as any,
    { getPublicUrl: jest.fn((k: string) => `/assets/${k}`) } as any,
    { query: jest.fn().mockResolvedValue([]) } as any,
  );
}

describe('GetCheckoutInfoUseCase — applied promotion', () => {
  it('is null when the order has no code', async () => {
    const info = await makeUseCase().execute('tok');
    expect(info).toEqual(expect.objectContaining({ appliedPromotion: null }));
  });

  it('exposes the stored code snapshot so a retry shows it as applied', async () => {
    const info = await makeUseCase({ promotionCode: 'NAVIDAD15', promotionPercent: 15, discountAmountCents: 1935 }).execute('tok');
    expect(info).toEqual(
      expect.objectContaining({ appliedPromotion: { code: 'NAVIDAD15', percent: 15, discountCents: 1935 } }),
    );
  });
});
