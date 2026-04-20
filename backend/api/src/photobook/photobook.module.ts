import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotobookService } from './photobook.service';
import { PhotobookPublicController } from './photobook-public.controller';
import { PhotobookAdminController } from './photobook-admin.controller';
import { PhotobookThemeOrmEntity } from './infrastructure/persistence/entities/photobook-theme.orm-entity';
import { PhotobookProductOrmEntity } from './infrastructure/persistence/entities/photobook-product.orm-entity';
import { PhotobookProjectOrmEntity } from './infrastructure/persistence/entities/photobook-project.orm-entity';
import { PhotobookPageOrmEntity } from './infrastructure/persistence/entities/photobook-page.orm-entity';
import { PhotobookPageSlotOrmEntity } from './infrastructure/persistence/entities/photobook-page-slot.orm-entity';
import { PhotobookRenderOrmEntity } from './infrastructure/persistence/entities/photobook-render.orm-entity';
import { TypeOrmPhotobookRepository } from './infrastructure/persistence/repositories/typeorm-photobook.repository';
import { PhotobookRepositoryPort } from './domain/ports/photobook-repository.port';
import { PhotobookPdfService } from './infrastructure/pdf/photobook-pdf.service';
import { OrdersModule } from '../orders/orders.module';
import { PublicLinksModule } from '../public-links/public-links.module';
import { EmailModule } from '../email/email.module';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PhotobookThemeOrmEntity, PhotobookProductOrmEntity, PhotobookProjectOrmEntity,
      PhotobookPageOrmEntity, PhotobookPageSlotOrmEntity, PhotobookRenderOrmEntity,
    ]),
    forwardRef(() => OrdersModule),
    PublicLinksModule,
    EmailModule,
    AssetsModule,
  ],
  controllers: [PhotobookPublicController, PhotobookAdminController],
  providers: [
    PhotobookService,
    PhotobookPdfService,
    TypeOrmPhotobookRepository,
    { provide: PhotobookRepositoryPort, useExisting: TypeOrmPhotobookRepository },
  ],
  exports: [PhotobookService, PhotobookPdfService],
})
export class PhotobookModule {}
