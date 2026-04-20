// TODO: Implementar decorator @Roles('ADMIN', 'OPERATOR')
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Array<'ADMIN' | 'OPERATOR' | 'VIEWER'>) =>
  SetMetadata(ROLES_KEY, roles);