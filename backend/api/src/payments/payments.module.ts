import { BadRequestException, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

const ALLOWED_VOUCHER_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
import { PaymentsService } from './payments.service';
import { PaymentsPublicController } from './payments-public.controller';
import { PaymentProofOrmEntity } from './infrastructure/persistence/entities/payment-proof.orm-entity';
import { TypeOrmPaymentsRepository } from './infrastructure/persistence/repositories/typeorm-payments.repository';
import { PaymentsRepositoryPort } from './domain/ports/payments-repository.port';
import { PublicLinksModule } from '../public-links/public-links.module';
import { OrdersModule } from '../orders/orders.module';
import { AssetsModule } from '../assets/assets.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentProofOrmEntity]),
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (!ALLOWED_VOUCHER_MIME_TYPES.includes(file.mimetype)) {
          callback(new BadRequestException('Solo se permiten imágenes (JPG, PNG o WEBP)'), false);
          return;
        }
        callback(null, true);
      },
    }),
    PublicLinksModule,
    forwardRef(() => OrdersModule),
    AssetsModule,
    EmailModule,
  ],
  controllers: [PaymentsPublicController],
  providers: [
    PaymentsService,
    TypeOrmPaymentsRepository,
    { provide: PaymentsRepositoryPort, useExisting: TypeOrmPaymentsRepository },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
