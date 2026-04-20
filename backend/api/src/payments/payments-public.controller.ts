import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentsService } from './payments.service';

@Controller('payment')
export class PaymentsPublicController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':token')
  getPaymentInfo(@Param('token') token: string) {
    return this.paymentsService.getPaymentInfo(token);
  }

  @Post(':token/voucher')
  @UseInterceptors(FileInterceptor('file'))
  uploadVoucher(
    @Param('token') token: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Archivo requerido');
    return this.paymentsService.uploadVoucher(token, file.buffer, file.originalname, file.mimetype);
  }
}
