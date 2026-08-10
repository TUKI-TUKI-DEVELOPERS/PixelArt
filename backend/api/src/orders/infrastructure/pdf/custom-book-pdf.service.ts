import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as puppeteer from 'puppeteer-core';
import { createPool, Pool } from 'generic-pool';
import sharp from 'sharp';
import QRCode from 'qrcode';
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
  personalized_model_id: string | null;
};

type CrossSellCard = {
  name: string;
  description: string | null;
  imageSrc: string | null;
  qrDataUrl: string;
};

export type CrossSellCandidate = {
  id: number;
  name: string;
  thumbnailUrl: string | null;
};

@Injectable()
export class CustomBookPdfService {
  private readonly logger = new Logger(CustomBookPdfService.name);
  private readonly browserPool: Pool<puppeteer.Browser>;
  private dedicationFontBase64: string | null = null;
  private crossSellFontBase64: { regular: string; italic: string } | null = null;
  private crossSellBackgroundBase64: string | null = null;

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

  /** Mismo patrón que getDedicationFontBase64() — bundleada como .woff2
   * (formato que sirve Google Fonts por defecto vía la API css2, subset
   * "latin" que ya cubre tildes/ñ del español) en vez de .ttf, evita
   * depender de que el contenedor de Chromium tenga la fuente instalada. */
  private getCrossSellFontBase64(): { regular: string; italic: string } {
    if (!this.crossSellFontBase64) {
      this.crossSellFontBase64 = {
        regular: readFileSync(join(__dirname, 'fonts', 'LibreCaslonText-Regular.woff2')).toString('base64'),
        italic: readFileSync(join(__dirname, 'fonts', 'LibreCaslonText-Italic.woff2')).toString('base64'),
      };
    }
    return this.crossSellFontBase64;
  }

  /** Fondo genérico (sin personas, sin marca) de la página de venta cruzada
   * — generado UNA sola vez con IA y bundleado como asset estático (mismo
   * patrón que el logo/las fuentes), no por pedido: esta página nunca lleva
   * contenido personalizado, así que no hay motivo para regenerarla con IA
   * en cada orden. Ver plan de diseño para el prompt usado. */
  private getCrossSellBackgroundBase64(): string {
    if (!this.crossSellBackgroundBase64) {
      const buffer = readFileSync(join(__dirname, 'branding', 'cross-sell-background.png'));
      this.crossSellBackgroundBase64 = buffer.toString('base64');
    }
    return this.crossSellBackgroundBase64;
  }

  async generateAndStore(orderId: number): Promise<void> {
    this.logger.log(`Generando PDF libro personalizado para orden #${orderId}`);

    const [designRow] = (await this.dataSource.query(
      `SELECT o.gradient_color_start, o.gradient_color_end, o.dedication_text,
              dr.dedication_text AS demo_dedication_text, o.personalized_model_id
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

    const crossSellCards = await this.resolveCrossSellCards(designRow.personalized_model_id);

    const html = this.buildHtml(effectiveRows, assetMap, {
      gradientStart: designRow.gradient_color_start,
      gradientEnd: designRow.gradient_color_end,
      dedicationText,
      crossSellCards,
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

  /** Resuelve hasta 3 libros para la página de venta cruzada — sin IA,
   * 100% desde datos que ya existen: personalized_models.cover_asset_id
   * (misma miniatura que ya usa el sitio) + catalog_books.description
   * (matcheado por nombre — mismo bridge que ya asume el frontend en su
   * mapa LIBRO_NAMES) + slug (para la URL real del QR). Devuelve [] si no
   * hay candidatos (ej. libro sin model_id o catálogo con <1 libro más) —
   * en ese caso el slot ADDON cae al degradado en blanco, mismo fallback
   * que ya existía. */
  /** selectedModelIds: elegidos a mano por el admin (hasta 3, orden que
   * eligió) — sin esto, cae al azar (comportamiento original). En los dos
   * casos se excluye el libro actual y se exige miniatura+slug cargados,
   * mismo criterio que listCrossSellCandidates(). */
  private async resolveCrossSellCards(currentModelId: string | null, selectedModelIds?: number[]): Promise<CrossSellCard[]> {
    if (!currentModelId) return [];

    type Row = { model_id: string; name: string; model_slug: string; category_slug: string; storage_key: string | null; description: string | null };
    let rows: Row[];
    if (selectedModelIds && selectedModelIds.length > 0) {
      rows = await this.dataSource.query(
        `SELECT pm.id AS model_id, pm.name, pm.slug AS model_slug, pc.slug AS category_slug, a.storage_key, cb.description
         FROM personalized_models pm
         JOIN personalized_categories pc ON pc.id = pm.category_id
         LEFT JOIN assets a ON a.id = pm.cover_asset_id
         LEFT JOIN catalog_books cb ON cb.name = pm.name
         WHERE pm.id = ANY($1::bigint[]) AND pm.is_active = true AND pm.id != $2
           AND pm.cover_asset_id IS NOT NULL AND pm.slug IS NOT NULL AND pc.slug IS NOT NULL`,
        [selectedModelIds, currentModelId],
      );
      // Preserva el orden que eligió el admin (la query con ANY() no lo garantiza).
      const order = new Map(selectedModelIds.map((id, i) => [String(id), i]));
      rows = rows.slice().sort((a, b) => (order.get(a.model_id) ?? 0) - (order.get(b.model_id) ?? 0));
    } else {
      rows = await this.dataSource.query(
        `SELECT pm.id AS model_id, pm.name, pm.slug AS model_slug, pc.slug AS category_slug, a.storage_key, cb.description
         FROM personalized_models pm
         JOIN personalized_categories pc ON pc.id = pm.category_id
         LEFT JOIN assets a ON a.id = pm.cover_asset_id
         LEFT JOIN catalog_books cb ON cb.name = pm.name
         WHERE pm.is_active = true AND pm.id != $1
           AND pm.cover_asset_id IS NOT NULL AND pm.slug IS NOT NULL AND pc.slug IS NOT NULL
         ORDER BY RANDOM()
         LIMIT 3`,
        [currentModelId],
      );
    }
    if (rows.length === 0) return [];

    // NEXT_PUBLIC_URL: mismo env var que ya usa el frontend (compartido vía
    // env_file en docker-compose, llega también al contenedor de la api).
    // Sigue en localhost hasta que el dominio de producción esté definido —
    // el mecanismo ya queda armado, solo falta ese dato para imprimir real.
    const baseUrl = (process.env.NEXT_PUBLIC_URL || 'http://localhost:3000').replace(/\/$/, '');

    return Promise.all(
      rows.map(async (r) => {
        let imageSrc: string | null = null;
        if (r.storage_key) {
          try {
            const buffer = await this.fileStorage.download(r.storage_key);
            const optimized = await sharp(buffer)
              .resize(640, 640, { fit: 'inside', withoutEnlargement: true })
              .png()
              .toBuffer();
            imageSrc = `data:image/png;base64,${optimized.toString('base64')}`;
          } catch (err) {
            this.logger.error(`Venta cruzada: no se pudo descargar ${r.storage_key} — ${(err as Error).message}`);
          }
        }
        const url = `${baseUrl}/libros-personalizados/${r.category_slug}/${r.model_slug}`;
        const qrDataUrl = await QRCode.toDataURL(url, { margin: 1, width: 300 });
        return { name: r.name, description: r.description, imageSrc, qrDataUrl };
      }),
    );
  }

  /** Lista TODOS los libros elegibles (mismo criterio que resolveCrossSellCards:
   * activo, con miniatura y slugs cargados, excluye el libro actual) para que
   * el admin elija hasta 3 en vez de dejarlo al azar. Miniatura como URL
   * directa (no la descarga/reescala como resolveCrossSellCards) — acá es
   * solo para mostrar en la UI de selección, no va a la imagen final. */
  async listCrossSellCandidates(currentModelId: string | null): Promise<CrossSellCandidate[]> {
    if (!currentModelId) return [];

    const rows: { id: string; name: string; storage_key: string | null }[] = await this.dataSource.query(
      `SELECT pm.id, pm.name, a.storage_key
       FROM personalized_models pm
       JOIN personalized_categories pc ON pc.id = pm.category_id
       LEFT JOIN assets a ON a.id = pm.cover_asset_id
       WHERE pm.is_active = true AND pm.id != $1
         AND pm.cover_asset_id IS NOT NULL AND pm.slug IS NOT NULL AND pc.slug IS NOT NULL
       ORDER BY pm.name`,
      [currentModelId],
    );

    return rows.map((r) => ({
      id: Number(r.id),
      name: r.name,
      thumbnailUrl: r.storage_key ? this.fileStorage.getPublicUrl(r.storage_key) : null,
    }));
  }

  private buildHtml(
    rows: PrintAssetRow[],
    assetMap: Map<string, string>,
    design: { gradientStart: string; gradientEnd: string; dedicationText: string; crossSellCards: CrossSellCard[] },
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
    const crossSellPage = this.buildCrossSellPage(design.crossSellCards);

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
      // Sin ADDON manual, cae a la página de venta cruzada (si hay libros
      // para promocionar) — antes caía directo a un degradado en blanco,
      // mismo fallback que se mantiene si no hay candidatos.
      addon ? pageDiv(addon) : crossSellPage || gradientPage,
      pageDiv(backCover),
    ]
      .filter(Boolean)
      .join('\n  ');

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${this.getSharedStyles(design.gradientStart, design.gradientEnd)}</style>
</head>
<body>
  ${pages}
</body>
</html>`;
  }

  /** Extraído de buildHtml() para reusarlo también en renderAddonPreview()
   * (screenshot de una sola página, sin el resto del libro) — mismas fuentes
   * y clases .page/.cs-page en los dos casos. gradientStart/gradientEnd son
   * propios de cada orden (no un estilo compartido real) — renderAddonPreview()
   * nunca usa .page-gradient, así que le pasa cualquier valor. */
  private getSharedStyles(gradientStart: string, gradientEnd: string): string {
    return `
    @font-face {
      font-family: 'Dancing Script';
      src: url(data:font/ttf;base64,${this.getDedicationFontBase64()}) format('truetype');
      font-weight: 600;
    }
    @font-face {
      font-family: 'Libre Caslon Text';
      src: url(data:font/woff2;base64,${this.getCrossSellFontBase64().regular}) format('woff2');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Libre Caslon Text';
      src: url(data:font/woff2;base64,${this.getCrossSellFontBase64().italic}) format('woff2');
      font-weight: 400;
      font-style: italic;
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
      /* Capas neutras (blanco/negro) encima del degradado del cliente — dan
         profundidad y luz suave sin competir con ningún par de colores,
         a diferencia de una foto fija que solo funciona con una paleta.
         Mismo truco ya validado en el fondo de .cs-page. */
      background:
        radial-gradient(circle at 18% 15%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%),
        radial-gradient(circle at 85% 20%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%),
        radial-gradient(circle at 30% 88%, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0) 45%),
        radial-gradient(circle at 78% 82%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 50%),
        linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dedication-card {
      /* Convención real de libro: dedicatoria chica y elegante, en un
         costado del tercio inferior — NO un cartel centrado tipo tarjeta de
         saludo. position:absolute la saca del centrado flex de
         .page-gradient (que sigue sirviendo para las páginas de degradado
         puro, sin texto).
         Sin backdrop-filter: Chromium headless no lo renderiza de forma
         confiable en el motor de impresión (page.pdf()) — en vez de vidrio
         esmerilado salía un parche blanco opaco. Compensado con más
         opacidad sólida en el fondo. Sin text-shadow tampoco: en el PDF
         impreso Chromium lo emite como contenido de texto duplicado (se ve
         al seleccionar/copiar el texto del PDF), no es solo visual. */
      position: absolute;
      right: 9%;
      bottom: 16%;
      width: fit-content;
      max-width: 32%;
      /* Red de seguridad: dedicatorias predefinidas llegan hasta 369
         caracteres, y el admin puede escribir lo que quiera en el textarea
         sin límite — sin este tope, un texto largo hace crecer la tarjeta
         hacia arriba sin control. Con esto, en el peor caso recorta en vez
         de invadir el resto de la página. */
      max-height: 45%;
      overflow: hidden;
      overflow-wrap: break-word;
      background: rgba(255,255,255,0.42);
      border: 1px solid rgba(255,255,255,0.55);
      border-radius: 10px;
      padding: 22px 26px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.10);
      font-family: 'Dancing Script', cursive;
      font-weight: 600;
      font-size: 18px;
      line-height: 1.55;
      color: #3a2a1e;
      text-align: left;
    }
    .cs-page {
      background-image: url(data:image/png;base64,${this.getCrossSellBackgroundBase64()});
      background-size: cover;
      background-position: center;
      font-family: 'Libre Caslon Text', Georgia, 'Times New Roman', serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 6% 5%;
    }
    .cs-kicker {
      font-family: 'Montserrat', Arial, sans-serif;
      font-weight: 700;
      letter-spacing: 3px;
      font-size: 13px;
      color: #b3742f;
      text-transform: uppercase;
    }
    .cs-h1 {
      font-size: 28px;
      font-weight: 400;
      color: #3a2a1e;
      margin-top: 8px;
      margin-bottom: 5%;
      text-align: center;
    }
    .cs-grid {
      display: flex;
      justify-content: center;
      gap: 4%;
      flex: 1;
      width: 100%;
    }
    .cs-card {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .cs-thumb-wrap {
      width: 100%;
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 6%;
      filter: drop-shadow(0 18px 30px rgba(80, 40, 10, 0.28));
    }
    .cs-page .cs-thumb-wrap img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 6px;
    }
    .cs-card h2 {
      font-size: 16px;
      font-weight: 400;
      color: #3a2a1e;
      line-height: 1.25;
      min-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }
    .cs-card p {
      font-style: italic;
      font-size: 10px;
      color: #6b5643;
      line-height: 1.5;
      min-height: 30px;
      margin-bottom: 12px;
    }
    .cs-qr-wrap {
      width: 60px;
      height: 60px;
      background: #fffaf3;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 10px rgba(80, 40, 10, 0.15);
    }
    .cs-page .cs-qr-wrap img { width: 50px; height: 50px; }
    .cs-qr-label {
      font-family: 'Montserrat', Arial, sans-serif;
      font-size: 7px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #a08a6f;
      margin-top: 6px;
    }
    .cs-footer {
      font-style: italic;
      font-size: 12px;
      color: #9c8365;
      text-align: center;
      margin-top: 4%;
    }`;
  }

  /** Página "Más historias PixelArt" — sin IA, maquetación pura (HTML/CSS),
   * adaptada del prototipo validado en
   * PromptsPixelArtPlantillas/tapa-contratapa-promocion/cross-sell-page-prototipo.html.
   * Devuelve '' si no hay libros para promocionar (el caller cae al
   * degradado en blanco). Tipografía 'Libre Caslon Text' embebida por
   * @font-face (ver getCrossSellFontBase64()), mismo patrón que
   * DancingScript en dedicationPage — Georgia/serif quedan solo como
   * fallback defensivo si por algún motivo la fuente no carga. */
  private buildCrossSellPage(cards: CrossSellCard[]): string {
    if (cards.length === 0) return '';

    const cardsHtml = cards
      .map(
        (c) => `
      <div class="cs-card">
        <div class="cs-thumb-wrap">${c.imageSrc ? `<img src="${c.imageSrc}" alt="" />` : ''}</div>
        <h2>${this.escapeHtml(c.name)}</h2>
        <p>${c.description ? this.escapeHtml(c.description) : ''}</p>
        <div class="cs-qr-wrap"><img src="${c.qrDataUrl}" alt="" /></div>
        <div class="cs-qr-label">Escaneá y conocelo</div>
      </div>`,
      )
      .join('\n');

    return `<div class="page cs-page">
      <div class="cs-kicker">Más historias PixelArt</div>
      <h1 class="cs-h1">Cada momento merece su propio libro</h1>
      <div class="cs-grid">${cardsHtml}
      </div>
      <div class="cs-footer">Porque el amor, cuando es de verdad, merece quedar para siempre.</div>
    </div>`;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /** Genera la página de venta cruzada como imagen independiente para
   * revisar antes de confirmar (mismo patrón PENDING_REVIEW que Portada/
   * Contraportada) — sin IA, es maquetación pura con datos que ya existen
   * en el catálogo (miniaturas + slugs). Tira BadRequestException si no hay
   * libros candidatos (< 1 libro activo más, con miniatura y slug cargados),
   * en vez del fallback silencioso a degradado en blanco que usa el PDF
   * completo — acá el admin necesita saber que no hay nada que generar. */
  async renderAddonPreview(personalizedModelId: string | null, selectedModelIds?: number[]): Promise<Buffer> {
    const cards = await this.resolveCrossSellCards(personalizedModelId, selectedModelIds);
    if (cards.length === 0) {
      throw new BadRequestException(
        'No hay libros candidatos para armar la página de venta cruzada (hace falta al menos 1 libro activo más con miniatura y slug cargados).',
      );
    }
    const pageHtml = this.buildCrossSellPage(cards);
    // Colores de degradado irrelevantes acá — .page-gradient no aparece en
    // esta página, no hace falta el valor real de la orden.
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${this.getSharedStyles('#ffffff', '#ffffff')}</style>
</head>
<body>
  ${pageHtml}
</body>
</html>`;
    return this.renderPageScreenshot(html);
  }

  /** Screenshot de una sola página en vez de PDF completo — a diferencia de
   * renderPdf() (que usa preferCSSPageSize + page.pdf() para respetar el
   * @page en cm), acá Chromium renderiza los cm de .page a 96dpi normal (1cm
   * = 96/2.54px), así que alcanza con setear el viewport a esa medida en
   * px — el CSS de .cs-page no necesita ningún cambio entre los dos modos. */
  private async renderPageScreenshot(html: string): Promise<Buffer> {
    const CM_TO_PX = 96 / 2.54;
    const browser = await this.browserPool.acquire();
    const page = await browser.newPage();
    try {
      await page.setViewport({
        width: Math.round(PAGE_WIDTH_CM * CM_TO_PX),
        height: Math.round(HEIGHT_CM * CM_TO_PX),
        deviceScaleFactor: 2,
      });
      page.setDefaultTimeout(90000);
      await page.setContent(html, { waitUntil: 'load' });
      await page.evaluateHandle('document.fonts.ready');
      const png = await page.screenshot({ type: 'png' });
      return Buffer.from(png);
    } finally {
      await page.close();
      await this.browserPool.release(browser);
    }
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
