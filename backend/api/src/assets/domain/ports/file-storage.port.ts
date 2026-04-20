export abstract class FileStoragePort {
  abstract upload(
    key: string,
    buffer: Buffer,
    mimeType: string,
  ): Promise<void>;

  abstract delete(key: string): Promise<void>;

  abstract getPublicUrl(key: string): string;

  abstract download(key: string): Promise<Buffer>;
}
