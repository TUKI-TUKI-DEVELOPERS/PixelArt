import { DemoRequest } from '../demo-request';

export type CreateDemoRequestData = {
  catalogBookId: number;
  catalogBookVariantId: number;
  personalizedCategoryId: number;
  personalizedModelId: number;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string | null;
  shippingCity?: string | null;
  shippingRegion?: string | null;
  shippingReference?: string | null;
  deliveryDate: string;
  wantsRush?: boolean;
  packagePreference?: string;
  wantsCustomDedication: boolean;
  dedicationText?: string | null;
  messageOptional?: string | null;
  templateIds: number[];
  assetIds: number[];
};

export type DemoRequestWithRelations = DemoRequest & {
  coverType: string | null;
  templateSelections: { id: number; templateId: number; templateName: string | null; templatePreviewKey: string | null }[];
  assetIds: number[];
  proposals: { id: number; templateId: number; outputStorageKey: string; protectionMode: string }[];
};

export type SaveProposalData = {
  demoRequestId: number;
  templateId: number;
  outputStorageKey: string;
  protectionMode: string;
  isWatermarked: boolean;
  generatedByUserId: number | null;
};

export abstract class DemoRepositoryPort {
  abstract create(data: CreateDemoRequestData): Promise<DemoRequest>;
  abstract findAll(): Promise<DemoRequest[]>;
  abstract findById(id: number): Promise<DemoRequestWithRelations | null>;
  abstract saveProposal(data: SaveProposalData): Promise<{ id: number }>;
  abstract deleteProposal(proposalId: number, demoRequestId: number): Promise<string>;
  abstract updateStatus(id: number, status: string): Promise<void>;
}
