import { Asset } from '../../../domain/asset';
import { AssetOrmEntity } from '../entities/asset.orm-entity';

export class AssetMapper {
  static toDomain(orm: AssetOrmEntity): Asset {
    return new Asset(
      Number(orm.id),
      orm.storageKey,
      orm.originalFilename,
      orm.mimeType,
      orm.sizeBytes ? Number(orm.sizeBytes) : null,
      orm.width,
      orm.height,
      orm.contentHash,
      orm.createdAt,
    );
  }
}
