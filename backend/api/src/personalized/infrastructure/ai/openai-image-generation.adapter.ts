import { Injectable, Logger } from '@nestjs/common';
import OpenAI, { toFile } from 'openai';
import { ImageGenerationPort } from '../../domain/ports/image-generation.port';

// Tarifas gpt-image-2 verificadas por búsqueda web en agosto 2026 — son la
// referencia pública de OpenAI, no un valor exacto de esta cuenta. Para el
// costo real facturado, platform.openai.com/usage (por día, no por llamada).
const INPUT_IMAGE_USD_PER_M_TOKENS = 8;
const INPUT_TEXT_USD_PER_M_TOKENS = 5;
const OUTPUT_IMAGE_USD_PER_M_TOKENS = 30;

@Injectable()
export class OpenAiImageGenerationAdapter extends ImageGenerationPort {
  private readonly logger = new Logger(OpenAiImageGenerationAdapter.name);
  private readonly client: OpenAI;

  constructor() {
    super();
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateWithReferences(
    prompt: string,
    referenceImages: Buffer[],
    size = '1536x1024',
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
      size,
      quality: 'medium',
    });

    this.logGenerationCost(size, response.usage);

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) {
      throw new Error('OpenAI no devolvió una imagen (b64_json vacío)');
    }
    return Buffer.from(b64, 'base64');
  }

  /** El dashboard de OpenAI solo agrega por día, no por llamada — esto deja
   * en el log el consumo real de tokens de ESTA generación puntual, con un
   * estimado en USD (aproximado, no el monto exacto que factura OpenAI). */
  private logGenerationCost(size: string, usage: OpenAI.Images.ImagesResponse['usage']): void {
    if (!usage) {
      this.logger.warn(`gpt-image-2 (${size}): la respuesta no trajo "usage" — no se puede estimar el costo de esta llamada`);
      return;
    }
    const { input_tokens_details, output_tokens, total_tokens } = usage;
    const estimatedUsd =
      (input_tokens_details.image_tokens * INPUT_IMAGE_USD_PER_M_TOKENS +
        input_tokens_details.text_tokens * INPUT_TEXT_USD_PER_M_TOKENS +
        output_tokens * OUTPUT_IMAGE_USD_PER_M_TOKENS) /
      1_000_000;
    this.logger.log(
      `gpt-image-2 (${size}): ${total_tokens} tokens totales ` +
        `(entrada: ${input_tokens_details.image_tokens} img + ${input_tokens_details.text_tokens} texto, salida: ${output_tokens} img) ` +
        `— estimado ~$${estimatedUsd.toFixed(4)} USD (verificar costo real en platform.openai.com/usage)`,
    );
  }
}
