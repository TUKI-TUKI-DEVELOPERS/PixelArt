import { Promotion } from '../../domain/promotion';
import { EvaluatePromoCodeUseCase } from './evaluate-promo-code.use-case';

const NOW = new Date('2026-12-10T12:00:00Z');

const navidad = new Promotion({
  id: 42,
  label: 'NAVIDAD15',
  code: 'NAVIDAD15',
  targetType: null,
  targetId: null,
  discountType: 'percent',
  discountValue: 15,
  validFrom: new Date('2026-12-01T05:00:00Z'),
  validUntil: new Date('2026-12-26T05:00:00Z'),
  isActive: true,
  eligibility: [{ kind: 'PERSONALIZED_CATEGORY', refId: 3 }],
  createdAt: NOW,
  updatedAt: NOW,
});

function makeUseCase(promotions: Promotion[] = [navidad]) {
  const repo = { findByCode: jest.fn(async (code: string) => promotions.find((p) => p.code === code) ?? null) };
  const catalog = {
    findModelCategories: jest.fn(async (ids: number[]) => new Map(ids.filter((id) => id === 8).map((id) => [id, 3] as [number, number]))),
  };
  return { useCase: new EvaluatePromoCodeUseCase(repo as any, catalog as any), repo, catalog };
}

describe('EvaluatePromoCodeUseCase', () => {
  it('resolves the book category and applies the code', async () => {
    const { useCase, repo } = makeUseCase();
    const result = await useCase.execute({
      code: ' NAVIDAD15 ',
      product: { kind: 'PERSONALIZED_BOOK', modelId: 8 },
      discountableBaseCents: 12900,
      applied: null,
      now: NOW,
    });
    expect(repo.findByCode).toHaveBeenCalledWith('NAVIDAD15');
    expect(result).toEqual({ ok: true, promotionId: 42, code: 'NAVIDAD15', percent: 15, discountCents: 1935 });
  });

  it('not_found for an empty code without touching the repository', async () => {
    const { useCase, repo } = makeUseCase();
    const result = await useCase.execute({
      code: '   ',
      product: { kind: 'PERSONALIZED_BOOK', modelId: 8 },
      discountableBaseCents: 12900,
      applied: null,
      now: NOW,
    });
    expect(result).toEqual({ ok: false, reason: 'not_found' });
    expect(repo.findByCode).not.toHaveBeenCalled();
  });

  it('not_applicable when the book has no known category', async () => {
    const { useCase } = makeUseCase();
    const result = await useCase.execute({
      code: 'NAVIDAD15',
      product: { kind: 'PERSONALIZED_BOOK', modelId: 777 },
      discountableBaseCents: 12900,
      applied: null,
      now: NOW,
    });
    expect(result).toEqual({ ok: false, reason: 'not_applicable' });
  });

  it('passes photobook products straight through (slice B)', async () => {
    const { useCase, catalog } = makeUseCase();
    const result = await useCase.execute({
      code: 'NAVIDAD15',
      product: { kind: 'CUSTOM_PHOTOBOOK' },
      discountableBaseCents: 12900,
      applied: null,
      now: NOW,
    });
    expect(result).toEqual({ ok: false, reason: 'not_applicable' });
    expect(catalog.findModelCategories).not.toHaveBeenCalled();
  });

  it('honours the applied snapshot (idempotent / already_applied)', async () => {
    const { useCase } = makeUseCase();
    const applied = { promotionId: 42, code: 'NAVIDAD15', percent: 15 };
    await expect(
      useCase.execute({ code: 'NAVIDAD15', product: { kind: 'PERSONALIZED_BOOK', modelId: 8 }, discountableBaseCents: 8900, applied, now: NOW }),
    ).resolves.toEqual(expect.objectContaining({ ok: true, discountCents: 1335 }));
    await expect(
      useCase.execute({ code: 'OTRO', product: { kind: 'PERSONALIZED_BOOK', modelId: 8 }, discountableBaseCents: 8900, applied, now: NOW }),
    ).resolves.toEqual({ ok: false, reason: 'already_applied' });
  });
});
