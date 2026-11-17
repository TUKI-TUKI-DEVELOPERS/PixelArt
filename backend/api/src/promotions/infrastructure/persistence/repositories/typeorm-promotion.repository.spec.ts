import { BadRequestException, ConflictException } from '@nestjs/common';
import { TypeOrmPromotionRepository } from './typeorm-promotion.repository';

const DATA = {
  code: 'NAVIDAD15',
  percent: 15,
  validFrom: new Date('2026-12-01T05:00:00Z'),
  validUntil: new Date('2026-12-26T05:00:00Z'),
  isActive: true,
  eligibility: [
    { kind: 'PERSONALIZED_CATEGORY' as const, refId: 3 },
    { kind: 'CUSTOM_PHOTOBOOK' as const, refId: null },
  ],
};

function makeHarness() {
  const calls: string[] = [];
  const txQuery = jest.fn(async (sql: string, _params?: unknown[]) => {
    calls.push(sql.trim().split(/\s+/).slice(0, 3).join(' '));
    return [];
  });
  const txEntityRepo = {
    create: jest.fn((d) => d),
    save: jest.fn(async (d) => ({ ...d, id: '7', createdAt: new Date(), updatedAt: new Date() })),
    findOne: jest.fn(async () => null),
    find: jest.fn(async () => []),
  };
  const txManager = { query: txQuery, getRepository: jest.fn(() => txEntityRepo) };
  const qb: Record<string, jest.Mock> = {};
  for (const method of ['where', 'andWhere', 'orderBy']) qb[method] = jest.fn(() => qb);
  qb.getMany = jest.fn(async () => []);
  const repo = {
    createQueryBuilder: jest.fn(() => qb),
    manager: {
      query: jest.fn(async () => []),
      transaction: jest.fn(async (work: (m: unknown) => Promise<unknown>) => {
        calls.push('BEGIN');
        const result = await work(txManager);
        calls.push('COMMIT');
        return result;
      }),
    },
  };
  return { repository: new TypeOrmPromotionRepository(repo as any), repo, qb, txQuery, txEntityRepo, calls };
}

describe('TypeOrmPromotionRepository.findValidCodedPromotions', () => {
  it('returns only active coded promotions inside [valid_from, valid_until)', async () => {
    const h = makeHarness();
    const now = new Date('2026-12-10T00:00:00Z');
    await h.repository.findValidCodedPromotions(now);
    expect(h.qb.where).toHaveBeenCalledWith('p.is_active = TRUE');
    expect(h.qb.andWhere).toHaveBeenCalledWith('p.code IS NOT NULL');
    expect(h.qb.andWhere).toHaveBeenCalledWith('p.valid_from <= :now', { now });
    expect(h.qb.andWhere).toHaveBeenCalledWith('p.valid_until > :now', { now });
  });
});

describe('TypeOrmPromotionRepository.withScheduleLock', () => {
  it('takes the advisory lock first, inside the transaction', async () => {
    const h = makeHarness();
    await h.repository.withScheduleLock(async (session) => session.findActiveCodedPromotions());
    expect(h.calls[0]).toBe('BEGIN');
    expect(h.calls[1]).toBe('SELECT pg_advisory_xact_lock(hashtext(\'promotions:schedule\'))');
    expect(h.calls[h.calls.length - 1]).toBe('COMMIT');
  });

  it('creates the promotion and its eligibility rows on the transactional manager', async () => {
    const h = makeHarness();
    const created = await h.repository.withScheduleLock((session) => session.create(DATA));

    expect(h.txEntityRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'NAVIDAD15',
        code: 'NAVIDAD15',
        targetType: null,
        targetId: null,
        discountType: 'percent',
        discountValue: '15',
        isActive: true,
      }),
    );
    const insert = h.txQuery.mock.calls.find(([sql]) => sql.includes('INSERT INTO promotion_eligibility_targets'));
    expect(insert[1]).toEqual(['7', 'PERSONALIZED_CATEGORY', 3, null, null, 'CUSTOM_PHOTOBOOK', null, null, null]);
    expect(created.code).toBe('NAVIDAD15');
    expect(created.eligibility).toEqual(DATA.eligibility);
  });

  it('maps a unique-code violation to 409 and a missing product to 400', async () => {
    const h = makeHarness();
    h.txEntityRepo.save.mockRejectedValueOnce(Object.assign(new Error('dup'), { code: '23505' }));
    await expect(h.repository.withScheduleLock((s) => s.create(DATA))).rejects.toThrow(ConflictException);

    h.txQuery.mockImplementation(async (sql: string, _params?: unknown[]) => {
      if (sql.includes('INSERT INTO promotion_eligibility_targets')) {
        throw Object.assign(new Error('fk'), { code: '23503' });
      }
      return [];
    });
    await expect(h.repository.withScheduleLock((s) => s.create(DATA))).rejects.toThrow(BadRequestException);
  });
});
