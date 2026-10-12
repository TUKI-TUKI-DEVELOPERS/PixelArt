import { describe, it, expect } from 'vitest';
import { formatPrice } from './price';

describe('formatPrice', () => {
  it('formats zero cents', () => {
    expect(formatPrice(0)).toBe('S/ 0.00');
  });

  it('formats exact soles amounts', () => {
    expect(formatPrice(8900)).toBe('S/ 89.00');
    expect(formatPrice(100)).toBe('S/ 1.00');
    expect(formatPrice(12000)).toBe('S/ 120.00');
  });

  it('pads a single centavo to two decimals', () => {
    expect(formatPrice(1)).toBe('S/ 0.01');
    expect(formatPrice(5)).toBe('S/ 0.05');
  });

  it('formats centavo remainders', () => {
    expect(formatPrice(12345)).toBe('S/ 123.45');
    expect(formatPrice(8999)).toBe('S/ 89.99');
  });

  it('formats large values without thousands separators (current behavior)', () => {
    expect(formatPrice(123456789)).toBe('S/ 1234567.89');
  });

  it('keeps the minus sign after the currency prefix for negative cents (current behavior)', () => {
    expect(formatPrice(-2500)).toBe('S/ -25.00');
  });

  it('propagates NaN into the output (current behavior, no validation)', () => {
    expect(formatPrice(Number.NaN)).toBe('S/ NaN');
  });
});
