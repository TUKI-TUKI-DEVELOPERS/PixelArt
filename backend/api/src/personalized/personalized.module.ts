import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsModule } from '../assets/assets.module';
import { PersonalizedController } from './personalized.controller';
import { PersonalizedService } from './personalized.service';
import { PersonalizedRepositoryPort } from './domain/ports/personalized-repository.port';
import { ImageGenerationPort } from './domain/ports/image-generation.port';
import { TypeOrmPersonalizedRepository } from './infrastructure/persistence/repositories/typeorm-personalized.repository';
import { OpenAiImageGenerationAdapter } from './infrastructure/ai/openai-image-generation.adapter';
import { PersonalizedCategoryOrmEntity } from './infrastructure/persistence/entities/personalized-category.orm-entity';
import { PersonalizedModelOrmEntity } from './infrastructure/persistence/entities/personalized-model.orm-entity';
import { PersonalizedTemplateOrmEntity } from './infrastructure/persistence/entities/personalized-template.orm-entity';
import { PromptSharedBlockOrmEntity } from './infrastructure/persistence/entities/prompt-shared-block.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonalizedCategoryOrmEntity,
      PersonalizedModelOrmEntity,
      PersonalizedTemplateOrmEntity,
      PromptSharedBlockOrmEntity,
    ]),
    AssetsModule,
  ],
  controllers: [PersonalizedController],
  providers: [
    PersonalizedService,
    {
      provide: PersonalizedRepositoryPort,
      useClass: TypeOrmPersonalizedRepository,
    },
    {
      provide: ImageGenerationPort,
      useClass: OpenAiImageGenerationAdapter,
    },
  ],
  exports: [PersonalizedService, ImageGenerationPort, PersonalizedRepositoryPort],
})
export class PersonalizedModule {}
