import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetRepositoryPort } from '../../../domain/ports/asset-repository.port';
import { Asset } from '../../../domain/asset';
import { AssetOrmEntity } from '../entities/asset.orm-entity';
import { AssetMapper } from '../mappers/asset.mapper';

@Injectable()
export class TypeOrmAssetRepository extends AssetRepositoryPort {
  constructor(
    @InjectRepository(AssetOrmEntity)
    private readonly repo: Repository<AssetOrmEntity>,
  ) {
    super();
  }

  async findByContentHash(hash: string): Promise<Asset | null> {
    const entity = await this.repo.findOne({ where: { contentHash: hash } });
    return entity ? AssetMapper.toDomain(entity) : null;
  }

  async findById(id: number): Promise<Asset | null> {
    const entity = await this.repo.findOne({ where: { id: String(id) } });
    return entity ? AssetMapper.toDomain(entity) : null;
  }

  async findByStorageKey(key: string): Promise<Asset | null> {
    const entity = await this.repo.findOne({ where: { storageKey: key } });
    return entity ? AssetMapper.toDomain(entity) : null;
  }

  async save(data: {
    storageKey: string;
    originalFilename: string | null;
    mimeType: string | null;
    sizeBytes: number | null;
    width: number | null;
    height: number | null;
    contentHash: string;
  }): Promise<Asset> {
    const entity = this.repo.create({
      storageKey: data.storageKey,
      originalFilename: data.originalFilename,
      mimeType: data.mimeType,
      sizeBytes: data.sizeBytes ? String(data.sizeBytes) : null,
      width: data.width,
      height: data.height,
      contentHash: data.contentHash,
    });
    const saved = await this.repo.save(entity);
    return AssetMapper.toDomain(saved);
  }
}
