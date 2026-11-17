import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadFile, downloadPdf } from './download';

let clicked: { href: string; download: string }[];

beforeEach(() => {
  clicked = [];
  vi.stubGlobal('URL', Object.assign(URL, {
    createObjectURL: vi.fn(() => 'blob:download'),
    revokeObjectURL: vi.fn(),
  }));
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    clicked.push({ href: this.getAttribute('href') ?? '', download: this.download });
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function respondWith(body: BodyInit, init: ResponseInit) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(body, init)));
}

describe('downloadPdf', () => {
  it('saves the file when the server returns a real PDF', async () => {
    respondWith('%PDF-1.7 print file', { status: 200, headers: { 'content-type': 'application/pdf' } });

    await downloadPdf('/admin-api/orders/4/print-cmyk/interior', 'libro_orden_4_interior-cmyk.pdf');

    expect(clicked).toEqual([{ href: 'blob:download', download: 'libro_orden_4_interior-cmyk.pdf' }]);
  });

  it('saves nothing and reports the server message when generation fails', async () => {
    respondWith(JSON.stringify({ statusCode: 500, message: 'CMYK PDF conversion failed: timeout' }), {
      status: 500, headers: { 'content-type': 'application/json' },
    });

    await expect(downloadPdf('/admin-api/orders/4/print-cmyk/interior', 'x.pdf'))
      .rejects.toThrow('CMYK PDF conversion failed: timeout');
    expect(clicked).toEqual([]);
  });

  it('saves nothing when a gateway timeout returns an HTML error page', async () => {
    respondWith('<html><body>504 Gateway Time-out</body></html>', { status: 504, headers: { 'content-type': 'text/html' } });

    await expect(downloadPdf('/admin-api/orders/4/print-cmyk/covers', 'x.pdf')).rejects.toThrow('504');
    expect(clicked).toEqual([]);
  });

  it('saves nothing when a successful response is not a PDF', async () => {
    respondWith('{"ok":true}', { status: 200, headers: { 'content-type': 'application/json' } });

    await expect(downloadPdf('/admin-api/orders/4/print-cmyk/covers', 'x.pdf')).rejects.toThrow('PDF');
    expect(clicked).toEqual([]);
  });
});

describe('downloadFile', () => {
  it('saves any successful response', async () => {
    respondWith('jpeg-bytes', { status: 200, headers: { 'content-type': 'image/jpeg' } });

    await downloadFile('/admin-api/storage/voucher.jpg', 'voucher_orden_4.jpg');

    expect(clicked).toEqual([{ href: 'blob:download', download: 'voucher_orden_4.jpg' }]);
  });

  it('saves nothing when the response is an error', async () => {
    respondWith(JSON.stringify({ message: 'No autenticado' }), { status: 401, headers: { 'content-type': 'application/json' } });

    await expect(downloadFile('/admin-api/storage/voucher.jpg', 'v.jpg')).rejects.toThrow('No autenticado');
    expect(clicked).toEqual([]);
  });
});
