import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

vi.mock('./CustomPhotobookAiProposalPanel', () => ({
  CustomPhotobookAiProposalPanel: () => <div data-testid="proposal-panel" />,
}));

import CustomPhotobookRequestDetailPage from './page';

const baseRequest = {
  id: 41,
  occasion: 'Viaje',
  requestedTheme: 'Japón',
  coverTitle: 'Japón, otoño de 2026',
  coverMode: 'PIXELART_DESIGNED',
  brief: 'Una cubierta sobria.',
  customerFullName: 'Ana Cliente',
  customerEmail: 'ana@example.com',
  customerPhone: '+51 999 111 222',
  createdAt: '2026-09-28T00:00:00.000Z',
};

describe('CustomPhotobookRequestDetailPage', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('allows an admin to resend an editor code after editing has started', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({
        ...baseRequest,
        status: 'EDITOR_IN_PROGRESS',
        linkedPhotobookProjectId: 77,
      }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'EDITOR_IN_PROGRESS' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    render(<CustomPhotobookRequestDetailPage params={Promise.resolve({ id: '41' })} />);

    fireEvent.click(await screen.findByRole('button', { name: 'Reenviar código' }));

    expect(await screen.findByText('El código de acceso fue enviado al cliente.')).toBeTruthy();
    expect(fetchMock).toHaveBeenLastCalledWith(
      '/admin-api/photobook/custom-requests/41/editor-code/send',
      { method: 'POST' },
    );
  });

  it('shows the customer adjustment in the admin workspace', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({
      ...baseRequest,
      status: 'CHANGES_REQUESTED',
      linkedPhotobookProjectId: null,
      openCoverAdjustment: {
        surface: 'BACK_COVER',
        message: 'Quisiera una composición más limpia detrás de la foto.',
        createdAt: '2026-09-30T12:00:00.000Z',
      },
    }), { status: 200 })));

    render(<CustomPhotobookRequestDetailPage params={Promise.resolve({ id: '41' })} />);

    expect(await screen.findByText('Ajuste solicitado por el cliente')).toBeTruthy();
    expect(screen.getByText('Revisar contratapa')).toBeTruthy();
    expect(screen.getByText('Quisiera una composición más limpia detrás de la foto.')).toBeTruthy();
  });

  it('shows both production downloads only after the request is finalized', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({
        ...baseRequest,
        status: 'READY_FOR_PRODUCTION',
        linkedPhotobookProjectId: 77,
      }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        pdfUrl: 'https://assets.test/photobook-renders/77.pdf',
        coverWrapUrl: 'https://assets.test/photobook-renders/77-cover-wrap.pdf',
        generatedAt: '2026-09-29T12:00:00.000Z',
      }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    render(<CustomPhotobookRequestDetailPage params={Promise.resolve({ id: '41' })} />);

    expect((await screen.findByRole('link', { name: 'Descargar interior PDF' })).getAttribute('href')).toBe('https://assets.test/photobook-renders/77.pdf');
    expect(screen.getByRole('link', { name: 'Descargar cubierta y lomo PDF' }).getAttribute('href')).toBe('https://assets.test/photobook-renders/77-cover-wrap.pdf');
    expect(fetchMock).toHaveBeenCalledWith('/admin-api/photobook/projects/77/render');
  });
});
