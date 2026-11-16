import { EligibilityKind, EligibilityTarget } from '../eligibility-target';

const PERSONALIZED: ReadonlySet<EligibilityKind> = new Set<EligibilityKind>(['PERSONALIZED_CATEGORY', 'PERSONALIZED_BOOK']);

export type PromotionAudience = 'personalized' | 'photobook' | 'mixed';

/** Which part of the site a promotion is for (drives links on the public site). */
export function promotionAudience(targets: readonly EligibilityTarget[]): PromotionAudience {
  const personalized = targets.some((t) => PERSONALIZED.has(t.kind));
  const photobook = targets.some((t) => !PERSONALIZED.has(t.kind));
  if (personalized && photobook) return 'mixed';
  return photobook ? 'photobook' : 'personalized';
}

/**
 * Short customer-facing scope for the promo banner (neutral Spanish), e.g.
 * "en photobooks". Personalized targets are always specific books or
 * categories, so they are described as "seleccionados".
 */
export function describePromotionScope(targets: readonly EligibilityTarget[]): string | null {
  if (targets.length === 0) return null;
  const kinds = new Set(targets.map((t) => t.kind));
  const personalized = [...kinds].some((k) => PERSONALIZED.has(k));
  const photobook = [...kinds].some((k) => !PERSONALIZED.has(k));

  if (personalized && photobook) return 'en productos seleccionados';
  if (personalized) return 'en libros personalizados seleccionados';

  const allTemplates = kinds.has('TEMPLATE_PHOTOBOOKS_ALL');
  const custom = kinds.has('CUSTOM_PHOTOBOOK');
  const themes = kinds.has('PHOTOBOOK_THEME');
  if (allTemplates && custom) return 'en photobooks';
  if (allTemplates && !custom) return 'en photobooks de plantilla';
  if (custom && !themes) return 'en photobooks a medida';
  return 'en photobooks seleccionados';
}
