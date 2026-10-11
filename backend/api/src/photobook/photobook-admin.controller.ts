import { Body, Controller, Delete, Get, Post, Patch, Param, NotFoundException, BadRequestException, Logger, Res, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotobookService } from './photobook.service';
import { PhotobookPdfService } from './infrastructure/pdf/photobook-pdf.service';
import { PhotobookRepositoryPort } from './domain/ports/photobook-repository.port';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GenerateCustomPhotobookCoverProposalDto } from './dto/generate-custom-photobook-cover-proposal.dto';
import type { Response } from 'express';
import { CmykPdfConverterService } from '../common/infrastructure/pdf/cmyk-pdf-converter.service';

@Controller('admin/photobook')
export class PhotobookAdminController {
  constructor(
    private readonly service: PhotobookService,
    private readonly pdfService: PhotobookPdfService,
    private readonly repo: PhotobookRepositoryPort,
    private readonly cmykPdfConverter: CmykPdfConverterService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('custom-requests')
  listCustomRequests() { return this.service.listCustomRequests(); }

  @UseGuards(JwtAuthGuard)
  @Get('custom-requests/:id')
  async getCustomRequest(@Param('id') id: string) {
    const request = await this.service.getCustomRequest(Number(id));
    if (!request) throw new NotFoundException('Solicitud de photobook a medida no encontrada');
    return request;
  }

  @UseGuards(JwtAuthGuard)
  @Get('custom-requests/:id/references')
  listCustomReferenceAssets(@Param('id') id: string) {
    return this.service.listCustomReferenceAssets(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('custom-requests/:id/references')
  @UseInterceptors(FileInterceptor('file'))
  addCustomReferenceAsset(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Debes seleccionar una foto');
    return this.service.addCustomReferenceAsset(Number(id), {
      buffer: file.buffer,
      originalFilename: file.originalname,
      mimeType: file.mimetype,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('custom-requests/:id/references/:assetId/replace')
  @UseInterceptors(FileInterceptor('file'))
  replaceCustomReferenceAsset(
    @Param('id') id: string,
    @Param('assetId') assetId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Debes seleccionar una foto');
    return this.service.replaceCustomReferenceAsset(Number(id), Number(assetId), {
      buffer: file.buffer,
      originalFilename: file.originalname,
      mimeType: file.mimetype,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('custom-requests/:id/references/:assetId/active')
  setCustomReferenceAssetActive(
    @Param('id') id: string,
    @Param('assetId') assetId: string,
    @Body() body: { isActive?: unknown },
  ) {
    if (typeof body.isActive !== 'boolean') throw new BadRequestException('isActive debe ser booleano');
    return this.service.setCustomReferenceAssetActive(Number(id), Number(assetId), body.isActive);
  }

  @UseGuards(JwtAuthGuard)
  @Get('custom-requests/:id/designs')
  listCustomCoverProposals(@Param('id') id: string) {
    return this.service.listCustomCoverProposals(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('custom-requests/:id/designs/:designId/download')
  async downloadCustomCoverProposal(
    @Param('id') id: string,
    @Param('designId') designId: string,
    @Res() response: Response,
  ) {
    const file = await this.service.downloadCustomCoverProposal(Number(id), Number(designId));
    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    response.send(file.buffer);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('custom-requests/:id/designs/:designId')
  deleteCustomCoverProposal(
    @Param('id') id: string,
    @Param('designId') designId: string,
  ) {
    return this.service.deleteCustomCoverProposal(Number(id), Number(designId));
  }

  @UseGuards(JwtAuthGuard)
  @Post('custom-requests/:id/designs/:designId/select')
  selectCustomCoverProposal(
    @Param('id') id: string,
    @Param('designId') designId: string,
  ) {
    return this.service.selectCustomCoverProposal(Number(id), Number(designId));
  }

  @UseGuards(JwtAuthGuard)
  @Post('custom-requests/:id/cover-approval/send')
  sendCustomCoverApproval(@Param('id') id: string) {
    return this.service.sendCustomCoverApproval(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('custom-requests/:id/editor-code/send')
  sendCustomEditorCode(@Param('id') id: string) {
    return this.service.sendCustomEditorCode(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('custom-requests/:id/designs/generate')
  generateCustomCoverProposal(
    @Param('id') id: string,
    @Body() body: GenerateCustomPhotobookCoverProposalDto,
  ) {
    return this.service.generateCustomCoverProposal(Number(id), body);
  }

  @Get('projects')
  listProjects() { return this.service.listProjects(); }

  @Get('projects/:id')
  getProjectDetail(@Param('id') id: string) { return this.service.getProjectDetail(Number(id)); }

  @Post('projects/:id/create-order')
  createOrder(@Param('id') id: string) { return this.service.createOrderFromProject(Number(id)); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Get('projects/:id/print-cmyk/:part')
  async downloadProjectCmyk(@Param('id') id: string, @Param('part') part: string, @Res() response: Response) {
    if (part !== 'covers' && part !== 'interior') throw new BadRequestException('Documento inválido');
    const pdf = await this.pdfService.renderCmykSource(Number(id), part);
    const converted = await this.cmykPdfConverter.convert(pdf);
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', `attachment; filename="photobook-${id}-${part}-cmyk.pdf"`);
    response.send(converted);
  }

  @Get('projects/:id/render')
  async getRender(@Param('id') id: string) {
    const render = await this.repo.findRenderByProjectId(Number(id));
    if (!render) throw new NotFoundException('PDF no generado aún para este proyecto');
    const pdfUrl = this.pdfService.getPdfUrl(render.pdfStorageKey);
    const isLegacyCombined = !/\/generation-[^/]+\/covers\.pdf$/.test(render.pdfStorageKey);
    return {
      pdfUrl,
      coversUrl: isLegacyCombined ? null : pdfUrl,
      interiorUrl: isLegacyCombined ? null : this.pdfService.getPdfUrl(render.pdfStorageKey.replace(/covers\.pdf$/, 'interior.pdf')),
      isLegacyCombined,
      legacyCombinedUrl: isLegacyCombined ? pdfUrl : null,
      generatedAt: render.generatedAt,
    };
  }

  @Post('projects/:id/render')
  regenerateRender(@Param('id') id: string) {
    const projectId = Number(id);
    // Fire & forget — igual que el flujo automático al aprobar el pago
    void this.pdfService.generateAndStore(projectId).catch((err: Error) => {
      new Logger(PhotobookAdminController.name).error(`Error regenerando PDF proyecto #${projectId}: ${err.message}`);
    });
    return { queued: true };
  }
}
