export class PersonalizedModel {
  readonly id: string;
  readonly categoryId: string;
  readonly name: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id: string;
    categoryId: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.categoryId = props.categoryId;
    this.name = props.name;
    this.isActive = props.isActive;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
