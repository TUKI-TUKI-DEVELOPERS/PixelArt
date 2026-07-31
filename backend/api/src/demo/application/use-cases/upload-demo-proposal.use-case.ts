import { Injectable } from '@nestjs/common';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { ImageProtectionService } from '../../infrastructure/protection/image-protection.service';

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
    private readonly imageProtection: ImageProtectionService,
  ) {}

  async execute(input: UploadProposalInput): Promise<UploadProposalOutput> {
    // 1. Apply protection
    const protectedBuffer =
      input.protectionMode === 'WATERMARK'
        ? await this.imageProtection.applyWatermark(input.buffer)
        : await this.imageProtection.applyLowQuality(input.buffer);

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
}
