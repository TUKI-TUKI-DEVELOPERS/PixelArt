export type SiteConfigRecord = {
  key: string;
  value: Record<string, unknown>;
  updatedAt: Date;
};

export abstract class SiteConfigRepositoryPort {
  abstract get(key: string): Promise<SiteConfigRecord | null>;
  abstract upsert(key: string, value: Record<string, unknown>): Promise<SiteConfigRecord>;
}
