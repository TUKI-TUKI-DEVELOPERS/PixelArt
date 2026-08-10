export abstract class ImageGenerationPort {
  abstract generateWithReferences(
    prompt: string,
    referenceImages: Buffer[],
    /** WIDTHxHEIGHT en px, ej. '2896x1024'. Sin definir, usa el tamaño por
     * defecto del adapter (1536x1024). Solo gpt-image-2 acepta resoluciones
     * arbitrarias (múltiplo de 16, ratio entre 1:3 y 3:1). */
    size?: string,
  ): Promise<Buffer>;

  /** Texto→imagen puro (sin fotos de referencia) — usado por la contratapa,
   * que no lleva personas reales, a diferencia de generateWithReferences
   * (pensado para SIEMPRE anclar identidad a al menos una foto real). */
  abstract generate(prompt: string, size?: string): Promise<Buffer>;
}
