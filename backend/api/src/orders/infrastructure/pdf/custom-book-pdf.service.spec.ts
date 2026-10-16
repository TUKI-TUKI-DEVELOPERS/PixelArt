import sharp from 'sharp';
import { CustomBookPdfService } from './custom-book-pdf.service';

describe('CustomBookPdfService split composition', () => {
  const service = new CustomBookPdfService({} as any, {} as any);
  const rows = [
    { id: '1', asset_type: 'COVER', template_id: null, slot_index: null, page_part: 'ONLY', storage_key: 'front' },
    { id: '2', asset_type: 'TEMPLATE', template_id: 'a', slot_index: 1, page_part: 'ONLY', storage_key: 'interior-a' },
    { id: '3', asset_type: 'TEMPLATE', template_id: 'b', slot_index: 2, page_part: 'ONLY', storage_key: 'interior-b' },
    { id: '4', asset_type: 'BACK_COVER', template_id: null, slot_index: null, page_part: 'ONLY', storage_key: 'back' },
  ];
  const assets = new Map(rows.map((row, index) => [row.storage_key, `data:image/jpeg;base64,image-${index}`]));
  const design = { gradientStart: '#000', gradientEnd: '#fff', dedicationText: 'dedication', crossSellCards: [] };
  const makePng = (width: number, height: number): Promise<Buffer> =>
    sharp({ create: { width, height, channels: 3, background: { r: 10, g: 20, b: 30 } } })
      .png()
      .toBuffer();

  describe('print image resolution limits', () => {
    it.each(['COVER', 'BACK_COVER'])('preserves %s raster up to the 3424px cover cap', async (assetType) => {
      const output = await (service as any).preparePrintImage(await makePng(3424, 2416), assetType);
      const { width, height } = await sharp(output).metadata();
      expect({ width, height }).toEqual({ width: 3424, height: 2416 });
    });

    it.each(['TEMPLATE', 'ADDON'])('caps %s raster at 2400px', async (assetType) => {
      const output = await (service as any).preparePrintImage(await makePng(3000, 900), assetType);
      const { width, height } = await sharp(output).metadata();
      expect({ width, height }).toEqual({ width: 2400, height: 720 });
    });
  });

  it('creates exactly front-then-back covers and ordered interior-only pages', () => {
    const result = (service as any).composeDocuments(rows, assets, design);
    const pageSources = (html: string) => [...html.matchAll(/<img src="([^"]+)/g)].map((match) => match[1]);
    expect((result.coversHtml.match(/class="page(?: [^"]*)?"/g) ?? [])).toHaveLength(2);
    expect(pageSources(result.coversHtml)).toEqual([assets.get('front'), assets.get('back')]);
    expect(pageSources(result.interiorHtml)).toEqual([assets.get('interior-a'), assets.get('interior-b')]);
    expect(result.interiorHtml).not.toContain(assets.get('front'));
    expect(result.interiorHtml).not.toContain(assets.get('back'));
  });

  it('fails if either cover source is missing', () => {
    expect(() => (service as any).composeDocuments(rows.slice(1, 3), assets, design)).toThrow(/portada|contraportada/i);
  });

  it('does not log raw storage keys when a required print source fails', async () => {
    const storageKey = 'private/customer/upload-secret-key';
    const designRow = {
      gradient_color_start: '#000', gradient_color_end: '#fff', dedication_text: null,
      demo_dedication_text: null, personalized_model_id: null,
    };
    const failedRows = [{ ...rows[0], id: 'asset-123', storage_key: storageKey }];
    const dataSource = { query: jest.fn().mockResolvedValueOnce([designRow]).mockResolvedValueOnce(failedRows) };
    const target = new CustomBookPdfService({ download: jest.fn().mockRejectedValue(new Error('missing')) } as any, dataSource as any);
    const log = jest.spyOn((target as any).logger, 'log');

    await expect(target.generateAndStore(42)).rejects.toThrow();
    expect(log.mock.calls.flat().join(' ')).not.toContain(storageKey);
  });

  it('keeps failed cross-sell thumbnails optional without logging storage or error secrets', async () => {
    const storageSecret = 'private/customer/cross-sell-secret';
    const errorSecret = 'backend-error-secret';
    const row = {
      model_id: 'model-456', name: 'Suggested book', description: 'A description',
      category_slug: 'category', model_slug: 'book', storage_key: storageSecret,
    };
    const dataSource = { query: jest.fn().mockResolvedValue([row]) };
    const target = new CustomBookPdfService(
      { download: jest.fn().mockRejectedValue(new Error(errorSecret)) } as any,
      dataSource as any,
    );
    const errorLog = jest.spyOn((target as any).logger, 'error');

    const cards = await (target as any).resolveCrossSellCards('current-model');

    expect(cards).toHaveLength(1);
    expect(cards[0].imageSrc).toBeNull();
    const loggedErrors = errorLog.mock.calls.flat().join(' ');
    expect(loggedErrors).not.toContain(storageSecret);
    expect(loggedErrors).not.toContain(errorSecret);
  });

  it('fails rather than composing a blank required template page', () => {
    const unreadableAssets = new Map(assets);
    unreadableAssets.delete('interior-a');
    expect(() => (service as any).composeDocuments(rows, unreadableAssets, design)).toThrow(/plantilla.*posición 1/i);
  });

  it('fails without uploading or publishing when no confirmed print assets exist', async () => {
    const designRow = {
      gradient_color_start: '#000',
      gradient_color_end: '#fff',
      dedication_text: null,
      demo_dedication_text: null,
      personalized_model_id: null,
    };
    const dataSource = { query: jest.fn().mockResolvedValueOnce([designRow]).mockResolvedValueOnce([]) };
    const storage = { upload: jest.fn() };
    const target = new CustomBookPdfService(storage as any, dataSource as any);

    await expect(target.generateAndStore(42)).rejects.toThrow(/archivos de impresión confirmados/i);
    expect(storage.upload).not.toHaveBeenCalled();
    expect(dataSource.query).toHaveBeenCalledTimes(2);
  });

  describe('print image raster caps', () => {
    it.each(['COVER', 'BACK_COVER'])('keeps %s images up to 3424px wide without downscaling', async (assetType) => {
      const output = await (service as any).preparePrintImage(await makePng(3424, 2416), assetType);
      const meta = await sharp(output).metadata();
      expect(meta.width).toBe(3424);
      expect(meta.height).toBe(2416);
    });

    it.each(['TEMPLATE', 'ADDON'])('still caps %s interior images at 2400px', async (assetType) => {
      const output = await (service as any).preparePrintImage(await makePng(2896, 1024), assetType);
      const meta = await sharp(output).metadata();
      expect(meta.width).toBe(2400);
    });

    it.each(['COVER', 'TEMPLATE'])('never enlarges a smaller %s image', async (assetType) => {
      const output = await (service as any).preparePrintImage(await makePng(1000, 700), assetType);
      const meta = await sharp(output).metadata();
      expect(meta.width).toBe(1000);
      expect(meta.height).toBe(700);
    });

    it.each(['COVER', 'BACK_COVER'])('downscales a %s larger than 3424px so both dimensions fit within 3424', async (assetType) => {
      const output = await (service as any).preparePrintImage(await makePng(3840, 2708), assetType);
      const meta = await sharp(output).metadata();
      expect(meta.width).toBe(3424);
      expect(meta.height).toBeLessThanOrEqual(3424);
    });

    it.each(['TEMPLATE', 'ADDON'])('downscales a %s larger than 2400px to the 2400px interior cap', async (assetType) => {
      const output = await (service as any).preparePrintImage(await makePng(3840, 2708), assetType);
      const meta = await sharp(output).metadata();
      expect(meta.width).toBe(2400);
      expect(meta.height).toBeLessThanOrEqual(2400);
    });
  });

  describe('print image wiring through generateAndStore', () => {
    const designRow = {
      gradient_color_start: '#000',
      gradient_color_end: '#fff',
      dedication_text: null,
      demo_dedication_text: null,
      personalized_model_id: null,
    };
    const wiringRows = [
      { id: '1', asset_type: 'COVER', template_id: null, slot_index: null, page_part: 'ONLY', storage_key: 'cover-key' },
      { id: '2', asset_type: 'TEMPLATE', template_id: 'a', slot_index: 1, page_part: 'ONLY', storage_key: 'template-key' },
      { id: '3', asset_type: 'BACK_COVER', template_id: null, slot_index: null, page_part: 'ONLY', storage_key: 'back-key' },
    ];

    const buildTarget = async () => {
      const buffers = new Map<string, Buffer>([
        ['cover-key', await makePng(3424, 2416)],
        ['template-key', await makePng(2896, 1024)],
        ['back-key', await makePng(3424, 2416)],
      ]);
      const storage = {
        download: jest.fn((key: string) => Promise.resolve(buffers.get(key) as Buffer)),
        upload: jest.fn().mockResolvedValue(undefined),
      };
      const dataSource = {
        query: jest.fn()
          .mockResolvedValueOnce([designRow])
          .mockResolvedValueOnce(wiringRows)
          .mockResolvedValue(undefined),
      };
      const target = new CustomBookPdfService(storage as any, dataSource as any);
      const prepareSpy = jest.spyOn(target as any, 'preparePrintImage');
      const renderedHtml: string[] = [];
      jest.spyOn(target as any, 'renderPdf').mockImplementation(async (html: string) => {
        renderedHtml.push(html);
        return Buffer.from('pdf');
      });
      return { target, buffers, prepareSpy, renderedHtml };
    };

    const firstEmbeddedImageMeta = async (html: string) => {
      const base64 = html.match(/<img src="data:image\/jpeg;base64,([^"]+)/)?.[1];
      expect(base64).toBeDefined();
      return sharp(Buffer.from(base64 as string, 'base64')).metadata();
    };

    it('passes each row asset_type from the DB query into preparePrintImage', async () => {
      const { target, buffers, prepareSpy } = await buildTarget();

      await target.generateAndStore(42);

      expect(prepareSpy).toHaveBeenCalledTimes(3);
      const typeByBuffer = new Map(wiringRows.map((row) => [buffers.get(row.storage_key), row.asset_type]));
      for (const [buffer, assetType] of prepareSpy.mock.calls as [Buffer, string][]) {
        expect(typeByBuffer.get(buffer)).toBe(assetType);
      }
    });

    it('embeds the COVER raster above the 2400px interior cap while the TEMPLATE stays capped', async () => {
      const { target, renderedHtml } = await buildTarget();

      await target.generateAndStore(42);

      expect(renderedHtml).toHaveLength(2);
      const [coversHtml, interiorHtml] = renderedHtml;
      const coverMeta = await firstEmbeddedImageMeta(coversHtml);
      expect(coverMeta.width).toBe(3424);
      expect(coverMeta.height).toBe(2416);
      const templateMeta = await firstEmbeddedImageMeta(interiorHtml);
      expect(templateMeta.width).toBe(2400);
    });
  });

  describe('generation-scoped pair storage', () => {
    it('publishes the covers pointer only after both immutable sibling uploads succeed', async () => {
      const storage = { upload: jest.fn().mockResolvedValue(undefined) };
      const dataSource = { query: jest.fn().mockResolvedValue(undefined) };
      const target = new CustomBookPdfService(storage as any, dataSource as any);
      await (target as any).storePdfPair(42, Buffer.from('covers'), Buffer.from('interior'));
      expect(storage.upload).toHaveBeenCalledTimes(2);
      const [coversKey] = storage.upload.mock.calls[0];
      const [interiorKey] = storage.upload.mock.calls[1];
      expect(coversKey).toMatch(/^custom-books\/renders\/42\/generation-[^/]+\/covers\.pdf$/);
      expect(interiorKey).toBe(coversKey.replace(/covers\.pdf$/, 'interior.pdf'));
      expect(dataSource.query).toHaveBeenCalledTimes(1);
      expect(dataSource.query.mock.calls[0][1]).toEqual([42, coversKey]);
    });

    it('does not publish a pointer when either upload fails', async () => {
      const storage = { upload: jest.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('upload failed')) };
      const dataSource = { query: jest.fn() };
      const target = new CustomBookPdfService(storage as any, dataSource as any);
      await expect((target as any).storePdfPair(42, Buffer.from('covers'), Buffer.from('interior'))).rejects.toThrow('upload failed');
      expect(dataSource.query).not.toHaveBeenCalled();
    });
  });
});
