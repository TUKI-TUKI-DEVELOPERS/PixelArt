import { describe, it, expect, vi } from 'vitest';

// PhotobookEditorClient pulls browser-heavy dependencies at module level.
// They are irrelevant for the module-level pure pricing function under test,
// so they are replaced with inert stubs before the module is imported.
vi.mock('next/navigation', () => ({
  usePathname: () => '/photobooks/viaje/editor',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock('interactjs', () => ({ default: vi.fn() }));
vi.mock('@/components/PhotobookPreview', () => ({ default: () => null }));
vi.mock('@/components/PhotobookSpreadEditor', () => ({ default: () => null }));

import { getPriceCents, RUSH_FEE_CENTS } from './PhotobookEditorClient';

// Expected centavos values below MIRROR the backend source of truth:
// backend/api/src/photobook/domain/services/photobook-pricing.service.ts
//   BASE_CENTS:           TAPA_DELGADA 9000, TAPA_GRUESA 12000
//   EXTRA_PER_HOJA_CENTS: TAPA_DELGADA  300, TAPA_GRUESA   400
//   MIN_HOJAS: 15, RUSH_FEE_CENTS: 2500
// If the frontend and backend ever diverge, these hardcoded values must fail.
describe('getPriceCents (mirrors backend PhotobookPricingService)', () => {
  it('returns null below the 15-hoja minimum (frontend treats it as not purchasable)', () => {
    expect(getPriceCents('TAPA_DELGADA', 14)).toBeNull();
    expect(getPriceCents('TAPA_GRUESA', 14)).toBeNull();
    expect(getPriceCents('TAPA_DELGADA', 1)).toBeNull();
    expect(getPriceCents('TAPA_DELGADA', 0)).toBeNull();
  });

  it('charges the backend base price at exactly 15 hojas', () => {
    expect(getPriceCents('TAPA_DELGADA', 15)).toBe(9000); // S/ 90
    expect(getPriceCents('TAPA_GRUESA', 15)).toBe(12000); // S/ 120
  });

  it('adds the backend per-extra-hoja increment above 15 hojas', () => {
    expect(getPriceCents('TAPA_DELGADA', 16)).toBe(9300); // 9000 + 1 * 300
    expect(getPriceCents('TAPA_GRUESA', 16)).toBe(12400); // 12000 + 1 * 400
    expect(getPriceCents('TAPA_DELGADA', 25)).toBe(12000); // 9000 + 10 * 300
    expect(getPriceCents('TAPA_GRUESA', 25)).toBe(16000); // 12000 + 10 * 400
    expect(getPriceCents('TAPA_DELGADA', 50)).toBe(19500); // 9000 + 35 * 300
    expect(getPriceCents('TAPA_GRUESA', 50)).toBe(26000); // 12000 + 35 * 400
  });

  it('matches the backend at the 60-hoja editor maximum', () => {
    expect(getPriceCents('TAPA_DELGADA', 60)).toBe(22500); // 9000 + 45 * 300
    expect(getPriceCents('TAPA_GRUESA', 60)).toBe(30000); // 12000 + 45 * 400
  });
});

describe('RUSH_FEE_CENTS (mirrors backend PhotobookPricingService)', () => {
  it('is 2500 centavos (S/ 25), same as backend RUSH_FEE_CENTS', () => {
    expect(RUSH_FEE_CENTS).toBe(2500);
  });
});
