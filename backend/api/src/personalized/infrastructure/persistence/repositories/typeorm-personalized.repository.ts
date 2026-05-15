import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalizedCategoryOrmEntity } from '../entities/personalized-category.orm-entity';
import { PersonalizedModelOrmEntity } from '../entities/personalized-model.orm-entity';
import { PersonalizedTemplateOrmEntity } from '../entities/personalized-template.orm-entity';
import { PersonalizedRepositoryPort } from '../../../domain/ports/personalized-repository.port';

@Injectable()
export class TypeOrmPersonalizedRepository extends PersonalizedRepositoryPort {
  constructor(
    @InjectRepository(PersonalizedCategoryOrmEntity)
    private readonly categoryRepo: Repository<PersonalizedCategoryOrmEntity>,
    @InjectRepository(PersonalizedModelOrmEntity)
    private readonly modelRepo: Repository<PersonalizedModelOrmEntity>,
    @InjectRepository(PersonalizedTemplateOrmEntity)
    private readonly templateRepo: Repository<PersonalizedTemplateOrmEntity>,
  ) {
    super();
  }

  async findAllActiveCategories(): Promise<PersonalizedCategoryOrmEntity[]> {
    return this.categoryRepo.find({
      where: { isActive: true },
      relations: ['models', 'models.templates', 'models.coverAsset', 'coverAsset'],
      order: { name: 'ASC' },
    });
  }

  async findModelsByCategory(categoryId: string): Promise<PersonalizedModelOrmEntity[]> {
    return this.modelRepo.find({
      where: { categoryId, isActive: true },
      relations: ['templates', 'coverAsset'],
      order: { name: 'ASC' },
    });
  }

  async findTemplatesByModel(modelId: string): Promise<PersonalizedTemplateOrmEntity[]> {
    return this.templateRepo.find({
      where: { modelId, isActive: true },
      order: { name: 'ASC' },
    });
  }
}
