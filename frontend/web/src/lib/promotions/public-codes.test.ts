import { describe, expect, it } from 'vitest';
import { promoBannerMessage } from './public-codes';

describe('promoBannerMessage', () => {
  it('shows the code exactly as typed, the percent and the scope', () => {
    expect(promoBannerMessage({ code: 'Navidad15', percent: 15, scope: 'en photobooks', audience: 'photobook', validUntil: '2026-12-26T05:00:00Z' }))
      .toBe('Usa el código Navidad15 y obtén 15% de descuento en photobooks');
  });

  it('omits the scope when there is none', () => {
    expect(promoBannerMessage({ code: 'X10', percent: 10, scope: null, audience: 'mixed', validUntil: '2026-12-26T05:00:00Z' }))
      .toBe('Usa el código X10 y obtén 10% de descuento');
  });
});
