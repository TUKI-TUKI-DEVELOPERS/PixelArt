import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { AssetOrmEntity } from './infrastructure/persistence/entities/asset.orm-entity';
import { MinioStorageService } from './infrastructure/storage/minio-storage.service';
import { TypeOrmAssetRepository } from './infrastructure/persistence/repositories/typeorm-asset.repository';
import { AssetRepositoryPort } from './domain/ports/asset-repository.port';
import { FileStoragePort } from './domain/ports/file-storage.port';
import { UploadAssetUseCase } from './application/use-cases/upload-asset.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetOrmEntity]),
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
      fileFilter: (_req: any, file: any, cb: any) => {
        const allowed = /^image\/(jpeg|png|webp|gif)$/;
        cb(null, allowed.test(file.mimetype));
      },
    }),
  ],
  controllers: [AssetsController],
  providers: [
    AssetsService,
    MinioStorageService,
    TypeOrmAssetRepository,
    UploadAssetUseCase,
    // Bind ports → implementations
    { provide: AssetRepositoryPort, useExisting: TypeOrmAssetRepository },
    { provide: FileStoragePort, useExisting: MinioStorageService },
  ],
  exports: [AssetsService, MinioStorageService, AssetRepositoryPort, FileStoragePort],
})
export class AssetsModule {}
