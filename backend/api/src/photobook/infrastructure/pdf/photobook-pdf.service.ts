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
const DEFAULT_WIDTH_CM = 21;
const DEFAULT_HEIGHT_CM = 21;

// Resolución máxima para optimizar memoria (px)
const MAX_IMAGE_PX = 2000;

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

    const assetMap = await this.prepareAssets(project);
    const coverBase64 = theme ? await this.downloadCoverAsBase64(theme.coverTemplateKey) : null;
    const backCoverBase64 = theme?.backCoverKey ? await this.downloadCoverAsBase64(theme.backCoverKey) : null;

    const html = this.buildHtml(project, assetMap, widthCm, heightCm, coverBase64, backCoverBase64);
    const pdfBuffer = await this.renderPdf(html, widthCm, heightCm);

    const storageKey = `photobooks/renders/${projectId}.pdf`;
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

  private async prepareAssets(project: ProjectDetailRecord): Promise<Map<number, string>> {
    const assetIds = Array.from(
      new Set(project.pages.flatMap((p) => p.slots.map((s) => s.assetId))),
    );

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
      const imgs = page.slots.map(
        (slot) => `<img src="${assetMap.get(slot.assetId) ?? PLACEHOLDER_BASE64}" alt="" />`,
      );
      return `<div class="page ${layoutClass}">${imgs.join('')}</div>`;
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
    .page img { object-fit: cover; display: block; }

    /* Portada y contraportada: imagen full-bleed */
    .cover img { width: ${widthCm}cm; height: ${heightCm}cm; }

    /* FULL_1 */
    .full-1 img { width: ${widthCm}cm; height: ${heightCm}cm; }

    /* GRID_2: dos columnas iguales */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
    .grid-2 img { width: 100%; height: ${heightCm}cm; }

    /* GRID_3: una arriba (ancho total) + dos abajo */
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
    .grid-3 img:first-child { grid-column: 1 / -1; width: 100%; height: ${halfH}cm; }
    .grid-3 img:not(:first-child) { width: 100%; height: ${halfH}cm; }

    /* GRID_4: 2×2 */
    .grid-4 { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
    .grid-4 img { width: 100%; height: ${halfH}cm; }
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
      await page.setContent(html, { waitUntil: 'networkidle0' });
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
