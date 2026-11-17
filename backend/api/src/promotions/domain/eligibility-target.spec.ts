import {
  EligibilityTarget,
  ProductRef,
  isProductEligible,
  targetCoversProduct,
  validateEligibilityTarget,
} from './eligibility-target';

const book = (modelId: number, categoryId: number): ProductRef => ({ kind: 'PERSONALIZED_BOOK', modelId, categoryId });
const themed = (themeId: number): ProductRef => ({ kind: 'TEMPLATE_PHOTOBOOK', themeId });
const custom: ProductRef = { kind: 'CUSTOM_PHOTOBOOK' };

describe('validateEligibilityTarget', () => {
  it.each<EligibilityTarget>([
    { kind: 'PERSONALIZED_CATEGORY', refId: 1 },
    { kind: 'PERSONALIZED_BOOK', refId: 9 },
    { kind: 'PHOTOBOOK_THEME', refId: 3 },
    { kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null },
    { kind: 'CUSTOM_PHOTOBOOK', refId: null },
  ])('accepts a well-formed %o', (target) => {
    expect(validateEligibilityTarget(target)).toBe(true);
  });

  it.each<EligibilityTarget>([
    { kind: 'PERSONALIZED_CATEGORY', refId: null },
    { kind: 'PERSONALIZED_BOOK', refId: 0 },
    { kind: 'PHOTOBOOK_THEME', refId: -2 },
    { kind: 'PERSONALIZED_BOOK', refId: 1.5 },
    { kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: 4 },
    { kind: 'CUSTOM_PHOTOBOOK', refId: 1 },
    { kind: 'SOMETHING_ELSE' as EligibilityTarget['kind'], refId: null },
  ])('rejects a malformed %o', (target) => {
    expect(validateEligibilityTarget(target)).toBe(false);
  });
});

describe('targetCoversProduct', () => {
  it('a category target covers every book of that category only', () => {
    const target: EligibilityTarget = { kind: 'PERSONALIZED_CATEGORY', refId: 1 };
    expect(targetCoversProduct(target, book(10, 1))).toBe(true);
    expect(targetCoversProduct(target, book(10, 2))).toBe(false);
  });

  it('a specific book target covers that book only', () => {
    const target: EligibilityTarget = { kind: 'PERSONALIZED_BOOK', refId: 10 };
    expect(targetCoversProduct(target, book(10, 1))).toBe(true);
    expect(targetCoversProduct(target, book(11, 1))).toBe(false);
  });

  it('personalized-book targets never cover photobooks', () => {
    expect(targetCoversProduct({ kind: 'PERSONALIZED_CATEGORY', refId: 1 }, themed(1))).toBe(false);
    expect(targetCoversProduct({ kind: 'PERSONALIZED_BOOK', refId: 1 }, custom)).toBe(false);
  });

  it('"all template photobooks" covers every theme but not the custom photobook', () => {
    const target: EligibilityTarget = { kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null };
    expect(targetCoversProduct(target, themed(1))).toBe(true);
    expect(targetCoversProduct(target, themed(7))).toBe(true);
    expect(targetCoversProduct(target, custom)).toBe(false);
    expect(targetCoversProduct(target, book(1, 1))).toBe(false);
  });

  it('a theme target covers that theme only', () => {
    const target: EligibilityTarget = { kind: 'PHOTOBOOK_THEME', refId: 3 };
    expect(targetCoversProduct(target, themed(3))).toBe(true);
    expect(targetCoversProduct(target, themed(4))).toBe(false);
  });

  it('the custom photobook target covers only the custom photobook', () => {
    const target: EligibilityTarget = { kind: 'CUSTOM_PHOTOBOOK', refId: null };
    expect(targetCoversProduct(target, custom)).toBe(true);
    expect(targetCoversProduct(target, themed(3))).toBe(false);
  });
});

describe('isProductEligible', () => {
  it('is true when any target covers the product', () => {
    const targets: EligibilityTarget[] = [
      { kind: 'PHOTOBOOK_THEME', refId: 3 },
      { kind: 'PERSONALIZED_CATEGORY', refId: 2 },
    ];
    expect(isProductEligible(targets, book(20, 2))).toBe(true);
  });

  it('is false with no targets', () => {
    expect(isProductEligible([], book(20, 2))).toBe(false);
  });
});
