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

  abstract getPublicUrl(key: string): string;

  abstract download(key: string): Promise<Buffer>;

  abstract exists(key: string): Promise<boolean>;
}
