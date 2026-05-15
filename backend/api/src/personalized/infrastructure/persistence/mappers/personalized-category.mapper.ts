import { PersonalizedCategoryResponse } from '../../../domain/interfaces/personalized.interface';
import { PersonalizedCategoryOrmEntity } from '../entities/personalized-category.orm-entity';
import { PersonalizedModelMapper } from './personalized-model.mapper';

export class PersonalizedCategoryMapper {
  static toResponse(
    entity: PersonalizedCategoryOrmEntity,
    coverImageUrl: string | null,
    modelCoverUrls: Record<string, string | null> = {},
  ): PersonalizedCategoryResponse {
    return {
      id: entity.id,
      name: entity.name,
      coverImageUrl,
      models: (entity.models ?? [])
        .filter((m) => m.isActive)
        .map((m) => PersonalizedModelMapper.toResponse(m, modelCoverUrls[m.id] ?? null)),
    };
  }
}
