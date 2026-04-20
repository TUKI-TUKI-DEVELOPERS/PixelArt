import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DemoService } from './demo.service';
import { CreateDemoRequestData } from './domain/ports/demo-repository.port';
import { PublicLinksService } from '../public-links/public-links.service';
import { FileStoragePort } from '../assets/domain/ports/file-storage.port';
import { DemoRepositoryPort } from './domain/ports/demo-repository.port';

@Controller('demo')
export class DemoPublicController {
  constructor(
    private readonly demoService: DemoService,
    private readonly publicLinksService: PublicLinksService,
    private readonly fileStorage: FileStoragePort,
    private readonly demoRepo: DemoRepositoryPort,
    private readonly dataSource: DataSource,
  ) {}

  @Post('requests')
  create(@Body() body: CreateDemoRequestData) {
    return this.demoService.create(body);
  }

  /**
   * GET /api/demo/view/:token
   * Valida token DEMO_VIEW, devuelve propuestas protegidas con nombres y previews
   */
  @Get('view/:token')
  async viewByToken(@Param('token') token: string) {
    const link = await this.publicLinksService.validate(token);

    if (link.linkType !== 'DEMO_VIEW' || !link.demoRequestId) {
      throw new Error('Link inválido');
    }

    const detail = await this.demoRepo.findById(link.demoRequestId);
    if (!detail) throw new Error('Solicitud no encontrada');

    // Obtener nombre del modelo y del libro del catálogo
    const [modelRow] = await this.dataSource.query(
      `SELECT pm.name AS model_name, cb.name AS book_name
       FROM personalized_models pm
       LEFT JOIN catalog_books cb ON cb.name = pm.name
       WHERE pm.id = $1`,
      [detail.personalizedModelId],
    ) as { model_name: string; book_name: string | null }[];

    // Mapear templateId → info de plantilla desde templateSelections
    const templateMap = new Map(
      detail.templateSelections.map((ts) => [ts.templateId, ts]),
    );

    return {
      customerName: detail.customerFullName,
      bookName: modelRow?.model_name ?? `Libro Personalizado`,
      proposals: detail.proposals.map((p) => {
        const tpl = templateMap.get(p.templateId);
        return {
          templateId: p.templateId,
          templateName: tpl?.templateName ?? null,
          templatePreviewUrl: tpl?.templatePreviewKey
            ? this.fileStorage.getPublicUrl(tpl.templatePreviewKey)
            : null,
          imageUrl: this.fileStorage.getPublicUrl(p.outputStorageKey),
          protectionMode: p.protectionMode,
        };
      }),
      expiresAt: link.expiresAt,
    };
  }
}
