export class PersonalizedCategory {
  readonly id: string;
  readonly name: string;
  readonly isActive: boolean;
  readonly coverAssetId: string | null;
  readonly slug: string | null;
  readonly backCoverHashtag: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id: string;
    name: string;
    isActive: boolean;
    coverAssetId: string | null;
    slug: string | null;
    backCoverHashtag: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.isActive = props.isActive;
    this.coverAssetId = props.coverAssetId;
    this.slug = props.slug;
    this.backCoverHashtag = props.backCoverHashtag;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
