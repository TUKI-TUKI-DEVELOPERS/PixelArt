import { CatalogBookResponse } from '../../../domain/interfaces/catalog-book.interface';
import { CatalogBookOrmEntity } from '../entities/catalog-book.orm-entity';
import { CatalogBookVariantMapper } from './catalog-book-variant.mapper';

export class CatalogBookMapper {
  static toResponse(
    entity: CatalogBookOrmEntity,
    coverImageUrl: string | null,
  ): CatalogBookResponse {
    return {
      id: entity.id,
      name: entity.name,
      productType: entity.productType,
      description: entity.description,
      currency: entity.currency,
      coverImageUrl,
      variants: (entity.variants ?? []).map(CatalogBookVariantMapper.toResponse),
    };
  }
}
