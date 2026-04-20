import { PublicLink } from '../../../domain/public-link';
import { PublicLinkOrmEntity } from '../entities/public-link.orm-entity';

export class PublicLinkMapper {
  static toDomain(orm: PublicLinkOrmEntity): PublicLink {
    return new PublicLink(
      Number(orm.id),
      orm.linkType,
      orm.token,
      orm.expiresAt,
      orm.revokedAt,
      orm.demoRequestId ? Number(orm.demoRequestId) : null,
      orm.orderId ? Number(orm.orderId) : null,
      orm.createdAt,
    );
  }
}
