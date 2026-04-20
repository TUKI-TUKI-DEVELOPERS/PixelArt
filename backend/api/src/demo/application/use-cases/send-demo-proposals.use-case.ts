import { Injectable, BadRequestException } from '@nestjs/common';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { PublicLinksService } from '../../../public-links/public-links.service';
import { EmailService } from '../../../email/email.service';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';

@Injectable()
export class SendDemoProposalsUseCase {
  constructor(
    private readonly demoRepo: DemoRepositoryPort,
    private readonly publicLinksService: PublicLinksService,
    private readonly emailService: EmailService,
    private readonly fileStorage: FileStoragePort,
  ) {}

  async execute(demoRequestId: number) {
    // 1. Get detail
    const detail = await this.demoRepo.findById(demoRequestId);
    if (!detail) throw new BadRequestException('Demo request no encontrada');
    if (detail.proposals.length === 0) {
      throw new BadRequestException('Debe subir al menos una propuesta antes de enviar');
    }

    // 2. Generate public link DEMO_VIEW
    const link = await this.publicLinksService.generate({
      linkType: 'DEMO_VIEW',
      demoRequestId,
    });

    // 3. Build proposal URLs
    const proposalUrls = detail.proposals.map((p) => ({
      templateId: p.templateId,
      url: this.fileStorage.getPublicUrl(p.outputStorageKey),
    }));

    // 4. Queue email
    const frontendBase = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
    const demoViewUrl = `${frontendBase}/demo/${link.token}`;

    await this.emailService.queue({
      eventType: 'PROPOSALS_SENT_TO_CUSTOMER',
      demoRequestId,
      toEmail: detail.customerEmail,
      subject: `PixelArt — Tus propuestas están listas`,
      payload: {
        customerName: detail.customerFullName,
        demoViewUrl,
        proposals: proposalUrls,
      },
    });

    // 5. Update status
    await this.demoRepo.updateStatus(demoRequestId, 'PROPOSALS_SENT');

    return {
      status: 'PROPOSALS_SENT',
      publicLink: {
        token: link.token,
        url: demoViewUrl,
        expiresAt: link.expiresAt,
      },
    };
  }
}
