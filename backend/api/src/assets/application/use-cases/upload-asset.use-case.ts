import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { createHash } from 'crypto';
import sharp from 'sharp';
import { AssetRepositoryPort } from '../../domain/ports/asset-repository.port';
import { FileStoragePort } from '../../domain/ports/file-storage.port';
import { Asset } from '../../domain/asset';

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_FOLDERS = [
  'uploads/customers',
  'uploads/photobooks',
  'uploads/proposals',
  'uploads/vouchers',
];

export type UploadAssetInput = {
  buffer: Buffer;
  originalFilename: string;
  mimeType: string;
  /** Carpeta destino en MinIO: uploads/customers, uploads/photobooks, etc. */
  folder: string;
};

export type UploadAssetOutput = {
  asset: Asset;
  url: string;
  thumbnailUrl: string | null;
  wasExisting: boolean;
};

@Injectable()
export class UploadAssetUseCase {
  private readonly logger = new Logger(UploadAssetUseCase.name);

  constructor(
    private readonly assetRepo: AssetRepositoryPort,
    private readonly fileStorage: FileStoragePort,
  ) {}

  async execute(input: UploadAssetInput): Promise<UploadAssetOutput> {
    // C4a: Folder whitelist
    if (!ALLOWED_FOLDERS.includes(input.folder)) {
      throw new BadRequestException(
        `Invalid folder. Allowed: ${ALLOWED_FOLDERS.join(', ')}`,
      );
    }

    // C4b: Magic byte validation
    const { fileTypeFromBuffer } = await import('file-type');
    const detected = await fileTypeFromBuffer(input.buffer);
    if (!detected || !ALLOWED_MIMES.includes(detected.mime)) {
      throw new BadRequestException(
        'Invalid file type. Allowed: JPEG, PNG, WebP, GIF',
      );
    }

    // C4c: EXIF stripping (removes GPS/location data for privacy)
    let processedBuffer = input.buffer;
    const actualMime = detected.mime;
    let imgWidth: number | null = null;
    let imgHeight: number | null = null;

    if (['image/jpeg', 'image/png', 'image/webp'].includes(actualMime)) {
      try {
        const pipeline = sharp(input.buffer).rotate().withMetadata({});
        processedBuffer = await pipeline.toBuffer();

        // Extract dimensions from processed image
        const metadata = await sharp(processedBuffer).metadata();
        imgWidth = metadata.width ?? null;
        imgHeight = metadata.height ?? null;
      } catch (err) {
        this.logger.warn(`EXIF stripping failed, using original buffer: ${err}`);
        processedBuffer = input.buffer;
      }
    }

    // 1. Calcular SHA-256 (after EXIF strip)
    const contentHash = createHash('sha256')
      .update(processedBuffer)
      .digest('hex');

    // 2. Verificar si ya existe (deduplicación)
    const existing = await this.assetRepo.findByContentHash(contentHash);
    if (existing) {
      const thumbKey = this.buildThumbKey(existing.storageKey);
      return {
        asset: existing,
        url: this.fileStorage.getPublicUrl(existing.storageKey),
        thumbnailUrl: this.fileStorage.getPublicUrl(thumbKey),
        wasExisting: true,
      };
    }

    // 3. Generar storage key
    const ext = this.extractExtension(input.originalFilename, actualMime);
    const storageKey = `${input.folder}/${contentHash}${ext}`;

    // 4. Subir original a MinIO
    await this.fileStorage.upload(storageKey, processedBuffer, actualMime);

    // 5. Generar y subir thumbnail optimizado (800px max, webp)
    let thumbnailUrl: string | null = null;
    if (['image/jpeg', 'image/png', 'image/webp'].includes(actualMime)) {
      try {
        const thumbBuffer = await sharp(processedBuffer)
          .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        const thumbKey = `${input.folder}/thumb_${contentHash}.webp`;
        await this.fileStorage.upload(thumbKey, thumbBuffer, 'image/webp');
        thumbnailUrl = this.fileStorage.getPublicUrl(thumbKey);
      } catch (err) {
        this.logger.warn(`Thumbnail generation failed: ${err}`);
      }
    }

    // 6. Guardar en BD
    const asset = await this.assetRepo.save({
      storageKey,
      originalFilename: input.originalFilename,
      mimeType: actualMime,
      sizeBytes: processedBuffer.length,
      width: imgWidth,
      height: imgHeight,
      contentHash,
    });

    return {
      asset,
      url: this.fileStorage.getPublicUrl(storageKey),
      thumbnailUrl,
      wasExisting: false,
    };
  }

  private buildThumbKey(storageKey: string): string {
    const lastSlash = storageKey.lastIndexOf('/');
    const folder = storageKey.substring(0, lastSlash);
    const filename = storageKey.substring(lastSlash + 1);
    const dotIdx = filename.lastIndexOf('.');
    const baseName = dotIdx > 0 ? filename.substring(0, dotIdx) : filename;
    return `${folder}/thumb_${baseName}.webp`;
  }

  private extractExtension(filename: string, mimeType: string): string {
    // Intentar extraer del nombre
    const dotIdx = filename.lastIndexOf('.');
    if (dotIdx > 0) return filename.substring(dotIdx).toLowerCase();

    // Fallback desde mime type
    const mimeMap: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
    };
    return mimeMap[mimeType] ?? '.bin';
  }
}
