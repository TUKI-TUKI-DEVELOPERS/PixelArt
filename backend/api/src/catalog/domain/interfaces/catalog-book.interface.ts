export interface CatalogBookVariantResponse {
  id: string;
  coverType: string;
  basePriceCents: number;
}

export interface CatalogBookResponse {
  id: string;
  name: string;
  productType: string;
  description: string | null;
  currency: string;
  coverImageUrl: string | null;
  variants: CatalogBookVariantResponse[];
}
