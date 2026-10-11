import sharp from 'sharp';
import { PhotobookPdfService } from './photobook-pdf.service';

describe('PhotobookPdfService split composition', () => {
  const project = { pages: [{ layoutKey: 'FULL_1', slots: [{ assetId: 1 }] }, { layoutKey: 'FULL_1', slots: [{ assetId: 2 }] }] } as any;

  it('composes standalone front/back covers and ordered interior without wrap or spine inputs', () => {
    const service = new PhotobookPdfService({} as any, {} as any, {} as any, {} as any);
    const result = (service as any).composeDocuments(project, new Map([[1, 'page-one'], [2, 'page-two']]), 22, 22, 'front', 'back');
    expect(result.coversHtml.indexOf('front')).toBeLessThan(result.coversHtml.indexOf('back'));
    expect(result.coversHtml.match(/class="page cover/g)).toHaveLength(2);
    expect(result.interiorHtml.indexOf('page-one')).toBeLessThan(result.interiorHtml.indexOf('page-two'));
    expect(result.interiorHtml).not.toContain('front');
    expect(result.interiorHtml).not.toContain('back');
  });

  it('rejects a missing standalone cover instead of producing a partial pair', () => {
    const service = new PhotobookPdfService({} as any, {} as any, {} as any, {} as any);
    expect(() => (service as any).composeDocuments(project, new Map(), 22, 22, 'front', null)).toThrow(/contraportada/i);
  });
  it('resolves custom front/back sources from the linked request, without wrap or spine', async () => {
    const project = { photobookThemeId: null, id: 12, pages: [], customWidthCm: 22, customHeightCm: 22 } as any;
    const repo = { findProjectById: jest.fn().mockResolvedValue(project), saveRender: jest.fn() };
    const dataSource = { query: jest.fn().mockResolvedValue([{ front_storage_key: 'request-front', back_storage_key: 'request-back' }]) };
    const storage = { upload: jest.fn().mockResolvedValue(undefined) };
    const service = new PhotobookPdfService(repo as any, storage as any, {} as any, dataSource as any);
    jest.spyOn(service as any, 'prepareAssets').mockResolvedValue(new Map());
    const downloaded: string[] = [];
    jest.spyOn(service as any, 'downloadCoverAsBase64').mockImplementation(async (key: string) => { downloaded.push(key); return `source:${key}`; });
    const rendered: string[] = [];
    jest.spyOn(service as any, 'renderPdf').mockImplementation(async (html: string) => { rendered.push(html); return Buffer.from('pdf'); });
    await service.generateAndStore(12);
    expect(dataSource.query.mock.calls[0][0]).toContain('linked_photobook_project_id = $1');
    expect(dataSource.query.mock.calls[0][0]).not.toMatch(/cover_wrap|spine/i);
    expect(downloaded).toEqual(['request-front', 'request-back']);
    expect(rendered[0].indexOf('source:request-front')).toBeLessThan(rendered[0].indexOf('source:request-back'));
    expect(rendered[0].match(/class="page cover/g)).toHaveLength(2);
  });

  it('does not update the render pointer when the interior upload fails', async () => {
    const project = { photobookThemeId: 3, pages: [], customWidthCm: 22, customHeightCm: 22 } as any;
    const repo = { findProjectById: jest.fn().mockResolvedValue(project), getTheme: jest.fn().mockResolvedValue({ coverTemplateKey: 'front-key', backCoverKey: 'back-key' }), saveRender: jest.fn() };
    const storage = { upload: jest.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('interior upload failed')) };
    const service = new PhotobookPdfService(repo as any, storage as any, {} as any, {} as any);
    jest.spyOn(service as any, 'prepareAssets').mockResolvedValue(new Map());
    jest.spyOn(service as any, 'downloadCoverAsBase64').mockResolvedValue('data:image/jpeg;base64,YQ==');
    jest.spyOn(service as any, 'renderPdf').mockResolvedValue(Buffer.from('pdf'));
    await expect(service.generateAndStore(8)).rejects.toThrow('interior upload failed');
    expect(storage.upload).toHaveBeenCalledTimes(2);
    expect(repo.saveRender).not.toHaveBeenCalled();
  });

  it('stores immutable sibling documents and publishes the pointer only after both uploads', async () => {
    const project = { photobookThemeId: 3, pages: [], customWidthCm: 22, customHeightCm: 22 } as any;
    const repo = { findProjectById: jest.fn().mockResolvedValue(project), getTheme: jest.fn().mockResolvedValue({ coverTemplateKey: 'front-key', backCoverKey: 'back-key', coverWrapKey: 'ignored' }), saveRender: jest.fn() };
    const storage = { upload: jest.fn().mockResolvedValue(undefined), download: jest.fn().mockResolvedValue(Buffer.from('x')) };
    const service = new PhotobookPdfService(repo as any, storage as any, {} as any, {} as any);
    jest.spyOn(service as any, 'prepareAssets').mockResolvedValue(new Map());
    const downloadCover = jest.spyOn(service as any, 'downloadCoverAsBase64').mockResolvedValue('data:image/jpeg;base64,YQ==');
    jest.spyOn(service as any, 'renderPdf').mockResolvedValue(Buffer.from('pdf'));
    await service.generateAndStore(8);
    expect(downloadCover.mock.calls.map(([key]) => key)).toEqual(['front-key', 'back-key']);
    const [coversKey, interiorKey] = storage.upload.mock.calls.map((call: any[]) => call[0]);
    expect(coversKey).toMatch(/^photobook-renders\/8\/generation-[\w-]+\/covers\.pdf$/);
    expect(interiorKey).toBe(coversKey.replace('covers.pdf', 'interior.pdf'));
    expect(repo.saveRender).toHaveBeenCalledWith(8, coversKey);
    expect(storage.upload.mock.invocationCallOrder[1]).toBeLessThan(repo.saveRender.mock.invocationCallOrder[0]);
  });
});

describe('PhotobookPdfService custom cover wrap', () => {
  it('samples the left inner edge of the front cover instead of averaging the whole image', async () => {
    const width = 40;
    const height = 40;
    const pixels = Buffer.alloc(width * height * 3);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const offset = (y * width + x) * 3;
        pixels[offset] = x < width / 2 ? 255 : 0;
        pixels[offset + 1] = 0;
        pixels[offset + 2] = x < width / 2 ? 0 : 255;
      }
    }
    const frontCover = await sharp(pixels, { raw: { width, height, channels: 3 } }).png().toBuffer();
    const fileStorage = { download: jest.fn().mockResolvedValue(frontCover) };
    const service = new PhotobookPdfService({} as any, fileStorage as any, {} as any, {} as any);

    await expect((service as any).sampleInnerEdgeColor('front-cover.png')).resolves.toBe('rgb(255, 0, 0)');
  });
});
