import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer-core';
import { createPool, Pool } from 'generic-pool';
import sharp from 'sharp';
import { PhotobookRepositoryPort, ProjectDetailRecord, PhotobookThemeRecord } from '../../domain/ports/photobook-repository.port';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';
import { AssetRepositoryPort } from '../../../assets/domain/ports/asset-repository.port';
import { calculateSpineWidthMm, SANGRADO_MM } from '../../domain/services/photobook-spine.service';
import { computeWrapLayout, WrapLayout } from '../../domain/services/photobook-wrap-layout.service';
import { PhotobookCoverType, isValidPhotobookCoverType } from '../../domain/services/photobook-pricing.service';
import { PRATA_WOFF2_BASE64 } from './fonts/prata-font';

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
    // Si el tema tiene panorámica (wrap), la tapa/contratapa se entregan como un
    // archivo aparte (ver generateAndStoreCoverWrap) y NO van como páginas del
    // interior. Sin panorámica (ej. Bodas) → fallback al flujo viejo de 2 páginas.
    const hasWrap = !!theme?.coverWrapKey;
    const coverBase64 = !hasWrap && theme ? await this.downloadCoverAsBase64(theme.coverTemplateKey) : null;
    const backCoverBase64 = !hasWrap && theme?.backCoverKey ? await this.downloadCoverAsBase64(theme.backCoverKey) : null;

    const html = this.buildHtml(project, assetMap, widthCm, heightCm, coverBase64, backCoverBase64);
    const pdfBuffer = await this.renderPdf(html, widthCm, heightCm);

    const storageKey = `photobook-renders/${projectId}.pdf`;
    await this.fileStorage.upload(storageKey, pdfBuffer, 'application/pdf');
    await this.repo.saveRender(projectId, storageKey);
    this.logger.log(`PDF listo: ${storageKey}`);

    if (theme && theme.coverWrapKey) {
      try {
        await this.generateAndStoreCoverWrap(project, theme, widthCm, heightCm);
      } catch (err) {
        // El wrap es additivo: si falla, el interior ya quedó guardado. No romper el flujo.
        this.logger.error(`Error generando wrap de tapa (proyecto #${projectId}): ${(err as Error).message}`);
      }
    }
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

  // ── Wrap de tapa/lomo/contratapa (automatización nueva) ────────────────────

  /** URL pública del wrap de tapa (archivo aparte). Key predecible por proyecto. */
  getCoverWrapUrl(projectId: number): string {
    return this.fileStorage.getPublicUrl(`photobook-renders/${projectId}-cover-wrap.pdf`);
  }

  /** URL del wrap de tapa SOLO si ya se generó. No todos los temas tienen wrap
   * (depende de coverWrapKey) y su generación es best-effort, así que se
   * verifica que el archivo exista en storage para no devolver un link roto. */
  async getCoverWrapUrlIfExists(projectId: number): Promise<string | null> {
    const key = `photobook-renders/${projectId}-cover-wrap.pdf`;
    return (await this.fileStorage.exists(key)) ? this.fileStorage.getPublicUrl(key) : null;
  }

  /**
   * Genera y guarda el wrap (contratapa|lomo|tapa) como PDF de una sola página
   * ancha, aparte del PDF interior. El ancho del lomo sale de la fórmula por
   * pedido (page_count + cover_type); el texto (título+año en tapa, spine_label
   * en lomo) se compone por código. Solo se llama si el tema tiene coverWrapKey.
   */
  private async generateAndStoreCoverWrap(
    project: ProjectDetailRecord,
    theme: PhotobookThemeRecord,
    coverWidthCm: number,
    coverHeightCm: number,
  ): Promise<void> {
    const coverType: PhotobookCoverType = isValidPhotobookCoverType(project.coverType ?? '')
      ? (project.coverType as PhotobookCoverType)
      : 'TAPA_GRUESA'; // fallback conservador (lomo más ancho) si el pedido no trae cover_type válido
    const spineMm = calculateSpineWidthMm(project.pageCount, coverType);
    const layout = computeWrapLayout(coverWidthCm, coverHeightCm, spineMm, SANGRADO_MM);

    const panoramicBase64 = await this.downloadWrapPanoramic(theme.coverWrapKey!, layout);
    const title = theme.name.toUpperCase();
    const year = new Date().getFullYear();
    const spineLabel = (theme.spineLabel ?? theme.name).toUpperCase();

    const html = this.buildWrapHtml(panoramicBase64, layout, title, year, spineLabel);
    const pdf = await this.renderWrapPdf(html, layout);

    const key = `photobook-renders/${project.id}-cover-wrap.pdf`;
    await this.fileStorage.upload(key, pdf, 'application/pdf');
    this.logger.log(`Wrap de tapa listo: ${key} (lomo ${spineMm}mm, ${coverType}, ${theme.name})`);
  }

  private async downloadWrapPanoramic(storageKey: string, layout: WrapLayout): Promise<string> {
    const raw = await this.fileStorage.download(storageKey);
    // Escala la panorámica al ancho del wrap con lanczos (mismo criterio que los
    // interiores). La fuente es ~1536px, así que esto sube resolución de impresión.
    const targetW = Math.min(4000, Math.round((layout.totalWidthCm / 2.54) * 180));
    const buf = await sharp(raw)
      .resize({ width: targetW, kernel: 'lanczos3', withoutEnlargement: false })
      .jpeg({ quality: 90 })
      .toBuffer();
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  }

  private escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  private buildWrapHtml(panoramicBase64: string, layout: WrapLayout, title: string, year: number, spineLabel: string): string {
    const { totalWidthCm, totalHeightCm, coverWidthCm, coverHeightCm, spineWidthCm, frontCoverLeftCm, spineLeftCm, bleedCm } = layout;
    const titleTopCm = bleedCm + coverHeightCm * 0.2;
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @font-face { font-family:'Prata'; font-style:normal; font-weight:400; src:url(data:font/woff2;base64,${PRATA_WOFF2_BASE64}) format('woff2'); }
    * { margin:0; padding:0; box-sizing:border-box; }
    @page { margin:0; size:${totalWidthCm}cm ${totalHeightCm}cm; }
    html, body { width:${totalWidthCm}cm; height:${totalHeightCm}cm; }
    .wrap { position:relative; width:${totalWidthCm}cm; height:${totalHeightCm}cm; overflow:hidden;
      background-image:url('${panoramicBase64}'); background-size:cover; background-position:center 42%; }
    .tapa-text { position:absolute; left:${frontCoverLeftCm.toFixed(3)}cm; width:${coverWidthCm}cm; top:${titleTopCm.toFixed(3)}cm; text-align:center; color:#fff; text-shadow:0 0.02cm 0.04cm rgba(0,0,0,0.35); }
    .tapa-text .title { display:block; font-family:'Prata',serif; font-size:2.2cm; letter-spacing:0.14em; text-indent:0.14em; }
    .tapa-text .divider { width:2.2cm; height:0.04cm; background:#fff; margin:0.44cm auto; opacity:0.88; }
    .tapa-text .year { display:block; font-family:'Prata',serif; font-size:0.6cm; letter-spacing:0.30em; text-indent:0.30em; opacity:0.94; }
    .lomo-text { position:absolute; top:50%; left:${spineLeftCm.toFixed(3)}cm; width:${spineWidthCm}cm; height:0; display:flex; align-items:center; justify-content:center; }
    .lomo-text span { font-family:'Prata',serif; color:#fff; font-size:1.0cm; letter-spacing:0.22em; white-space:nowrap; transform:rotate(90deg); }
    </style></head><body>
    <div class="wrap">
      <div class="tapa-text"><span class="title">${this.escapeHtml(title)}</span><div class="divider"></div><span class="year">${year}</span></div>
      <div class="lomo-text"><span>${this.escapeHtml(spineLabel)}</span></div>
    </div>
    </body></html>`;
  }

  private async renderWrapPdf(html: string, layout: WrapLayout): Promise<Buffer> {
    const browser = await this.browserPool.acquire();
    const page = await browser.newPage();
    try {
      page.setDefaultTimeout(90000);
      await page.setViewport({
        width: Math.round((layout.totalWidthCm / 2.54) * 96),
        height: Math.round((layout.totalHeightCm / 2.54) * 96),
        deviceScaleFactor: 2, // la panorámica fuente es de baja resolución; DSF 2 equilibra calidad/memoria en una página ancha
      });
      await page.setContent(html, { waitUntil: 'load' });
      const pdf = await page.pdf({
        width: `${layout.totalWidthCm}cm`,
        height: `${layout.totalHeightCm}cm`,
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
