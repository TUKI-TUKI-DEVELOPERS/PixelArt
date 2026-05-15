import { PersonalizedModelResponse } from '../../../domain/interfaces/personalized.interface';
import { PersonalizedModelOrmEntity } from '../entities/personalized-model.orm-entity';

export class PersonalizedModelMapper {
  static toResponse(entity: PersonalizedModelOrmEntity, coverImageUrl: string | null = null): PersonalizedModelResponse {
    return {
      id: entity.id,
      name: entity.name,
      templateCount: (entity.templates ?? []).filter((t) => t.isActive).length,
      coverImageUrl,
    };
  }
}
