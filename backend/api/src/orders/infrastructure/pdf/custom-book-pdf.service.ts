import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer-core';
import { createPool, Pool } from 'generic-pool';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';

// Dimensiones para libros personalizados — libro apaisado (acostado): cada
// página individual mide WIDTH_CM x HEIGHT_CM completo, más ancha que alta.
// Confirmado con la imprenta — el `_plantilla-maestra.md` que hablaba de
// "página vertical" no aplica a este formato, no usar como fuente de tamaño.
const WIDTH_CM  = 29;
const HEIGHT_CM = 20.5;
const PAGE_WIDTH_CM = WIDTH_CM;

const MAX_IMAGE_PX = 2400;

type PrintAssetRow = {
  id: string;
  asset_type: string;
  template_id: string | null;
  slot_index: number | null;
  page_part: string;
  storage_key: string;
};

type OrderDesignRow = {
  gradient_color_start: string;
  gradient_color_end: string;
  dedication_text: string | null;
  demo_dedication_text: string | null;
};

@Injectable()
export class CustomBookPdfService {
  private readonly logger = new Logger(CustomBookPdfService.name);
  private readonly browserPool: Pool<puppeteer.Browser>;
  private dedicationFontBase64: string | null = null;

  constructor(
    private readonly fileStorage: FileStoragePort,
    private readonly dataSource: DataSource,
  ) {
    this.browserPool = createPool(
      {
        create:  () => this.createBrowser(),
        destroy: (browser) => browser.close(),
      },
      { max: 2, min: 0 },
    );
  }

  private createBrowser(): Promise<puppeteer.Browser> {
    return puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
      timeout: 60000,
    });
  }

  /** Bundleada como archivo local (ver nest-cli.json) para que la cursiva de la
   * dedicatoria se vea siempre igual, sin depender de qué fuentes tenga
   * instaladas el contenedor de Chromium (hoy solo trae font-noto). */
  private getDedicationFontBase64(): string {
    if (!this.dedicationFontBase64) {
      const buffer = readFileSync(join(__dirname, 'fonts', 'DancingScript.ttf'));
      this.dedicationFontBase64 = buffer.toString('base64');
    }
    return this.dedicationFontBase64;
  }

  async generateAndStore(orderId: number): Promise<void> {
    this.logger.log(`Generando PDF libro personalizado para orden #${orderId}`);

    const [designRow] = (await this.dataSource.query(
      `SELECT o.gradient_color_start, o.gradient_color_end, o.dedication_text,
              dr.dedication_text AS demo_dedication_text
       FROM orders o
       LEFT JOIN demo_request dr ON dr.id = o.demo_request_id
       WHERE o.id = $1`,
      [orderId],
    )) as OrderDesignRow[];
    if (!designRow) {
      this.logger.warn(`Orden #${orderId} no encontrada`);
      return;
    }
    const dedicationText = designRow.dedication_text ?? designRow.demo_dedication_text ?? '';

    // Solo COVER/TEMPLATE/ADDON/BACK_COVER — dedicatoria y las hojas de diseño ya
    // no son archivos subidos, se arman solas más abajo. Solo CONFIRMED — una
    // generación con IA sin revisar por el admin (PENDING_REVIEW) nunca debe
    // terminar en el PDF de imprenta.
    const rows: PrintAssetRow[] = await this.dataSource.query(
      `SELECT id, asset_type, template_id, slot_index, page_part, storage_key
       FROM order_print_assets
       WHERE order_id = $1 AND status = 'CONFIRMED'
         AND asset_type IN ('COVER', 'TEMPLATE', 'ADDON', 'BACK_COVER')
       ORDER BY
         CASE asset_type
           WHEN 'COVER'      THEN 0
           WHEN 'TEMPLATE'   THEN 1
           WHEN 'ADDON'      THEN 2
           WHEN 'BACK_COVER' THEN 3
           ELSE 4
         END,
         slot_index ASC NULLS LAST,
         page_part ASC`,
      [orderId],
    );

    if (rows.length === 0) {
      this.logger.warn(`Orden #${orderId} no tiene archivos de impresión cargados`);
      return;
    }

    // Si existen filas A o B para un template, ignorar las filas ONLY del mismo template (migración single → double page)
    const templateIdsWithParts = new Set(
      rows
        .filter((r) => r.asset_type === 'TEMPLATE' && (r.page_part === 'A' || r.page_part === 'B'))
        .map((r) => r.template_id),
    );
    const effectiveRows = rows.filter(
      (r) => !(r.asset_type === 'TEMPLATE' && r.page_part === 'ONLY' && r.template_id && templateIdsWithParts.has(r.template_id)),
    );

    // Log del orden efectivo para diagnóstico
    this.logger.log(`Orden #${orderId} — ${effectiveRows.length} páginas de archivos + degradado/dedicatoria:`);
    effectiveRows.forEach((r, i) => {
      this.logger.log(`  [${i + 1}] ${r.asset_type} template=${r.template_id ?? '-'} slot=${r.slot_index ?? '-'} part=${r.page_part} key=${r.storage_key}`);
    });

    // Descargar y optimizar todas las imágenes en paralelo
    const assetMap = new Map<string, string>();
    await Promise.all(
      effectiveRows.map(async (row) => {
        try {
          const buffer = await this.fileStorage.download(row.storage_key);
          const optimized = await sharp(buffer)
            .resize(MAX_IMAGE_PX, MAX_IMAGE_PX, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 92 })
            .toBuffer();
          assetMap.set(row.storage_key, `data:image/jpeg;base64,${optimized.toString('base64')}`);
        } catch (err) {
          // No insertar placeholder — la página quedará en blanco en el PDF
          this.logger.error(`Archivo no encontrado en storage: ${row.storage_key} — ${(err as Error).message}`);
        }
      }),
    );

    const html = this.buildHtml(effectiveRows, assetMap, {
      gradientStart: designRow.gradient_color_start,
      gradientEnd: designRow.gradient_color_end,
      dedicationText,
    });
    const pdfBuffer = await this.renderPdf(html);

    const storageKey = `custom-books/renders/${orderId}.pdf`;
    await this.fileStorage.upload(storageKey, pdfBuffer, 'application/pdf');

    await this.dataSource.query(
      `INSERT INTO custom_book_renders (order_id, pdf_storage_key)
       VALUES ($1, $2)
       ON CONFLICT (order_id) DO UPDATE SET pdf_storage_key = $2, generated_at = now()`,
      [orderId, storageKey],
    );

    this.logger.log(`PDF listo: ${storageKey}`);
  }

  getPdfUrl(pdfStorageKey: string): string {
    return this.fileStorage.getPublicUrl(pdfStorageKey);
  }

  private buildHtml(
    rows: PrintAssetRow[],
    assetMap: Map<string, string>,
    design: { gradientStart: string; gradientEnd: string; dedicationText: string },
  ): string {
    const cover = rows.find((r) => r.asset_type === 'COVER');
    const addon = rows.find((r) => r.asset_type === 'ADDON');
    const backCover = rows.find((r) => r.asset_type === 'BACK_COVER');
    const templateRows = rows.filter((r) => r.asset_type === 'TEMPLATE');

    const pageDiv = (row: PrintAssetRow | undefined): string => {
      if (!row) return '';
      const src = assetMap.get(row.storage_key);
      return src ? `<div class="page"><img src="${src}" alt="" /></div>` : `<div class="page blank"></div>`;
    };

    const gradientPage = `<div class="page page-gradient"></div>`;
    const dedicationPage = `<div class="page page-gradient">
      <div class="dedication-card">${this.escapeHtml(design.dedicationText).replace(/\n/g, '<br/>')}</div>
    </div>`;

    const templatePages = templateRows
      .map((row) => {
        const src = assetMap.get(row.storage_key);
        if (!src) return `<div class="page blank"></div>`;
        return `<div class="page"><img src="${src}" alt="" /></div>`;
      })
      .join('\n  ');

    const pages = [
      pageDiv(cover),
      gradientPage,
      dedicationPage,
      templatePages,
      gradientPage,
      addon ? pageDiv(addon) : gradientPage,
      pageDiv(backCover),
    ]
      .filter(Boolean)
      .join('\n  ');

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @font-face {
      font-family: 'Dancing Script';
      src: url(data:font/ttf;base64,${this.getDedicationFontBase64()}) format('truetype');
      font-weight: 600;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { margin: 0; size: ${PAGE_WIDTH_CM}cm ${HEIGHT_CM}cm; }
    .page {
      width: ${PAGE_WIDTH_CM}cm;
      height: ${HEIGHT_CM}cm;
      page-break-after: always;
      overflow: hidden;
      position: relative;
    }
    .page:last-child { page-break-after: avoid; }
    .page img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .page.blank { background: #ffffff; }
    .page-gradient {
      background: linear-gradient(135deg, ${design.gradientStart} 0%, ${design.gradientEnd} 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dedication-card {
      width: 75%;
      max-height: 70%;
      overflow: hidden;
      background: #ffffff;
      border-radius: 16px;
      padding: 48px 56px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.18);
      font-family: 'Dancing Script', cursive;
      font-weight: 600;
      font-size: 36px;
      line-height: 1.7;
      color: #2a2a2a;
      text-align: center;
    }
  </style>
</head>
<body>
  ${pages}
</body>
</html>`;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private async renderPdf(html: string): Promise<Buffer> {
    const browser = await this.browserPool.acquire();
    const page = await browser.newPage();
    try {
      page.setDefaultTimeout(90000);
      await page.setContent(html, { waitUntil: 'load' });
      // La cursiva de la dedicatoria es un @font-face embebido — 'load' no
      // garantiza que Chromium ya haya parseado la fuente, hay que esperar
      // document.fonts.ready explícitamente o a veces sale con fuente de reemplazo.
      await page.evaluateHandle('document.fonts.ready');
      const pdf = await page.pdf({
        printBackground: true,
        // true: respeta el @page de buildHtml() (ancho real de una página =
        // mitad del libro abierto) en vez del tamaño de página por defecto
        // de Chromium.
        preferCSSPageSize: true,
      });
      return Buffer.from(pdf);
    } finally {
      await page.close();
      await this.browserPool.release(browser);
    }
  }
}
