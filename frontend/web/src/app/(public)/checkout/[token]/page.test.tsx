import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { CheckoutInfo } from '@/lib/api/checkout';

vi.mock('next/navigation', () => ({ useParams: () => ({ token: 'tok-123' }) }));
vi.mock('@/components/ProposalBook', () => ({ default: () => null }));
vi.mock('@/components/TemplateBook', () => ({ default: () => null }));
vi.mock('@/lib/api/checkout', () => ({
  getCheckoutInfo: vi.fn(),
  submitCheckout: vi.fn(),
  previewCheckoutPromo: vi.fn(),
}));

import { getCheckoutInfo, previewCheckoutPromo } from '@/lib/api/checkout';
import CheckoutPage from './page';

const info: CheckoutInfo = {
  orderStatus: 'AWAITING_PAYMENT',
  customerName: 'Cliente Test',
  bookName: 'Mi Amor',
  orderId: 100,
  baseAmountCents: 10000,
  rushFeeCents: 0,
  packagePreference: 'STANDARD',
  extraTemplatesAmountCents: 0,
  appliedPromotion: null,
  currency: 'PEN',
  expiresAt: '2099-12-31T00:00:00.000Z',
  proposals: [],
  alreadySelectedTemplateIds: [],
  availableTemplates: [],
  hasPaymentProof: false,
};

function precedes(first: Element, second: Element) {
  return Boolean(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING);
}

describe('Checkout page', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(getCheckoutInfo).mockReset();
    vi.mocked(previewCheckoutPromo).mockReset();
  });

  it('shows the promo-code field above the payment section (Yape QR and amount)', async () => {
    vi.mocked(getCheckoutInfo).mockResolvedValue(info);
    render(<CheckoutPage />);

    const promoInput = await screen.findByLabelText('Código de promoción');
    expect(precedes(promoInput, screen.getByRole('heading', { name: 'Comprobante de pago' }))).toBe(true);
    expect(precedes(promoInput, screen.getByRole('heading', { name: 'Paga con Yape' }))).toBe(true);
  });

  it('applies the code before paying, so the QR amount already includes the discount', async () => {
    vi.mocked(getCheckoutInfo).mockResolvedValue(info);
    vi.mocked(previewCheckoutPromo).mockResolvedValue({ code: 'NAVIDAD15', percent: 15, discountCents: 1500, totalCents: 8500 });
    render(<CheckoutPage />);

    fireEvent.change(await screen.findByLabelText('Código de promoción'), { target: { value: 'NAVIDAD15' } });
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));

    const yapeCard = (await screen.findByRole('heading', { name: 'Paga con Yape' })).parentElement as HTMLElement;
    await vi.waitFor(() => expect(yapeCard.textContent).toContain('Paga S/ 85.00'));
    expect(previewCheckoutPromo).toHaveBeenCalledWith('tok-123', { code: 'NAVIDAD15', packageType: 'STANDARD' });
  });
});
