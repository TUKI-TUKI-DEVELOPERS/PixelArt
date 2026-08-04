import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DemoService } from './demo.service';

@Controller('admin/demo')
export class DemoAdminController {
  constructor(private readonly demoService: DemoService) {}

  @Get('requests')
  listAll() {
    return this.demoService.listAll();
  }

  @Get('requests/:id')
  getDetail(@Param('id') id: string) {
    return this.demoService.getDetail(Number(id));
  }

  /**
   * POST /api/admin/demo/requests/:id/proposals
   * Query: templateId
   * Body: multipart file
   */
  @Post('requests/:id/proposals')
  @UseInterceptors(FileInterceptor('file'))
  uploadProposal(
    @Param('id') id: string,
    @Query('templateId') templateId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is required');
    if (!templateId) throw new BadRequestException('templateId is required');

    return this.demoService.uploadProposal({
      demoRequestId: Number(id),
      templateId: Number(templateId),
      buffer: file.buffer,
      mimeType: file.mimetype,
      generatedByUserId: null,
    });
  }

  /**
   * POST /api/admin/demo/requests/:id/proposals/generate
   * Query: templateId
   * Body opcional: { selectedAssetIds: { [roleKey]: assetId } } — qué foto
   * usar por cada persona cuando subió más de una (por defecto, la primera).
   * Genera la imagen con IA (fotos reales del cliente) en vez de subirla a mano.
   */
  @Post('requests/:id/proposals/generate')
  generateProposal(
    @Param('id') id: string,
    @Query('templateId') templateId: string,
    @Body('selectedAssetIds') selectedAssetIds?: Record<string, number>,
  ) {
    if (!templateId) throw new BadRequestException('templateId is required');

    return this.demoService.generateProposal({
      demoRequestId: Number(id),
      templateId: Number(templateId),
      selectedAssetIds,
      generatedByUserId: null,
    });
  }

  /**
   * POST /api/admin/demo/requests/:id/send-proposals
   * Cambia status a PROPOSALS_SENT, genera link DEMO_VIEW, inserta email_outbox
   */
  @Post('requests/:id/send-proposals')
  sendProposals(@Param('id') id: string) {
    return this.demoService.sendProposals(Number(id));
  }

  @Post('requests/:id/create-order')
  createOrder(@Param('id') id: string) {
    return this.demoService.createOrder(Number(id));
  }

  /**
   * POST /api/admin/demo/requests/:id/send-checkout
   * Flujo unificado: crea orden + genera link CHECKOUT + envía email al cliente
   */
  @Post('requests/:id/send-checkout')
  sendUnifiedCheckout(@Param('id') id: string) {
    return this.demoService.sendUnifiedCheckout(Number(id));
  }

  /**
   * POST /api/admin/demo/requests/:id/replace-photo
   * Query: oldAssetId
   * Body: multipart file
   * Reemplaza una foto del cliente (junction demo_request_assets +
   * character_meta anidado) sin perder la agrupación por persona.
   */
  @Post('requests/:id/replace-photo')
  @UseInterceptors(FileInterceptor('file'))
  replacePhoto(
    @Param('id') id: string,
    @Query('oldAssetId') oldAssetId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is required');
    if (!oldAssetId) throw new BadRequestException('oldAssetId is required');
    return this.demoService.replacePhoto({
      demoRequestId: Number(id),
      oldAssetId: Number(oldAssetId),
      buffer: file.buffer,
      originalFilename: file.originalname,
      mimeType: file.mimetype,
    });
  }

  /**
   * DELETE /api/admin/demo/requests/:id/proposals/:proposalId
   * Elimina una propuesta del admin (DB + MinIO)
   */
  @Delete('requests/:id/proposals/:proposalId')
  deleteProposal(@Param('id') id: string, @Param('proposalId') proposalId: string) {
    return this.demoService.deleteProposal(Number(id), Number(proposalId));
  }

  /**
   * POST /api/admin/demo/requests/:id/reissue-checkout
   * Revoca el link anterior y genera uno nuevo con TTL 7 días
   */
  @Post('requests/:id/reissue-checkout')
  reissueCheckout(@Param('id') id: string) {
    return this.demoService.reissueCheckoutLink(Number(id));
  }
}
