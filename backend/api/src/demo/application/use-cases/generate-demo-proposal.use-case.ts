import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { resolveReferencePhotos } from '../../domain/services/resolve-reference-photos';
import { ImageProtectionService } from '../../infrastructure/protection/image-protection.service';
import { UploadProposalOutput } from './upload-demo-proposal.use-case';

export type GenerateProposalInput = {
  demoRequestId: number;
  templateId: number;
  /** role.key (o "role.key[indice]" para roles de lista) -> assetId elegido
   * por el admin entre las fotos subidas para esa persona. Si no se manda,
   * se usa la primera foto de cada una. */
  selectedAssetIds?: Record<string, number>;
  generatedByUserId?: number | null;
};

@Injectable()
export class GenerateDemoProposalUseCase {
  constructor(
    private readonly demoRepo: DemoRepositoryPort,
    private readonly personalizedRepo: PersonalizedRepositoryPort,
    private readonly assetRepo: AssetRepositoryPort,
    private readonly fileStorage: FileStoragePort,
    private readonly imageGeneration: ImageGenerationPort,
    private readonly imageProtection: ImageProtectionService,
  ) {}

  async execute(input: GenerateProposalInput): Promise<UploadProposalOutput> {
    const request = await this.demoRepo.findById(input.demoRequestId);
    if (!request) {
      throw new NotFoundException('Solicitud de demo no encontrada');
    }

    const template = await this.personalizedRepo.findTemplateById(input.templateId);
    if (!template) {
      throw new NotFoundException('Plantilla no encontrada');
    }
    if (!template.sceneVisual || !template.poemTemplate || !template.characterRoles) {
      throw new BadRequestException(
        'Esta plantilla todavía no tiene el contenido de prompt cargado — no se puede generar con IA todavía.',
      );
    }

    const references = resolveReferencePhotos(
      template.characterRoles,
      request.characterMeta ?? {},
      input.selectedAssetIds,
    );
    if (references.length === 0) {
      throw new BadRequestException('No se encontraron fotos de referencia para esta solicitud');
    }

    const referenceImages = await Promise.all(
      references.map(async ({ assetId }) => {
        const asset = await this.assetRepo.findById(assetId);
        if (!asset) {
          throw new NotFoundException(`No se encontró la foto (asset ${assetId})`);
        }
        return this.fileStorage.download(asset.storageKey);
      }),
    );

    const categoryName = await this.getCategoryName(request.personalizedCategoryId);
    const isPetCategory = (categoryName ?? '').toLowerCase().includes('mascota');
    const modelName = await this.personalizedRepo.findModelNameById(template.modelId);
    const sharedBlocks = await this.personalizedRepo.findSharedBlocks();

    const nameValues = resolveFamilyGroupNameValues(request.characterMeta) ?? {
      nombreDestinatario: request.recipientName,
      apodoDestinatario: request.recipientNickname,
      nombreDedicante: request.dedicatorName,
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

    // Mismo tamaño que usa la generación fresca de plantillas de orden — así
    // el original nace ya con el ratio de imprenta y backfillFromDemoOriginals
    // lo puede reusar tal cual, sin una segunda llamada a OpenAI.
    const generatedBuffer = await this.imageGeneration.generateWithReferences(prompt, referenceImages, SPREAD_SIZE);

    // Guardamos SIEMPRE el original limpio (para el libro final impreso) y
    // por separado la versión protegida (para la vista previa del cliente) —
    // a diferencia del upload manual, que solo tenía la protegida.
    // Cache corto (no el default de 1 año/immutable): regenerar pisa la misma
    // key, y con cache immutable el navegador nunca vuelve a pedir el archivo
    // aunque el contenido en storage haya cambiado.
    const originalKey = `generated/originals/${input.demoRequestId}_${input.templateId}.png`;
    await this.fileStorage.upload(originalKey, generatedBuffer, 'image/png', 'public, max-age=60, must-revalidate');

    const protectedBuffer = await this.imageProtection.applyWatermark(generatedBuffer);
    const protectedKey = `generated/proposals/${input.demoRequestId}_${input.templateId}.jpg`;
    await this.fileStorage.upload(protectedKey, protectedBuffer, 'image/jpeg', 'public, max-age=60, must-revalidate');

    const proposal = await this.demoRepo.saveProposal({
      demoRequestId: input.demoRequestId,
      templateId: input.templateId,
      outputStorageKey: protectedKey,
      originalStorageKey: originalKey,
      protectionMode: 'WATERMARK',
      isWatermarked: true,
      generatedByUserId: input.generatedByUserId ?? null,
    });

    return {
      id: proposal.id,
      storageKey: protectedKey,
      url: this.fileStorage.getPublicUrl(protectedKey),
      protectionMode: 'WATERMARK',
    };
  }

  private async getCategoryName(categoryId: number): Promise<string | null> {
    const categories = await this.personalizedRepo.findAllActiveCategories();
    const category = categories.find((c) => String(c.id) === String(categoryId));
    return category?.name ?? null;
  }
}
