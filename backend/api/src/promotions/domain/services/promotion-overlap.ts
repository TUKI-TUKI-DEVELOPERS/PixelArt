import { Promotion } from '../promotion';
import { EligibilityTarget } from '../eligibility-target';

export type ValidityPeriod = { validFrom: Date; validUntil: Date };

/** A promotion about to be created (id null) or updated. */
export type ScheduleCandidate = ValidityPeriod & {
  id: number | null;
  isActive: boolean;
  eligibility: EligibilityTarget[];
};

/** personalized_models.id → personalized_categories.id */
export type ModelCategoryLookup = ReadonlyMap<number, number>;

/** Periods are half-open [from, until): touching periods do not overlap. */
export function periodsOverlap(a: ValidityPeriod, b: ValidityPeriod): boolean {
  return a.validFrom.getTime() < b.validUntil.getTime() && b.validFrom.getTime() < a.validUntil.getTime();
}

function categoryCoversBook(categoryId: number | null, modelId: number | null, categoryOf: ModelCategoryLookup) {
  if (categoryId === null || modelId === null) return false;
  const modelCategory = categoryOf.get(modelId);
  return modelCategory !== undefined && modelCategory === categoryId;
}

/** True when at least one concrete product is covered by both targets. */
export function targetsOverlap(a: EligibilityTarget, b: EligibilityTarget, categoryOf: ModelCategoryLookup): boolean {
  if (a.kind === b.kind) return a.refId === b.refId;

  const pair = new Set([a.kind, b.kind]);
  if (pair.has('PERSONALIZED_CATEGORY') && pair.has('PERSONALIZED_BOOK')) {
    const category = a.kind === 'PERSONALIZED_CATEGORY' ? a : b;
    const book = a.kind === 'PERSONALIZED_BOOK' ? a : b;
    return categoryCoversBook(category.refId, book.refId, categoryOf);
  }
  if (pair.has('TEMPLATE_PHOTOBOOKS_ALL') && pair.has('PHOTOBOOK_THEME')) return true;
  return false;
}

/**
 * Active promotions that would cover the same product during an overlapping
 * period as `candidate`. Promotions without eligibility targets (legacy
 * automatic display promotions) never conflict.
 */
export function findScheduleConflicts(
  candidate: ScheduleCandidate,
  existing: readonly Promotion[],
  categoryOf: ModelCategoryLookup,
): Promotion[] {
  if (!candidate.isActive) return [];
  return existing.filter(
    (other) =>
      other.id !== candidate.id &&
      other.isActive &&
      periodsOverlap(candidate, other) &&
      candidate.eligibility.some((mine) => other.eligibility.some((theirs) => targetsOverlap(mine, theirs, categoryOf))),
  );
}
