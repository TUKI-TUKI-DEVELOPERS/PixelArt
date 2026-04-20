import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicLinksService } from './public-links.service';
import { PublicLinkOrmEntity } from './infrastructure/persistence/entities/public-link.orm-entity';
import { TypeOrmPublicLinksRepository } from './infrastructure/persistence/repositories/typeorm-public-links.repository';
import { PublicLinksRepositoryPort } from './domain/ports/public-links-repository.port';

@Module({
  imports: [TypeOrmModule.forFeature([PublicLinkOrmEntity])],
  providers: [
    PublicLinksService,
    TypeOrmPublicLinksRepository,
    { provide: PublicLinksRepositoryPort, useExisting: TypeOrmPublicLinksRepository },
  ],
  exports: [PublicLinksService],
})
export class PublicLinksModule {}
