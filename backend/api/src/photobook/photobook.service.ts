import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PhotobookRepositoryPort, CreateProjectData } from './domain/ports/photobook-repository.port';
import { FileStoragePort } from '../assets/domain/ports/file-storage.port';
import { OrdersService } from '../orders/orders.service';
import { PublicLinksService } from '../public-links/public-links.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class PhotobookService {
  constructor(
    private readonly repo: PhotobookRepositoryPort,
    private readonly fileStorage: FileStoragePort,
    private readonly ordersService: OrdersService,
    private readonly publicLinksService: PublicLinksService,
    private readonly emailService: EmailService,
  ) {}

  async listThemes() {
    const themes = await this.repo.listThemes();
    return themes.map((t) => ({
      id: t.id,
      name: t.name,
      coverPreviewUrl: this.fileStorage.getPublicUrl(t.coverPreviewKey),
      coverTemplateUrl: this.fileStorage.getPublicUrl(t.coverTemplateKey),
      backCoverUrl: t.backCoverKey ? this.fileStorage.getPublicUrl(t.backCoverKey) : null,
      isActive: t.isActive,
    }));
  }
  listProducts() { return this.repo.listProducts(); }
  listProjects() { return this.repo.findAllProjects(); }
  getProjectDetail(id: number) { return this.repo.findProjectById(id); }

  async createProject(data: CreateProjectData) {
    const product = await this.repo.getProduct(data.photobookProductId);
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (data.pages.length < product.minPages) {
      throw new BadRequestException(`Mínimo ${product.minPages} páginas requeridas`);
    }
    if (product.allowsCustomDimensions && (!data.customWidthCm || !data.customHeightCm)) {
      throw new BadRequestException('Este producto requiere dimensiones personalizadas (ancho y alto)');
    }
    return this.repo.createProject({ ...data, pricePerPageCents: product.pricePerPageCents });
  }

  async createOrderFromProject(projectId: number) {
    const detail = await this.repo.findProjectById(projectId);
    if (!detail) throw new NotFoundException('Proyecto no encontrado');
    if (detail.status !== 'CONFIRMED') throw new BadRequestException('El proyecto debe estar confirmado');

    const order = await this.ordersService.create({
      channel: 'PHOTOBOOK',
      photobookProjectId: projectId,
      customerFullName: detail.customerFullName ?? '',
      customerEmail: detail.customerEmail,
      customerPhone: detail.customerPhone ?? '',
      baseAmountCents: detail.calculatedTotalCents,
    });

    await this.repo.updateProjectStatus(projectId, 'CONVERTED_TO_ORDER');

    const link = await this.publicLinksService.generate({ linkType: 'PAYMENT_UPLOAD', orderId: order.id });
    const frontendBase = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
    const paymentUrl = `${frontendBase}/pagar/${link.token}`;

    await this.emailService.queue({
      eventType: 'PAYMENT_PROOF_RECEIVED_ADMIN',
      orderId: order.id,
      toEmail: detail.customerEmail,
      subject: 'PixelArt — Link de pago para tu Photobook',
      payload: { customerName: detail.customerFullName, paymentUrl, totalAmountCents: order.totalAmountCents },
    });

    return {
      orderId: order.id,
      totalAmountCents: order.totalAmountCents,
      paymentLink: { token: link.token, url: paymentUrl, expiresAt: link.expiresAt },
    };
  }
}
