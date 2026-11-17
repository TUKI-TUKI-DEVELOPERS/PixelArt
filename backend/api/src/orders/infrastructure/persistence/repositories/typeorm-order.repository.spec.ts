import { OrderOrmEntity } from '../entities/order.orm-entity';
import { TypeOrmOrderRepository } from './typeorm-order.repository';

function storedEntity(overrides: Partial<OrderOrmEntity> = {}): OrderOrmEntity {
  return Object.assign(new OrderOrmEntity(), {
    id: '100',
    channel: 'CUSTOM_BOOK',
    status: 'AWAITING_PAYMENT_PROOF',
    publicToken: 'uuid-1',
    demoRequestId: '55',
    catalogBookVariantId: null,
    personalizedModelId: '9',
    photobookProjectId: null,
    customerFullName: 'Cliente',
    customerEmail: 'c@example.com',
    customerPhone: '999',
    baseAmountCents: '12900',
    rushFeeCents: '1500',
    extraTemplatesAmountCents: '0',
    discountAmountCents: '0',
    promotionId: null,
    promotionCode: null,
    promotionPercent: null,
    totalAmountCents: '14400',
    currency: 'PEN',
    estimatedDeliveryDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });
}

function makeRepo(stored: OrderOrmEntity = storedEntity()) {
  const query = jest.fn();
  const repo = {
    create: jest.fn((data) => data),
    save: jest.fn(async (data) => ({ ...data, id: '100' })),
    findOneByOrFail: jest.fn(async () => stored),
    findOne: jest.fn(async () => null),
    update: jest.fn(),
    manager: { query },
  };
  const eventRepo = { create: jest.fn((d) => d), save: jest.fn() };
  return { repository: new TypeOrmOrderRepository(repo as any, eventRepo as any), repo, query };
}

describe('TypeOrmOrderRepository — amount writers keep chk_total_amount', () => {
  it('create() starts with no discount and total = base + rush + extra', async () => {
    const { repository, repo } = makeRepo();
    await repository.create({
      channel: 'CUSTOM_BOOK',
      customerFullName: 'C',
      customerEmail: 'c@x.com',
      customerPhone: '9',
      baseAmountCents: 12900,
      rushFeeCents: 1500,
      extraTemplatesAmountCents: 4000,
    });
    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({ discountAmountCents: '0', totalAmountCents: '18400' }),
    );
  });

  it('updateExtraTemplates() subtracts the stored discount', async () => {
    const { repository, repo } = makeRepo(
      storedEntity({ discountAmountCents: '1935', promotionCode: 'NAVIDAD15', promotionPercent: 15 }),
    );
    await repository.updateExtraTemplates(100, 4000);
    expect(repo.update).toHaveBeenCalledWith('100', {
      extraTemplatesAmountCents: '4000',
      totalAmountCents: String(12900 + 1500 + 4000 - 1935),
    });
  });

  it('activatePhotobookOrder() resets the promotion snapshot with the amounts', async () => {
    const { repository, repo } = makeRepo(storedEntity({ channel: 'PHOTOBOOK', status: 'CONFIGURING_PHOTOBOOK' }));
    repo.findOne.mockResolvedValueOnce(storedEntity({ channel: 'PHOTOBOOK', status: 'CONFIGURING_PHOTOBOOK' }));
    await repository.activatePhotobookOrder({
      photobookProjectId: 7,
      customerFullName: 'C',
      customerEmail: 'c@x.com',
      customerPhone: '9',
      baseAmountCents: 25000,
    });
    expect(repo.update).toHaveBeenCalledWith(
      '100',
      expect.objectContaining({
        baseAmountCents: '25000',
        discountAmountCents: '0',
        promotionId: null,
        promotionCode: null,
        promotionPercent: null,
        totalAmountCents: '25000',
      }),
    );
  });

  it('activatePhotobookOrder() stores a promotion snapshot and subtracts the discount', async () => {
    const { repository, repo } = makeRepo(storedEntity({ channel: 'PHOTOBOOK', status: 'CONFIGURING_PHOTOBOOK' }));
    repo.findOne.mockResolvedValueOnce(storedEntity({ channel: 'PHOTOBOOK', status: 'CONFIGURING_PHOTOBOOK' }));
    await repository.activatePhotobookOrder({
      photobookProjectId: 7,
      customerFullName: 'C',
      customerEmail: 'c@x.com',
      customerPhone: '9',
      baseAmountCents: 25000,
      promotion: { promotionId: 3, code: 'Medida10', percent: 10, discountCents: 900 },
    });
    expect(repo.update).toHaveBeenCalledWith(
      '100',
      expect.objectContaining({
        baseAmountCents: '25000',
        discountAmountCents: '900',
        promotionId: '3',
        promotionCode: 'Medida10',
        promotionPercent: 10,
        totalAmountCents: '24100',
      }),
    );
  });

  it('activatePhotobookOrder() creates a new order with the promotion snapshot', async () => {
    const { repository, repo } = makeRepo();
    await repository.activatePhotobookOrder({
      photobookProjectId: 8,
      customerFullName: 'C',
      customerEmail: 'c@x.com',
      customerPhone: '9',
      baseAmountCents: 14900,
      promotion: { promotionId: null, code: 'Foto10', percent: 10, discountCents: 1240 },
    });
    expect(repo.create).toHaveBeenCalledWith(expect.objectContaining({
      baseAmountCents: '14900',
      discountAmountCents: '1240',
      promotionId: null,
      promotionCode: 'Foto10',
      promotionPercent: 10,
      totalAmountCents: '13660',
    }));
  });
});

describe('TypeOrmOrderRepository.applyCheckoutPricing', () => {
  it('writes extra, discount, snapshot and total in one guarded UPDATE', async () => {
    const { repository, query } = makeRepo();
    query.mockResolvedValueOnce([[{ id: '100' }], 1]);
    const applied = await repository.applyCheckoutPricing(100, {
      extraTemplatesAmountCents: 4000,
      promotion: { promotionId: 42, code: 'NAVIDAD15', percent: 15, discountCents: 2535 },
    });
    expect(applied).toBe(true);
    expect(query).toHaveBeenCalledTimes(1);
    const [sql, params] = query.mock.calls[0];
    expect(sql).toMatch(/UPDATE orders/);
    expect(sql).toMatch(/total_amount_cents = base_amount_cents \+ rush_fee_cents \+ \$2::bigint - \$3::bigint/);
    expect(sql).toMatch(/promotion_code IS NULL OR promotion_code = \$5/);
    expect(params).toEqual([100, 4000, 2535, 42, 'NAVIDAD15', 15]);
  });

  it('clears the discount when no promotion is given', async () => {
    const { repository, query } = makeRepo();
    query.mockResolvedValueOnce([[{ id: '100' }], 1]);
    await repository.applyCheckoutPricing(100, { extraTemplatesAmountCents: 0, promotion: null });
    expect(query.mock.calls[0][1]).toEqual([100, 0, 0, null, null, null]);
  });

  it('returns false when the order already holds a different code (no row updated)', async () => {
    const { repository, query } = makeRepo();
    query.mockResolvedValueOnce([[], 0]);
    await expect(
      repository.applyCheckoutPricing(100, {
        extraTemplatesAmountCents: 0,
        promotion: { promotionId: 1, code: 'OTRO', percent: 10, discountCents: 1290 },
      }),
    ).resolves.toBe(false);
  });
});
