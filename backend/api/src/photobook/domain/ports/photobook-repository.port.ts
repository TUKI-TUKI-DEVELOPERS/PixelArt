export type PhotobookThemeRecord = { id: number; name: string; coverPreviewKey: string; coverTemplateKey: string; backCoverKey: string | null; isActive: boolean };
export type PhotobookProductRecord = { id: number; name: string; pricePerPageCents: number; minPages: number; currency: string; allowsCustomDimensions: boolean };

export type CreateProjectData = {
  photobookProductId: number;
  photobookThemeId: number;
  customerEmail: string;
  customerFullName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryDistrict?: string;
  coverTitle?: string;
  customerDni?: string;
  customWidthCm?: number;
  customHeightCm?: number;
  pricePerPageCents: number;
  pages: { pageNumber: number; layoutKey: string; slots: { assetId: number; slotIndex: number }[] }[];
  assetIds: number[];
};

export type ProjectRecord = {
  id: number;
  photobookProductId: number;
  photobookThemeId: number;
  customerEmail: string;
  customerFullName: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
  deliveryDistrict: string | null;
  coverTitle: string | null;
  customerDni: string | null;
  customWidthCm: number | null;
  customHeightCm: number | null;
  status: string;
  pricePerPageCents: number;
  pageCount: number;
  calculatedTotalCents: number;
  currency: string;
  createdAt: Date;
};

export type ProjectDetailRecord = ProjectRecord & {
  pages: { id: number; pageNumber: number; layoutKey: string; slots: { slotIndex: number; assetId: number }[] }[];
  assetIds: number[];
};

export type RenderRecord = { pdfStorageKey: string; generatedAt: Date };

export abstract class PhotobookRepositoryPort {
  abstract listThemes(): Promise<PhotobookThemeRecord[]>;
  abstract listProducts(): Promise<PhotobookProductRecord[]>;
  abstract getProduct(id: number): Promise<PhotobookProductRecord | null>;
  abstract createProject(data: CreateProjectData): Promise<ProjectRecord>;
  abstract findAllProjects(): Promise<ProjectRecord[]>;
  abstract findProjectById(id: number): Promise<ProjectDetailRecord | null>;
  abstract updateProjectStatus(id: number, status: string): Promise<void>;
  abstract saveRender(projectId: number, pdfStorageKey: string): Promise<void>;
  abstract findRenderByProjectId(projectId: number): Promise<RenderRecord | null>;
}
