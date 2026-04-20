import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
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
   * Query: templateId, protectionMode (WATERMARK | LOW_QUALITY)
   * Body: multipart file
   */
  @Post('requests/:id/proposals')
  @UseInterceptors(FileInterceptor('file'))
  uploadProposal(
    @Param('id') id: string,
    @Query('templateId') templateId: string,
    @Query('protectionMode') protectionMode: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is required');
    if (!templateId) throw new BadRequestException('templateId is required');
    const mode = protectionMode === 'LOW_QUALITY' ? 'LOW_QUALITY' : 'WATERMARK';

    return this.demoService.uploadProposal({
      demoRequestId: Number(id),
      templateId: Number(templateId),
      protectionMode: mode as 'WATERMARK' | 'LOW_QUALITY',
      buffer: file.buffer,
      mimeType: file.mimetype,
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
   * DELETE /api/admin/demo/requests/:id/proposals/:proposalId
   * Elimina una propuesta del admin (DB + MinIO)
   */
  @Delete('requests/:id/proposals/:proposalId')
  deleteProposal(@Param('id') id: string, @Param('proposalId') proposalId: string) {
    return this.demoService.deleteProposal(Number(id), Number(proposalId));
  }
}
