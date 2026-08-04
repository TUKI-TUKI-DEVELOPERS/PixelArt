import { Injectable } from '@nestjs/common';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { ImageProtectionService } from '../../infrastructure/protection/image-protection.service';

export type UploadProposalInput = {
  demoRequestId: number;
  templateId: number;
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
    const protectedBuffer = await this.imageProtection.applyWatermark(input.buffer);

    // 2. Generate storage key
    const storageKey = `uploads/proposals/${input.demoRequestId}_${input.templateId}.jpg`;

    // 3. Upload to MinIO — cache corto: re-subir pisa la misma key (upsert
    // en saveProposal), y con cache immutable el navegador nunca vería el cambio.
    await this.fileStorage.upload(storageKey, protectedBuffer, 'image/jpeg', 'public, max-age=60, must-revalidate');

    // 4. Save to DB
    const proposal = await this.demoRepo.saveProposal({
      demoRequestId: input.demoRequestId,
      templateId: input.templateId,
      outputStorageKey: storageKey,
      protectionMode: 'WATERMARK',
      isWatermarked: true,
      generatedByUserId: input.generatedByUserId ?? null,
    });

    return {
      id: proposal.id,
      storageKey,
      url: this.fileStorage.getPublicUrl(storageKey),
      protectionMode: 'WATERMARK',
    };
  }
}
