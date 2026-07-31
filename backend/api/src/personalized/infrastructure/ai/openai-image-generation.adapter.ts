import { Injectable } from '@nestjs/common';
import OpenAI, { toFile } from 'openai';
import { ImageGenerationPort } from '../../domain/ports/image-generation.port';

@Injectable()
export class OpenAiImageGenerationAdapter extends ImageGenerationPort {
  private readonly client: OpenAI;

  constructor() {
    super();
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateWithReferences(
    prompt: string,
    referenceImages: Buffer[],
  ): Promise<Buffer> {
    const files = await Promise.all(
      referenceImages.map((buffer, i) =>
        toFile(buffer, `reference-${i}.png`, { type: 'image/png' }),
      ),
    );

    const response = await this.client.images.edit({
      model: 'gpt-image-2',
      image: files,
      prompt,
      size: '1536x1024',
      quality: 'medium',
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) {
      throw new Error('OpenAI no devolvió una imagen (b64_json vacío)');
    }
    return Buffer.from(b64, 'base64');
  }
}
