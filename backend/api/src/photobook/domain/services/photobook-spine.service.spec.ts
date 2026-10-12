import {
  CALIPER_MM_POR_HOJA,
  OFFSET_TAPA_MM,
  SANGRADO_MM,
  calculateSpineWidthMm,
  hojasFromPageCount,
} from './photobook-spine.service';

describe('spine constants', () => {
  it('keeps the physically-measured calibration values', () => {
    expect(CALIPER_MM_POR_HOJA).toBe(2.5);
    expect(OFFSET_TAPA_MM.TAPA_GRUESA).toBe(2.5);
    expect(OFFSET_TAPA_MM.TAPA_DELGADA).toBe(1.5);
    expect(SANGRADO_MM).toBe(3);
  });
});

describe('hojasFromPageCount', () => {
  it('converts an even cara count to caras / 2', () => {
    expect(hojasFromPageCount(30)).toBe(15);
    expect(hojasFromPageCount(2)).toBe(1);
  });

  it('rounds an odd cara count up to a full hoja', () => {
    expect(hojasFromPageCount(29)).toBe(15);
    expect(hojasFromPageCount(1)).toBe(1);
    expect(hojasFromPageCount(31)).toBe(16);
  });

  it('returns 0 for zero caras', () => {
    expect(hojasFromPageCount(0)).toBe(0);
  });
});

describe('calculateSpineWidthMm', () => {
  it('matches the measured anchor: 30 caras TAPA_GRUESA = 40 mm', () => {
    expect(calculateSpineWidthMm(30, 'TAPA_GRUESA')).toBe(40);
  });

  it('uses the thinner cover offset for TAPA_DELGADA', () => {
    // 15 hojas × 2.5 + 1.5
    expect(calculateSpineWidthMm(30, 'TAPA_DELGADA')).toBe(39);
  });

  it('gives odd and even cara counts of the same hoja count the same spine', () => {
    expect(calculateSpineWidthMm(29, 'TAPA_GRUESA')).toBe(calculateSpineWidthMm(30, 'TAPA_GRUESA'));
  });

  it('grows by one caliper per extra hoja', () => {
    // 32 caras = 16 hojas → 16 × 2.5 + 2.5
    expect(calculateSpineWidthMm(32, 'TAPA_GRUESA')).toBe(42.5);
    expect(calculateSpineWidthMm(31, 'TAPA_DELGADA')).toBe(41.5);
  });

  it('excludes the bleed from the spine width (only caliper + cover offset)', () => {
    const spine = calculateSpineWidthMm(30, 'TAPA_GRUESA');
    expect(spine).toBe(15 * CALIPER_MM_POR_HOJA + OFFSET_TAPA_MM.TAPA_GRUESA);
  });
});
