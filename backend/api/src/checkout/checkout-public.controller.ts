import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckoutService } from './checkout.service';
import { PaymentSubmitThrottle, PromoPreviewThrottle } from '../common/decorators/throttle.decorators';
import { PromoPreviewDto } from './dto/promo-preview.dto';

@Controller('checkout')
export class CheckoutPublicController {
  constructor(private readonly checkoutService: CheckoutService) {}

  /**
   * GET /api/checkout/:token
   * Devuelve propuestas, plantillas disponibles y detalle de orden
   */
  @Get(':token')
  getInfo(@Param('token') token: string) {
    return this.checkoutService.getInfo(token);
  }

  /**
   * POST /api/checkout/:token/promo-preview
   * Body: { code, package } — valida el código sin escribir nada y devuelve
   * { code, percent, discountCents, totalCents } o un 4xx con el motivo en español.
   */
  @Post(':token/promo-preview')
  @HttpCode(200)
  @PromoPreviewThrottle()
  previewPromo(@Param('token') token: string, @Body() body: PromoPreviewDto) {
    return this.checkoutService.previewPromo({ token, code: body.code, packageType: body.package });
  }

  /**
   * POST /api/checkout/:token/submit
   * Body: multipart — additionalTemplateIds[], packageType, paymentProof (file), promoCode (opcional)
   */
  @Post(':token/submit')
  @PaymentSubmitThrottle()
  @UseInterceptors(FileInterceptor('paymentProof'))
  async submit(
    @Param('token') token: string,
    @Body('packageType') packageType: string,
    @Body('additionalTemplateIds') rawIds: string | string[],
    @UploadedFile() file: Express.Multer.File,
    @Body('promoCode') promoCode?: string,
  ) {
    if (!file) throw new BadRequestException('Comprobante de pago requerido');

    const pkg = packageType === 'PREMIUM' ? 'PREMIUM' : 'STANDARD';

    // additionalTemplateIds can come as CSV string or array from multipart
    let ids: number[];
    if (Array.isArray(rawIds)) {
      ids = rawIds.map(Number);
    } else if (typeof rawIds === 'string') {
      ids = rawIds.split(',').map((s) => Number(s.trim())).filter((n) => !isNaN(n));
    } else {
      ids = [];
    }

    return this.checkoutService.submit({
      token,
      additionalTemplateIds: ids,
      packageType: pkg,
      paymentBuffer: file.buffer,
      originalFilename: file.originalname,
      mimeType: file.mimetype,
      promoCode: typeof promoCode === 'string' ? promoCode : null,
    });
  }
}
