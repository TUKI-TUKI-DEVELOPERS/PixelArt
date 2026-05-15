import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer-core';
import { createPool, Pool } from 'generic-pool';
import sharp from 'sharp';
import { DataSource } from 'typeorm';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';

const PLACEHOLDER_BASE64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+PBhPQAIgAMG+4l0SAAAAABJRU5ErkJggg==';

// Dimensiones para libros personalizados
const WIDTH_CM  = 29;
const HEIGHT_CM = 20.5;

const MAX_IMAGE_PX = 2400;

type PrintAssetRow = {
  id: string;
  asset_type: string;
  template_id: string | null;
  slot_index: number | null;
  storage_key: string;
};

@Injectable()
export class CustomBookPdfService {
  private readonly logger = new Logger(CustomBookPdfService.name);
  private readonly browserPool: Pool<puppeteer.Browser>;

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

  async generateAndStore(orderId: number): Promise<void> {
    this.logger.log(`Generando PDF libro personalizado para orden #${orderId}`);

    const rows: PrintAssetRow[] = await this.dataSource.query(
      `SELECT id, asset_type, template_id, slot_index, storage_key
       FROM order_print_assets
       WHERE order_id = $1
       ORDER BY
         CASE asset_type WHEN 'COVER' THEN 0 WHEN 'TEMPLATE' THEN 1 ELSE 2 END,
         slot_index ASC NULLS LAST`,
      [orderId],
    );

    if (rows.length === 0) {
      this.logger.warn(`Orden #${orderId} no tiene archivos de impresión cargados`);
      return;
    }

    // Descargar y optimizar todas las imágenes en paralelo
    const assetMap = new Map<string, string>();
    await Promise.all(
      rows.map(async (row) => {
        try {
          const buffer = await this.fileStorage.download(row.storage_key);
          const optimized = await sharp(buffer)
            .resize(MAX_IMAGE_PX, MAX_IMAGE_PX, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 92 })
            .toBuffer();
          assetMap.set(row.storage_key, `data:image/jpeg;base64,${optimized.toString('base64')}`);
        } catch (err) {
          this.logger.warn(`Error procesando asset ${row.storage_key}: ${(err as Error).message}`);
          assetMap.set(row.storage_key, PLACEHOLDER_BASE64);
        }
      }),
    );

    const html = this.buildHtml(rows, assetMap);
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

  private buildHtml(rows: PrintAssetRow[], assetMap: Map<string, string>): string {
    const pages = rows.map((row) => {
      const src = assetMap.get(row.storage_key) ?? PLACEHOLDER_BASE64;
      return `<div class="page"><img src="${src}" alt="" /></div>`;
    });

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { margin: 0; size: ${WIDTH_CM}cm ${HEIGHT_CM}cm; }
    html, body { width: ${WIDTH_CM}cm; }
    .page {
      width: ${WIDTH_CM}cm;
      height: ${HEIGHT_CM}cm;
      page-break-after: always;
      overflow: hidden;
    }
    .page:last-child { page-break-after: avoid; }
    .page img {
      width: ${WIDTH_CM}cm;
      height: ${HEIGHT_CM}cm;
      object-fit: cover;
      display: block;
    }
  </style>
</head>
<body>
  ${pages.join('\n  ')}
</body>
</html>`;
  }

  private async renderPdf(html: string): Promise<Buffer> {
    const browser = await this.browserPool.acquire();
    const page = await browser.newPage();
    try {
      page.setDefaultTimeout(90000);
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const pdf = await page.pdf({
        width: `${WIDTH_CM}cm`,
        height: `${HEIGHT_CM}cm`,
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
