import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DataSource } from 'typeorm';
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
    private readonly dataSource: DataSource,
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

  async renderCmykSource(projectId: number, part: 'covers' | 'interior'): Promise<Buffer> {
    const prepared = await this.prepareProjectDocuments(projectId, 'throw', 'Falta la portada o contraportada requerida.');
    if (!prepared) throw new Error('Proyecto no encontrado');
    const { documents, widthCm, heightCm } = prepared;
    return this.renderPdf(part === 'covers' ? documents.coversHtml : documents.interiorHtml, widthCm, heightCm);
  }

  async generateAndStore(projectId: number): Promise<void> {
    this.logger.log(`Generando PDF para proyecto #${projectId}`);

    const prepared = await this.prepareProjectDocuments(projectId, 'log-and-return', 'No se pudo generar el PDF: falta la portada o contraportada requerida.');
    if (!prepared) return;
    const { documents, widthCm, heightCm } = prepared;
    const [coversPdf, interiorPdf] = await Promise.all([
      this.renderPdf(documents.coversHtml, widthCm, heightCm),
      this.renderPdf(documents.interiorHtml, widthCm, heightCm),
    ]);
    const generation = randomUUID();
    const base = `photobook-renders/${projectId}/generation-${generation}`;
    const coversKey = `${base}/covers.pdf`;
    const interiorKey = `${base}/interior.pdf`;
    await this.fileStorage.upload(coversKey, coversPdf, 'application/pdf');
    await this.fileStorage.upload(interiorKey, interiorPdf, 'application/pdf');
    await this.repo.saveRender(projectId, coversKey);
    this.logger.log(`PDFs listos para proyecto #${projectId}`);
  }

  private async prepareProjectDocuments(
    projectId: number,
    missingProject: 'throw' | 'log-and-return',
    missingCoverMessage: string,
  ): Promise<{ documents: ReturnType<PhotobookPdfService['composeDocuments']>; widthCm: number; heightCm: number } | null> {
    const project = await this.repo.findProjectById(projectId);
    if (!project) {
      if (missingProject === 'throw') throw new Error('Proyecto no encontrado');
      this.logger.error(`Proyecto #${projectId} no encontrado`);
      return null;
    }

    const widthCm = project.customWidthCm ?? DEFAULT_WIDTH_CM;
    const heightCm = project.customHeightCm ?? DEFAULT_HEIGHT_CM;
    const theme = project.photobookThemeId === null ? null : await this.repo.getTheme(project.photobookThemeId);
    const assetIds = Array.from(new Set(project.pages.flatMap((page) => page.slots.map((slot) => slot.assetId))));
    const assetMap = await this.prepareAssets(assetIds);
    let frontKey: string;
    let backKey: string;
    if (theme) {
      frontKey = theme.coverTemplateKey;
      backKey = theme.backCoverKey ?? '';
    } else {
      const [sources] = await this.dataSource.query(
        `SELECT front_asset.storage_key AS front_storage_key, back_asset.storage_key AS back_storage_key
         FROM custom_photobook_requests r
         LEFT JOIN assets front_asset ON front_asset.id = r.front_cover_asset_id
         LEFT JOIN assets back_asset ON back_asset.id = r.back_cover_asset_id
         WHERE r.linked_photobook_project_id = $1`, [projectId],
      ) as { front_storage_key: string | null; back_storage_key: string | null }[];
      frontKey = sources?.front_storage_key ?? '';
      backKey = sources?.back_storage_key ?? '';
    }
    if (!frontKey || !backKey) throw new Error(missingCoverMessage);
    const [front, back] = await Promise.all([this.downloadCoverAsBase64(frontKey), this.downloadCoverAsBase64(backKey)]);
    if (front === PLACEHOLDER_BASE64 || back === PLACEHOLDER_BASE64) throw new Error('No se pudo preparar la portada o contraportada requerida.');
    const documents = this.composeDocuments(project, assetMap, widthCm, heightCm, front, back);
    return { documents, widthCm, heightCm };
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

  private composeDocuments(project: ProjectDetailRecord, assetMap: Map<number, string>, widthCm: number, heightCm: number, front: string | null, back: string | null) {
    if (!front || !back) throw new Error('Se requiere portada y contraportada para generar el PDF.');
    return {
      coversHtml: this.buildHtml({ ...project, pages: [] } as ProjectDetailRecord, new Map(), widthCm, heightCm, front, back),
      interiorHtml: this.buildHtml(project, assetMap, widthCm, heightCm, null, null),
    };
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
    .tapa-text { position:absolute; left:${frontCoverLeftCm.toFixed(3)}cm; width:${coverWidthCm}cm; top:${titleTopCm.toFixed(3)}cm; text-align:center; color:#fff; }
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

  private async generateAndStoreCustomCoverWrap(
    project: ProjectDetailRecord,
    coverWidthCm: number,
    coverHeightCm: number,
  ): Promise<void> {
    const rows: { front_storage_key: string | null; back_storage_key: string | null; cover_title: string | null; requested_theme: string }[] = await this.dataSource.query(
      `SELECT front_asset.storage_key AS front_storage_key,
              back_asset.storage_key AS back_storage_key,
              r.cover_title,
              r.requested_theme
       FROM custom_photobook_requests r
       LEFT JOIN assets front_asset ON front_asset.id = r.front_cover_asset_id
       LEFT JOIN assets back_asset ON back_asset.id = r.back_cover_asset_id
       WHERE r.linked_photobook_project_id = $1
       LIMIT 1`,
      [project.id],
    );
    const request = rows[0];
    if (!request?.front_storage_key || !request.back_storage_key) return;

    const coverType: PhotobookCoverType = isValidPhotobookCoverType(project.coverType ?? '')
      ? (project.coverType as PhotobookCoverType)
      : 'TAPA_GRUESA';
    const spineMm = calculateSpineWidthMm(project.pageCount, coverType);
    const layout = computeWrapLayout(coverWidthCm, coverHeightCm, spineMm, SANGRADO_MM);
    const [front, back] = await Promise.all([
      this.downloadCoverAsBase64(request.front_storage_key),
      this.downloadCoverAsBase64(request.back_storage_key),
    ]);
    const spineColor = await this.sampleInnerEdgeColor(request.front_storage_key);
    const spineLabel = (request.cover_title || request.requested_theme).toUpperCase();
    const html = this.buildCustomWrapHtml(front, back, layout, spineColor, spineLabel);
    const pdf = await this.renderWrapPdf(html, layout);
    const key = `photobook-renders/${project.id}-cover-wrap.pdf`;
    await this.fileStorage.upload(key, pdf, 'application/pdf');
    this.logger.log(`Wrap de tapa a medida listo: ${key} (lomo ${spineMm}mm, ${coverType})`);
  }

  private async sampleInnerEdgeColor(frontStorageKey: string): Promise<string> {
    try {
      const raw = await this.fileStorage.download(frontStorageKey);
      const image = sharp(raw);
      const metadata = await image.metadata();
      if (!metadata.width || !metadata.height) throw new Error('La tapa frontal no tiene dimensiones válidas');

      // The front cover sits to the right of the spine, so its inner edge is left.
      // Crop a narrow vertical strip before averaging; resizing a square cover directly
      // to 1×1 would average the entire illustration instead.
      const sampleWidth = Math.max(1, Math.min(metadata.width, Math.round(metadata.width * 0.03)));
      const sample = await image
        .extract({ left: 0, top: 0, width: sampleWidth, height: metadata.height })
        .resize(1, 1, { fit: 'fill' })
        .raw()
        .toBuffer();
      return `rgb(${sample[0]}, ${sample[1]}, ${sample[2]})`;
    } catch {
      return '#1f2933';
    }
  }

  private buildCustomWrapHtml(frontBase64: string, backBase64: string, layout: WrapLayout, spineColor: string, spineLabel: string): string {
    const { totalWidthCm, totalHeightCm, coverWidthCm, coverHeightCm, spineWidthCm, frontCoverLeftCm, backCoverLeftCm, spineLeftCm, bleedCm } = layout;
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @font-face { font-family:'Prata'; font-style:normal; font-weight:400; src:url(data:font/woff2;base64,${PRATA_WOFF2_BASE64}) format('woff2'); }
    * { margin:0; padding:0; box-sizing:border-box; }
    @page { margin:0; size:${totalWidthCm}cm ${totalHeightCm}cm; }
    html, body { width:${totalWidthCm}cm; height:${totalHeightCm}cm; }
    .wrap { position:relative; width:${totalWidthCm}cm; height:${totalHeightCm}cm; overflow:hidden; background:${spineColor}; }
    .cover { position:absolute; top:${bleedCm.toFixed(3)}cm; width:${coverWidthCm}cm; height:${coverHeightCm}cm; object-fit:cover; display:block; }
    .back { left:${backCoverLeftCm.toFixed(3)}cm; }
    .front { left:${frontCoverLeftCm.toFixed(3)}cm; }
    .spine { position:absolute; left:${spineLeftCm.toFixed(3)}cm; top:${bleedCm.toFixed(3)}cm; width:${spineWidthCm}cm; height:${coverHeightCm}cm; display:flex; align-items:center; justify-content:center; }
    .spine span { font-family:'Prata',serif; color:#fff; font-size:0.85cm; letter-spacing:0.18em; white-space:nowrap; transform:rotate(90deg); text-shadow:0 0.04cm 0.18cm rgba(0,0,0,.35); }
    </style></head><body><div class="wrap">
      <img class="cover back" src="${backBase64}" alt="" />
      <img class="cover front" src="${frontBase64}" alt="" />
      <div class="spine"><span>${this.escapeHtml(spineLabel)}</span></div>
    </div></body></html>`;
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
