import type { EligibilityTarget } from '@/lib/api/promotions';

export type PersonalizedCategory = {
  id: number;
  name: string;
  models: { id: number; name: string }[];
};

const isPersonalized = (t: EligibilityTarget) => t.kind === 'PERSONALIZED_CATEGORY' || t.kind === 'PERSONALIZED_BOOK';

/** Targets for the selected categories/books, keeping any other targets untouched. */
export function buildPersonalizedEligibility(
  categoryIds: number[],
  modelIds: number[],
  others: EligibilityTarget[] = [],
): EligibilityTarget[] {
  return [
    ...categoryIds.map((refId) => ({ kind: 'PERSONALIZED_CATEGORY' as const, refId })),
    ...modelIds.map((refId) => ({ kind: 'PERSONALIZED_BOOK' as const, refId })),
    ...others.filter((t) => !isPersonalized(t)),
  ];
}

export function splitEligibility(targets: EligibilityTarget[]) {
  return {
    categoryIds: targets.filter((t) => t.kind === 'PERSONALIZED_CATEGORY').map((t) => t.refId as number),
    modelIds: targets.filter((t) => t.kind === 'PERSONALIZED_BOOK').map((t) => t.refId as number),
    others: targets.filter((t) => !isPersonalized(t)),
  };
}

export type PhotobookTheme = { id: number; name: string };

/** What the admin form edits for photobooks. */
export type PhotobookSelection = {
  /** Every template photobook; individual themes are then redundant. */
  templateAll: boolean;
  themeIds: number[];
  custom: boolean;
};

export function buildPhotobookEligibility(selection: PhotobookSelection): EligibilityTarget[] {
  return [
    ...(selection.templateAll
      ? [{ kind: 'TEMPLATE_PHOTOBOOKS_ALL' as const, refId: null }]
      : selection.themeIds.map((refId) => ({ kind: 'PHOTOBOOK_THEME' as const, refId }))),
    ...(selection.custom ? [{ kind: 'CUSTOM_PHOTOBOOK' as const, refId: null }] : []),
  ];
}

export function splitPhotobookEligibility(targets: EligibilityTarget[]): PhotobookSelection {
  return {
    templateAll: targets.some((t) => t.kind === 'TEMPLATE_PHOTOBOOKS_ALL'),
    themeIds: targets.filter((t) => t.kind === 'PHOTOBOOK_THEME').map((t) => t.refId as number),
    custom: targets.some((t) => t.kind === 'CUSTOM_PHOTOBOOK'),
  };
}

export function describeEligibility(
  targets: EligibilityTarget[],
  categories: PersonalizedCategory[],
  themes: PhotobookTheme[] = [],
): string {
  if (!targets.length) return '—';
  const models = categories.flatMap((c) => c.models);
  return targets
    .map((t) => {
      switch (t.kind) {
        case 'PERSONALIZED_CATEGORY': {
          const name = categories.find((c) => c.id === t.refId)?.name ?? `Categoría #${t.refId}`;
          return `${name} (toda la categoría)`;
        }
        case 'PERSONALIZED_BOOK':
          return models.find((m) => m.id === t.refId)?.name ?? `Libro #${t.refId}`;
        case 'TEMPLATE_PHOTOBOOKS_ALL':
          return 'Photobooks de plantilla (todos)';
        case 'PHOTOBOOK_THEME': {
          const name = themes.find((theme) => theme.id === t.refId)?.name;
          return name ? `Photobook ${name}` : `Photobook tema #${t.refId}`;
        }
        case 'CUSTOM_PHOTOBOOK':
          return 'Photobook a medida';
        default:
          return '';
      }
    })
    .join(', ');
}
