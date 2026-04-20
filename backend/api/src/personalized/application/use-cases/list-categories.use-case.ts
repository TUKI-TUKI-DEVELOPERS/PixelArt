import { Injectable } from '@nestjs/common';
import { PersonalizedRepositoryPort } from '../../domain/ports/personalized-repository.port';
import { PersonalizedCategoryOrmEntity } from '../../infrastructure/persistence/entities/personalized-category.orm-entity';

@Injectable()
export class ListCategoriesUseCase {
  constructor(private readonly repo: PersonalizedRepositoryPort) {}

  async execute(): Promise<PersonalizedCategoryOrmEntity[]> {
    return this.repo.findAllActiveCategories();
  }
}
