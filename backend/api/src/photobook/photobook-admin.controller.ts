import { Controller, Get, Post, Param, NotFoundException } from '@nestjs/common';
import { PhotobookService } from './photobook.service';
import { PhotobookPdfService } from './infrastructure/pdf/photobook-pdf.service';
import { PhotobookRepositoryPort } from './domain/ports/photobook-repository.port';

@Controller('admin/photobook')
export class PhotobookAdminController {
  constructor(
    private readonly service: PhotobookService,
    private readonly pdfService: PhotobookPdfService,
    private readonly repo: PhotobookRepositoryPort,
  ) {}

  @Get('projects')
  listProjects() { return this.service.listProjects(); }

  @Get('projects/:id')
  getProjectDetail(@Param('id') id: string) { return this.service.getProjectDetail(Number(id)); }

  @Post('projects/:id/create-order')
  createOrder(@Param('id') id: string) { return this.service.createOrderFromProject(Number(id)); }

  @Get('projects/:id/render')
  async getRender(@Param('id') id: string) {
    const render = await this.repo.findRenderByProjectId(Number(id));
    if (!render) throw new NotFoundException('PDF no generado aún para este proyecto');
    return {
      pdfUrl: this.pdfService.getPdfUrl(render.pdfStorageKey),
      generatedAt: render.generatedAt,
    };
  }
}
