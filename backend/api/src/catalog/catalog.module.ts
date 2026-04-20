import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsModule } from '../assets/assets.module';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { CatalogBookOrmEntity } from './infrastructure/persistence/entities/catalog-book.orm-entity';
import { CatalogBookVariantOrmEntity } from './infrastructure/persistence/entities/catalog-book-variant.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogBookOrmEntity, CatalogBookVariantOrmEntity]),
    AssetsModule,
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
