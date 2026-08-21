import { Injectable, BadRequestException } from '@nestjs/common';
import { DemoRepositoryPort, CreateDemoRequestData } from '../../domain/ports/demo-repository.port';
import { DemoRequest } from '../../domain/demo-request';
import { EmailService } from '../../../email/email.service';

const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'luccano5@hotmail.com';

@Injectable()
export class CreateDemoRequestUseCase {
  constructor(
    private readonly repo: DemoRepositoryPort,
    private readonly emailService: EmailService,
  ) {}

  async execute(data: CreateDemoRequestData): Promise<DemoRequest> {
    if (!data.templateIds || data.templateIds.length === 0) {
      throw new BadRequestException('Debe seleccionar al menos 1 plantilla');
    }
    if (data.templateIds.length > 3) {
      throw new BadRequestException('Máximo 3 plantillas permitidas');
    }
    if (data.assetIds && data.assetIds.length > 20) {
      throw new BadRequestException('Máximo 20 fotos permitidas');
    }
    const demoRequest = await this.repo.create(data);

    const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    await this.emailService.queue({
      eventType: 'NEW_DEMO_REQUEST_TO_ADMIN',
      demoRequestId: demoRequest.id,
      toEmail: ADMIN_NOTIFICATION_EMAIL,
      subject: 'PixelArt — Nueva solicitud de demo',
      payload: {
        customerName: demoRequest.customerFullName,
        adminUrl: `${frontendBase}/admin/libros-personalizados/solicitudes/${demoRequest.id}`,
      },
    });

    return demoRequest;
  }
}
