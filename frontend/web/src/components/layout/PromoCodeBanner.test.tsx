import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import PromoCodeBanner from './PromoCodeBanner';

const codes = [
  { code: 'Navidad15', percent: 15, scope: 'en libros personalizados seleccionados', audience: 'personalized' as const, validUntil: '2026-12-26T05:00:00Z' },
  { code: 'Foto10', percent: 10, scope: 'en photobooks', audience: 'photobook' as const, validUntil: '2026-12-26T05:00:00Z' },
];

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
    matches: reduce && query.includes('reduce'), media: query,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(),
  })));
}

describe('PromoCodeBanner', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('rotates through the valid coded promotions', () => {
    vi.useFakeTimers();
    mockReducedMotion(false);
    render(<PromoCodeBanner codes={codes} fallback={null} />);

    expect(screen.getByText('Usa el código Navidad15 y obtén 15% de descuento en libros personalizados seleccionados')).toBeTruthy();
    act(() => { vi.advanceTimersByTime(5000); });
    expect(screen.getByText('Usa el código Foto10 y obtén 10% de descuento en photobooks')).toBeTruthy();
  });

  it('does not rotate with prefers-reduced-motion: every code stays visible', () => {
    vi.useFakeTimers();
    mockReducedMotion(true);
    render(<PromoCodeBanner codes={codes} fallback={null} />);

    act(() => { vi.advanceTimersByTime(10000); });
    expect(screen.getByText(/Navidad15/)).toBeTruthy();
    expect(screen.getByText(/Foto10/)).toBeTruthy();
  });

  it('falls back to the manual banner text when no coded promotion is valid', () => {
    mockReducedMotion(false);
    render(<PromoCodeBanner codes={[]} fallback={{ text: 'Envío gratis en Arequipa', color: '#123456', enabled: true }} />);
    expect(screen.getByText('Envío gratis en Arequipa')).toBeTruthy();
  });

  it('renders nothing without codes or an enabled manual banner', () => {
    mockReducedMotion(false);
    const { container } = render(<PromoCodeBanner codes={[]} fallback={null} />);
    expect(container.textContent).toBe('');
  });
});
