import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { createHash } from 'crypto';
import { DataSource } from 'typeorm';
import { OrdersService } from '../../orders.service';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';
import { AssetRepositoryPort } from '../../../assets/domain/ports/asset-repository.port';
import { PersonalizedRepositoryPort } from '../../../personalized/domain/ports/personalized-repository.port';
import { ImageGenerationPort } from '../../../personalized/domain/ports/image-generation.port';
import { PersonalizedModelOrmEntity } from '../../../personalized/infrastructure/persistence/entities/personalized-model.orm-entity';
import { PersonalizedCategoryOrmEntity } from '../../../personalized/infrastructure/persistence/entities/personalized-category.orm-entity';
import { buildCoverPrompt, buildBackCoverPrompt, COVER_SIZE } from '../../../personalized/domain/services/build-cover-prompt';
import {
  fillNamePlaceholders,
  resolveFamilyGroupNameValues,
  resolveHermanosNameValues,
  resolveAventuraEntrePatasNameValues,
  resolveMemorialHermanosNameValues,
  NamePlaceholderValues,
} from '../../../personalized/domain/services/build-generation-prompt';
import { resolveReferencePhotos } from '../../../demo/domain/services/resolve-reference-photos';
import { compositeLogo } from '../../infrastructure/pdf/composite-logo';
import { savePrintAssetSingle } from './save-single-print-asset';

type DemoRequestRow = {
  personalized_category_id: string;
  character_meta: Record<string, unknown> | null;
  recipient_name: string | null;
  recipient_nickname: string | null;
  dedicator_name: string | null;
};

type OrderContext = {
  orderId: number;
  demoRow: DemoRequestRow;
  model: PersonalizedModelOrmEntity;
  category: PersonalizedCategoryOrmEntity;
};

export type GenerateOrderCoverInput = {
  orderId: number;
  /** Solo para generateCover() — mismo mecanismo de selección de fotos que
   * GenerateOrderTemplateUseCase. generateBackCover() no lleva fotos. */
  selectedAssetIds?: Record<string, number>;
  refinementPrompt?: string;
};

export type GenerateOrderCoverOutput = {
  storageKey: string;
  url: string;
};

/**
 * Genera tapa y contratapa con IA para un pedido — mismo patrón que
 * GenerateOrderTemplateUseCase (prompt armado desde prompt_shared_blocks +
 * contenido propio del libro, guardado como PENDING_REVIEW hasta que el
 * admin lo confirme). A diferencia de TEMPLATE, acá el contenido de prompt
 * vive a nivel de LIBRO (personalized_models), no de plantilla — hay una
 * sola tapa/contratapa por libro.
 */
@Injectable()
export class GenerateOrderCoverUseCase {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly personalizedRepo: PersonalizedRepositoryPort,
    private readonly assetRepo: AssetRepositoryPort,
    private readonly fileStorage: FileStoragePort,
    private readonly imageGeneration: ImageGenerationPort,
    private readonly dataSource: DataSource,
  ) {}

  async generateCover(input: GenerateOrderCoverInput): Promise<GenerateOrderCoverOutput> {
    const { orderId, demoRow, model } = await this.resolveOrderContext(input.orderId);
    if (!model.coverSceneVisual) {
      throw new BadRequestException(
        'Este libro todavía no tiene el contenido de prompt de tapa cargado — no se puede generar con IA todavía.',
      );
    }
    // Capturado en un const: coverSceneVisual no es readonly en el ORM
    // entity, así que TS no garantiza el narrowing de model.coverSceneVisual
    // a través de los awaits intermedios de más abajo.
    const coverSceneVisual = model.coverSceneVisual;

    // character_roles de tapa: se reusa el de cualquier plantilla activa del
    // mismo modelo — consistente dentro de un libro, no amerita duplicar la
    // columna a nivel de modelo.
    const templates = await this.personalizedRepo.findTemplatesByModel(model.id);
    const referenceTemplate = templates[0];
    if (!referenceTemplate?.characterRoles) {
      throw new BadRequestException('No se encontraron roles de personaje para este libro — no se puede generar la tapa con IA.');
    }

    const references = resolveReferencePhotos(referenceTemplate.characterRoles, demoRow.character_meta ?? {}, input.selectedAssetIds);
    if (references.length === 0) {
      throw new BadRequestException('No se encontraron fotos de referencia para esta solicitud');
    }
    const referenceImages = await this.downloadReferences(references.map((r) => r.assetId));

    const nameValues = this.resolveNameValues(demoRow);
    const prior = await this.loadPriorSource(orderId, 'COVER');
    const effectivePrompt = prior
      ? this.withReferenceRoles(input.refinementPrompt, 'reference image 1 is the clean existing cover artwork; preserve its composition and make only the requested changes. Additional reference images are character identity photos and must guide character appearance only.')
      : input.refinementPrompt;
    const referencesForEdit = prior ? [prior, ...referenceImages] : referenceImages;
    const generated = await this.imageGeneration.generateWithReferences(
      buildCoverPrompt({ sharedBlocks: await this.personalizedRepo.findSharedBlocks(), coverSceneVisual: fillNamePlaceholders(coverSceneVisual, nameValues), title: model.name.replace(/\s+Adulto$/i, '').toUpperCase(), names: nameValues, refinementPrompt: effectivePrompt }),
      referencesForEdit,
      COVER_SIZE,
    );
    const withLogo = await compositeLogo(generated, 'cover');
    const saved = await this.saveCoverAsset(orderId, 'COVER', withLogo);
    await this.savePrivateSource(orderId, 'COVER', generated, withLogo, saved.storageKey);
    return saved;
  }

  async generateBackCover(input: GenerateOrderCoverInput): Promise<GenerateOrderCoverOutput> {
    const { orderId, demoRow, model, category } = await this.resolveOrderContext(input.orderId);
    if (!model.backCoverTagline || !category.backCoverHashtag || !model.backCoverScene) {
      throw new BadRequestException(
        'Este libro todavía no tiene el contenido de prompt de contratapa cargado — no se puede generar con IA todavía.',
      );
    }
    const tagline = model.backCoverTagline;
    const hashtag = category.backCoverHashtag;

    const prior = await this.loadPriorSource(orderId, 'BACK_COVER');
    const effectivePrompt = prior
      ? this.withReferenceRoles(input.refinementPrompt, 'reference image 1 is the clean existing back-cover artwork; preserve its composition and make only the requested changes.')
      : input.refinementPrompt;
    const effectiveBackPrompt = buildBackCoverPrompt({ sharedBlocks: await this.personalizedRepo.findSharedBlocks(), scene: model.backCoverScene, tagline, hashtag, names: this.resolveNameValues(demoRow), refinementPrompt: effectivePrompt });
    const generated = prior
      ? await this.imageGeneration.generateWithReferences(effectiveBackPrompt, [prior], COVER_SIZE)
      : await this.imageGeneration.generate(effectiveBackPrompt, COVER_SIZE);
    const withLogo = await compositeLogo(generated, 'back-cover');
    const saved = await this.saveCoverAsset(orderId, 'BACK_COVER', withLogo);
    await this.savePrivateSource(orderId, 'BACK_COVER', generated, withLogo, saved.storageKey);
    return saved;
  }

  private resolveNameValues(demoRow: DemoRequestRow): NamePlaceholderValues {
    return (
      resolveFamilyGroupNameValues(demoRow.character_meta) ??
      resolveHermanosNameValues(demoRow.character_meta) ??
      resolveAventuraEntrePatasNameValues(demoRow.character_meta) ??
      resolveMemorialHermanosNameValues(demoRow.character_meta) ?? {
        nombreDestinatario: demoRow.recipient_name,
        apodoDestinatario: demoRow.recipient_nickname,
        nombreDedicante: demoRow.dedicator_name,
      }
    );
  }

  private async resolveOrderContext(orderId: number): Promise<OrderContext> {
    const order = await this.ordersService.findById(orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');
    if (!order.demoRequestId) throw new BadRequestException('Orden sin demo request asociada');
    if (!order.personalizedModelId) throw new BadRequestException('Orden sin libro personalizado asociado');

    const [demoRow] = (await this.dataSource.query(
      `SELECT personalized_category_id, character_meta, recipient_name, recipient_nickname, dedicator_name
       FROM demo_request WHERE id = $1`,
      [order.demoRequestId],
    )) as DemoRequestRow[];
    if (!demoRow) throw new NotFoundException('Solicitud de demo no encontrada');

    const model = await this.personalizedRepo.findModelById(String(order.personalizedModelId));
    if (!model) throw new NotFoundException('Libro no encontrado');
    const category = await this.personalizedRepo.findCategoryById(demoRow.personalized_category_id);
    if (!category) throw new NotFoundException('Categoría no encontrada');

    return { orderId, demoRow, model, category };
  }

  private async downloadReferences(assetIds: number[]): Promise<Buffer[]> {
    return Promise.all(
      assetIds.map(async (assetId) => {
        const asset = await this.assetRepo.findById(assetId);
        if (!asset) throw new NotFoundException(`No se encontró la foto (asset ${assetId})`);
        return this.fileStorage.download(asset.storageKey);
      }),
    );
  }

  private async loadPriorSource(orderId: number, assetType: 'COVER' | 'BACK_COVER'): Promise<Buffer | undefined> {
    try {
      const [row] = await this.dataSource.query(
        'SELECT storage_key FROM order_print_assets WHERE order_id = $1 AND asset_type = $2 AND template_id IS NULL ORDER BY uploaded_at DESC, id DESC LIMIT 1',
        [orderId, assetType],
      );
      if (!row?.storage_key) return undefined;
      const finalImage = await this.fileStorage.download(row.storage_key);
      const sourceKey = `${row.storage_key}.clean-source`;
      const manifestKey = `${row.storage_key}.clean-source.manifest`;
      const [source, manifestBytes] = await Promise.all([this.fileStorage.downloadPrivate(sourceKey), this.fileStorage.downloadPrivate(manifestKey)]);
      const manifest = JSON.parse(manifestBytes.toString('utf8')) as { version: number; orderId: number; assetType: 'COVER' | 'BACK_COVER'; storageKey: string; sourceSha256: string; finalSha256: string };
      if (manifest.version !== 1 || manifest.orderId !== orderId || manifest.assetType !== assetType || manifest.storageKey !== row.storage_key || manifest.sourceSha256 !== this.sha256(source) || manifest.finalSha256 !== this.sha256(finalImage)) return undefined;
      return source;
    } catch {
      return undefined;
    }
  }

  private async savePrivateSource(orderId: number, assetType: 'COVER' | 'BACK_COVER', source: Buffer, finalImage: Buffer, storageKey: string): Promise<void> {
    try {
      const manifest = { version: 1, orderId, assetType, storageKey, sourceSha256: this.sha256(source), finalSha256: this.sha256(finalImage) };
      await this.fileStorage.uploadPrivate(`${storageKey}.clean-source`, source);
      await this.fileStorage.uploadPrivate(`${storageKey}.clean-source.manifest`, Buffer.from(JSON.stringify(manifest)));
    } catch {
      // Private storage is optional; generation remains available without it.
    }
  }

  private sha256(buffer: Buffer): string { return createHash('sha256').update(buffer).digest('hex'); }

  private withReferenceRoles(refinement: string | undefined, roles: string): string { return [refinement, roles].filter(Boolean).join('\n\n'); }

  private saveCoverAsset(orderId: number, assetType: 'COVER' | 'BACK_COVER', buffer: Buffer): Promise<GenerateOrderCoverOutput> {
    return savePrintAssetSingle(this.dataSource, this.fileStorage, orderId, assetType, buffer);
  }
}
