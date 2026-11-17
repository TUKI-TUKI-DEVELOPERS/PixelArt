import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CheckoutService } from './checkout.service';
import { CheckoutPublicController } from './checkout-public.controller';
import { GetCheckoutInfoUseCase } from './application/use-cases/get-checkout-info.use-case';
import { SubmitCheckoutUseCase } from './application/use-cases/submit-checkout.use-case';
import { PreviewCheckoutPromoUseCase } from './application/use-cases/preview-checkout-promo.use-case';
import { PublicLinksModule } from '../public-links/public-links.module';
import { OrdersModule } from '../orders/orders.module';
import { AssetsModule } from '../assets/assets.module';
import { EmailModule } from '../email/email.module';
import { PromotionsModule } from '../promotions/promotion.module';

@Module({
  imports: [
    MulterModule.register({ limits: { fileSize: 10 * 1024 * 1024 } }),
    PublicLinksModule,
    OrdersModule,
    AssetsModule,
    EmailModule,
    PromotionsModule,
  ],
  controllers: [CheckoutPublicController],
  providers: [
    CheckoutService,
    GetCheckoutInfoUseCase,
    SubmitCheckoutUseCase,
    PreviewCheckoutPromoUseCase,
  ],
})
export class CheckoutModule {}
