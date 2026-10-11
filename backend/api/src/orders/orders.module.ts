import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { OrdersService } from './orders.service';
import { OrdersAdminController } from './orders.controller';
import { OrderOrmEntity } from './infrastructure/persistence/entities/order.orm-entity';
import { OrderStatusEventOrmEntity } from './infrastructure/persistence/entities/order-status-event.orm-entity';
import { TypeOrmOrderRepository } from './infrastructure/persistence/repositories/typeorm-order.repository';
import { OrderRepositoryPort } from './domain/ports/order-repository.port';
import { CustomBookPdfService } from './infrastructure/pdf/custom-book-pdf.service';
import { GenerateOrderTemplateUseCase } from './application/use-cases/generate-order-template.use-case';
import { GenerateOrderCoverUseCase } from './application/use-cases/generate-order-cover.use-case';
import { GenerateOrderAddonUseCase } from './application/use-cases/generate-order-addon.use-case';
import { PaymentsModule } from '../payments/payments.module';
import { EmailModule } from '../email/email.module';
import { PhotobookModule } from '../photobook/photobook.module';
import { AssetsModule } from '../assets/assets.module';
import { PersonalizedModule } from '../personalized/personalized.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CmykPdfConverterService } from '../common/infrastructure/pdf/cmyk-pdf-converter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderOrmEntity, OrderStatusEventOrmEntity]),
    MulterModule.register({ storage: memoryStorage() }),
    forwardRef(() => PaymentsModule),
    forwardRef(() => PhotobookModule),
    forwardRef(() => AssetsModule),
    EmailModule,
    PersonalizedModule,
  ],
  controllers: [OrdersAdminController],
  providers: [
    JwtAuthGuard,
    RolesGuard,
    OrdersService,
    TypeOrmOrderRepository,
    { provide: OrderRepositoryPort, useExisting: TypeOrmOrderRepository },
    CustomBookPdfService,
        CmykPdfConverterService,
    GenerateOrderTemplateUseCase,
    GenerateOrderCoverUseCase,
    GenerateOrderAddonUseCase,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
