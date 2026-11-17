import { Promotion } from '../../domain/promotion';
import { ListPublicPromoCodesUseCase } from './list-public-promo-codes.use-case';

const promotion = (overrides: Partial<ConstructorParameters<typeof Promotion>[0]>) => new Promotion({
  id: 1, label: 'X', code: 'X', targetType: null, targetId: null, eligibility: [{ kind: 'CUSTOM_PHOTOBOOK', refId: null }],
  discountType: 'percent', discountValue: 10, validFrom: new Date('2026-11-01'), validUntil: new Date('2026-12-01'),
  isActive: true, createdAt: new Date(), updatedAt: new Date(), ...overrides,
});

describe('ListPublicPromoCodesUseCase', () => {
  it('lists the valid codes exactly as typed, with percent and scope, soonest to expire first', async () => {
    const now = new Date('2026-11-16T12:00:00Z');
    const repo = { findValidCodedPromotions: jest.fn().mockResolvedValue([
      promotion({ id: 1, code: 'Medida10', validUntil: new Date('2026-12-31') }),
      promotion({ id: 2, code: 'navidad15', discountValue: 15, validUntil: new Date('2026-11-30'), eligibility: [{ kind: 'PERSONALIZED_BOOK', refId: 9 }] }),
    ]) };

    const result = await new ListPublicPromoCodesUseCase(repo as any).execute(now);

    expect(repo.findValidCodedPromotions).toHaveBeenCalledWith(now);
    expect(result).toEqual([
      { code: 'navidad15', percent: 15, scope: 'en libros personalizados seleccionados', audience: 'personalized', validUntil: new Date('2026-11-30') },
      { code: 'Medida10', percent: 10, scope: 'en photobooks a medida', audience: 'photobook', validUntil: new Date('2026-12-31') },
    ]);
  });
});
