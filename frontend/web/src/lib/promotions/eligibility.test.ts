import { describe, expect, it } from 'vitest';
import {
  buildPersonalizedEligibility,
  buildPhotobookEligibility,
  describeEligibility,
  splitEligibility,
  splitPhotobookEligibility,
  type PersonalizedCategory,
} from './eligibility';

const categories: PersonalizedCategory[] = [
  { id: 1, name: 'Libros de Amor', models: [{ id: 2, name: 'Mi Amor' }, { id: 3, name: '1025 Días' }] },
  { id: 3, name: 'Libros de Familia', models: [{ id: 13, name: 'Mi Familia' }] },
];

describe('buildPersonalizedEligibility', () => {
  it('emits one target per selected category and per selected book', () => {
    expect(buildPersonalizedEligibility([3], [2])).toEqual([
      { kind: 'PERSONALIZED_CATEGORY', refId: 3 },
      { kind: 'PERSONALIZED_BOOK', refId: 2 },
    ]);
  });

  it('keeps preserved non-personalized targets (photobooks, slice B)', () => {
    expect(buildPersonalizedEligibility([], [2], [{ kind: 'CUSTOM_PHOTOBOOK', refId: null }])).toEqual([
      { kind: 'PERSONALIZED_BOOK', refId: 2 },
      { kind: 'CUSTOM_PHOTOBOOK', refId: null },
    ]);
  });
});

describe('splitEligibility', () => {
  it('separates categories, books and other targets for editing', () => {
    expect(
      splitEligibility([
        { kind: 'PERSONALIZED_CATEGORY', refId: 1 },
        { kind: 'PERSONALIZED_BOOK', refId: 13 },
        { kind: 'PHOTOBOOK_THEME', refId: 4 },
      ]),
    ).toEqual({ categoryIds: [1], modelIds: [13], others: [{ kind: 'PHOTOBOOK_THEME', refId: 4 }] });
  });
});

describe('describeEligibility', () => {
  it('names categories, books and photobook targets in Spanish', () => {
    expect(
      describeEligibility(
        [
          { kind: 'PERSONALIZED_CATEGORY', refId: 3 },
          { kind: 'PERSONALIZED_BOOK', refId: 2 },
          { kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null },
          { kind: 'PHOTOBOOK_THEME', refId: 4 },
          { kind: 'CUSTOM_PHOTOBOOK', refId: null },
        ],
        categories,
      ),
    ).toBe('Libros de Familia (toda la categoría), Mi Amor, Photobooks de plantilla (todos), Photobook tema #4, Photobook a medida');
  });

  it('names photobook themes when they are known', () => {
    expect(describeEligibility([{ kind: 'PHOTOBOOK_THEME', refId: 4 }], categories, [{ id: 4, name: 'Viajes' }])).toBe('Photobook Viajes');
  });

  it('falls back to ids for unknown entries and a dash when empty', () => {
    expect(describeEligibility([{ kind: 'PERSONALIZED_BOOK', refId: 99 }], categories)).toBe('Libro #99');
    expect(describeEligibility([], categories)).toBe('—');
  });
});

describe('photobook eligibility', () => {
  it('builds theme and custom targets', () => {
    expect(buildPhotobookEligibility({ templateAll: false, themeIds: [4, 5], custom: true })).toEqual([
      { kind: 'PHOTOBOOK_THEME', refId: 4 },
      { kind: 'PHOTOBOOK_THEME', refId: 5 },
      { kind: 'CUSTOM_PHOTOBOOK', refId: null },
    ]);
  });

  it('"all template photobooks" replaces individual themes', () => {
    expect(buildPhotobookEligibility({ templateAll: true, themeIds: [4], custom: false })).toEqual([
      { kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null },
    ]);
  });

  it('splits stored targets back into the form selection', () => {
    expect(splitPhotobookEligibility([
      { kind: 'PERSONALIZED_BOOK', refId: 2 },
      { kind: 'PHOTOBOOK_THEME', refId: 4 },
      { kind: 'CUSTOM_PHOTOBOOK', refId: null },
    ])).toEqual({ templateAll: false, themeIds: [4], custom: true });
  });
});
