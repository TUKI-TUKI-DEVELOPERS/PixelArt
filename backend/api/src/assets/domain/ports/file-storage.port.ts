import type { Readable } from 'stream';

/** A stored object opened for streaming, with the metadata saved at upload time. */
export type StoredObject = {
  body: Readable;
  contentType: string | null;
  contentLength: number | null;
};

export abstract class FileStoragePort {
  abstract upload(
    key: string,
    buffer: Buffer,
    mimeType: string,
    /** Override del Cache-Control por defecto (1 año, immutable) — usar un
     * valor corto para archivos que se pueden regenerar sobre la misma key
     * (ej. propuestas de demo, print-assets), si no el navegador nunca vuelve
     * a pedirlos aunque el archivo en storage haya cambiado. */
    cacheControl?: string,
  ): Promise<void>;

  abstract delete(key: string): Promise<void>;

  /**
   * Same-origin browser URL for the key: `/assets/...` for public prefixes,
   * `/admin-api/storage/...` (ADMIN/OPERATOR only) for everything else.
   * See domain/policies/storage-access.policy.ts.
   */
  abstract getPublicUrl(key: string): string;

  /** Opens an object for streaming; null when the key does not exist. */
  abstract openObject(key: string): Promise<StoredObject | null>;

  abstract download(key: string): Promise<Buffer>;

  /** Encrypted, non-public object storage for reroll source images and manifests. */
  abstract uploadPrivate(key: string, buffer: Buffer): Promise<void>;

  abstract downloadPrivate(key: string): Promise<Buffer>;

  abstract exists(key: string): Promise<boolean>;
}
