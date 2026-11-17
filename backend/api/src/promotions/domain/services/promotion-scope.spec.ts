import { describePromotionScope, promotionAudience } from './promotion-scope';

describe('describePromotionScope', () => {
  it.each([
    [[{ kind: 'PERSONALIZED_CATEGORY', refId: 1 }], 'en libros personalizados seleccionados'],
    [[{ kind: 'PERSONALIZED_BOOK', refId: 4 }, { kind: 'PERSONALIZED_CATEGORY', refId: 1 }], 'en libros personalizados seleccionados'],
    [[{ kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null }], 'en photobooks de plantilla'],
    [[{ kind: 'PHOTOBOOK_THEME', refId: 2 }], 'en photobooks seleccionados'],
    [[{ kind: 'CUSTOM_PHOTOBOOK', refId: null }], 'en photobooks a medida'],
    [[{ kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null }, { kind: 'CUSTOM_PHOTOBOOK', refId: null }], 'en photobooks'],
    [[{ kind: 'PHOTOBOOK_THEME', refId: 2 }, { kind: 'CUSTOM_PHOTOBOOK', refId: null }], 'en photobooks seleccionados'],
    [[{ kind: 'PERSONALIZED_BOOK', refId: 4 }, { kind: 'CUSTOM_PHOTOBOOK', refId: null }], 'en productos seleccionados'],
  ] as const)('describes %j as "%s"', (targets, expected) => {
    expect(describePromotionScope(targets as any)).toBe(expected);
  });

  it('returns null without targets', () => {
    expect(describePromotionScope([])).toBeNull();
  });

  it('tells which part of the site a promotion is for', () => {
    expect(promotionAudience([{ kind: 'PERSONALIZED_BOOK', refId: 1 }])).toBe('personalized');
    expect(promotionAudience([{ kind: 'CUSTOM_PHOTOBOOK', refId: null }, { kind: 'PHOTOBOOK_THEME', refId: 2 }])).toBe('photobook');
    expect(promotionAudience([{ kind: 'PERSONALIZED_BOOK', refId: 1 }, { kind: 'CUSTOM_PHOTOBOOK', refId: null }])).toBe('mixed');
  });
});
