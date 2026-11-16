import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import PromocionesPage from './page';

const coded = {
  id: 13,
  label: 'NAVIDAD15',
  code: 'NAVIDAD15',
  targetType: null,
  targetId: null,
  targetIds: [],
  eligibility: [{ kind: 'PERSONALIZED_CATEGORY', refId: 3 }],
  discountType: 'percent',
  discountValue: 15,
  validFrom: '2026-11-01T00:00:00.000Z',
  validUntil: '2099-12-31T00:00:00.000Z',
  isActive: true,
  createdAt: '2026-11-01T00:00:00.000Z',
};

const categories = [
  { id: '1', name: 'Libros de Amor', models: [{ id: '2', name: 'Mi Amor' }] },
  { id: '3', name: 'Libros de Familia', models: [{ id: '13', name: 'Mi Familia' }] },
];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

function mockApi(saveResponse: () => Response) {
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    if (url === '/admin-api/promotions' && (!init?.method || init.method === 'GET')) return json([coded]);
    if (url.startsWith('/admin-api/promotions')) return saveResponse();
    if (url === '/api/catalog/books') return json([]);
    if (url === '/api/personalized/categories') return json(categories);
    if (url === '/api/photobook/themes') return json([{ id: '4', name: 'Viajes' }, { id: '5', name: 'Boda' }]);
    return json({}, 404);
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('Admin promociones page', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('lists promotions with their code and what they apply to', async () => {
    mockApi(() => json({}));
    render(<PromocionesPage />);
    expect(await screen.findByText('NAVIDAD15')).toBeTruthy();
    expect(screen.getByText('Libros de Familia (toda la categoría)')).toBeTruthy();
  });

  it('creates a percent promotion with code and eligibility, and shows the server 409 message', async () => {
    const fetchMock = mockApi(() =>
      json({ statusCode: 409, message: 'Se cruza en fechas y productos con la promoción NAVIDAD15' }, 409),
    );
    render(<PromocionesPage />);
    await screen.findByText('NAVIDAD15');

    fireEvent.click(screen.getByRole('button', { name: /Nueva Promoción/ }));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: ' MiFamilia10 ' } });
    fireEvent.change(screen.getByLabelText('Descuento (%)'), { target: { value: '10' } });
    fireEvent.change(document.getElementById('input-valid-from')!, { target: { value: '2026-12-01T00:00' } });
    fireEvent.change(document.getElementById('input-valid-until')!, { target: { value: '2026-12-31T00:00' } });
    fireEvent.click(screen.getByLabelText('Mi Familia'));
    fireEvent.click(screen.getByRole('button', { name: 'Crear Promoción' }));

    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText('Se cruza en fechas y productos con la promoción NAVIDAD15')).toBeTruthy();

    const post = fetchMock.mock.calls.find(([url, init]) => url === '/admin-api/promotions' && init?.method === 'POST');
    expect(JSON.parse(String(post![1]!.body))).toEqual({
      code: 'MiFamilia10',
      percent: 10,
      validFrom: new Date('2026-12-01T00:00').toISOString(),
      validUntil: new Date('2026-12-31T00:00').toISOString(),
      isActive: true,
      eligibility: [{ kind: 'PERSONALIZED_BOOK', refId: 13 }],
    });
  });

  it('creates a promotion for one photobook theme and the custom photobook', async () => {
    const fetchMock = mockApi(() => json({ id: 20 }));
    render(<PromocionesPage />);
    await screen.findByText('NAVIDAD15');

    fireEvent.click(screen.getByRole('button', { name: /Nueva Promoción/ }));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'Viajes10' } });
    fireEvent.change(screen.getByLabelText('Descuento (%)'), { target: { value: '10' } });
    fireEvent.change(document.getElementById('input-valid-from')!, { target: { value: '2026-12-01T00:00' } });
    fireEvent.change(document.getElementById('input-valid-until')!, { target: { value: '2026-12-31T00:00' } });
    fireEvent.click(await screen.findByLabelText('Viajes'));
    fireEvent.click(screen.getByLabelText('Photobook a medida'));
    fireEvent.click(screen.getByRole('button', { name: 'Crear Promoción' }));

    await vi.waitFor(() => expect(fetchMock.mock.calls.some(([, init]) => init?.method === 'POST')).toBe(true));
    const post = fetchMock.mock.calls.find(([url, init]) => url === '/admin-api/promotions' && init?.method === 'POST');
    expect(JSON.parse(String(post![1]!.body)).eligibility).toEqual([
      { kind: 'PHOTOBOOK_THEME', refId: 4 },
      { kind: 'CUSTOM_PHOTOBOOK', refId: null },
    ]);
  });

  it('"Todos los photobooks de plantilla" replaces the individual themes', async () => {
    const fetchMock = mockApi(() => json({ id: 21 }));
    render(<PromocionesPage />);
    await screen.findByText('NAVIDAD15');

    fireEvent.click(screen.getByRole('button', { name: /Nueva Promoción/ }));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'Fotos15' } });
    fireEvent.change(screen.getByLabelText('Descuento (%)'), { target: { value: '15' } });
    fireEvent.change(document.getElementById('input-valid-from')!, { target: { value: '2026-12-01T00:00' } });
    fireEvent.change(document.getElementById('input-valid-until')!, { target: { value: '2026-12-31T00:00' } });
    fireEvent.click(await screen.findByLabelText('Viajes'));
    fireEvent.click(screen.getByLabelText('Todos los photobooks de plantilla'));
    expect(screen.queryByLabelText('Viajes')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Crear Promoción' }));

    await vi.waitFor(() => expect(fetchMock.mock.calls.some(([, init]) => init?.method === 'POST')).toBe(true));
    const post = fetchMock.mock.calls.find(([url, init]) => url === '/admin-api/promotions' && init?.method === 'POST');
    expect(JSON.parse(String(post![1]!.body)).eligibility).toEqual([{ kind: 'TEMPLATE_PHOTOBOOKS_ALL', refId: null }]);
  });

  it('requires at least one product before calling the API', async () => {
    const fetchMock = mockApi(() => json({}));
    render(<PromocionesPage />);
    await screen.findByText('NAVIDAD15');

    fireEvent.click(screen.getByRole('button', { name: /Nueva Promoción/ }));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'X10' } });
    fireEvent.change(screen.getByLabelText('Descuento (%)'), { target: { value: '10' } });
    fireEvent.change(document.getElementById('input-valid-from')!, { target: { value: '2026-12-01T00:00' } });
    fireEvent.change(document.getElementById('input-valid-until')!, { target: { value: '2026-12-31T00:00' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear Promoción' }));

    expect((await screen.findByRole('alert')).textContent).toBe('Selecciona al menos un libro o photobook');
    expect(fetchMock.mock.calls.some(([, init]) => init?.method === 'POST')).toBe(false);
  });
});
