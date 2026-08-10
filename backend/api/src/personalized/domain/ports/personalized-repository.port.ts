import { PersonalizedCategoryOrmEntity } from '../../infrastructure/persistence/entities/personalized-category.orm-entity';
import { PersonalizedModelOrmEntity } from '../../infrastructure/persistence/entities/personalized-model.orm-entity';
import { PersonalizedTemplateOrmEntity } from '../../infrastructure/persistence/entities/personalized-template.orm-entity';

export abstract class PersonalizedRepositoryPort {
  abstract findAllActiveCategories(): Promise<PersonalizedCategoryOrmEntity[]>;
  abstract findModelsByCategory(categoryId: string): Promise<PersonalizedModelOrmEntity[]>;
  abstract findTemplatesByModel(modelId: string): Promise<PersonalizedTemplateOrmEntity[]>;
  abstract findTemplateById(id: number): Promise<PersonalizedTemplateOrmEntity | null>;
  abstract findSharedBlocks(): Promise<Record<string, string>>;
  /** Nombre del modelo (libro) dueño de una plantilla — usado para resolver
   * comportamiento específico por libro (ej. needsDualIdentity) sin cargar
   * el árbol completo de categorías/modelos. */
  abstract findModelNameById(modelId: string): Promise<string | null>;
  /** Modelo completo (incluye cover_scene_visual/back_cover_tagline/slug) —
   * usado por la generación de tapa/contratapa, que necesita el contenido de
   * prompt propio del libro, no solo el nombre. */
  abstract findModelById(modelId: string): Promise<PersonalizedModelOrmEntity | null>;
  abstract findCategoryById(categoryId: string): Promise<PersonalizedCategoryOrmEntity | null>;
}
