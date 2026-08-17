import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import OpenAI, { toFile } from 'openai';
import { ImageGenerationPort } from '../../domain/ports/image-generation.port';

// Tarifas gpt-image-2 verificadas por búsqueda web en agosto 2026 — son la
// referencia pública de OpenAI, no un valor exacto de esta cuenta. Para el
// costo real facturado, platform.openai.com/usage (por día, no por llamada).
const INPUT_IMAGE_USD_PER_M_TOKENS = 8;
const INPUT_TEXT_USD_PER_M_TOKENS = 5;
const OUTPUT_IMAGE_USD_PER_M_TOKENS = 30;

// El clasificador de moderación de OpenAI es probabilístico: el mismo prompt
// con la misma foto de referencia puede ser rechazado una vez y pasar al
// reintentarlo (confirmado a mano el 2026-08-05 con una escena de beso de
// buenas noches). Por eso reintentamos automáticamente SOLO ante ese tipo de
// rechazo — otros errores (auth, rate limit, red) no se benefician de
// reintentar y se propagan de una.
const MODERATION_MAX_RETRIES = 2;
const MODERATION_RETRY_DELAY_MS = 1500;

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

    // "moderation" NO existe en los parámetros de images.edit en este SDK
    // (solo en images.generate) — confirmado en
    // node_modules/openai/resources/images.d.ts. El único control real acá
    // es el retry.
    const response = await this.callWithModerationRetry('images.edit', () =>
      this.client.images.edit({
        model: 'gpt-image-2',
        image: files,
        prompt,
        size,
        // 'high' re-dibuja e integra la cara real en la escena mucho mejor que
        // 'medium' (validado 2026-08-15); cuesta ~3.2x pero es despreciable por libro.
        quality: 'high',
      }),
    );

    this.logGenerationCost('images.edit', size, response.usage);

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) {
      throw new Error('OpenAI no devolvió una imagen (b64_json vacío)');
    }
    return Buffer.from(b64, 'base64');
  }

  async generate(prompt: string, size = '1536x1024'): Promise<Buffer> {
    const response = await this.callWithModerationRetry('images.generate', () =>
      this.client.images.generate({
        model: 'gpt-image-2',
        prompt,
        size,
        quality: 'medium',
        moderation: 'low',
      }),
    );

    this.logGenerationCost('images.generate', size, response.usage);

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) {
      throw new Error('OpenAI no devolvió una imagen (b64_json vacío)');
    }
    return Buffer.from(b64, 'base64');
  }

  /** Reintenta SOLO ante rechazo de moderación (probabilístico, ver nota de
   * MODERATION_MAX_RETRIES). Cualquier otro error corta al toque. Al agotar
   * los reintentos, envuelve el error en una BadRequestException con mensaje
   * corto y legible — un Error plano acá terminaría como "Internal server
   * error" genérico en el admin, porque no hay filtro global de excepciones
   * que preserve el mensaje de un Error no-HTTP. */
  private async callWithModerationRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= MODERATION_MAX_RETRIES; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        if (!this.isModerationError(err) || attempt === MODERATION_MAX_RETRIES) break;
        this.logger.warn(
          `${label}: rechazo de moderación (intento ${attempt + 1}/${MODERATION_MAX_RETRIES + 1}) — reintentando en ${MODERATION_RETRY_DELAY_MS}ms`,
        );
        await new Promise((resolve) => setTimeout(resolve, MODERATION_RETRY_DELAY_MS));
      }
    }
    throw this.toClientError(lastError);
  }

  private isModerationError(err: unknown): boolean {
    if (!(err instanceof OpenAI.APIError)) return false;
    const haystack = `${err.code ?? ''} ${err.type ?? ''} ${err.message ?? ''}`.toLowerCase();
    return /moderat|content_polic|safety system|blocked/.test(haystack);
  }

  private toClientError(err: unknown): Error {
    if (this.isModerationError(err)) {
      return new BadRequestException(
        `OpenAI rechazó la generación por moderación de contenido (escena sensible) tras ${MODERATION_MAX_RETRIES + 1} intentos. Probá de nuevo en un momento o ajustá la escena.`,
      );
    }
    if (err instanceof OpenAI.APIError) {
      return new BadRequestException(`Error de OpenAI al generar la imagen: ${err.message}`);
    }
    return err instanceof Error ? err : new Error('Error desconocido al generar la imagen');
  }

  /** El dashboard de OpenAI solo agrega por día, no por llamada — esto deja
   * en el log el consumo real de tokens de ESTA generación puntual, con un
   * estimado en USD (aproximado, no el monto exacto que factura OpenAI). */
  private logGenerationCost(method: string, size: string, usage: OpenAI.Images.ImagesResponse['usage']): void {
    if (!usage) {
      this.logger.warn(`gpt-image-2 ${method} (${size}): la respuesta no trajo "usage" — no se puede estimar el costo de esta llamada`);
      return;
    }
    const { input_tokens_details, output_tokens, total_tokens } = usage;
    const estimatedUsd =
      (input_tokens_details.image_tokens * INPUT_IMAGE_USD_PER_M_TOKENS +
        input_tokens_details.text_tokens * INPUT_TEXT_USD_PER_M_TOKENS +
        output_tokens * OUTPUT_IMAGE_USD_PER_M_TOKENS) /
      1_000_000;
    this.logger.log(
      `gpt-image-2 ${method} (${size}): ${total_tokens} tokens totales ` +
        `(entrada: ${input_tokens_details.image_tokens} img + ${input_tokens_details.text_tokens} texto, salida: ${output_tokens} img) ` +
        `— estimado ~$${estimatedUsd.toFixed(4)} USD (verificar costo real en platform.openai.com/usage)`,
    );
  }
}
