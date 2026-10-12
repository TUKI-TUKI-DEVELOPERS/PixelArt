import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));
// next/image is irrelevant here (tests render with coverPreviewUrl: null).
vi.mock('next/image', () => ({ default: () => null }));

import PhotobookConfigurarClient, {
  EXAMPLES_DELGADA,
  EXAMPLES_GRUESA,
} from './PhotobookConfigurarClient';

// Pricing constants that MIRROR the backend source of truth:
// backend/api/src/photobook/domain/services/photobook-pricing.service.ts
//   BASE_CENTS:           TAPA_DELGADA 9000, TAPA_GRUESA 12000
//   EXTRA_PER_HOJA_CENTS: TAPA_DELGADA  300, TAPA_GRUESA   400
//   MIN_HOJAS: 15
// If the backend pricing ever changes, these tests must fail.
const MIN_HOJAS = 15;
const DELGADA_BASE_CENTS = 9000;
const DELGADA_EXTRA_CENTS = 300;
const GRUESA_BASE_CENTS = 12000;
const GRUESA_EXTRA_CENTS = 400;

function expectedPriceLabel(baseCents: number, extraCents: number, hojas: number): string {
  // The page displays whole soles without decimals, e.g. "S/ 105".
  return `S/ ${(baseCents + (hojas - MIN_HOJAS) * extraCents) / 100}`;
}

describe('pricing example tables (mirror backend PhotobookPricingService)', () => {
  it('every EXAMPLES_DELGADA row matches the backend formula', () => {
    expect(EXAMPLES_DELGADA.length).toBeGreaterThan(0);
    for (const ex of EXAMPLES_DELGADA) {
      expect(ex.price).toBe(expectedPriceLabel(DELGADA_BASE_CENTS, DELGADA_EXTRA_CENTS, ex.hojas));
    }
  });

  it('every EXAMPLES_GRUESA row except the 50-hoja one matches the backend formula', () => {
    expect(EXAMPLES_GRUESA.length).toBeGreaterThan(0);
    for (const ex of EXAMPLES_GRUESA.filter((e) => e.hojas !== 50)) {
      expect(ex.price).toBe(expectedPriceLabel(GRUESA_BASE_CENTS, GRUESA_EXTRA_CENTS, ex.hojas));
    }
  });

  it('KNOWN DIVERGENCE: the 50-hoja Gruesa example shows S/ 240 but the formula gives S/ 260', () => {
    // Characterization of current behavior. The backend
    // (12000 + 35 * 400 = 26000 centavos -> S/ 260) and this page's own
    // calcPrice both charge S/ 260 for 50 hojas Tapa Gruesa, but the static
    // marketing row displays S/ 240. If someone fixes the table, update this
    // test to fold the row back into the formula check above.
    const row = EXAMPLES_GRUESA.find((e) => e.hojas === 50);
    expect(row?.price).toBe('S/ 240');
    expect(expectedPriceLabel(GRUESA_BASE_CENTS, GRUESA_EXTRA_CENTS, 50)).toBe('S/ 260');
  });

  it('both cover types offer the same hoja options, starting at the 15-hoja minimum', () => {
    const hojasDelgada = EXAMPLES_DELGADA.map((ex) => ex.hojas);
    const hojasGruesa = EXAMPLES_GRUESA.map((ex) => ex.hojas);
    expect(hojasDelgada).toEqual(hojasGruesa);
    expect(hojasDelgada[0]).toBe(MIN_HOJAS);
  });
});

describe('PhotobookConfigurarClient (calcPrice via rendered summary)', () => {
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  function renderPage() {
    return render(
      <PhotobookConfigurarClient temaSlug="viaje" temaNombre="Viaje por el Sur" coverPreviewUrl={null} />,
    );
  }

  it('defaults to Tapa Delgada with 25 hojas priced at S/ 120', () => {
    renderPage();
    // 9000 + 10 * 300 = 12000 centavos -> "S/ 120" (mirrors backend).
    expect(screen.getByText('S/ 120', { selector: 'strong' })).toBeTruthy();
    expect(screen.getByText('Empezar con Tapa Delgada')).toBeTruthy();
  });

  it('switching to Tapa Gruesa reprices 25 hojas at S/ 160', () => {
    renderPage();
    fireEvent.click(screen.getByText('TAPA GRUESA'));
    // 12000 + 10 * 400 = 16000 centavos -> "S/ 160" (mirrors backend).
    expect(screen.getByText('S/ 160', { selector: 'strong' })).toBeTruthy();
    expect(screen.getByText('Empezar con Tapa Gruesa')).toBeTruthy();
  });

  it('selecting the 50-hoja Delgada row reprices to S/ 195', () => {
    renderPage();
    // The row label exists in both cards; the first one is in the Delgada card.
    fireEvent.click(screen.getAllByText('50 hojas · 100 caras')[0]);
    // 9000 + 35 * 300 = 19500 centavos -> "S/ 195" (mirrors backend).
    expect(screen.getByText('S/ 195', { selector: 'strong' })).toBeTruthy();
  });

  it('selecting the 35-hoja Gruesa row switches cover and reprices to S/ 200', () => {
    renderPage();
    // The second matching row is in the Gruesa card.
    fireEvent.click(screen.getAllByText('35 hojas · 70 caras')[1]);
    // 12000 + 20 * 400 = 20000 centavos -> "S/ 200" (mirrors backend).
    expect(screen.getByText('S/ 200', { selector: 'strong' })).toBeTruthy();
    expect(screen.getByText('Empezar con Tapa Gruesa')).toBeTruthy();
  });

  it('KNOWN DIVERGENCE: selecting the 50-hoja Gruesa row prices the summary at S/ 260 while the row label says S/ 240', () => {
    renderPage();
    // The second matching row is in the Gruesa card; its static label reads
    // "S/ 240", but calcPrice (matching the backend) computes S/ 260, so the
    // user sees two different prices for the same selection.
    fireEvent.click(screen.getAllByText('50 hojas · 100 caras')[1]);
    expect(screen.getByText('S/ 260', { selector: 'strong' })).toBeTruthy();
    expect(screen.getByText('S/ 240')).toBeTruthy();
  });

  it('the CTA persists the selection to localStorage and navigates to the editor', () => {
    renderPage();
    fireEvent.click(screen.getByText('TAPA GRUESA'));
    fireEvent.click(screen.getByText('Empezar con Tapa Gruesa'));

    expect(window.localStorage.getItem('photobook_initial_cover_viaje')).toBe('TAPA_GRUESA');
    expect(window.localStorage.getItem('photobook_initial_hojas_viaje')).toBe('25');
    expect(pushMock).toHaveBeenCalledWith('/photobooks/viaje/editor');
  });
});
