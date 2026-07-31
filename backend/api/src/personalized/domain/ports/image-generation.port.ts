export abstract class ImageGenerationPort {
  abstract generateWithReferences(
    prompt: string,
    referenceImages: Buffer[],
  ): Promise<Buffer>;
}
