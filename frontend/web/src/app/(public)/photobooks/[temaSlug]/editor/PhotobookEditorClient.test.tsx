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
  default: ({ customEditor }: { customEditor?: boolean }) => <div data-testid="photobook-spread-editor">{!customEditor && <><button title="Duplicar página">Duplicar página</button><button title="Eliminar página">Eliminar página</button></>}</div>,
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

type CustomerContact = { name: string; email: string; phone: string };

function renderEditor({ customEditor = false, onChangeFormat, customerContact }: { customEditor?: boolean; onChangeFormat?: (draft: Record<string, unknown>) => void; customerContact?: CustomerContact } = {}) {
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
      customerContact={customerContact}
    />,
  );
}

async function findContactInputs() {
  const section = (await screen.findByText('Datos de contacto')).parentElement!;
  const [name, email, phone] = Array.from(section.querySelectorAll('input'));
  return { name, email, phone };
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
  it('does not render the header format button inside the custom editor', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ state: {} }) }));
    renderEditor({ customEditor: true, onChangeFormat: vi.fn() });

    expect(screen.queryByRole('button', { name: 'Formato' })).toBeNull();
  });
  it('hides count-changing page actions only in custom editor mode', async () => {
    mocks.photos = [photo];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ state: { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 2, pages: draftPages(), photos: [photo] } }) }));
    renderEditor({ customEditor: true });
    await waitFor(() => expect(screen.getByText('Editor de Páginas')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'x' }));
    expect(mocks.removePhoto).toHaveBeenCalledWith(photo.uid);
    expect(screen.queryByRole('button', { name: '+ Agregar página' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Duplicar página' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Eliminar página' })).toBeNull();

    cleanup();
    renderEditor();
    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(await screen.findByRole('button', { name: '+ Agregar página' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Duplicar página' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Eliminar página' })).toBeTruthy();
  });

  it('routes an unsupported 10-sheet custom draft to format correction before finalization', async () => {
    const onChangeFormat = vi.fn();
    const pages = draftPages(20);
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ state: { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 5, coverType: 'TAPA_DELGADA', pages } }) });
    vi.stubGlobal('fetch', fetchMock);
    renderEditor({ customEditor: true, onChangeFormat });

    await waitFor(() => expect(screen.getByText('Paso 5 de 6')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: /Finalizar/ }));
    await waitFor(() => expect(onChangeFormat).toHaveBeenCalled());
    expect(onChangeFormat).toHaveBeenCalledWith(expect.objectContaining({ pages: expect.arrayContaining([expect.objectContaining({ pageNumber: 1 })]) }));
    expect(fetchMock).not.toHaveBeenCalledWith('/api/photobook/custom-editor/finalize', expect.anything());
  });
  it('blocks finalization requests when a legacy custom draft has an unsupported sheet count', async () => {
    const onChangeFormat = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ state: { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 6, coverType: 'TAPA_DELGADA', pages: draftPages(20) } }) });
    vi.stubGlobal('fetch', fetchMock);
    renderEditor({ customEditor: true, onChangeFormat });

    fireEvent.click(await screen.findByRole('button', { name: 'Continuar al pago' }));
    expect(onChangeFormat).toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalledWith('/api/photobook/custom-editor/finalize', expect.anything());
  });

  it('renders step 1 and the six-step stepper', () => {
    renderEditor();

    expect(screen.getByRole('heading', { name: 'Sube tus fotos' })).toBeTruthy();
    for (const label of ['Subir Fotos', 'Editor', 'Preview', 'Datos', 'Revisar', 'Pagar']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it('locks the preselected cover format in the custom editor and keeps its price summary', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ state: {
        editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 4, coverType: 'TAPA_GRUESA',
        pages: draftPages(40), wantsRush: false,
        form: { name: 'Ana', email: 'ana@example.com', phone: '999111222', deliveryAddress: '', deliveryDistrict: '', deliveryCity: '', deliveryRegion: '', deliveryDepartment: '' },
      } }),
    }));

    renderEditor({ customEditor: true });

    expect(await screen.findByText('Paso 4 de 6')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Tapa Delgada/ })).toBeNull();
    expect(screen.queryByRole('button', { name: /Tapa Gruesa/ })).toBeNull();
    expect(screen.getAllByText('20 hojas · Tapa Gruesa').length).toBeGreaterThan(0);
  });

  it('restores and recalculates the agreed custom-cover surcharge in the order form', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ state: {
        editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 4, coverType: 'TAPA_DELGADA',
        pages: draftPages(30), customCoverSurchargeCents: 2500, wantsRush: false,
        form: { name: 'Ana', email: 'ana@example.com', phone: '999111222', deliveryAddress: 'Av. Principal 123', deliveryDistrict: 'Yanahuara', deliveryCity: 'Arequipa', deliveryRegion: 'Arequipa', deliveryDepartment: 'Arequipa' },
      } }),
    }));

    renderEditor({ customEditor: true });

    const surchargeInput = await screen.findByLabelText(/Importe acordado por ambas tapas \(S\/\)/);
    expect((surchargeInput as HTMLInputElement).value).toBe('25.00');
    expect(screen.getByText('S/ 115.00')).toBeTruthy();

    fireEvent.change(surchargeInput, { target: { value: '30.50' } });
    expect(screen.getByText('S/ 120.50')).toBeTruthy();
  });

  it('requires a valid custom-cover amount before leaving the order form', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ state: {
        editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 4, coverType: 'TAPA_DELGADA',
        pages: draftPages(30), wantsRush: false,
        form: { name: 'Ana', email: 'ana@example.com', phone: '999111222', deliveryAddress: 'Av. Principal 123', deliveryDistrict: 'Yanahuara', deliveryCity: 'Arequipa', deliveryRegion: 'Arequipa', deliveryDepartment: 'Arequipa' },
      } }),
    }));

    renderEditor({ customEditor: true });
    fireEvent.click(await screen.findByRole('button', { name: 'Siguiente' }));

    expect(await screen.findByText(/Ingresa un importe válido/)).toBeTruthy();
    expect(screen.getByText('Paso 4 de 6')).toBeTruthy();
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

    it('passes the live custom editor draft to automatic format correction', async () => {
          mocks.photos = [photo];
          const onChangeFormat = vi.fn();
          vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ state: { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 5, coverType: 'TAPA_DELGADA', pages: draftPages(20), photos: [photo] } }),
          }));

          renderEditor({ customEditor: true, onChangeFormat });

          expect(await screen.findByText('Paso 5 de 6')).toBeTruthy();
          fireEvent.click(screen.getByRole('button', { name: /Finalizar/ }));
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
      const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ state: { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 2, coverType: 'TAPA_DELGADA', pages: draftPages() } }) });
      vi.stubGlobal('fetch', fetchMock);

      renderEditor({ customEditor: true });
      await act(async () => { await Promise.resolve(); });
      expect(screen.getByText('Editor de Páginas')).toBeTruthy();
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

      it('hides calculated prices from custom photobook review while preserving the order summary', async () => {
          mocks.searchParams = 'draft=draft-custom-review';
          mocks.photos = [photo];
          vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ state: { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, pages: draftPages(), photos: [photo], step: 3, coverType: 'TAPA_DELGADA', wantsRush: false } }),
          }));

          renderEditor({ customEditor: true });

          expect(await screen.findByRole('heading', { name: 'Tu photobook está listo para revisar' })).toBeTruthy();
          expect(screen.getByText('Total a pagar').closest('[hidden]')).toBeTruthy();
          expect(screen.getByText(/S\/\s*\d/).closest('[hidden]')).toBeTruthy();
          expect(screen.getByText('Tipo de tapa')).toBeTruthy();
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

  describe('custom request contact prefill', () => {
    const customerContact = { name: 'Ana Cliente', email: 'ana@example.com', phone: '+51 999-111-222' };
    const emptyForm = { name: '', email: '', phone: '', deliveryAddress: '', deliveryDistrict: '', deliveryCity: '', deliveryRegion: '', deliveryDepartment: '' };
    const customDraft = { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 4, coverType: 'TAPA_DELGADA', pages: draftPages(30), wantsRush: false };

    it.each([
      ['an empty saved form', { form: emptyForm }],
      ['a draft without a form', {}],
    ])('prefills name, email and normalized phone over %s', async (_label, formState) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ state: { ...customDraft, ...formState } }) }));

      renderEditor({ customEditor: true, customerContact });

      const inputs = await findContactInputs();
      await waitFor(() => expect(inputs.name.value).toBe('Ana Cliente'));
      expect(inputs.email.value).toBe('ana@example.com');
      expect(inputs.phone.value).toBe('+51999111222');
      expect(screen.getByText('Dirección de entrega').parentElement!.querySelector('input')!.value).toBe('');
    });

    it('never overwrites contact values that the saved draft already holds', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ state: { ...customDraft, form: { ...emptyForm, name: 'Ana María', phone: '987654321' } } }),
      }));

      renderEditor({ customEditor: true, customerContact });

      const inputs = await findContactInputs();
      await waitFor(() => expect(inputs.email.value).toBe('ana@example.com'));
      expect(inputs.name.value).toBe('Ana María');
      expect(inputs.phone.value).toBe('987654321');
    });

    it('leaves the phone empty when the request phone cannot pass the editor validation', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ state: { ...customDraft, form: emptyForm } }) }));

      renderEditor({ customEditor: true, customerContact: { ...customerContact, phone: '+1 555 123 4567' } });

      const inputs = await findContactInputs();
      await waitFor(() => expect(inputs.name.value).toBe('Ana Cliente'));
      expect(inputs.phone.value).toBe('');
    });

    it('keeps the template editor contact form exactly as the draft left it', async () => {
      mocks.searchParams = 'draft=draft-template';
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ state: { pages: draftPages(), photos: [photo], step: 4, form: emptyForm, coverType: 'TAPA_DELGADA', wantsRush: false, selectedProduct: 1 } }),
      }));

      renderEditor({ customerContact });

      const inputs = await findContactInputs();
      expect(await screen.findByText('Completa tu pedido')).toBeTruthy();
      expect(inputs.name.value).toBe('');
      expect(inputs.email.value).toBe('');
      expect(inputs.phone.value).toBe('');
    });
  });

  describe('promotion code', () => {
    const form = {
      name: 'Cliente PixelArt', email: 'cliente@example.com', phone: '987654321', deliveryAddress: 'Av. Principal 123',
      deliveryDistrict: 'Yanahuara', deliveryCity: 'Arequipa', deliveryRegion: 'Arequipa', deliveryDepartment: 'Arequipa',
    };

    function routeFetch(routes: Record<string, unknown>, draftState: Record<string, unknown>) {
      return vi.fn(async (url: string) => {
        if (url in routes) return { ok: true, json: async () => routes[url] };
        return { ok: true, json: async () => ({ state: draftState }) };
      });
    }

    it('shows the code field above the amount on the pay step and sends the code with the order', async () => {
      mocks.searchParams = 'draft=draft-promo';
      mocks.photos = [photo];
      const fetchMock = routeFetch({
        '/api/photobook/promo-preview': { code: 'Foto10', percent: 10, discountCents: 900, totalCents: 8100 },
        '/api/photobook/projects': { order: { paymentLink: { token: 'pay-123' } } },
        '/api/payment/pay-123/voucher': {},
      }, { pages: draftPages(), photos: [photo], step: 5, form, coverType: 'TAPA_DELGADA', wantsRush: false, selectedProduct: 1 });
      vi.stubGlobal('fetch', fetchMock);

      renderEditor();
      fireEvent.click(await screen.findByText('Continuar al pago'));

      const field = await screen.findByLabelText('Código de promoción');
      const amountLabel = screen.getByText('Total a pagar');
      expect(field.compareDocumentPosition(amountLabel) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

      fireEvent.change(field, { target: { value: 'Foto10' } });
      fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));

      expect(await screen.findByText('Descuento (Foto10)')).toBeTruthy();
      const [, previewOptions] = fetchMock.mock.calls.find(([url]) => url === '/api/photobook/promo-preview')! as unknown as [string, RequestInit];
      expect(JSON.parse(previewOptions.body as string)).toEqual({ code: 'Foto10', photobookThemeId: 7, coverType: 'TAPA_DELGADA', pageCount: 30, wantsRush: false });
      expect(screen.getAllByText('S/ 81.00').length).toBeGreaterThan(0);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      fireEvent.change(input, { target: { files: [new File(['voucher'], 'voucher.png', { type: 'image/png' })] } });
      fireEvent.click(await screen.findByText('Sí, enviar comprobante'));

      await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/photobook/projects', expect.anything()));
      const [, options] = fetchMock.mock.calls.find(([url]) => url === '/api/photobook/projects')! as unknown as [string, RequestInit];
      expect(JSON.parse(options.body as string).promoCode).toBe('Foto10');
    });

    it('lets the custom photobook apply a code before finalizing and sends it to finalize', async () => {
      const fetchMock = routeFetch({
        '/api/photobook/custom-editor/promo-preview': { code: 'Medida10', percent: 10, discountCents: 900, totalCents: 10600 },
        '/api/photobook/custom-editor/finalize': { order: { paymentLink: { url: 'http://localhost:3000/pagar/tok' } } },
      }, { editorMode: 'CUSTOM_FULL_EDITOR', formatConfigured: true, step: 6, coverType: 'TAPA_DELGADA', pages: draftPages(30), photos: [photo], form, customCoverSurchargeCents: 2500, wantsRush: false });
      vi.stubGlobal('fetch', fetchMock);
      const assign = vi.fn();
      vi.stubGlobal('location', { ...window.location, assign });

      renderEditor({ customEditor: true });

      fireEvent.change(await screen.findByLabelText('Código de promoción'), { target: { value: 'Medida10' } });
      fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));
      expect(await screen.findByText('Descuento (Medida10)')).toBeTruthy();
      const [, previewOptions] = fetchMock.mock.calls.find(([url]) => url === '/api/photobook/custom-editor/promo-preview')! as unknown as [string, RequestInit];
      expect(JSON.parse(previewOptions.body as string)).toEqual({ code: 'Medida10', coverType: 'TAPA_DELGADA', pageCount: 30, wantsRush: false, customCoverSurchargeCents: 2500 });

      fireEvent.click(screen.getByRole('button', { name: 'Continuar al pago' }));
      await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/photobook/custom-editor/finalize', expect.anything()));
      const [, options] = fetchMock.mock.calls.find(([url]) => url === '/api/photobook/custom-editor/finalize')! as unknown as [string, RequestInit];
      expect(JSON.parse(options.body as string).promoCode).toBe('Medida10');
    });
  });
});
