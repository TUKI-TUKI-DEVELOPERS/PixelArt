import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { MinioStorageService } from '../../../assets/infrastructure/storage/minio-storage.service';

@Injectable()
export class GetDemoRequestDetailUseCase {
  constructor(
    private readonly repo: DemoRepositoryPort,
    private readonly storage: MinioStorageService,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: number) {
    const result = await this.repo.findById(id);
    if (!result) {
      throw new NotFoundException(`Demo request #${id} no encontrada`);
    }

    // Recuperar la orden vinculada (si existe) y el checkout link activo
    let checkoutLink: { token: string; url: string; expiresAt: Date; orderId: number } | null = null;

    const orderRows: { order_id: string }[] = await this.dataSource.query(
      `SELECT id AS order_id FROM orders WHERE demo_request_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [id],
    );
    const linkedOrderId = orderRows.length > 0 ? Number(orderRows[0].order_id) : null;

    if (linkedOrderId) {
      const linkRows: { token: string; expires_at: Date }[] = await this.dataSource.query(
        `SELECT token, expires_at FROM public_links
         WHERE order_id = $1 AND link_type = 'CHECKOUT'
         ORDER BY created_at DESC LIMIT 1`,
        [linkedOrderId],
      );
      const frontendBase = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
      if (linkRows.length > 0) {
        checkoutLink = {
          token: linkRows[0].token,
          url: `${frontendBase}/checkout/${linkRows[0].token}`,
          expiresAt: linkRows[0].expires_at,
          orderId: linkedOrderId,
        };
      } else {
        // Orden existe pero sin link (edge case) — igual mostramos el orderId
        checkoutLink = {
          token: '',
          url: '',
          expiresAt: new Date(0),
          orderId: linkedOrderId,
        };
      }
    }

    // Verificar si el cliente ya realizó el pago
    let hasPaymentProof = false;
    if (linkedOrderId) {
      const proofRows: { id: string }[] = await this.dataSource.query(
        `SELECT id FROM payment_proofs WHERE order_id = $1 LIMIT 1`,
        [linkedOrderId],
      );
      hasPaymentProof = proofRows.length > 0;
    }

    return {
      ...result,
      checkoutLink,
      hasPaymentProof,
      templateSelections: result.templateSelections.map((ts) => ({
        id: ts.id,
        templateId: ts.templateId,
        templateName: ts.templateName,
        templatePreviewUrl: ts.templatePreviewKey
          ? this.storage.getPublicUrl(ts.templatePreviewKey)
          : null,
      })),
      proposals: result.proposals.map((p) => ({
        ...p,
        outputUrl: this.storage.getPublicUrl(p.outputStorageKey),
      })),
    };
  }
}
