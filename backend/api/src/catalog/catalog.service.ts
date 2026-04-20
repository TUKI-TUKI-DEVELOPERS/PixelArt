import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinioStorageService } from '../assets/infrastructure/storage/minio-storage.service';
import { CatalogBookOrmEntity } from './infrastructure/persistence/entities/catalog-book.orm-entity';
import { CatalogBookMapper } from './infrastructure/persistence/mappers/catalog-book.mapper';
import { CatalogBookResponse } from './domain/interfaces/catalog-book.interface';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(CatalogBookOrmEntity)
    private readonly catalogBookRepo: Repository<CatalogBookOrmEntity>,
    private readonly storage: MinioStorageService,
  ) {}

  async findAllActive(): Promise<CatalogBookResponse[]> {
    const books = await this.catalogBookRepo.find({
      where: { isActive: true },
      relations: ['variants', 'coverAsset'],
      order: { name: 'ASC' },
    });

    return books.map((book) => {
      const coverImageUrl = book.coverAsset
        ? this.storage.getPublicUrl(book.coverAsset.storageKey)
        : null;
      return CatalogBookMapper.toResponse(book, coverImageUrl);
    });
  }

  async findById(id: string): Promise<CatalogBookResponse> {
    const book = await this.catalogBookRepo.findOne({
      where: { id },
      relations: ['variants', 'coverAsset'],
    });

    if (!book) {
      throw new NotFoundException(`Catalog book with id ${id} not found`);
    }

    const coverImageUrl = book.coverAsset
      ? this.storage.getPublicUrl(book.coverAsset.storageKey)
      : null;

    return CatalogBookMapper.toResponse(book, coverImageUrl);
  }
}
