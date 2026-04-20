import { CatalogBookVariant } from './catalog-book-variant';

export class CatalogBook {
  readonly id: string;
  readonly name: string;
  readonly productType: string;
  readonly description: string | null;
  readonly currency: string;
  readonly isActive: boolean;
  readonly coverAssetId: string | null;
  readonly variants: CatalogBookVariant[];
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id: string;
    name: string;
    productType: string;
    description: string | null;
    currency: string;
    isActive: boolean;
    coverAssetId: string | null;
    variants: CatalogBookVariant[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.productType = props.productType;
    this.description = props.description;
    this.currency = props.currency;
    this.isActive = props.isActive;
    this.coverAssetId = props.coverAssetId;
    this.variants = props.variants;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
