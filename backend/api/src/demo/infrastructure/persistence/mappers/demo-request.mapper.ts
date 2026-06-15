import { DemoRequest } from '../../../domain/demo-request';
import { DemoRequestOrmEntity } from '../entities/demo-request.orm-entity';

export class DemoRequestMapper {
  static toDomain(orm: DemoRequestOrmEntity): DemoRequest {
    return new DemoRequest(
      Number(orm.id),
      Number(orm.catalogBookId),
      Number(orm.catalogBookVariantId),
      Number(orm.personalizedCategoryId),
      Number(orm.personalizedModelId),
      orm.customerFullName,
      orm.customerEmail,
      orm.customerPhone,
      orm.shippingAddressLine1,
      orm.shippingAddressLine2,
      orm.shippingCity,
      orm.shippingRegion,
      orm.shippingReference,
      orm.deliveryDate,
      orm.wantsRush,
      orm.packagePreference ?? 'STANDARD',
      orm.wantsCustomDedication,
      orm.dedicationText,
      orm.recipientName ?? null,
      orm.recipientNickname ?? null,
      orm.dedicatorName ?? null,
      orm.genderDirection ?? null,
      orm.characterMeta ?? null,
      orm.messageOptional,
      orm.status,
      orm.createdAt,
      orm.updatedAt,
    );
  }
}
