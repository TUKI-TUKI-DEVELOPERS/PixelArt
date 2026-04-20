import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinioStorageService } from './infrastructure/storage/minio-storage.service';
import { AssetOrmEntity } from './infrastructure/persistence/entities/asset.orm-entity';
import { UploadAssetUseCase, UploadAssetInput } from './application/use-cases/upload-asset.use-case';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetOrmEntity)
    private readonly assetRepo: Repository<AssetOrmEntity>,
    private readonly storage: MinioStorageService,
    private readonly uploadUseCase: UploadAssetUseCase,
  ) {}

  async uploadAsset(input: UploadAssetInput) {
    const result = await this.uploadUseCase.execute(input);
    return {
      id: result.asset.id,
      storageKey: result.asset.storageKey,
      contentHash: result.asset.contentHash,
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      width: result.asset.width,
      height: result.asset.height,
      wasExisting: result.wasExisting,
    };
  }

  async getAssetUrl(assetId: string): Promise<{ url: string }> {
    const asset = await this.assetRepo.findOne({ where: { id: assetId } });
    if (!asset) throw new NotFoundException('Asset not found');
    const url = this.storage.getPublicUrl(asset.storageKey);
    return { url };
  }

  getAssetUrlByStorageKey(storageKey: string): { url: string } {
    // C6: URL is deterministic — no DB query needed
    const url = this.storage.getPublicUrl(storageKey);
    return { url };
  }
}
