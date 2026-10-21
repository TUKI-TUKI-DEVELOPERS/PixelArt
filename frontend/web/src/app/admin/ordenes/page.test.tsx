import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';

vi.mock('next/link', () => ({ default: ({ children, ...props }: any) => <a {...props}>{children}</a> }));
import OrdenesPage from './page';

const reviewing = {
  id: 37, channel: 'PHOTOBOOK', status: 'UNDER_PAYMENT_REVIEW', customerFullName: 'Ana Cliente',
  customerEmail: 'ana@example.com', totalAmountCents: 15000, createdAt: '2026-10-21T19:18:29.000Z',
};

describe('orders list payment review', () => {
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it('keeps the approve button disabled until the reloaded list arrives', async () => {
    let resolveReload: (response: Response) => void = () => {};
    let listFetches = 0;
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/admin-api/orders')) {
        listFetches += 1;
        if (listFetches === 1) return Promise.resolve(Response.json([reviewing]));
        return new Promise<Response>((resolve) => { resolveReload = resolve; });
      }
      if (url.endsWith('/orders/37/review-payment')) return Promise.resolve(Response.json({ status: 'APPROVED' }, { status: 201 }));
      return Promise.resolve(Response.json({}));
    }));

    render(<OrdenesPage />);
    fireEvent.click(await screen.findByRole('button', { name: '✓ Aprobar' }));

    await waitFor(() => expect(listFetches).toBe(2));
    expect(screen.getByRole('button', { name: '…' }).hasAttribute('disabled')).toBe(true);

    resolveReload(Response.json([{ ...reviewing, status: 'PAYMENT_VERIFIED' }]));
    await waitFor(() => expect(screen.queryByRole('button', { name: /Aprobar|…/ })).toBeNull());
  });

  it('shows the server message when the payment review is refused', async () => {
    const alertMock = vi.fn();
    vi.stubGlobal('alert', alertMock);
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/admin-api/orders')) return Response.json([reviewing]);
      if (url.endsWith('/orders/37/review-payment')) return Response.json({ message: 'El voucher ya fue revisado' }, { status: 400 });
      return Response.json({});
    }));

    render(<OrdenesPage />);
    fireEvent.click(await screen.findByRole('button', { name: '✓ Aprobar' }));

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('El voucher ya fue revisado'));
  });
});
