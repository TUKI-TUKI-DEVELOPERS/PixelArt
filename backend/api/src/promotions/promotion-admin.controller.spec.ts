import { GUARDS_METADATA } from '@nestjs/common/constants';
import { ValidationPipe } from '@nestjs/common';
import { ROLES_KEY } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { PromotionAdminController } from './promotion-admin.controller';
import { SavePromotionDto } from './dto/save-promotion.dto';

describe('PromotionAdminController authorization metadata', () => {
  it('requires JWT authentication before ADMIN/OPERATOR role authorization', () => {
    expect(Reflect.getMetadata(GUARDS_METADATA, PromotionAdminController)).toEqual([JwtAuthGuard, RolesGuard]);
    expect(Reflect.getMetadata(ROLES_KEY, PromotionAdminController)).toEqual(['ADMIN', 'OPERATOR']);
  });
});

describe('PromotionAdminController', () => {
  const body = {
    code: ' NAVIDAD15 ',
    percent: 15,
    validFrom: '2026-12-01T05:00:00.000Z',
    validUntil: '2026-12-26T05:00:00.000Z',
    isActive: true,
    eligibility: [{ kind: 'PERSONALIZED_CATEGORY', refId: 3 }, { kind: 'CUSTOM_PHOTOBOOK' }],
  };

  function makeController() {
    const service = { findAll: jest.fn(), save: jest.fn(async (input) => input), delete: jest.fn() };
    return { controller: new PromotionAdminController(service as any), service };
  }

  it('create passes parsed dates and null refs to the service', async () => {
    const { controller, service } = makeController();
    await controller.create(body as unknown as SavePromotionDto);
    expect(service.save).toHaveBeenCalledWith({
      id: null,
      code: ' NAVIDAD15 ',
      percent: 15,
      validFrom: new Date('2026-12-01T05:00:00.000Z'),
      validUntil: new Date('2026-12-26T05:00:00.000Z'),
      isActive: true,
      eligibility: [{ kind: 'PERSONALIZED_CATEGORY', refId: 3 }, { kind: 'CUSTOM_PHOTOBOOK', refId: null }],
    });
  });

  it('update passes the id', async () => {
    const { controller, service } = makeController();
    await controller.update(5, body as unknown as SavePromotionDto);
    expect(service.save).toHaveBeenCalledWith(expect.objectContaining({ id: 5 }));
  });
});

describe('SavePromotionDto validation (global ValidationPipe settings)', () => {
  const pipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true });
  const validate = (value: unknown) =>
    pipe.transform(value, { type: 'body', metatype: SavePromotionDto });

  it('accepts a complete payload', async () => {
    await expect(
      validate({
        code: 'NAVIDAD15',
        percent: 15,
        validFrom: '2026-12-01T05:00:00.000Z',
        validUntil: '2026-12-26T05:00:00.000Z',
        eligibility: [{ kind: 'PERSONALIZED_BOOK', refId: 8 }],
      }),
    ).resolves.toBeInstanceOf(SavePromotionDto);
  });

  it('rejects fixed-amount discounts and missing targets', async () => {
    await expect(
      validate({
        code: 'X',
        percent: 15,
        discountType: 'fixed_cents',
        validFrom: '2026-12-01T05:00:00.000Z',
        validUntil: '2026-12-26T05:00:00.000Z',
        eligibility: [],
      }),
    ).rejects.toThrow();
  });

  it('rejects an unknown target kind', async () => {
    await expect(
      validate({
        code: 'X',
        percent: 15,
        validFrom: '2026-12-01T05:00:00.000Z',
        validUntil: '2026-12-26T05:00:00.000Z',
        eligibility: [{ kind: 'EVERYTHING' }],
      }),
    ).rejects.toThrow();
  });
});
