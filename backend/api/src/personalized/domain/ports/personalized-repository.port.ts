import { PersonalizedCategoryOrmEntity } from '../../infrastructure/persistence/entities/personalized-category.orm-entity';
import { PersonalizedModelOrmEntity } from '../../infrastructure/persistence/entities/personalized-model.orm-entity';
import { PersonalizedTemplateOrmEntity } from '../../infrastructure/persistence/entities/personalized-template.orm-entity';

export abstract class PersonalizedRepositoryPort {
  abstract findAllActiveCategories(): Promise<PersonalizedCategoryOrmEntity[]>;
  abstract findModelsByCategory(categoryId: string): Promise<PersonalizedModelOrmEntity[]>;
  abstract findTemplatesByModel(modelId: string): Promise<PersonalizedTemplateOrmEntity[]>;
}
