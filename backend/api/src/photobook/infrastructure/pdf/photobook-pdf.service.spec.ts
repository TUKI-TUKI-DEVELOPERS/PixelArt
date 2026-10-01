import sharp from 'sharp';
import { PhotobookPdfService } from './photobook-pdf.service';

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
