import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrdersService } from '../../orders.service';
import { CustomBookPdfService, CrossSellCandidate } from '../../infrastructure/pdf/custom-book-pdf.service';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';
import { savePrintAssetSingle, SavePrintAssetOutput } from './save-single-print-asset';

/**
 * Genera la página de venta cruzada ("Más historias PixelArt") como imagen
 * independiente para revisar antes de confirmar — a diferencia de
 * GenerateOrderCoverUseCase, esto NO usa IA, es maquetación pura con datos
 * que ya existen en el catálogo (miniaturas + slugs de otros libros activos).
 * Mismo patrón PENDING_REVIEW que Portada/Contraportada.
 */
@Injectable()
export class GenerateOrderAddonUseCase {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly customBookPdfService: CustomBookPdfService,
    private readonly fileStorage: FileStoragePort,
    private readonly dataSource: DataSource,
  ) {}

  async generateAddon(orderId: number, selectedModelIds?: number[]): Promise<SavePrintAssetOutput> {
    const order = await this.ordersService.findById(orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');

    const buffer = await this.customBookPdfService.renderAddonPreview(
      order.personalizedModelId ? String(order.personalizedModelId) : null,
      selectedModelIds,
    );
    return savePrintAssetSingle(this.dataSource, this.fileStorage, orderId, 'ADDON', buffer);
  }

  async listCandidates(orderId: number): Promise<CrossSellCandidate[]> {
    const order = await this.ordersService.findById(orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');

    return this.customBookPdfService.listCrossSellCandidates(
      order.personalizedModelId ? String(order.personalizedModelId) : null,
    );
  }
}
