import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PublicLinksService } from '../../../public-links/public-links.service';
import { OrdersService } from '../../../orders/orders.service';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';

@Injectable()
export class GetCheckoutInfoUseCase {
  constructor(
    private readonly publicLinksService: PublicLinksService,
    private readonly ordersService: OrdersService,
    private readonly fileStorage: FileStoragePort,
    private readonly dataSource: DataSource,
  ) {}

  async execute(token: string) {
    const link = await this.publicLinksService.findByToken(token);
    if (!link) throw new NotFoundException('Link no encontrado');
    if (link.linkType !== 'CHECKOUT' || !link.orderId) {
      throw new BadRequestException('Link de checkout inválido');
    }
    // Link expirado sin haberse revocado (venció antes de que pagara)
    if (link.isExpired && !link.isRevoked) {
      throw new ForbiddenException('El link de pago expiró. Contactá al equipo para que te envíen uno nuevo.');
    }

    const order = await this.ordersService.findById(link.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');

    // Link revocado → el cliente ya pagó, devolvemos solo el estado de la orden
    if (link.isRevoked) {
      return { orderStatus: order.status };
    }

    if (!order.demoRequestId) throw new BadRequestException('Orden sin demo request asociada');

    const demoRequestId = order.demoRequestId;

    // Proposals with template info
    const proposalRows: {
      template_id: string;
      template_name: string | null;
      template_preview_key: string | null;
      output_storage_key: string;
      protection_mode: string;
    }[] = await this.dataSource.query(
      `SELECT dp.template_id, pt.name AS template_name, pt.template_preview_key,
              dp.output_storage_key, dp.protection_mode
       FROM demo_proposals dp
       LEFT JOIN personalized_templates pt ON pt.id = dp.template_id
       WHERE dp.demo_request_id = $1`,
      [demoRequestId],
    );

    // Already selected template IDs (3 from demo request)
    const selectionRows: { template_id: string }[] = await this.dataSource.query(
      `SELECT template_id FROM demo_template_selections WHERE demo_request_id = $1`,
      [demoRequestId],
    );
    const alreadySelectedIds = selectionRows.map((r) => Number(r.template_id));

    // Customer name, package preference and gender direction from demo request
    // (gender_direction se consulta ANTES que availableTemplates porque el filtro de abajo la necesita)
    const [demoRow] = await this.dataSource.query(
      `SELECT customer_full_name, package_preference, gender_direction FROM demo_request WHERE id = $1`,
      [demoRequestId],
    ) as { customer_full_name: string; package_preference: string; gender_direction: string | null }[];

    // All active templates from the same personalized_model Y misma dirección de género
    // (si el modelo no distingue dirección, gender_direction es NULL en ambos lados y el
    // filtro sigue funcionando igual).
    const availableRows: { id: string; name: string | null; template_preview_key: string }[] =
      await this.dataSource.query(
        `SELECT id, name, template_preview_key
         FROM personalized_templates
         WHERE model_id = $1
           AND is_active = TRUE
           AND gender_direction IS NOT DISTINCT FROM $2
           AND id NOT IN (
             SELECT template_id FROM demo_template_selections WHERE demo_request_id = $3
           )
         ORDER BY id`,
        [order.personalizedModelId, demoRow?.gender_direction ?? null, demoRequestId],
      );

    // Model and book name
    const [modelRow] = await this.dataSource.query(
      `SELECT pm.name AS model_name FROM personalized_models pm WHERE pm.id = $1`,
      [order.personalizedModelId],
    ) as { model_name: string }[];

    // Check if payment proof already submitted
    const [proofRow] = await this.dataSource.query(
      `SELECT id FROM payment_proofs WHERE order_id = $1`,
      [order.id],
    ) as { id: string }[];

    return {
      orderStatus: order.status,
      customerName: demoRow?.customer_full_name ?? order.customerFullName,
      packagePreference: (demoRow?.package_preference ?? 'STANDARD') as 'STANDARD' | 'PREMIUM',
      bookName: modelRow?.model_name ?? 'Libro Personalizado',
      orderId: order.id,
      baseAmountCents: order.baseAmountCents,
      rushFeeCents: order.rushFeeCents,
      extraTemplatesAmountCents: order.extraTemplatesAmountCents,
      currency: order.currency,
      expiresAt: link.expiresAt,
      proposals: proposalRows.map((p) => ({
        templateId: Number(p.template_id),
        templateName: p.template_name,
        templatePreviewUrl: p.template_preview_key
          ? this.fileStorage.getPublicUrl(p.template_preview_key)
          : null,
        imageUrl: this.fileStorage.getPublicUrl(p.output_storage_key),
        protectionMode: p.protection_mode,
      })),
      alreadySelectedTemplateIds: alreadySelectedIds,
      availableTemplates: availableRows.map((t) => ({
        id: Number(t.id),
        name: t.name,
        previewUrl: this.fileStorage.getPublicUrl(t.template_preview_key),
      })),
      hasPaymentProof: !!proofRow,
    };
  }
}
