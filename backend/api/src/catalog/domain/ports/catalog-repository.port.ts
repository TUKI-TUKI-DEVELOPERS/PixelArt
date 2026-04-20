import { CatalogBookOrmEntity } from '../../infrastructure/persistence/entities/catalog-book.orm-entity';

export abstract class CatalogRepositoryPort {
  abstract findAllActive(): Promise<CatalogBookOrmEntity[]>;
  abstract findById(id: string): Promise<CatalogBookOrmEntity | null>;
}
