import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useParams: () => ({ id: '42' }) }));
vi.mock('next/link', () => ({ default: ({ children, ...props }: any) => <a {...props}>{children}</a> }));
import OrderDetailPage from './page';

const order = {
  id: 42, channel: 'CUSTOM_BOOK', status: 'PAYMENT_VERIFIED', customerFullName: 'Cliente', customerEmail: 'cliente@example.com', customerPhone: '999',
  totalAmountCents: 10000, baseAmountCents: 10000, rushFeeCents: 0, currency: 'PEN', estimatedDeliveryDate: null,
  demoRequestId: null, photobookProjectId: null, photobookDelivery: null, statusEvents: [], paymentProof: null, templateSelections: [],
  characterMeta: null, demoAssetIds: [], dedicationText: null, demoDedicationText: null, gradientColorStart: '#111111', gradientColorEnd: '#222222',
};

describe('order print output controls', () => {
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it('groups standard and CMYK downloads and identifies a legacy combined PDF explicitly', async () => {
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/orders/42')) return Response.json(order);
      if (url.includes('backfill-from-demo')) return Response.json({});
      if (url.endsWith('/print-assets')) return Response.json([]);
      if (url.endsWith('/render')) return Response.json({ pdfUrl: 'https://files.test/42.pdf', generatedAt: '2026-10-09T00:00:00Z', isLegacyCombined: true, legacyCombinedUrl: 'https://files.test/legacy.pdf' });
      if (url.includes('/print-cmyk/')) return new Promise(() => {});
      return Response.json({});
    }));

    render(<OrderDetailPage />);
    expect(await screen.findByText('Standard RGB')).toBeTruthy();
    expect(screen.getByText('Print CMYK')).toBeTruthy();
    expect(screen.getByText(/Este archivo anterior contiene la tapa y el interior juntos.*exportaciones CMYK separadas/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /archivo anterior.*tapa e interior juntos/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /tapa \/ cubiertas CMYK/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /interior CMYK/i })).toBeTruthy();
    const buttons = screen.getAllByRole('button');
    expect(buttons.findIndex((button) => /Archivo anterior/.test(button.textContent ?? ''))).toBeLessThan(buttons.findIndex((button) => /cubiertas CMYK/i.test(button.textContent ?? '')));
    expect(buttons.findIndex((button) => /cubiertas CMYK/i.test(button.textContent ?? ''))).toBeLessThan(buttons.findIndex((button) => /interior CMYK/i.test(button.textContent ?? '')));
    const coversCmyk = screen.getByRole('button', { name: /tapa \/ cubiertas CMYK/i });
    fireEvent.click(coversCmyk);
    expect(await screen.findByText('Generando…')).toBeTruthy();
    expect(coversCmyk.hasAttribute('disabled')).toBe(true);
    expect(screen.getByRole('button', { name: /interior CMYK/i }).hasAttribute('disabled')).toBe(true);
  });

  it('groups standard and CMYK downloads for photobook orders', async () => {
    const pbOrder = { ...order, channel: 'PHOTOBOOK', photobookProjectId: 79 };
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/orders/42')) return Response.json(pbOrder);
      if (url.includes('/projects/79/render')) return Response.json({ pdfUrl: 'https://files.test/79-covers.pdf', coversUrl: 'https://files.test/79-covers.pdf', interiorUrl: 'https://files.test/79-interior.pdf', isLegacyCombined: false, legacyCombinedUrl: null, generatedAt: '2026-10-10T00:00:00Z' });
      if (url.includes('/print-cmyk/')) return new Promise(() => {});
      return Response.json({});
    }));

    render(<OrderDetailPage />);
    expect(await screen.findByText('Standard RGB')).toBeTruthy();
    expect(screen.getByText('Print CMYK')).toBeTruthy();
    expect(screen.getByRole('button', { name: /tapa \/ cubiertas RGB/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /interior RGB/i })).toBeTruthy();
    const coversCmyk = screen.getByRole('button', { name: /tapa \/ cubiertas CMYK/i });
    const interiorCmyk = screen.getByRole('button', { name: /interior CMYK/i });
    const buttons = screen.getAllByRole('button');
    expect(buttons.findIndex((b) => /cubiertas RGB/i.test(b.textContent ?? ''))).toBeLessThan(buttons.findIndex((b) => /cubiertas CMYK/i.test(b.textContent ?? '')));
    expect(buttons.findIndex((b) => /cubiertas CMYK/i.test(b.textContent ?? ''))).toBeLessThan(buttons.findIndex((b) => /interior CMYK/i.test(b.textContent ?? '')));
    fireEvent.click(coversCmyk);
    expect(await screen.findByText('Generando\u2026')).toBeTruthy();
    expect(coversCmyk.hasAttribute('disabled')).toBe(true);
    expect(interiorCmyk.hasAttribute('disabled')).toBe(true);
  });
});
