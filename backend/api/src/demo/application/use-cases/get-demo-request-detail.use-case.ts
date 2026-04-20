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

    // Si ya se envió el checkout, recuperar el token del link existente
    let checkoutLink: { token: string; url: string; expiresAt: Date; orderId: number } | null = null;
    if (result.status === 'PROPOSALS_SENT') {
      const rows: { token: string; expires_at: Date; order_id: string }[] =
        await this.dataSource.query(
          `SELECT pl.token, pl.expires_at, pl.order_id
           FROM public_links pl
           JOIN orders o ON o.id = pl.order_id
           WHERE o.demo_request_id = $1
             AND pl.link_type = 'CHECKOUT'
             AND pl.revoked_at IS NULL
           ORDER BY pl.created_at DESC
           LIMIT 1`,
          [id],
        );

      if (rows.length > 0) {
        const row = rows[0];
        const frontendBase = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
        checkoutLink = {
          token: row.token,
          url: `${frontendBase}/checkout/${row.token}`,
          expiresAt: row.expires_at,
          orderId: Number(row.order_id),
        };
      }
    }

    return {
      ...result,
      checkoutLink,
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
