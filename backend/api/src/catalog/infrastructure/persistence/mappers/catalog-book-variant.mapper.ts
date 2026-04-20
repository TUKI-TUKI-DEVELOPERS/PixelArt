import { CatalogBookVariantResponse } from '../../../domain/interfaces/catalog-book.interface';
import { CatalogBookVariantOrmEntity } from '../entities/catalog-book-variant.orm-entity';

export class CatalogBookVariantMapper {
  static toResponse(entity: CatalogBookVariantOrmEntity): CatalogBookVariantResponse {
    return {
      id: entity.id,
      coverType: entity.coverType,
      basePriceCents: Number(entity.basePriceCents),
    };
  }
}
