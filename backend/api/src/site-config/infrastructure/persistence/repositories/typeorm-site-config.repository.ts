import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteConfigRepositoryPort, SiteConfigRecord } from '../../../domain/ports/site-config-repository.port';
import { SiteConfigOrmEntity } from '../entities/site-config.orm-entity';

@Injectable()
export class TypeOrmSiteConfigRepository extends SiteConfigRepositoryPort {
  constructor(
    @InjectRepository(SiteConfigOrmEntity)
    private readonly repo: Repository<SiteConfigOrmEntity>,
  ) { super(); }

  async get(key: string): Promise<SiteConfigRecord | null> {
    const e = await this.repo.findOne({ where: { key } });
    return e ? { key: e.key, value: e.value, updatedAt: e.updatedAt } : null;
  }

  async upsert(key: string, value: Record<string, unknown>): Promise<SiteConfigRecord> {
    const existing = await this.repo.findOne({ where: { key } });
    if (existing) {
      existing.value = value;
      const saved = await this.repo.save(existing);
      return { key: saved.key, value: saved.value, updatedAt: saved.updatedAt };
    }
    const entity = this.repo.create({ key, value });
    const saved = await this.repo.save(entity);
    return { key: saved.key, value: saved.value, updatedAt: saved.updatedAt };
  }
}
