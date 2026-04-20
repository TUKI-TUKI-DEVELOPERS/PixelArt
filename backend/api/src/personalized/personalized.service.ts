import { Injectable, NotFoundException } from '@nestjs/common';
import { MinioStorageService } from '../assets/infrastructure/storage/minio-storage.service';
import { PersonalizedRepositoryPort } from './domain/ports/personalized-repository.port';
import { PersonalizedCategoryMapper } from './infrastructure/persistence/mappers/personalized-category.mapper';
import { PersonalizedModelMapper } from './infrastructure/persistence/mappers/personalized-model.mapper';
import { PersonalizedTemplateMapper } from './infrastructure/persistence/mappers/personalized-template.mapper';
import {
  PersonalizedCategoryResponse,
  PersonalizedModelResponse,
  PersonalizedTemplateResponse,
} from './domain/interfaces/personalized.interface';

@Injectable()
export class PersonalizedService {
  constructor(
    private readonly repo: PersonalizedRepositoryPort,
    private readonly storage: MinioStorageService,
  ) {}

  async listCategories(): Promise<PersonalizedCategoryResponse[]> {
    const categories = await this.repo.findAllActiveCategories();

    return categories.map((cat) => {
      const coverImageUrl = cat.coverAsset
        ? this.storage.getPublicUrl(cat.coverAsset.storageKey)
        : null;
      return PersonalizedCategoryMapper.toResponse(cat, coverImageUrl);
    });
  }

  async listModelsByCategory(categoryId: string): Promise<PersonalizedModelResponse[]> {
    const models = await this.repo.findModelsByCategory(categoryId);
    return models.map(PersonalizedModelMapper.toResponse);
  }

  async listTemplatesByModel(modelId: string): Promise<PersonalizedTemplateResponse[]> {
    const templates = await this.repo.findTemplatesByModel(modelId);
    return templates.map((t) => {
      const previewUrl = this.storage.getPublicUrl(t.templatePreviewKey);
      return PersonalizedTemplateMapper.toResponse(t, previewUrl);
    });
  }
}
