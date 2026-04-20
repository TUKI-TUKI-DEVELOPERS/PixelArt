import { Injectable } from '@nestjs/common';
import { SiteConfigRepositoryPort } from './domain/ports/site-config-repository.port';

@Injectable()
export class SiteConfigService {
  constructor(private readonly repo: SiteConfigRepositoryPort) {}

  get(key: string) { return this.repo.get(key); }
  upsert(key: string, value: Record<string, unknown>) { return this.repo.upsert(key, value); }
}
