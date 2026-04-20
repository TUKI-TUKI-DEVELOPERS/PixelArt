export class PersonalizedTemplate {
  readonly id: string;
  readonly modelId: string;
  readonly name: string | null;
  readonly templatePreviewKey: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id: string;
    modelId: string;
    name: string | null;
    templatePreviewKey: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.modelId = props.modelId;
    this.name = props.name;
    this.templatePreviewKey = props.templatePreviewKey;
    this.isActive = props.isActive;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
