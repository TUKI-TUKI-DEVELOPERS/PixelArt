import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersAdminController } from './orders.controller';
import { OrderOrmEntity } from './infrastructure/persistence/entities/order.orm-entity';
import { OrderStatusEventOrmEntity } from './infrastructure/persistence/entities/order-status-event.orm-entity';
import { TypeOrmOrderRepository } from './infrastructure/persistence/repositories/typeorm-order.repository';
import { OrderRepositoryPort } from './domain/ports/order-repository.port';
import { PaymentsModule } from '../payments/payments.module';
import { EmailModule } from '../email/email.module';
import { PhotobookModule } from '../photobook/photobook.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderOrmEntity, OrderStatusEventOrmEntity]),
    forwardRef(() => PaymentsModule),
    forwardRef(() => PhotobookModule),
    EmailModule,
  ],
  controllers: [OrdersAdminController],
  providers: [
    OrdersService,
    TypeOrmOrderRepository,
    { provide: OrderRepositoryPort, useExisting: TypeOrmOrderRepository },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
