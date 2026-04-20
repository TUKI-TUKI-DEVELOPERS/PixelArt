import { Asset } from '../asset';

export abstract class AssetRepositoryPort {
  abstract findByContentHash(hash: string): Promise<Asset | null>;
  abstract findById(id: number): Promise<Asset | null>;
  abstract findByStorageKey(key: string): Promise<Asset | null>;
  abstract save(data: {
    storageKey: string;
    originalFilename: string | null;
    mimeType: string | null;
    sizeBytes: number | null;
    width: number | null;
    height: number | null;
    contentHash: string;
  }): Promise<Asset>;
}
