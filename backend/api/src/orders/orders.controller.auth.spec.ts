import { GUARDS_METADATA } from '@nestjs/common/constants';
import { ROLES_KEY } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { OrdersAdminController } from './orders.controller';

describe('OrdersAdminController authorization metadata', () => {
  it('requires JWT authentication before ADMIN/OPERATOR role authorization', () => {
    expect(Reflect.getMetadata(GUARDS_METADATA, OrdersAdminController)).toEqual([JwtAuthGuard, RolesGuard]);
    expect(Reflect.getMetadata(ROLES_KEY, OrdersAdminController)).toEqual(['ADMIN', 'OPERATOR']);
  });
});
