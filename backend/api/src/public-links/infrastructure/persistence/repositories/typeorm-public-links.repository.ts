import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicLinksRepositoryPort, CreateLinkData, ReissueLinkData } from '../../../domain/ports/public-links-repository.port';
import { PublicLink } from '../../../domain/public-link';
import { PublicLinkOrmEntity } from '../entities/public-link.orm-entity';
import { PublicLinkMapper } from '../mappers/public-link.mapper';

@Injectable()
export class TypeOrmPublicLinksRepository extends PublicLinksRepositoryPort {
  constructor(
    @InjectRepository(PublicLinkOrmEntity)
    private readonly repo: Repository<PublicLinkOrmEntity>,
  ) {
    super();
  }

  async create(data: CreateLinkData): Promise<PublicLink> {
    const ttlDays = data.ttlDays ?? 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + ttlDays);

    const entity = this.repo.create({
      linkType: data.linkType,
      expiresAt,
      demoRequestId: data.demoRequestId ? String(data.demoRequestId) : null,
      orderId: data.orderId ? String(data.orderId) : null,
    });
    const saved = await this.repo.save(entity);
    const reloaded = await this.repo.findOneByOrFail({ id: saved.id });
    return PublicLinkMapper.toDomain(reloaded);
  }

  async findByToken(token: string): Promise<PublicLink | null> {
    const entity = await this.repo.findOne({ where: { token } });
    return entity ? PublicLinkMapper.toDomain(entity) : null;
  }

  async reissue(data: ReissueLinkData): Promise<PublicLink> {
    const ttlDays = data.ttlDays ?? 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + ttlDays);

    const entity = this.repo.create({
      linkType: 'CHECKOUT',
      expiresAt,
      orderId: String(data.orderId),
      reissuedFromId: String(data.oldLinkId),
    });
    const saved = await this.repo.save(entity);
    const reloaded = await this.repo.findOneByOrFail({ id: saved.id });
    return PublicLinkMapper.toDomain(reloaded);
  }

  async revoke(id: number): Promise<void> {
    await this.repo.update(id, { revokedAt: new Date() });
  }
}
