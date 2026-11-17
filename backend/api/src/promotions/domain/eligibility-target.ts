/**
 * What a promotion can target. One promotion may hold several targets.
 *
 * - PERSONALIZED_CATEGORY   → every personalized book of personalized_categories.id = refId
 * - PERSONALIZED_BOOK       → one personalized book, personalized_models.id = refId
 * - TEMPLATE_PHOTOBOOKS_ALL → every template photobook (any theme), refId = null
 * - PHOTOBOOK_THEME         → template photobooks of photobook_themes.id = refId
 * - CUSTOM_PHOTOBOOK        → the custom ("a medida") photobook as one whole category, refId = null
 */
export const ELIGIBILITY_KINDS = [
  'PERSONALIZED_CATEGORY',
  'PERSONALIZED_BOOK',
  'TEMPLATE_PHOTOBOOKS_ALL',
  'PHOTOBOOK_THEME',
  'CUSTOM_PHOTOBOOK',
] as const;

export type EligibilityKind = (typeof ELIGIBILITY_KINDS)[number];

export type EligibilityTarget = {
  kind: EligibilityKind;
  refId: number | null;
};

/** The concrete product being bought, resolved enough to match any target kind. */
export type ProductRef =
  | { kind: 'PERSONALIZED_BOOK'; modelId: number; categoryId: number }
  | { kind: 'TEMPLATE_PHOTOBOOK'; themeId: number }
  | { kind: 'CUSTOM_PHOTOBOOK' };

const KINDS_WITH_REF: ReadonlySet<EligibilityKind> = new Set<EligibilityKind>([
  'PERSONALIZED_CATEGORY',
  'PERSONALIZED_BOOK',
  'PHOTOBOOK_THEME',
]);

export function eligibilityKindRequiresRef(kind: EligibilityKind): boolean {
  return KINDS_WITH_REF.has(kind);
}

export function validateEligibilityTarget(target: EligibilityTarget): boolean {
  if (!(ELIGIBILITY_KINDS as readonly string[]).includes(target.kind)) return false;
  if (eligibilityKindRequiresRef(target.kind)) {
    return Number.isInteger(target.refId) && (target.refId as number) > 0;
  }
  return target.refId === null;
}

export function targetCoversProduct(target: EligibilityTarget, product: ProductRef): boolean {
  switch (target.kind) {
    case 'PERSONALIZED_CATEGORY':
      return product.kind === 'PERSONALIZED_BOOK' && product.categoryId === target.refId;
    case 'PERSONALIZED_BOOK':
      return product.kind === 'PERSONALIZED_BOOK' && product.modelId === target.refId;
    case 'TEMPLATE_PHOTOBOOKS_ALL':
      return product.kind === 'TEMPLATE_PHOTOBOOK';
    case 'PHOTOBOOK_THEME':
      return product.kind === 'TEMPLATE_PHOTOBOOK' && product.themeId === target.refId;
    case 'CUSTOM_PHOTOBOOK':
      return product.kind === 'CUSTOM_PHOTOBOOK';
    default:
      return false;
  }
}

export function isProductEligible(targets: readonly EligibilityTarget[], product: ProductRef): boolean {
  return targets.some((target) => targetCoversProduct(target, product));
}
