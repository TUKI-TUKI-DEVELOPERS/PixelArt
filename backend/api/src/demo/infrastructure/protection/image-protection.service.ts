import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImageProtectionService {
  async applyWatermark(buffer: Buffer): Promise<Buffer> {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    const width = metadata.width ?? 800;
    const height = metadata.height ?? 600;

    const fontSize = Math.max(Math.floor(width / 15), 24);
    const svgWatermark = Buffer.from(`
      <svg width="${width}" height="${height}">
        <defs>
          <pattern id="watermark" patternUnits="userSpaceOnUse" width="${fontSize * 12}" height="${fontSize * 6}" patternTransform="rotate(-30)">
            <text x="0" y="${fontSize}" font-family="sans-serif" font-size="${fontSize}" fill="rgba(255,255,255,0.35)" font-weight="bold">
              PIXELART DEMO
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#watermark)" />
      </svg>
    `);

    return image
      .composite([{ input: svgWatermark, gravity: 'centre' }])
      .jpeg({ quality: 85 })
      .toBuffer();
  }
}
