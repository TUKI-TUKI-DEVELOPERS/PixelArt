import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Readable } from 'stream';
import { FileStoragePort, StoredObject } from '../../domain/ports/file-storage.port';
import { GetAdminStorageObjectUseCase } from './get-admin-storage-object.use-case';

function storageReturning(object: StoredObject | null) {
  const openObject = jest.fn().mockResolvedValue(object);
  return { storage: { openObject } as unknown as FileStoragePort, openObject };
}

const stored = (contentType: string | null, contentLength: number | null = 10): StoredObject => ({
  body: Readable.from([Buffer.from('x')]),
  contentType,
  contentLength,
});

describe('GetAdminStorageObjectUseCase', () => {
  it.each(['', '../etc/passwd', 'uploads/../vouchers/1.jpg', '/uploads/vouchers/1.jpg', 'uploads//vouchers/1.jpg'])(
    'rejects unsafe key %j without touching storage',
    async (key) => {
      const { storage, openObject } = storageReturning(stored('image/jpeg'));
      await expect(new GetAdminStorageObjectUseCase(storage).execute(key)).rejects.toBeInstanceOf(BadRequestException);
      expect(openObject).not.toHaveBeenCalled();
    },
  );

  it('returns 404 when the object does not exist', async () => {
    const { storage } = storageReturning(null);
    await expect(new GetAdminStorageObjectUseCase(storage).execute('uploads/vouchers/9.jpg')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('serves images inline inside a CSP sandbox, never cached by shared caches', async () => {
    const object = stored('image/jpeg', 2048);
    const { storage, openObject } = storageReturning(object);

    const result = await new GetAdminStorageObjectUseCase(storage).execute('uploads/vouchers/31-ab.jpg');

    expect(openObject).toHaveBeenCalledWith('uploads/vouchers/31-ab.jpg');
    expect(result.body).toBe(object.body);
    expect(result.headers).toEqual({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'inline; filename="31-ab.jpg"',
      'Content-Length': '2048',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': 'sandbox',
    });
  });

  it('serves PDFs inline without the sandbox so the browser PDF viewer can render them', async () => {
    const { storage } = storageReturning(stored('application/pdf'));
    const result = await new GetAdminStorageObjectUseCase(storage).execute('photobook-renders/79/generation-2/covers.pdf');
    expect(result.headers['Content-Type']).toBe('application/pdf');
    expect(result.headers['Content-Disposition']).toBe('inline; filename="covers.pdf"');
    expect(result.headers['Content-Security-Policy']).toBeUndefined();
    expect(result.headers['X-Content-Type-Options']).toBe('nosniff');
  });

  it.each(['text/html', 'image/svg+xml', 'application/xhtml+xml', null])(
    'forces a sandboxed download for untrusted stored type %j (legacy vouchers trusted the client)',
    async (contentType) => {
      const { storage } = storageReturning(stored(contentType));
      const result = await new GetAdminStorageObjectUseCase(storage).execute('uploads/vouchers/7.jpg');
      expect(result.headers['Content-Type']).toBe('application/octet-stream');
      expect(result.headers['Content-Disposition']).toBe('attachment; filename="7.jpg"');
      expect(result.headers['Content-Security-Policy']).toBe('sandbox');
    },
  );

  it('normalizes stored content types with parameters or casing', async () => {
    const { storage } = storageReturning(stored('Image/PNG; charset=binary'));
    const result = await new GetAdminStorageObjectUseCase(storage).execute('custom-books/print-assets/31/cover.png');
    expect(result.headers['Content-Type']).toBe('image/png');
  });

  it('omits Content-Length when storage does not report it', async () => {
    const { storage } = storageReturning(stored('image/png', null));
    const result = await new GetAdminStorageObjectUseCase(storage).execute('custom-books/print-assets/31/cover.png');
    expect(result.headers['Content-Length']).toBeUndefined();
  });

  it('keeps the download filename header-safe', async () => {
    const { storage } = storageReturning(stored('image/png'));
    const result = await new GetAdminStorageObjectUseCase(storage).execute('uploads/vouchers/mi "voucher"á.png');
    expect(result.headers['Content-Disposition']).toBe('inline; filename="mi _voucher__.png"');
  });
});
