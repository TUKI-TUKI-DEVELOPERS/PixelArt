import {
  checkoutTotalCents,
  discountableBaseCents,
  EXTRA_TEMPLATES_PRICE_CENTS,
  extraTemplatesAmountFor,
} from './checkout-pricing';

describe('checkout pricing', () => {
  it('charges the premium package only for PREMIUM', () => {
    expect(EXTRA_TEMPLATES_PRICE_CENTS).toBe(4000);
    expect(extraTemplatesAmountFor('PREMIUM')).toBe(4000);
    expect(extraTemplatesAmountFor('STANDARD')).toBe(0);
  });

  it('discounts the product price only: base + premium package, never the rush fee', () => {
    expect(discountableBaseCents({ baseAmountCents: 12900, extraTemplatesAmountCents: 4000 })).toBe(16900);
  });

  it('total = base + rush + extra - discount', () => {
    expect(
      checkoutTotalCents({ baseAmountCents: 12900, rushFeeCents: 1500, extraTemplatesAmountCents: 4000, discountCents: 2535 }),
    ).toBe(15865);
  });
});
