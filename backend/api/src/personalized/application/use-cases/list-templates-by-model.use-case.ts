import { Injectable } from '@nestjs/common';
import { PersonalizedRepositoryPort } from '../../domain/ports/personalized-repository.port';
import { PersonalizedTemplateOrmEntity } from '../../infrastructure/persistence/entities/personalized-template.orm-entity';

@Injectable()
export class ListTemplatesByModelUseCase {
  constructor(private readonly repo: PersonalizedRepositoryPort) {}

  async execute(modelId: string): Promise<PersonalizedTemplateOrmEntity[]> {
    return this.repo.findTemplatesByModel(modelId);
  }
}
