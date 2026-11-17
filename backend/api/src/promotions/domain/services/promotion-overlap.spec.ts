import { Promotion } from '../promotion';
import { EligibilityTarget } from '../eligibility-target';
import { findScheduleConflicts, periodsOverlap, ScheduleCandidate, targetsOverlap } from './promotion-overlap';

const d = (iso: string) => new Date(iso);
// model 8 and 9 belong to category 3; model 1 belongs to category 1
const CATEGORY_OF_MODEL = new Map<number, number>([[8, 3], [9, 3], [1, 1]]);

const cat = (id: number): EligibilityTarget => ({ kind: 'PERSONALIZED_CATEGORY', refId: id });
const book = (id: number): EligibilityTarget => ({ kind: 'PERSONALIZED_BOOK', refId: id });
const theme = (id: number): EligibilityTarget => ({ kind: 'PHOTOBOOK_THEME', refId: id });
const ALL_TEMPLATES: EligibilityTarget = { kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null };
const CUSTOM: EligibilityTarget = { kind: 'CUSTOM_PHOTOBOOK', refId: null };

function promo(id: number, code: string, eligibility: EligibilityTarget[], overrides: Partial<ConstructorParameters<typeof Promotion>[0]> = {}) {
  return new Promotion({
    id,
    label: code,
    code,
    targetType: null,
    targetId: null,
    discountType: 'percent',
    discountValue: 10,
    validFrom: d('2026-12-01T00:00:00Z'),
    validUntil: d('2026-12-31T00:00:00Z'),
    isActive: true,
    eligibility,
    createdAt: d('2026-11-01T00:00:00Z'),
    updatedAt: d('2026-11-01T00:00:00Z'),
    ...overrides,
  });
}

function candidate(eligibility: EligibilityTarget[], overrides: Partial<ScheduleCandidate> = {}): ScheduleCandidate {
  return {
    id: null,
    isActive: true,
    validFrom: d('2026-12-15T00:00:00Z'),
    validUntil: d('2027-01-15T00:00:00Z'),
    eligibility,
    ...overrides,
  };
}

describe('periodsOverlap (half-open [from, until))', () => {
  const a = { validFrom: d('2026-12-01T00:00:00Z'), validUntil: d('2026-12-10T00:00:00Z') };

  it('detects a partial overlap', () => {
    expect(periodsOverlap(a, { validFrom: d('2026-12-09T00:00:00Z'), validUntil: d('2026-12-20T00:00:00Z') })).toBe(true);
  });

  it('detects containment', () => {
    expect(periodsOverlap(a, { validFrom: d('2026-12-02T00:00:00Z'), validUntil: d('2026-12-03T00:00:00Z') })).toBe(true);
  });

  it('touching periods do not overlap', () => {
    expect(periodsOverlap(a, { validFrom: d('2026-12-10T00:00:00Z'), validUntil: d('2026-12-20T00:00:00Z') })).toBe(false);
  });

  it('disjoint periods do not overlap', () => {
    expect(periodsOverlap(a, { validFrom: d('2027-01-01T00:00:00Z'), validUntil: d('2027-01-02T00:00:00Z') })).toBe(false);
  });
});

describe('targetsOverlap', () => {
  it('same category / same book / same theme overlap', () => {
    expect(targetsOverlap(cat(3), cat(3), CATEGORY_OF_MODEL)).toBe(true);
    expect(targetsOverlap(book(8), book(8), CATEGORY_OF_MODEL)).toBe(true);
    expect(targetsOverlap(theme(2), theme(2), CATEGORY_OF_MODEL)).toBe(true);
  });

  it('different ids of the same kind do not overlap', () => {
    expect(targetsOverlap(cat(3), cat(1), CATEGORY_OF_MODEL)).toBe(false);
    expect(targetsOverlap(book(8), book(9), CATEGORY_OF_MODEL)).toBe(false);
    expect(targetsOverlap(theme(2), theme(4), CATEGORY_OF_MODEL)).toBe(false);
  });

  it('a category overlaps a specific book in that category (both directions)', () => {
    expect(targetsOverlap(cat(3), book(8), CATEGORY_OF_MODEL)).toBe(true);
    expect(targetsOverlap(book(9), cat(3), CATEGORY_OF_MODEL)).toBe(true);
    expect(targetsOverlap(cat(3), book(1), CATEGORY_OF_MODEL)).toBe(false);
  });

  it('a book with an unknown category never overlaps a category', () => {
    expect(targetsOverlap(cat(3), book(999), CATEGORY_OF_MODEL)).toBe(false);
  });

  it('"all template photobooks" overlaps itself and every theme, but not the custom photobook', () => {
    expect(targetsOverlap(ALL_TEMPLATES, ALL_TEMPLATES, CATEGORY_OF_MODEL)).toBe(true);
    expect(targetsOverlap(ALL_TEMPLATES, theme(5), CATEGORY_OF_MODEL)).toBe(true);
    expect(targetsOverlap(theme(5), ALL_TEMPLATES, CATEGORY_OF_MODEL)).toBe(true);
    expect(targetsOverlap(ALL_TEMPLATES, CUSTOM, CATEGORY_OF_MODEL)).toBe(false);
  });

  it('the custom photobook overlaps only itself', () => {
    expect(targetsOverlap(CUSTOM, CUSTOM, CATEGORY_OF_MODEL)).toBe(true);
    expect(targetsOverlap(CUSTOM, cat(3), CATEGORY_OF_MODEL)).toBe(false);
  });

  it('personalized books never overlap photobooks', () => {
    expect(targetsOverlap(cat(3), theme(3), CATEGORY_OF_MODEL)).toBe(false);
    expect(targetsOverlap(book(3), ALL_TEMPLATES, CATEGORY_OF_MODEL)).toBe(false);
  });
});

describe('findScheduleConflicts', () => {
  it('returns active promotions whose period and targets overlap', () => {
    const existing = [promo(1, 'FAMILIA10', [cat(3)]), promo(2, 'AMOR10', [cat(1)])];
    const conflicts = findScheduleConflicts(candidate([book(8)]), existing, CATEGORY_OF_MODEL);
    expect(conflicts.map((p) => p.code)).toEqual(['FAMILIA10']);
  });

  it('ignores inactive promotions', () => {
    const existing = [promo(1, 'FAMILIA10', [cat(3)], { isActive: false })];
    expect(findScheduleConflicts(candidate([book(8)]), existing, CATEGORY_OF_MODEL)).toEqual([]);
  });

  it('ignores promotions whose period does not overlap', () => {
    const existing = [promo(1, 'FAMILIA10', [cat(3)], { validUntil: d('2026-12-15T00:00:00Z') })];
    expect(findScheduleConflicts(candidate([book(8)]), existing, CATEGORY_OF_MODEL)).toEqual([]);
  });

  it('ignores the promotion being updated', () => {
    const existing = [promo(1, 'FAMILIA10', [cat(3)])];
    expect(findScheduleConflicts(candidate([book(8)], { id: 1 }), existing, CATEGORY_OF_MODEL)).toEqual([]);
  });

  it('an inactive candidate never conflicts', () => {
    const existing = [promo(1, 'FAMILIA10', [cat(3)])];
    expect(findScheduleConflicts(candidate([cat(3)], { isActive: false }), existing, CATEGORY_OF_MODEL)).toEqual([]);
  });

  it('checks every target of a multi-target promotion', () => {
    const existing = [promo(1, 'TEMAS', [theme(4)]), promo(2, 'MEDIDA', [CUSTOM])];
    const conflicts = findScheduleConflicts(candidate([cat(1), ALL_TEMPLATES]), existing, CATEGORY_OF_MODEL);
    expect(conflicts.map((p) => p.code)).toEqual(['TEMAS']);
  });

  it('ignores legacy promotions without eligibility targets', () => {
    const legacy = promo(1, '', [], { code: null, targetType: 'all' });
    expect(findScheduleConflicts(candidate([cat(3)]), [legacy], CATEGORY_OF_MODEL)).toEqual([]);
  });
});
