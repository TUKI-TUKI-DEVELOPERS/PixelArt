import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import sharp from 'sharp';
import { OrdersService } from '../../orders.service';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';
import { AssetRepositoryPort } from '../../../assets/domain/ports/asset-repository.port';
import { PersonalizedRepositoryPort } from '../../../personalized/domain/ports/personalized-repository.port';
import { ImageGenerationPort } from '../../../personalized/domain/ports/image-generation.port';
import {
  buildGenerationPrompt,
  fillNamePlaceholders,
  derivePrintedTitle,
  resolveSeparator,
  resolveFamilyGroupNameValues,
  needsDualIdentity,
  SPREAD_SIZE,
} from '../../../personalized/domain/services/build-generation-prompt';
import { resolveReferencePhotos } from '../../../demo/domain/services/resolve-reference-photos';

// Techo de resolución que ya usa custom-book-pdf.service.ts (MAX_IMAGE_PX) —
// escalamos cada mitad hacia ahí para aprovechar mejor el margen de impresión.
const PRINT_MAX_PX = 2400;

type DemoRequestRow = {
  personalized_category_id: string;
  character_meta: Record<string, unknown> | null;
  recipient_name: string | null;
  recipient_nickname: string | null;
  dedicator_name: string | null;
};

export type GenerateOrderTemplateInput = {
  orderId: number;
  templateId: number;
  selectedAssetIds?: Record<string, number>;
};

export type GenerateOrderTemplateOutput = {
  caraA: { storageKey: string; url: string };
  caraB: { storageKey: string; url: string };
};

@Injectable()
export class GenerateOrderTemplateUseCase {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly personalizedRepo: PersonalizedRepositoryPort,
    private readonly assetRepo: AssetRepositoryPort,
    private readonly fileStorage: FileStoragePort,
    private readonly imageGeneration: ImageGenerationPort,
    private readonly dataSource: DataSource,
  ) {}

  async execute(input: GenerateOrderTemplateInput): Promise<GenerateOrderTemplateOutput> {
    const order = await this.ordersService.findById(input.orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');
    if (!order.demoRequestId) throw new BadRequestException('Orden sin demo request asociada');

    // La plantilla debe pertenecer a la selección real del pedido (demo + pagadas
    // en checkout) — de paso obtenemos el slot_index para que el PDF final
    // mantenga el mismo orden que ya usa el upload manual.
    const selectionRows: { template_id: string }[] = await this.dataSource.query(
      `SELECT template_id FROM order_template_selections WHERE order_id = $1 ORDER BY id ASC`,
      [input.orderId],
    );
    const slotIndex = selectionRows.findIndex((r) => Number(r.template_id) === input.templateId);
    if (slotIndex === -1) {
      throw new BadRequestException('Esta plantilla no forma parte de la selección del pedido');
    }

    const [demoRow] = (await this.dataSource.query(
      `SELECT personalized_category_id, character_meta, recipient_name, recipient_nickname,
              dedicator_name
       FROM demo_request WHERE id = $1`,
      [order.demoRequestId],
    )) as DemoRequestRow[];
    if (!demoRow) throw new NotFoundException('Solicitud de demo no encontrada');

    const template = await this.personalizedRepo.findTemplateById(input.templateId);
    if (!template) throw new NotFoundException('Plantilla no encontrada');
    if (!template.sceneVisual || !template.poemTemplate || !template.characterRoles) {
      throw new BadRequestException(
        'Esta plantilla todavía no tiene el contenido de prompt cargado — no se puede generar con IA todavía.',
      );
    }

    const references = resolveReferencePhotos(
      template.characterRoles,
      demoRow.character_meta ?? {},
      input.selectedAssetIds,
    );
    if (references.length === 0) {
      throw new BadRequestException('No se encontraron fotos de referencia para esta solicitud');
    }

    const referenceImages = await Promise.all(
      references.map(async ({ assetId }) => {
        const asset = await this.assetRepo.findById(assetId);
        if (!asset) throw new NotFoundException(`No se encontró la foto (asset ${assetId})`);
        return this.fileStorage.download(asset.storageKey);
      }),
    );

    const categoryName = await this.getCategoryName(demoRow.personalized_category_id);
    const isPetCategory = (categoryName ?? '').toLowerCase().includes('mascota');
    const modelName = await this.personalizedRepo.findModelNameById(template.modelId);
    const sharedBlocks = await this.personalizedRepo.findSharedBlocks();

    const nameValues = resolveFamilyGroupNameValues(demoRow.character_meta) ?? {
      nombreDestinatario: demoRow.recipient_name,
      apodoDestinatario: demoRow.recipient_nickname,
      nombreDedicante: demoRow.dedicator_name,
    };

    // El poema del prompt de generación SIEMPRE es el de la plantilla —
    // wantsCustomDedication/dedicationText es para la página de dedicatoria
    // aparte del PDF (custom-book-pdf.service.ts), nunca para el poema
    // ilustrado. Antes esto pisaba el poema de TODAS las plantillas con el
    // mismo texto libre del cliente cuando pedía dedicatoria personalizada.
    const poem = fillNamePlaceholders(template.poemTemplate, nameValues);

    const prompt = buildGenerationPrompt({
      sharedBlocks,
      isPetCategory,
      needsHumanIdentityToo: needsDualIdentity(modelName),
      sceneVisual: fillNamePlaceholders(template.sceneVisual, nameValues),
      backgroundDetails: template.backgroundDetails ?? '',
      magicEffects: template.magicEffects ?? '',
      lightingColor: template.lightingColor ?? '',
      title: derivePrintedTitle(template.name),
      poem,
      separator: resolveSeparator(categoryName),
    });

    // 1 sola llamada, a resolución de spread real (SPREAD_SIZE) — la
    // continuidad entre Cara A y Cara B viene gratis porque es LA MISMA foto
    // cortada al medio, no dos generaciones independientes (eso se probó y
    // no funcionó: con referencia cruzada el modelo clona, sin ella inventa
    // una escena sin relación).
    const spread = await this.imageGeneration.generateWithReferences(prompt, referenceImages, SPREAD_SIZE);

    return this.processSpread(input.orderId, input.templateId, slotIndex, spread);
  }

  /**
   * Las 3 plantillas del demo YA tienen un original limpio generado
   * (demo_proposals.original_storage_key) — el cliente las vio y las eligió
   * antes de pagar. No hace falta gastar una llamada a OpenAI de nuevo: se
   * reusa ese original, se parte igual que una generación fresca, y queda
   * PENDING_REVIEW para que el admin la revise (y la regenere si quiere).
   * Se llama automáticamente al abrir la orden — es idempotente: si la
   * plantilla ya tiene CUALQUIER fila en order_print_assets (manual, ya
   * generada, o ya backfillada antes) se deja tal cual.
   */
  async backfillFromDemoOriginals(orderId: number): Promise<{ backfilled: number }> {
    const order = await this.ordersService.findById(orderId);
    if (!order || !order.demoRequestId) return { backfilled: 0 };

    const selectionRows: { template_id: string }[] = await this.dataSource.query(
      `SELECT template_id FROM order_template_selections WHERE order_id = $1 ORDER BY id ASC`,
      [orderId],
    );

    let backfilled = 0;
    for (let slotIndex = 0; slotIndex < selectionRows.length; slotIndex++) {
      const templateId = Number(selectionRows[slotIndex].template_id);

      const [existing] = await this.dataSource.query(
        `SELECT id FROM order_print_assets WHERE order_id = $1 AND template_id = $2 LIMIT 1`,
        [orderId, templateId],
      );
      if (existing) continue;

      const [proposal] = (await this.dataSource.query(
        `SELECT original_storage_key FROM demo_proposals
         WHERE demo_request_id = $1 AND template_id = $2 AND original_storage_key IS NOT NULL`,
        [order.demoRequestId, templateId],
      )) as { original_storage_key: string }[];
      if (!proposal) continue;

      const spread = await this.fileStorage.download(proposal.original_storage_key);
      await this.processSpread(orderId, templateId, slotIndex, spread);
      backfilled++;
    }

    return { backfilled };
  }

  private async processSpread(
    orderId: number,
    templateId: number,
    slotIndex: number,
    spread: Buffer,
  ): Promise<GenerateOrderTemplateOutput> {
    const { caraA, caraB } = await this.splitIntoPrintPages(spread);

    const caraAKey = `custom-books/print-assets/${orderId}/template_${templateId}_a.png`;
    const caraBKey = `custom-books/print-assets/${orderId}/template_${templateId}_b.png`;
    // Cache corto: "Regenerar con IA" pisa la misma key (upsert en
    // savePrintAssets), y con cache immutable el navegador seguiría mostrando
    // la miniatura vieja aunque el archivo en storage haya cambiado.
    await Promise.all([
      this.fileStorage.upload(caraAKey, caraA, 'image/png', 'public, max-age=60, must-revalidate'),
      this.fileStorage.upload(caraBKey, caraB, 'image/png', 'public, max-age=60, must-revalidate'),
    ]);

    await this.savePrintAssets(orderId, templateId, slotIndex, [
      { pagePart: 'A', storageKey: caraAKey, sizeBytes: caraA.length },
      { pagePart: 'B', storageKey: caraBKey, sizeBytes: caraB.length },
    ]);

    return {
      caraA: { storageKey: caraAKey, url: this.fileStorage.getPublicUrl(caraAKey) },
      caraB: { storageKey: caraBKey, url: this.fileStorage.getPublicUrl(caraBKey) },
    };
  }

  /** Parte el spread generado al medio (Cara A = mitad izquierda, Cara B = mitad
   * derecha) y escala cada mitad hacia el techo de resolución de imprenta.
   * Usado tanto por execute() (generación fresca) como por
   * backfillFromDemoOriginals (reusa el original del demo). */
  private async splitIntoPrintPages(spread: Buffer): Promise<{ caraA: Buffer; caraB: Buffer }> {
    const meta = await sharp(spread).metadata();
    const width = meta.width ?? 1536;
    const height = meta.height ?? 1024;
    const halfWidth = Math.floor(width / 2);

    const upscale = Math.min(PRINT_MAX_PX / halfWidth, PRINT_MAX_PX / height);
    const targetWidth = Math.round(halfWidth * upscale);
    const targetHeight = Math.round(height * upscale);

    const [caraA, caraB] = await Promise.all([
      sharp(spread)
        .extract({ left: 0, top: 0, width: halfWidth, height })
        .resize(targetWidth, targetHeight, { kernel: 'lanczos3' })
        .png()
        .toBuffer(),
      sharp(spread)
        .extract({ left: width - halfWidth, top: 0, width: halfWidth, height })
        .resize(targetWidth, targetHeight, { kernel: 'lanczos3' })
        .png()
        .toBuffer(),
    ]);

    return { caraA, caraB };
  }

  /** Mismo storage-key pattern e INSERT...ON CONFLICT que ya usa el upload
   * manual (orders.controller.ts → uploadPrintAsset) — reutilizado tal cual. */
  private async savePrintAssets(
    orderId: number,
    templateId: number,
    slotIndex: number,
    pages: { pagePart: 'A' | 'B'; storageKey: string; sizeBytes: number }[],
  ): Promise<void> {
    // Migración single → double page: si quedó una fila 'ONLY' vieja del mismo
    // template (de un upload manual previo sin partir en caras), eliminarla.
    await this.dataSource.query(
      `DELETE FROM order_print_assets WHERE order_id = $1 AND template_id = $2 AND page_part = 'ONLY'`,
      [orderId, templateId],
    );

    // Entra como PENDING_REVIEW — el admin la revisa (y puede regenerarla las
    // veces que quiera) antes de confirmarla en bloque para que cuente en el PDF.
    for (const page of pages) {
      await this.dataSource.query(
        `INSERT INTO order_print_assets (order_id, asset_type, template_id, slot_index, page_part, storage_key, original_filename, mime_type, size_bytes, status)
         VALUES ($1, 'TEMPLATE', $2, $3, $4, $5, NULL, 'image/png', $6, 'PENDING_REVIEW')
         ON CONFLICT (order_id, template_id, page_part) WHERE template_id IS NOT NULL
         DO UPDATE SET storage_key = $5, mime_type = 'image/png', size_bytes = $6, status = 'PENDING_REVIEW', uploaded_at = now()`,
        [orderId, templateId, slotIndex, page.pagePart, page.storageKey, page.sizeBytes],
      );
    }
  }

  private async getCategoryName(categoryId: string): Promise<string | null> {
    const categories = await this.personalizedRepo.findAllActiveCategories();
    const category = categories.find((c) => String(c.id) === String(categoryId));
    return category?.name ?? null;
  }
}
