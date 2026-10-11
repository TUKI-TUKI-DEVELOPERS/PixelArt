import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useParams: () => ({ id: '8' }) }));
vi.mock('next/link', () => ({ default: ({ children, ...props }: any) => <a {...props}>{children}</a> }));
import PhotobookProjectPage from './page';

const project = {
  id: 8, customerFullName: 'Cliente', customerEmail: 'cliente@example.com', customerPhone: null,
  deliveryAddress: null, deliveryDistrict: null, deliveryCity: null, deliveryDepartment: null, deliveryRegion: null, desiredDeliveryDate: null,
  coverTitle: 'Viaje', customerDni: null, customWidthCm: null, customHeightCm: null, photobookThemeId: 1, photobookProductId: 1,
  pageCount: 1, calculatedTotalCents: 10000, pricePerPageCents: 1000, status: 'CONVERTED_TO_ORDER', orderId: 42, hasPaymentProof: true,
  pages: [], assetIds: [],
};

describe('photobook project print output controls', () => {
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it('offers only standard RGB downloads; CMYK exports live in the order page', async () => {
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/projects/8/render')) return Response.json({ pdfUrl: 'https://files.test/8/generation-1/covers.pdf', coversUrl: 'https://files.test/8/generation-1/covers.pdf', interiorUrl: 'https://files.test/8/generation-1/interior.pdf', isLegacyCombined: false, legacyCombinedUrl: null, coverWrapUrl: 'https://files.test/8-cover-wrap.pdf' });
      if (url.includes('/print-cmyk/')) return new Promise(() => {});
      if (url.includes('/projects/8')) return Response.json(project);
      if (url.includes('/assets/')) return Response.json({ url: '' });
      return Response.json({});
    }));

    render(<PhotobookProjectPage />);
    expect(await screen.findByText('Standard RGB')).toBeTruthy();
    expect(screen.getByRole('button', { name: /tapa \/ cubiertas RGB/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /interior RGB/i })).toBeTruthy();
    expect(screen.queryByText('Print CMYK')).toBeNull();
    expect(screen.queryByRole('button', { name: /CMYK/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /wrap|lomo/i })).toBeNull();
  });
});
