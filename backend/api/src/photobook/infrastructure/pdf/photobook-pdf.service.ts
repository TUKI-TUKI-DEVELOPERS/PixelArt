import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer-core';
import { createPool, Pool } from 'generic-pool';
import sharp from 'sharp';
import { PhotobookRepositoryPort, ProjectDetailRecord } from '../../domain/ports/photobook-repository.port';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';
import { AssetRepositoryPort } from '../../../assets/domain/ports/asset-repository.port';

// Imagen placeholder (1x1 gris) para slots sin imagen o con error de carga
const PLACEHOLDER_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+PBhPQAIgAMG+4l0SAAAAABJRU5ErkJggg==';

// Dimensiones por defecto si el producto no tiene dimensiones custom
const DEFAULT_WIDTH_CM = 22;
const DEFAULT_HEIGHT_CM = 22;

// Resolución máxima para optimizar memoria (px)
// 2500px cubre una página de 22cm a 288 DPI (deviceScaleFactor 3 × 96 DPI base)
const MAX_IMAGE_PX = 2500;

@Injectable()
export class PhotobookPdfService {
  private readonly logger = new Logger(PhotobookPdfService.name);
  private readonly browserPool: Pool<puppeteer.Browser>;

  constructor(
    private readonly repo: PhotobookRepositoryPort,
    private readonly fileStorage: FileStoragePort,
    private readonly assetRepo: AssetRepositoryPort,
  ) {
    this.browserPool = createPool(
      {
        create: () => this.createBrowser(),
        destroy: (browser) => browser.close(),
      },
      { max: 2, min: 0 },
    );
  }

  private createBrowser(): Promise<puppeteer.Browser> {
    return puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
      timeout: 60000,
    });
  }

  async generateAndStore(projectId: number): Promise<void> {
    this.logger.log(`Generando PDF para proyecto #${projectId}`);

    const project = await this.repo.findProjectById(projectId);
    if (!project) {
      this.logger.error(`Proyecto #${projectId} no encontrado`);
      return;
    }

    const widthCm = project.customWidthCm ?? DEFAULT_WIDTH_CM;
    const heightCm = project.customHeightCm ?? DEFAULT_HEIGHT_CM;

    const theme = await this.repo.getTheme(project.photobookThemeId);

    const assetIds = Array.from(new Set(project.pages.flatMap((p) => p.slots.map((s) => s.assetId))));
    const assetMap = await this.prepareAssets(assetIds);
    const coverBase64 = theme ? await this.downloadCoverAsBase64(theme.coverTemplateKey) : null;
    const backCoverBase64 = theme?.backCoverKey ? await this.downloadCoverAsBase64(theme.backCoverKey) : null;

    const html = this.buildHtml(project, assetMap, widthCm, heightCm, coverBase64, backCoverBase64);
    const pdfBuffer = await this.renderPdf(html, widthCm, heightCm);

    const storageKey = `photobook-renders/${projectId}.pdf`;
    await this.fileStorage.upload(storageKey, pdfBuffer, 'application/pdf');
    await this.repo.saveRender(projectId, storageKey);

    this.logger.log(`PDF listo: ${storageKey}`);
  }

  getPdfUrl(pdfStorageKey: string): string {
    return this.fileStorage.getPublicUrl(pdfStorageKey);
  }

  private async downloadCoverAsBase64(storageKey: string): Promise<string> {
    try {
      const rawBuffer = await this.fileStorage.download(storageKey);
      const optimized = await sharp(rawBuffer)
        .resize(MAX_IMAGE_PX, MAX_IMAGE_PX, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 92 })
        .toBuffer();
      return `data:image/jpeg;base64,${optimized.toString('base64')}`;
    } catch (err) {
      this.logger.warn(`Error procesando portada (${storageKey}): ${(err as Error).message}`);
      return PLACEHOLDER_BASE64;
    }
  }

  private async prepareAssets(assetIds: number[]): Promise<Map<number, string>> {

    const assetMap = new Map<number, string>();

    await Promise.all(
      assetIds.map(async (assetId) => {
        try {
          const asset = await this.assetRepo.findById(assetId);
          if (!asset) {
            assetMap.set(assetId, PLACEHOLDER_BASE64);
            return;
          }

          const rawBuffer = await this.fileStorage.download(asset.storageKey);

          const optimized = await sharp(rawBuffer)
            .resize(MAX_IMAGE_PX, MAX_IMAGE_PX, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 85 })
            .toBuffer();

          assetMap.set(assetId, `data:image/jpeg;base64,${optimized.toString('base64')}`);
        } catch (err) {
          this.logger.warn(`Error procesando asset #${assetId}: ${(err as Error).message}`);
          assetMap.set(assetId, PLACEHOLDER_BASE64);
        }
      }),
    );

    return assetMap;
  }

  private buildHtml(
    project: ProjectDetailRecord,
    assetMap: Map<number, string>,
    widthCm: number,
    heightCm: number,
    coverBase64: string | null,
    backCoverBase64: string | null,
  ): string {
    const halfH = heightCm / 2;

    const coverPage = coverBase64
      ? `<div class="page cover"><img src="${coverBase64}" alt="Portada" /></div>`
      : '';

    const backCoverPage = backCoverBase64
      ? `<div class="page cover back-cover"><img src="${backCoverBase64}" alt="Contraportada" /></div>`
      : '';

    const contentPages = project.pages.map((page) => {
      const layoutClass = page.layoutKey.toLowerCase().replace('_', '-');
      const slots = page.slots.map((slot) => {
        const src = assetMap.get(slot.assetId) ?? PLACEHOLDER_BASE64;
        const x = slot.cropData?.x ?? 50;
        const y = slot.cropData?.y ?? 50;
        const zoom = slot.cropData?.zoom ?? 1;
        const imgStyle = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${x}% ${y}%;transform:scale(${zoom});transform-origin:${x}% ${y}%;display:block;`;
        return `<div class="slot"><img src="${src}" alt="" style="${imgStyle}" /></div>`;
      });
      return `<div class="page ${layoutClass}">${slots.join('')}</div>`;
    });

    const allPages = [coverPage, ...contentPages, backCoverPage].filter(Boolean);

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { margin: 0; size: ${widthCm}cm ${heightCm}cm; }
    html, body { width: ${widthCm}cm; }
    .page {
      width: ${widthCm}cm;
      height: ${heightCm}cm;
      page-break-after: always;
      overflow: hidden;
    }
    .page:last-child { page-break-after: avoid; }

    /* Portada y contraportada: imagen full-bleed */
    .cover img { width: ${widthCm}cm; height: ${heightCm}cm; object-fit: cover; display: block; }

    /* Slot base: contenedor relativo con overflow hidden para que el zoom quede recortado */
    .slot { position: relative; overflow: hidden; }

    /* FULL_1 */
    .full-1 { position: relative; }
    .full-1 .slot { width: ${widthCm}cm; height: ${heightCm}cm; }

    /* GRID_2: dos filas iguales */
    .grid-2 { display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; }
    .grid-2 .slot { width: 100%; height: ${halfH}cm; }

    /* GRID_3: una arriba (ancho total) + dos abajo */
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
    .grid-3 .slot:first-child { grid-column: 1 / -1; height: ${halfH}cm; }
    .grid-3 .slot:not(:first-child) { height: ${halfH}cm; }

    /* GRID_4: 2×2 */
    .grid-4 { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
    .grid-4 .slot { height: ${halfH}cm; }
  </style>
</head>
<body>
  ${allPages.join('\n  ')}
</body>
</html>`;
  }

  private async renderPdf(html: string, widthCm: number, heightCm: number): Promise<Buffer> {
    const browser = await this.browserPool.acquire();
    const page = await browser.newPage();
    try {
      page.setDefaultTimeout(90000);
      // deviceScaleFactor: 3 → renderiza a 288 DPI (96 × 3), calidad de impresión profesional
      await page.setViewport({
        width: Math.round((widthCm / 2.54) * 96),
        height: Math.round((heightCm / 2.54) * 96),
        deviceScaleFactor: 3,
      });
      await page.setContent(html, { waitUntil: 'load' });
      const pdf = await page.pdf({
        width: `${widthCm}cm`,
        height: `${heightCm}cm`,
        printBackground: true,
        preferCSSPageSize: false,
      });
      return Buffer.from(pdf);
    } finally {
      await page.close();
      await this.browserPool.release(browser);
    }
  }
}
