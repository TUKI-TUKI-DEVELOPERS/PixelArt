import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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

    const prompt = buildCoverPrompt({
      sharedBlocks: await this.personalizedRepo.findSharedBlocks(),
      coverSceneVisual: fillNamePlaceholders(coverSceneVisual, this.resolveNameValues(demoRow)),
      title: model.name.toUpperCase(),
    });

    const generated = await this.imageGeneration.generateWithReferences(prompt, referenceImages, COVER_SIZE);
    const withLogo = await compositeLogo(generated, 'cover');

    return this.saveCoverAsset(orderId, 'COVER', withLogo);
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

    const prompt = buildBackCoverPrompt({
      sharedBlocks: await this.personalizedRepo.findSharedBlocks(),
      scene: model.backCoverScene,
      tagline,
      hashtag,
      names: this.resolveNameValues(demoRow),
    });

    const generated = await this.imageGeneration.generate(prompt, COVER_SIZE);
    const withLogo = await compositeLogo(generated, 'back-cover');

    return this.saveCoverAsset(orderId, 'BACK_COVER', withLogo);
  }

  private resolveNameValues(demoRow: DemoRequestRow): NamePlaceholderValues {
    return (
      resolveFamilyGroupNameValues(demoRow.character_meta) ?? {
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

  private saveCoverAsset(orderId: number, assetType: 'COVER' | 'BACK_COVER', buffer: Buffer): Promise<GenerateOrderCoverOutput> {
    return savePrintAssetSingle(this.dataSource, this.fileStorage, orderId, assetType, buffer);
  }
}
