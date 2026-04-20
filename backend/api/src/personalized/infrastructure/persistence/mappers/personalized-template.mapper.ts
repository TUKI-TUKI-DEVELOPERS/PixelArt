import { PersonalizedTemplateResponse } from '../../../domain/interfaces/personalized.interface';
import { PersonalizedTemplateOrmEntity } from '../entities/personalized-template.orm-entity';

export class PersonalizedTemplateMapper {
  static toResponse(
    entity: PersonalizedTemplateOrmEntity,
    previewUrl: string,
  ): PersonalizedTemplateResponse {
    return {
      id: entity.id,
      name: entity.name,
      previewUrl,
    };
  }
}
