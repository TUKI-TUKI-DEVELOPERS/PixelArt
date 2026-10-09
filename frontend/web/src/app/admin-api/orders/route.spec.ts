import { readFileSync } from 'node:fs';
import { NextRequest } from 'next/server';
import { GET, POST, PATCH } from './[...path]/route';
import { GET as getOrders } from './route';

describe('Orders admin BFF', () => {
  afterEach(() => jest.restoreAllMocks());

  it('keeps every known Orders browser caller on the same-origin BFF', () => {
    const callers = [
      'frontend/web/src/components/layout/AdminSidebar.tsx',
      'frontend/web/src/app/admin/page.tsx',
      'frontend/web/src/components/layout/AdminSearchBar.tsx',
      'frontend/web/src/app/admin/ordenes/page.tsx',
      'frontend/web/src/app/admin/ordenes/[id]/page.tsx',
    ];
    for (const path of callers) {
      const source = readFileSync(`${process.cwd()}/${path}`, 'utf8');
      expect(source).toContain('/admin-api/orders');
      expect(source).not.toContain('/api/admin/orders');
    }
  });

  it('rejects a missing admin cookie without making an upstream request', async () => {
    const fetchMock = jest.spyOn(global, 'fetch');
    const response = await GET(new NextRequest('http://localhost/admin-api/orders/42'), { params: Promise.resolve({ path: ['42'] }) });
    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('proxies the root orders list path through the fixed internal API', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(new Response('[]', { status: 200 }));
    await getOrders(new NextRequest('http://localhost/admin-api/orders', { headers: { cookie: 'pa_admin_token=secret-jwt' } }));
    expect(fetchMock.mock.calls[0][0].toString()).toBe('http://api:3001/api/admin/orders');
  });

  it('forwards bearer auth server-side and preserves fixed path, query, method, and JSON body', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response('{"accepted":true}', { status: 202, headers: { 'content-type': 'application/json; charset=utf-8' } }),
    );
    const request = new NextRequest('http://localhost/admin-api/orders/42/advance-status?force=1', {
      method: 'POST',
      headers: { cookie: 'pa_admin_token=secret-jwt', authorization: 'Bearer attacker', 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'IN_PRODUCTION' }),
    });
    const response = await POST(request, { params: Promise.resolve({ path: ['42', 'advance-status'] }) });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url.toString()).toBe('http://api:3001/api/admin/orders/42/advance-status?force=1');
    expect(init?.method).toBe('POST');
    expect(new Headers(init?.headers).get('authorization')).toBe('Bearer secret-jwt');
    expect(new Headers(init?.headers).get('authorization')).not.toBe('Bearer attacker');
    expect(await new Response(init?.body as BodyInit).text()).toBe('{"status":"IN_PRODUCTION"}');
    expect(response.status).toBe(202);
    expect(response.headers.get('content-type')).toBe('application/json; charset=utf-8');
    expect(await response.text()).toBe('{"accepted":true}');
  });

  it('preserves multipart bytes and boundary content type', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(new Response('ok', { status: 200 }));
    const boundary = '----browser-boundary';
    const multipart = `--${boundary}\r\nContent-Disposition: form-data; name="asset"; filename="x.png"\r\nContent-Type: image/png\r\n\r\npayload\r\n--${boundary}--\r\n`;
    const request = new NextRequest('http://localhost/admin-api/orders/42/character-photos', {
      method: 'PATCH',
      headers: { cookie: 'pa_admin_token=secret-jwt', 'content-type': `multipart/form-data; boundary=${boundary}` },
      body: multipart,
    });
    await PATCH(request, { params: Promise.resolve({ path: ['42', 'character-photos'] }) });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url.toString()).toBe('http://api:3001/api/admin/orders/42/character-photos');
    expect(init?.method).toBe('PATCH');
    expect(new Headers(init?.headers).get('content-type')).toBe(`multipart/form-data; boundary=${boundary}`);
    expect(await new Response(init?.body as BodyInit).text()).toBe(multipart);
  });
});
