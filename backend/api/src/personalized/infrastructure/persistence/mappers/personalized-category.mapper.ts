import { PersonalizedCategoryResponse } from '../../../domain/interfaces/personalized.interface';
import { PersonalizedCategoryOrmEntity } from '../entities/personalized-category.orm-entity';
import { PersonalizedModelMapper } from './personalized-model.mapper';

export class PersonalizedCategoryMapper {
  static toResponse(
    entity: PersonalizedCategoryOrmEntity,
    coverImageUrl: string | null,
  ): PersonalizedCategoryResponse {
    return {
      id: entity.id,
      name: entity.name,
      coverImageUrl,
      models: (entity.models ?? [])
        .filter((m) => m.isActive)
        .map(PersonalizedModelMapper.toResponse),
    };
  }
}
