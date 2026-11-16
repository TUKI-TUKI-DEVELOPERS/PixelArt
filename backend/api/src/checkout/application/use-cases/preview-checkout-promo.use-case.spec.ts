import { BadRequestException, ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { PublicLink } from '../../../public-links/domain/public-link';
import { PreviewCheckoutPromoUseCase } from './preview-checkout-promo.use-case';

const ORDER_ID = 100;

function makeLink(linkType = 'CHECKOUT', orderId: number | null = ORDER_ID) {
  return new PublicLink(7, linkType, 'tok', new Date(Date.now() + 3_600_000), null, null, orderId, null, new Date());
}

const order = {
  id: ORDER_ID,
  personalizedModelId: 9,
  baseAmountCents: 12900,
  rushFeeCents: 1500,
  extraTemplatesAmountCents: 0,
  discountAmountCents: 0,
  promotionId: null,
  promotionCode: null,
  promotionPercent: null,
};

function makeHarness(options: { link?: PublicLink; order?: Record<string, unknown>; evaluation?: unknown } = {}) {
  const publicLinksService = { validate: jest.fn().mockResolvedValue(options.link ?? makeLink()) };
  const ordersService = { findById: jest.fn().mockResolvedValue(options.order ?? order) };
  const evaluatePromoCode = {
    execute: jest.fn().mockResolvedValue(
      options.evaluation ?? { ok: true, promotionId: 42, code: 'NAVIDAD15', percent: 15, discountCents: 2535 },
    ),
  };
  const useCase = new PreviewCheckoutPromoUseCase(publicLinksService as any, ordersService as any, evaluatePromoCode as any);
  return { useCase, evaluatePromoCode };
}

describe('PreviewCheckoutPromoUseCase', () => {
  it('evaluates against base + premium package and returns the new total (rush fee not discounted)', async () => {
    const h = makeHarness();
    const result = await h.useCase.execute({ token: 'tok', code: 'NAVIDAD15', packageType: 'PREMIUM' });

    expect(h.evaluatePromoCode.execute).toHaveBeenCalledWith({
      code: 'NAVIDAD15',
      product: { kind: 'PERSONALIZED_BOOK', modelId: 9 },
      discountableBaseCents: 16900,
      applied: null,
    });
    expect(result).toEqual({ code: 'NAVIDAD15', percent: 15, discountCents: 2535, totalCents: 12900 + 1500 + 4000 - 2535 });
  });

  it('passes the order snapshot so a different code is rejected and the same one is idempotent', async () => {
    const h = makeHarness({ order: { ...order, promotionId: 42, promotionCode: 'NAVIDAD15', promotionPercent: 15 } });
    await h.useCase.execute({ token: 'tok', code: 'NAVIDAD15', packageType: 'STANDARD' });
    expect(h.evaluatePromoCode.execute).toHaveBeenCalledWith(
      expect.objectContaining({ applied: { promotionId: 42, code: 'NAVIDAD15', percent: 15 } }),
    );
  });

  it.each([
    ['not_found', 'Código no válido', UnprocessableEntityException],
    ['inactive', 'Código no válido', UnprocessableEntityException],
    ['not_started', 'Este código aún no está vigente', UnprocessableEntityException],
    ['expired', 'Este código ha vencido', UnprocessableEntityException],
    ['not_applicable', 'Este código no aplica a este libro', UnprocessableEntityException],
    ['already_applied', 'Este pedido ya tiene otro código de promoción aplicado', ConflictException],
  ])('maps %s to a Spanish %s error', async (reason, message, type) => {
    const h = makeHarness({ evaluation: { ok: false, reason } });
    const error = await h.useCase.execute({ token: 'tok', code: 'X', packageType: 'STANDARD' }).catch((e) => e);
    expect(error).toBeInstanceOf(type);
    expect(error.message).toBe(message);
    expect(error.getResponse()).toEqual(expect.objectContaining({ reason, message }));
  });

  it('rejects a non-checkout link', async () => {
    const h = makeHarness({ link: makeLink('DEMO_VIEW') });
    await expect(h.useCase.execute({ token: 'tok', code: 'X', packageType: 'STANDARD' })).rejects.toThrow(
      BadRequestException,
    );
  });
});
