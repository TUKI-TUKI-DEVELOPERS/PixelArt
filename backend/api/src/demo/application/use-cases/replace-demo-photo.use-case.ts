import { Injectable, BadRequestException } from '@nestjs/common';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { AssetsService } from '../../../assets/assets.service';

export type ReplaceDemoPhotoInput = {
  demoRequestId: number;
  oldAssetId: number;
  buffer: Buffer;
  originalFilename: string;
  mimeType: string;
};

export type ReplaceDemoPhotoOutput = {
  assetId: number;
  url: string;
};

@Injectable()
export class ReplaceDemoPhotoUseCase {
  constructor(
    private readonly demoRepo: DemoRepositoryPort,
    private readonly assetsService: AssetsService,
  ) {}

  async execute(input: ReplaceDemoPhotoInput): Promise<ReplaceDemoPhotoOutput> {
    const detail = await this.demoRepo.findById(input.demoRequestId);
    if (!detail) throw new BadRequestException('Demo request no encontrada');
    if (!detail.assetIds.includes(input.oldAssetId)) {
      throw new BadRequestException('Esa foto no pertenece a esta solicitud');
    }

    // Reusa el pipeline completo de subida (magic-byte check, EXIF strip,
    // dedup por hash, self-heal) — la reemplazante se valida igual que
    // cualquier foto nueva del cliente.
    const uploaded = await this.assetsService.uploadAsset({
      buffer: input.buffer,
      originalFilename: input.originalFilename,
      mimeType: input.mimeType,
      folder: 'uploads/customers',
    });

    await this.demoRepo.replaceAsset(input.demoRequestId, input.oldAssetId, uploaded.id);

    return { assetId: uploaded.id, url: uploaded.url };
  }
}
