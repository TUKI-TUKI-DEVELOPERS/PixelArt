import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';

const mocks = vi.hoisted(() => ({
  routerReplace: vi.fn(),
  routerPush: vi.fn(),
  searchParams: '',
  photos: [] as Array<{
    uid: number;
    id: number;
    storageKey: string;
    contentHash: string;
    url: string;
    thumbnailUrl: string;
    preview: string;
    width: number;
    height: number;
    originalFilename: string;
  }>,
  restorePhotos: vi.fn(),
  uploadFiles: vi.fn(),
  removePhoto: vi.fn(),
  resolveDuplicate: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/photobooks/viaje/editor',
  useRouter: () => ({ push: mocks.routerPush, replace: mocks.routerReplace }),
  useSearchParams: () => new URLSearchParams(mocks.searchParams),
}));

vi.mock('interactjs', () => ({
  default: vi.fn(() => ({ draggable: vi.fn() })),
}));

vi.mock('@/hooks/useWindowSize', () => ({
  useWindowSize: () => ({ isMobile: false, width: 1280, height: 900 }),
}));

vi.mock('@/hooks/usePhotoUpload', () => ({
  usePhotoUpload: () => ({
    photos: mocks.photos,
    pendingDuplicates: [],
    uploading: false,
    progress: 0,
    uploadFiles: mocks.uploadFiles,
    removePhoto: mocks.removePhoto,
    resolveDuplicate: mocks.resolveDuplicate,
    restorePhotos: mocks.restorePhotos,
  }),
}));

vi.mock('@/components/PhotobookPreview', () => ({
  default: () => <div data-testid="photobook-preview" />,
}));

vi.mock('@/components/PhotobookSpreadEditor', () => ({
  default: () => <div data-testid="photobook-spread-editor" />,
}));

import PhotobookEditorClient from './PhotobookEditorClient';

const products = [
  {
    id: 1,
    name: 'Cuadrado 22x22',
    pricePerPageCents: 0,
    minPages: 30,
    currency: 'PEN',
    allowsCustomDimensions: false,
  },
];

const photo = {
  uid: 101,
  id: 501,
  storageKey: 'uploads/photobooks/foto-1.jpg',
  contentHash: 'hash-501',
  url: 'https://cdn.test/foto-1.jpg',
  thumbnailUrl: 'https://cdn.test/foto-1-thumb.jpg',
  preview: 'https://cdn.test/foto-1.jpg',
  width: 2400,
  height: 2400,
  originalFilename: 'foto-1.jpg',
};

function renderEditor({ customEditor = false, onChangeFormat }: { customEditor?: boolean; onChangeFormat?: (draft: Record<string, unknown>) => void } = {}) {
  return render(
    <PhotobookEditorClient
      temaSlug="viaje"
      temaNombre="Viaje familiar"
      themeId={7}
      products={products}
      coverUrl="https://cdn.test/cover.jpg"
      backCoverUrl="https://cdn.test/back.jpg"
      customEditor={customEditor}
      onChangeFormat={onChangeFormat}
    />,
  );
}

function draftPages(count = 30) {
  return Array.from({ length: count }, (_, index) => ({
    pageNumber: index + 1,
    layoutKey: 'FULL_1',
    slots: [photo],
  }));
}

beforeEach(() => {
  mocks.routerReplace.mockReset();
  mocks.routerPush.mockReset();
  mocks.restorePhotos.mockReset();
  mocks.uploadFiles.mockReset();
  mocks.removePhoto.mockReset();
  mocks.resolveDuplicate.mockReset();
  mocks.searchParams = '';
  mocks.photos = [];
  localStorage.clear();
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal('fetch', vi.fn());
  vi.stubGlobal('scrollTo', vi.fn());
  vi.stubGlobal('URL', {
    ...URL,
    createObjectURL: vi.fn(() => 'blob:payment-proof'),
    revokeObjectURL: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('PhotobookEditorClient characterization', () => {
  it('renders step 1 and the six-step stepper', () => {
    renderEditor();

    expect(screen.getByRole('heading', { name: 'Sube tus fotos' })).toBeTruthy();
    for (const label of ['Subir Fotos', 'Editor', 'Preview', 'Datos', 'Revisar', 'Pagar']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it('keeps the current navigation validations when moving forward and backward', async () => {
    renderEditor();

    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(screen.getByRole('heading', { name: 'Sube tus fotos' })).toBeTruthy();

    cleanup();
    mocks.photos = [photo];
    renderEditor();

    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(await screen.findByText('Editor de Páginas')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Anterior' }));
    expect(screen.getByRole('heading', { name: 'Sube tus fotos' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(await screen.findByText('Te faltan páginas')).toBeTruthy();
  });

  it('auto-saves the current draft to /api/photobook/drafts', async () => {
    vi.useFakeTimers();
    mocks.photos = [photo];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ draftToken: 'draft-123' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderEditor();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
      await vi.advanceTimersByTimeAsync(1100);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/photobook/drafts',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(String),
      }),
    );
    const [, options] = fetchMock.mock.calls.find(([url]) => url === '/api/photobook/drafts')!;
    const payload = JSON.parse(options.body as string);
    expect(payload.photobookProductId).toBe(1);
    expect(payload.photobookThemeId).toBe(7);
    expect(payload.state.pages).toHaveLength(30);
  });

  it('keeps legacy custom drafts from forcing the full custom editor into preview', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ state: { step: 3, photos: [photo], pages: draftPages(2) } }),
      });
      vi.stubGlobal('fetch', fetchMock);

      renderEditor({ customEditor: true });

      expect(await screen.findByRole('heading', { name: 'Sube tus fotos' })).toBeTruthy();
      expect(mocks.restorePhotos).not.toHaveBeenCalled();
    });

    it('passes the live custom editor draft to the format dialog', async () => {
          mocks.photos = [photo];
          const onChangeFormat = vi.fn();
          vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ state: { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 2, pages: draftPages(), photos: [photo] } }),
          }));

          renderEditor({ customEditor: true, onChangeFormat });

          expect(await screen.findByText('Editor de Páginas')).toBeTruthy();
          fireEvent.click(screen.getByRole('button', { name: 'Formato' }));
          expect(onChangeFormat).toHaveBeenCalledWith(expect.objectContaining({
            pages: expect.arrayContaining([expect.objectContaining({ slots: expect.any(Array) })]),
            photos: [expect.objectContaining({ id: 501 })],
          }));
        });

        it('requires every selected custom-format page to contain a photo before preview', async () => {
          mocks.photos = [photo];
          const pages = Array.from({ length: 40 }, (_, index) => ({
            pageNumber: index + 1,
            layoutKey: 'FULL_1',
            slots: index < 30 ? [photo] : [null],
          }));
          vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ state: { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 2, pages, photos: [photo] } }),
          }));

          renderEditor({ customEditor: true });

          expect(await screen.findByText('Editor de Páginas')).toBeTruthy();
          fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
          expect(await screen.findByText('Te faltan páginas')).toBeTruthy();
          expect(screen.getByText(/Completa todas las páginas del formato elegido/i)).toBeTruthy();
          expect(screen.queryByRole('button', { name: 'Ver preview' })).toBeNull();
        });

        it('saves full custom-editor drafts through the authenticated session endpoint', async () => {
      vi.useFakeTimers();
      mocks.photos = [photo];
      const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ state: {} }) });
      vi.stubGlobal('fetch', fetchMock);

      renderEditor({ customEditor: true });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
        await vi.advanceTimersByTimeAsync(1100);
      });

      expect(fetchMock).toHaveBeenCalledWith(
        '/api/photobook/custom-editor/draft',
        expect.objectContaining({ method: 'PUT', body: expect.any(String) }),
      );
    });

    it('requires every delivery location field before moving past the order form', async () => {
        mocks.searchParams = 'draft=draft-delivery';
        const fetchMock = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({
            state: {
              pages: draftPages(), photos: [photo], step: 4,
              form: { name: 'Cliente PixelArt', email: 'cliente@example.com', phone: '987654321', deliveryAddress: '', deliveryDistrict: '', deliveryCity: '', deliveryRegion: '', deliveryDepartment: '' },
              coverType: 'TAPA_DELGADA', wantsRush: false, selectedProduct: 1,
            },
          }),
        });
        vi.stubGlobal('fetch', fetchMock);

        renderEditor();

        expect(await screen.findByText('Completa tu pedido')).toBeTruthy();
        fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
        for (const message of ['La dirección es requerida', 'El distrito es requerido', 'La ciudad es requerida', 'La región es requerida', 'El departamento es requerido']) {
          expect(await screen.findByText(message)).toBeTruthy();
        }
      });

      it('submits project creation with photobookThemeId and pages in the payload', async () => {
    mocks.searchParams = 'draft=draft-abc';
    mocks.photos = [photo];
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          state: {
            pages: draftPages(),
            photos: [photo],
            step: 5,
            form: {
              name: 'Cliente PixelArt',
              email: 'cliente@example.com',
              phone: '987654321',
              deliveryAddress: 'Av. Principal 123',
              deliveryDistrict: 'Yanahuara',
              deliveryCity: 'Arequipa',
              deliveryRegion: '',
              deliveryDepartment: 'Arequipa',
            },
            coverType: 'TAPA_DELGADA',
            wantsRush: false,
            selectedProduct: 1,
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ order: { paymentLink: { token: 'pay-123' } } }),
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);

    renderEditor();

    expect(await screen.findByText('Continuar al pago')).toBeTruthy();
    fireEvent.click(screen.getByText('Continuar al pago'));
    expect(await screen.findByText('Seleccionar captura de pago')).toBeTruthy();

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [new File(['voucher'], 'voucher.png', { type: 'image/png' })] } });
    fireEvent.click(await screen.findByText('Sí, enviar comprobante'));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/photobook/projects',
        expect.objectContaining({ method: 'POST', body: expect.any(String) }),
      );
    });
    const [, options] = fetchMock.mock.calls.find(([url]) => url === '/api/photobook/projects')!;
    const payload = JSON.parse(options.body as string);
    expect(payload.photobookThemeId).toBe(7);
    expect(payload.pages).toHaveLength(30);
    expect(payload.pages[0]).toEqual({
      pageNumber: 1,
      layoutKey: 'FULL_1',
      slots: [{ assetId: 501, slotIndex: 0, cropData: null }],
    });
  });
});
