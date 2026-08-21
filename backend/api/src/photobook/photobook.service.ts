import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PhotobookRepositoryPort, CreateProjectData } from './domain/ports/photobook-repository.port';
import { calculatePhotobookRushFeeCents, calculatePhotobookTotalCents, isValidPhotobookCoverType } from './domain/services/photobook-pricing.service';
import { FileStoragePort } from '../assets/domain/ports/file-storage.port';
import { OrdersService } from '../orders/orders.service';
import { PublicLinksService } from '../public-links/public-links.service';
import { EmailService } from '../email/email.service';

type OrderInfo = { orderId: number; totalAmountCents: number; paymentLink: { token: string; url: string; expiresAt: Date } };

@Injectable()
export class PhotobookService {
  private readonly logger = new Logger(PhotobookService.name);

  constructor(
    private readonly repo: PhotobookRepositoryPort,
    private readonly fileStorage: FileStoragePort,
    private readonly ordersService: OrdersService,
    private readonly publicLinksService: PublicLinksService,
    private readonly emailService: EmailService,
    private readonly dataSource: DataSource,
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

  async createDraft(photobookProductId: number, photobookThemeId: number, state: Record<string, unknown>) {
    const [product, theme] = await Promise.all([
      this.repo.getProduct(photobookProductId),
      this.repo.getTheme(photobookThemeId),
    ]);
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (!theme) throw new NotFoundException('Tema no encontrado');
    return this.repo.createDraft({ photobookProductId, photobookThemeId, state });
  }

  updateDraftState(draftToken: string, state: Record<string, unknown>) {
    return this.repo.updateDraftState(draftToken, state);
  }

  // Si el token ya no está en DRAFT (el cliente ya confirmó y volvió a esta
  // URL, ej. con el botón atrás), no tiene sentido devolver un editor vacío —
  // lo mandamos de nuevo a pagar. createOrderFromProject es idempotente, así
  // que llamarla de nuevo acá es seguro: no crea nada, solo devuelve el
  // mismo link que ya existía.
  async getDraft(draftToken: string) {
    const draft = await this.repo.findDraftByToken(draftToken);
    if (!draft) return null;
    if (draft.status === 'DRAFT') return draft;

    try {
      const order = await this.createOrderFromProject(draft.id);
      return { ...draft, paymentUrl: order.paymentLink.url };
    } catch {
      return { ...draft, paymentUrl: null };
    }
  }

  async getProjectDetail(id: number) {
    const detail = await this.repo.findProjectById(id);
    if (!detail) return null;

    const orderRows: { id: string }[] = await this.dataSource.query(
      `SELECT id FROM orders WHERE photobook_project_id = $1 LIMIT 1`,
      [id],
    );
    const orderId = orderRows.length > 0 ? Number(orderRows[0].id) : null;

    let hasPaymentProof = false;
    if (orderId) {
      const proofRows: { id: string }[] = await this.dataSource.query(
        `SELECT id FROM payment_proofs WHERE order_id = $1 LIMIT 1`,
        [orderId],
      );
      hasPaymentProof = proofRows.length > 0;
    }

    return { ...detail, orderId, hasPaymentProof };
  }

  async createProject(data: CreateProjectData, draftToken?: string) {
    const product = await this.repo.getProduct(data.photobookProductId);
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (data.pages.length < product.minPages) {
      throw new BadRequestException(`Mínimo ${product.minPages} páginas requeridas`);
    }
    if (product.allowsCustomDimensions && (!data.customWidthCm || !data.customHeightCm)) {
      throw new BadRequestException('Este producto requiere dimensiones personalizadas (ancho y alto)');
    }
    if (!isValidPhotobookCoverType(data.coverType)) {
      throw new BadRequestException('Tipo de tapa inválido');
    }

    // El precio nunca se confía del cliente — se recalcula acá con el mismo
    // criterio que muestra el editor (tapa + hojas + rush), no con el
    // price_per_page_cents plano del producto.
    const wantsRush = !!data.wantsRush;
    const rushFeeCents = calculatePhotobookRushFeeCents(wantsRush);
    const calculatedTotalCents = calculatePhotobookTotalCents(data.coverType, data.pages.length, wantsRush);

    const finalData: CreateProjectData = {
      ...data,
      pricePerPageCents: product.pricePerPageCents,
      rushFeeCents,
      calculatedTotalCents,
    };

    // Si vino de un borrador (URL con ?draft=...), convierte esa misma fila en
    // vez de crear un proyecto duplicado. Si el token ya no es válido (borrador
    // ajeno, ya confirmado, etc.), sigue de largo y crea uno nuevo para no
    // bloquear al cliente.
    let savedProject;
    if (draftToken) {
      savedProject = await this.repo.confirmDraft(draftToken, finalData);
    }
    if (!savedProject) {
      savedProject = await this.repo.createProject(finalData);
    }

    // Crea la orden + link de pago automáticamente, sin esperar a que un admin
    // lo procese a mano. Si esto falla, el proyecto ya quedó guardado bien —
    // no rompemos la respuesta al cliente por un error acá; queda como
    // excepción para procesar a mano desde el admin (createOrderFromProject
    // es idempotente, así que reintentarlo después es seguro).
    let order: OrderInfo | null = null;
    try {
      order = await this.createOrderFromProject(savedProject.id);
    } catch (err) {
      this.logger.warn(`No se pudo crear la orden automática para el proyecto #${savedProject.id}: ${(err as Error).message}`);
    }

    return { ...savedProject, order };
  }

  // Idempotente: si el proyecto ya tiene una orden (doble click, reintento por
  // timeout, o ya se procesó antes), devuelve esa misma orden/link en vez de
  // intentar crear otra — evita chocar contra la restricción única
  // orders.photobook_project_id y evita mandar el email de pago dos veces.
  async createOrderFromProject(projectId: number): Promise<OrderInfo> {
    const frontendBase = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    const existingOrderRows: { id: string }[] = await this.dataSource.query(
      `SELECT id FROM orders WHERE photobook_project_id = $1 LIMIT 1`,
      [projectId],
    );
    if (existingOrderRows.length > 0) {
      const existingOrder = await this.ordersService.findById(Number(existingOrderRows[0].id));
      if (existingOrder) {
        const existingLinkRows: { token: string; expires_at: Date }[] = await this.dataSource.query(
          `SELECT token, expires_at FROM public_links
           WHERE order_id = $1 AND link_type = 'PAYMENT_UPLOAD' AND revoked_at IS NULL
           ORDER BY created_at DESC LIMIT 1`,
          [existingOrder.id],
        );
        const link = existingLinkRows.length > 0
          ? { token: existingLinkRows[0].token, expiresAt: existingLinkRows[0].expires_at }
          : await this.publicLinksService.generate({ linkType: 'PAYMENT_UPLOAD', orderId: existingOrder.id });
        return {
          orderId: existingOrder.id,
          totalAmountCents: existingOrder.totalAmountCents,
          paymentLink: { token: link.token, url: `${frontendBase}/pagar/${link.token}`, expiresAt: link.expiresAt },
        };
      }
    }

    const detail = await this.repo.findProjectById(projectId);
    if (!detail) throw new NotFoundException('Proyecto no encontrado');
    if (detail.status !== 'CONFIRMED') throw new BadRequestException('El proyecto debe estar confirmado');

    const order = await this.ordersService.create({
      channel: 'PHOTOBOOK',
      photobookProjectId: projectId,
      customerFullName: detail.customerFullName ?? '',
      customerEmail: detail.customerEmail ?? '',
      customerPhone: detail.customerPhone ?? '',
      baseAmountCents: detail.calculatedTotalCents,
    });

    await this.repo.updateProjectStatus(projectId, 'CONVERTED_TO_ORDER');

    const link = await this.publicLinksService.generate({ linkType: 'PAYMENT_UPLOAD', orderId: order.id });
    const paymentUrl = `${frontendBase}/pagar/${link.token}`;

    await this.emailService.queue({
      eventType: 'PAYMENT_PROOF_RECEIVED_ADMIN',
      orderId: order.id,
      toEmail: detail.customerEmail ?? '',
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
