import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminThrottleExempt } from '../common/decorators/throttle.decorators';
import { GetAdminStorageObjectUseCase } from './application/use-cases/get-admin-storage-object.use-case';

/**
 * GET /api/admin/storage/<key> — private objects (vouchers, print assets,
 * print PDFs) for admin pages. Browsers reach it through the Next BFF at
 * /admin-api/storage/<key>, the URL FileStoragePort.getPublicUrl returns for
 * non-public keys.
 */
@Controller('admin/storage')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'OPERATOR')
@AdminThrottleExempt()
export class AdminStorageController {
  constructor(private readonly getObject: GetAdminStorageObjectUseCase) {}

  @Get('*')
  async stream(@Param('0') key: string, @Res() response: Response): Promise<void> {
    const object = await this.getObject.execute(key);
    for (const [name, value] of Object.entries(object.headers)) response.setHeader(name, value);
    object.body.on('error', () => response.destroy());
    object.body.pipe(response);
  }
}
