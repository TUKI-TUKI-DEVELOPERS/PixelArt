export abstract class ImageGenerationPort {
  abstract generateWithReferences(
    prompt: string,
    referenceImages: Buffer[],
    /** WIDTHxHEIGHT en px, ej. '2896x1024'. Sin definir, usa el tamaño por
     * defecto del adapter (1536x1024). Solo gpt-image-2 acepta resoluciones
     * arbitrarias (múltiplo de 16, ratio entre 1:3 y 3:1). */
    size?: string,
  ): Promise<Buffer>;
}
