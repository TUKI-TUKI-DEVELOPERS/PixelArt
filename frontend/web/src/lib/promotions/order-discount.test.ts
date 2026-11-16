import { describe, expect, it } from 'vitest';
import { orderDiscountLabel } from './order-discount';

describe('orderDiscountLabel', () => {
  it('describes the promotion snapshot of an order', () => {
    expect(orderDiscountLabel({ discountAmountCents: 1240, promotionCode: 'Foto10', promotionPercent: 10 }))
      .toBe('Descuento (Foto10, 10%) −S/ 12.40');
  });

  it('is null without a discount', () => {
    expect(orderDiscountLabel({ discountAmountCents: 0, promotionCode: null, promotionPercent: null })).toBeNull();
    expect(orderDiscountLabel({})).toBeNull();
  });
});
