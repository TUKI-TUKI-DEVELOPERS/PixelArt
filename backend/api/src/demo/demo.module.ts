import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AssetsModule } from '../assets/assets.module';
import { PublicLinksModule } from '../public-links/public-links.module';
import { EmailModule } from '../email/email.module';
import { DemoPublicController } from './demo-public.controller';
import { DemoAdminController } from './demo-admin.controller';
import { DemoService } from './demo.service';
import { DemoRequestOrmEntity } from './infrastructure/persistence/entities/demo-request.orm-entity';
import { DemoTemplateSelectionOrmEntity } from './infrastructure/persistence/entities/demo-template-selection.orm-entity';
import { DemoProposalOrmEntity } from './infrastructure/persistence/entities/demo-proposal.orm-entity';
import { TypeOrmDemoRepository } from './infrastructure/persistence/repositories/typeorm-demo.repository';
import { DemoRepositoryPort } from './domain/ports/demo-repository.port';
import { CreateDemoRequestUseCase } from './application/use-cases/create-demo-request.use-case';
import { ListDemoRequestsUseCase } from './application/use-cases/list-demo-requests.use-case';
import { GetDemoRequestDetailUseCase } from './application/use-cases/get-demo-request-detail.use-case';
import { UploadDemoProposalUseCase } from './application/use-cases/upload-demo-proposal.use-case';
import { SendDemoProposalsUseCase } from './application/use-cases/send-demo-proposals.use-case';
import { CreateOrderFromDemoUseCase } from './application/use-cases/create-order-from-demo.use-case';
import { SendUnifiedCheckoutUseCase } from './application/use-cases/send-unified-checkout.use-case';
import { DeleteDemoProposalUseCase } from './application/use-cases/delete-demo-proposal.use-case';
import { ReissueCheckoutLinkUseCase } from './application/use-cases/reissue-checkout-link.use-case';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DemoRequestOrmEntity, DemoTemplateSelectionOrmEntity, DemoProposalOrmEntity]),
    MulterModule.register({ limits: { fileSize: 20 * 1024 * 1024 } }),
    AssetsModule,
    PublicLinksModule,
    EmailModule,
    OrdersModule,
  ],
  controllers: [DemoPublicController, DemoAdminController],
  providers: [
    DemoService,
    TypeOrmDemoRepository,
    CreateDemoRequestUseCase,
    ListDemoRequestsUseCase,
    GetDemoRequestDetailUseCase,
    UploadDemoProposalUseCase,
    SendDemoProposalsUseCase,
    CreateOrderFromDemoUseCase,
    SendUnifiedCheckoutUseCase,
    DeleteDemoProposalUseCase,
    ReissueCheckoutLinkUseCase,
    { provide: DemoRepositoryPort, useExisting: TypeOrmDemoRepository },
  ],
  exports: [DemoService],
})
export class DemoModule {}
