export class PersonalizedModel {
  readonly id: string;
  readonly categoryId: string;
  readonly name: string;
  readonly isActive: boolean;
  readonly slug: string | null;
  readonly coverSceneVisual: string | null;
  readonly backCoverTagline: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id: string;
    categoryId: string;
    name: string;
    isActive: boolean;
    slug: string | null;
    coverSceneVisual: string | null;
    backCoverTagline: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.categoryId = props.categoryId;
    this.name = props.name;
    this.isActive = props.isActive;
    this.slug = props.slug;
    this.coverSceneVisual = props.coverSceneVisual;
    this.backCoverTagline = props.backCoverTagline;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
