import { Injectable, BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';

export type UploadProposalInput = {
  demoRequestId: number;
  templateId: number;
  protectionMode: 'WATERMARK' | 'LOW_QUALITY';
  buffer: Buffer;
  mimeType: string;
  generatedByUserId?: number | null;
};

export type UploadProposalOutput = {
  id: number;
  storageKey: string;
  url: string;
  protectionMode: string;
};

@Injectable()
export class UploadDemoProposalUseCase {
  constructor(
    private readonly demoRepo: DemoRepositoryPort,
    private readonly fileStorage: FileStoragePort,
  ) {}

  async execute(input: UploadProposalInput): Promise<UploadProposalOutput> {
    // 1. Apply protection
    let protectedBuffer: Buffer;

    if (input.protectionMode === 'WATERMARK') {
      protectedBuffer = await this.applyWatermark(input.buffer);
    } else {
      protectedBuffer = await this.applyLowQuality(input.buffer);
    }

    // 2. Generate storage key
    const storageKey = `uploads/proposals/${input.demoRequestId}_${input.templateId}.jpg`;

    // 3. Upload to MinIO
    await this.fileStorage.upload(storageKey, protectedBuffer, 'image/jpeg');

    // 4. Save to DB
    const proposal = await this.demoRepo.saveProposal({
      demoRequestId: input.demoRequestId,
      templateId: input.templateId,
      outputStorageKey: storageKey,
      protectionMode: input.protectionMode,
      isWatermarked: input.protectionMode === 'WATERMARK',
      generatedByUserId: input.generatedByUserId ?? null,
    });

    return {
      id: proposal.id,
      storageKey,
      url: this.fileStorage.getPublicUrl(storageKey),
      protectionMode: input.protectionMode,
    };
  }

  private async applyWatermark(buffer: Buffer): Promise<Buffer> {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    const width = metadata.width ?? 800;
    const height = metadata.height ?? 600;

    // Create SVG watermark text
    const fontSize = Math.max(Math.floor(width / 15), 24);
    const svgWatermark = Buffer.from(`
      <svg width="${width}" height="${height}">
        <defs>
          <pattern id="watermark" patternUnits="userSpaceOnUse" width="${fontSize * 12}" height="${fontSize * 6}" patternTransform="rotate(-30)">
            <text x="0" y="${fontSize}" font-family="sans-serif" font-size="${fontSize}" fill="rgba(255,255,255,0.35)" font-weight="bold">
              PIXELART DEMO
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#watermark)" />
      </svg>
    `);

    return image
      .composite([{ input: svgWatermark, gravity: 'centre' }])
      .jpeg({ quality: 85 })
      .toBuffer();
  }

  private async applyLowQuality(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .resize({ width: 600, withoutEnlargement: true })
      .jpeg({ quality: 30 })
      .toBuffer();
  }
}
