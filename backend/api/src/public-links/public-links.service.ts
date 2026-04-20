import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PublicLinksRepositoryPort, CreateLinkData } from './domain/ports/public-links-repository.port';
import { PublicLink } from './domain/public-link';

@Injectable()
export class PublicLinksService {
  constructor(private readonly repo: PublicLinksRepositoryPort) {}

  async generate(data: CreateLinkData): Promise<PublicLink> {
    return this.repo.create(data);
  }

  async validate(token: string): Promise<PublicLink> {
    const link = await this.repo.findByToken(token);
    if (!link) throw new NotFoundException('Link no encontrado');
    if (!link.isValid) throw new ForbiddenException('Link expirado o revocado');
    return link;
  }
}
