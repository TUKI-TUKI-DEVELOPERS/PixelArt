import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteConfigService } from './site-config.service';
import { SiteConfigPublicController, SiteConfigAdminController } from './site-config.controller';
import { SiteConfigOrmEntity } from './infrastructure/persistence/entities/site-config.orm-entity';
import { TypeOrmSiteConfigRepository } from './infrastructure/persistence/repositories/typeorm-site-config.repository';
import { SiteConfigRepositoryPort } from './domain/ports/site-config-repository.port';

@Module({
  imports: [TypeOrmModule.forFeature([SiteConfigOrmEntity])],
  controllers: [SiteConfigPublicController, SiteConfigAdminController],
  providers: [
    SiteConfigService,
    TypeOrmSiteConfigRepository,
    { provide: SiteConfigRepositoryPort, useExisting: TypeOrmSiteConfigRepository },
  ],
  exports: [SiteConfigService],
})
export class SiteConfigModule {}
