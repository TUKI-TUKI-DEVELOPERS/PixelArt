export class CatalogBookVariant {
  readonly id: string;
  readonly catalogBookId: string;
  readonly coverType: string;
  readonly basePriceCents: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id: string;
    catalogBookId: string;
    coverType: string;
    basePriceCents: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.catalogBookId = props.catalogBookId;
    this.coverType = props.coverType;
    this.basePriceCents = props.basePriceCents;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
