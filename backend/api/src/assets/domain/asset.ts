export class Asset {
  constructor(
    public readonly id: number,
    public readonly storageKey: string,
    public readonly originalFilename: string | null,
    public readonly mimeType: string | null,
    public readonly sizeBytes: number | null,
    public readonly width: number | null,
    public readonly height: number | null,
    public readonly contentHash: string,
    public readonly createdAt: Date,
  ) {}
}
