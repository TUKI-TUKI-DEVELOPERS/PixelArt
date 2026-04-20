export class PublicLink {
  constructor(
    public readonly id: number,
    public readonly linkType: string,
    public readonly token: string,
    public readonly expiresAt: Date,
    public readonly revokedAt: Date | null,
    public readonly demoRequestId: number | null,
    public readonly orderId: number | null,
    public readonly createdAt: Date,
  ) {}

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  get isRevoked(): boolean {
    return this.revokedAt !== null;
  }

  get isValid(): boolean {
    return !this.isExpired && !this.isRevoked;
  }
}
