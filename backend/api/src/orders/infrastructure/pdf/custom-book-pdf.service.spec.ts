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
