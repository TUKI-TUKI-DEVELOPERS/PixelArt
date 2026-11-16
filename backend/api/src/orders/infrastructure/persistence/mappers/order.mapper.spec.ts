import { OrderOrmEntity } from '../entities/order.orm-entity';
import { OrderMapper } from './order.mapper';

function entity(overrides: Partial<OrderOrmEntity> = {}): OrderOrmEntity {
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
    extraTemplatesAmountCents: '4000',
    discountAmountCents: '0',
    promotionId: null,
    promotionCode: null,
    promotionPercent: null,
    totalAmountCents: '18400',
    currency: 'PEN',
    estimatedDeliveryDate: null,
    createdAt: new Date('2026-11-01T00:00:00Z'),
    updatedAt: new Date('2026-11-01T00:00:00Z'),
    ...overrides,
  });
}

describe('OrderMapper.toRecord', () => {
  it('maps bigint strings to numbers and an order without promotion', () => {
    const record = OrderMapper.toRecord(entity());
    expect(record).toEqual(
      expect.objectContaining({
        id: 100,
        demoRequestId: 55,
        personalizedModelId: 9,
        baseAmountCents: 12900,
        rushFeeCents: 1500,
        extraTemplatesAmountCents: 4000,
        discountAmountCents: 0,
        promotionId: null,
        promotionCode: null,
        promotionPercent: null,
        totalAmountCents: 18400,
      }),
    );
  });

  it('maps the promotion snapshot', () => {
    const record = OrderMapper.toRecord(
      entity({ discountAmountCents: '2535', promotionId: '42', promotionCode: 'NAVIDAD15', promotionPercent: 15, totalAmountCents: '15865' }),
    );
    expect(record.discountAmountCents).toBe(2535);
    expect(record.promotionId).toBe(42);
    expect(record.promotionCode).toBe('NAVIDAD15');
    expect(record.promotionPercent).toBe(15);
  });

  it('keeps the code snapshot when the promotion was deleted', () => {
    const record = OrderMapper.toRecord(entity({ discountAmountCents: '100', promotionCode: 'X', promotionPercent: 10 }));
    expect(record.promotionId).toBeNull();
    expect(record.promotionCode).toBe('X');
  });
});
