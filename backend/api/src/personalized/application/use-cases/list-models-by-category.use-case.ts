import { Injectable } from '@nestjs/common';
import { PersonalizedRepositoryPort } from '../../domain/ports/personalized-repository.port';
import { PersonalizedModelOrmEntity } from '../../infrastructure/persistence/entities/personalized-model.orm-entity';

@Injectable()
export class ListModelsByCategoryUseCase {
  constructor(private readonly repo: PersonalizedRepositoryPort) {}

  async execute(categoryId: string): Promise<PersonalizedModelOrmEntity[]> {
    return this.repo.findModelsByCategory(categoryId);
  }
}
