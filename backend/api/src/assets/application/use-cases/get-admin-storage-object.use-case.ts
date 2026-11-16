import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { Readable } from 'stream';
import { FileStoragePort } from '../../domain/ports/file-storage.port';
import { isSafeStorageKey } from '../../domain/policies/storage-access.policy';

export type AdminStorageObject = {
  body: Readable;
  headers: Record<string, string>;
};

/** Types the browser may render inline. Everything else downloads as opaque bytes. */
const INLINE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']);

function headerSafeFilename(key: string): string {
  const name = key.slice(key.lastIndexOf('/') + 1);
  return name.replace(/[^\x20-\x7e]|["\\]/g, '_');
}

/**
 * Streams any bucket object to an authenticated ADMIN/OPERATOR (vouchers,
 * print assets, print PDFs...). Stored content types are not trusted: legacy
 * vouchers kept whatever type the client sent, so only known-safe types render
 * inline and every non-PDF response is CSP-sandboxed so HTML/SVG cannot run
 * script on our origin.
 */
@Injectable()
export class GetAdminStorageObjectUseCase {
  constructor(private readonly fileStorage: FileStoragePort) {}

  async execute(key: string): Promise<AdminStorageObject> {
    if (!isSafeStorageKey(key)) throw new BadRequestException('Archivo inválido');

    const object = await this.fileStorage.openObject(key);
    if (!object) throw new NotFoundException('Archivo no encontrado');

    const storedType = (object.contentType ?? '').split(';')[0].trim().toLowerCase();
    const inline = INLINE_TYPES.has(storedType);
    const contentType = inline ? storedType : 'application/octet-stream';

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename="${headerSafeFilename(key)}"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    };
    if (object.contentLength !== null) headers['Content-Length'] = String(object.contentLength);
    // Chrome's PDF viewer refuses to render inside a sandboxed document.
    if (contentType !== 'application/pdf') headers['Content-Security-Policy'] = 'sandbox';

    return { body: object.body, headers };
  }
}
