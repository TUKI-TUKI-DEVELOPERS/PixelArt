import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Promotion } from '../../domain/promotion';
import { EligibilityTarget } from '../../domain/eligibility-target';
import { PromotionScheduleSession, SavePromotionData } from '../../domain/ports/promotion-repository.port';
import { SavePromotionInput, SavePromotionUseCase } from './save-promotion.use-case';

const d = (iso: string) => new Date(iso);
const FAMILY_CATEGORY = 3;

function stored(id: number, data: SavePromotionData): Promotion {
  return new Promotion({
    id,
    label: data.code,
    code: data.code,
    targetType: null,
    targetId: null,
    discountType: 'percent',
    discountValue: data.percent,
    validFrom: data.validFrom,
    validUntil: data.validUntil,
    isActive: data.isActive,
    eligibility: data.eligibility,
    createdAt: d('2026-11-01T00:00:00Z'),
    updatedAt: d('2026-11-01T00:00:00Z'),
  });
}

function makeHarness(existing: Promotion[] = []) {
  const rows = [...existing];
  const events: string[] = [];
  const session: PromotionScheduleSession = {
    findActiveCodedPromotions: jest.fn(async () => {
      events.push('findActiveCodedPromotions');
      return rows.filter((p) => p.isActive && p.code !== null);
    }),
    findByCode: jest.fn(async (code: string) => rows.find((p) => p.code === code) ?? null),
    create: jest.fn(async (data: SavePromotionData) => {
      events.push('create');
      const created = stored(100, data);
      rows.push(created);
      return created;
    }),
    update: jest.fn(async (id: number, data: SavePromotionData) => {
      events.push('update');
      return stored(id, data);
    }),
  };
  const repo = {
    findById: jest.fn(async (id: number) => rows.find((p) => p.id === id) ?? null),
    withScheduleLock: jest.fn(async (work: (s: PromotionScheduleSession) => Promise<unknown>) => {
      events.push('lock');
      const result = await work(session);
      events.push('unlock');
      return result;
    }),
  };
  const catalog = {
    // models 8/9 → Familia (3); model 1 → Amor (1)
    findModelCategories: jest.fn(async (ids: number[]) =>
      new Map(ids.filter((id) => [8, 9, 1].includes(id)).map((id) => [id, id === 1 ? 1 : FAMILY_CATEGORY] as [number, number]))),
  };
  const useCase = new SavePromotionUseCase(repo as any, catalog as any);
  return { useCase, repo, session, catalog, events };
}

function input(overrides: Partial<SavePromotionInput> = {}): SavePromotionInput {
  return {
    id: null,
    code: 'NAVIDAD15',
    percent: 15,
    validFrom: d('2026-12-01T05:00:00Z'),
    validUntil: d('2026-12-26T05:00:00Z'),
    isActive: true,
    eligibility: [{ kind: 'PERSONALIZED_BOOK', refId: 8 }],
    ...overrides,
  };
}

const existingFamily = (overrides: Partial<SavePromotionData> = {}) =>
  stored(5, {
    code: 'FAMILIA10',
    percent: 10,
    validFrom: d('2026-12-10T05:00:00Z'),
    validUntil: d('2027-01-10T05:00:00Z'),
    isActive: true,
    eligibility: [{ kind: 'PERSONALIZED_CATEGORY', refId: FAMILY_CATEGORY }],
    ...overrides,
  });

describe('SavePromotionUseCase — validation', () => {
  it('trims the code but keeps its case', async () => {
    const h = makeHarness();
    await h.useCase.execute(input({ code: '  NaviDad15 ' }));
    expect(h.session.create).toHaveBeenCalledWith(expect.objectContaining({ code: 'NaviDad15' }));
  });

  it.each(['', '   ', 'NAVI DAD', 'X'.repeat(41)])('rejects the invalid code %p', async (code) => {
    const h = makeHarness();
    await expect(h.useCase.execute(input({ code }))).rejects.toThrow(BadRequestException);
    expect(h.repo.withScheduleLock).not.toHaveBeenCalled();
  });

  it.each([0, 101, 12.5, Number.NaN])('rejects the percent %p', async (percent) => {
    const h = makeHarness();
    await expect(h.useCase.execute(input({ percent }))).rejects.toThrow(
      'El descuento debe ser un porcentaje entero entre 1 y 100',
    );
  });

  it('requires both dates with until after from', async () => {
    const h = makeHarness();
    await expect(
      h.useCase.execute(input({ validUntil: d('2026-12-01T05:00:00Z') })),
    ).rejects.toThrow('La fecha de fin debe ser posterior a la de inicio');
    await expect(h.useCase.execute(input({ validFrom: new Date('invalid') }))).rejects.toThrow(
      'Las fechas de vigencia son obligatorias',
    );
  });

  it('requires at least one eligibility target', async () => {
    const h = makeHarness();
    await expect(h.useCase.execute(input({ eligibility: [] }))).rejects.toThrow(
      'Selecciona al menos un producto o categoría',
    );
  });

  it('rejects malformed targets', async () => {
    const h = makeHarness();
    const eligibility = [{ kind: 'PERSONALIZED_BOOK', refId: null }] as EligibilityTarget[];
    await expect(h.useCase.execute(input({ eligibility }))).rejects.toThrow(BadRequestException);
  });

  it('de-duplicates repeated targets before saving', async () => {
    const h = makeHarness();
    await h.useCase.execute(
      input({ eligibility: [{ kind: 'PERSONALIZED_BOOK', refId: 8 }, { kind: 'PERSONALIZED_BOOK', refId: 8 }] }),
    );
    expect(h.session.create).toHaveBeenCalledWith(
      expect.objectContaining({ eligibility: [{ kind: 'PERSONALIZED_BOOK', refId: 8 }] }),
    );
  });

  it('404 when updating a promotion that does not exist', async () => {
    const h = makeHarness();
    await expect(h.useCase.execute(input({ id: 999 }))).rejects.toThrow(NotFoundException);
  });
});

describe('SavePromotionUseCase — schedule overlap (authoritative, inside the lock)', () => {
  it('returns 409 naming the conflicting code when a category promotion covers the book', async () => {
    const h = makeHarness([existingFamily()]);
    const error = await h.useCase.execute(input()).catch((e) => e);
    expect(error).toBeInstanceOf(ConflictException);
    expect(error.message).toContain('FAMILIA10');
    expect(error.getResponse()).toEqual(expect.objectContaining({ conflictingCodes: ['FAMILIA10'] }));
    expect(h.session.create).not.toHaveBeenCalled();
  });

  it('runs the overlap read and the write inside the same lock', async () => {
    const h = makeHarness();
    await h.useCase.execute(input());
    expect(h.events).toEqual(['lock', 'findActiveCodedPromotions', 'create', 'unlock']);
  });

  it('allows the same product when the periods do not overlap', async () => {
    const h = makeHarness([existingFamily({ validFrom: d('2026-12-26T05:00:00Z') })]);
    await expect(h.useCase.execute(input())).resolves.toBeInstanceOf(Promotion);
  });

  it('allows overlapping periods for a book in another category', async () => {
    const h = makeHarness([existingFamily()]);
    await expect(
      h.useCase.execute(input({ eligibility: [{ kind: 'PERSONALIZED_BOOK', refId: 1 }] })),
    ).resolves.toBeInstanceOf(Promotion);
  });

  it('an inactive promotion is saved without checking overlaps', async () => {
    const h = makeHarness([existingFamily()]);
    await expect(h.useCase.execute(input({ isActive: false }))).resolves.toBeInstanceOf(Promotion);
    expect(h.session.findActiveCodedPromotions).not.toHaveBeenCalled();
  });

  it('an update does not conflict with itself', async () => {
    const h = makeHarness([existingFamily()]);
    const result = await h.useCase.execute(
      input({ id: 5, code: 'FAMILIA10', eligibility: [{ kind: 'PERSONALIZED_CATEGORY', refId: FAMILY_CATEGORY }] }),
    );
    expect(result.id).toBe(5);
    expect(h.session.update).toHaveBeenCalledWith(5, expect.objectContaining({ code: 'FAMILIA10' }));
  });

  it('looks up the categories of every book involved', async () => {
    const h = makeHarness([existingFamily({ eligibility: [{ kind: 'PERSONALIZED_BOOK', refId: 9 }] })]);
    await h.useCase.execute(input({ eligibility: [{ kind: 'PERSONALIZED_CATEGORY', refId: 1 }, { kind: 'PERSONALIZED_BOOK', refId: 8 }] })).catch(() => undefined);
    expect(h.catalog.findModelCategories).toHaveBeenCalledWith([8, 9]);
  });
});

describe('SavePromotionUseCase — code uniqueness', () => {
  it('409 when another promotion already uses the exact code', async () => {
    const h = makeHarness([existingFamily({ validFrom: d('2027-03-01T00:00:00Z'), validUntil: d('2027-04-01T00:00:00Z') })]);
    await expect(h.useCase.execute(input({ code: 'FAMILIA10' }))).rejects.toThrow(
      'Ya existe una promoción con el código FAMILIA10',
    );
  });

  it('a code that differs only in case is a different code', async () => {
    const h = makeHarness([existingFamily({ validFrom: d('2027-03-01T00:00:00Z'), validUntil: d('2027-04-01T00:00:00Z') })]);
    await expect(h.useCase.execute(input({ code: 'familia10' }))).resolves.toBeInstanceOf(Promotion);
  });
});
