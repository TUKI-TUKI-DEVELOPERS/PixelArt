export interface PersonalizedModelResponse {
  id: string;
  name: string;
  templateCount: number;
}

export interface PersonalizedCategoryResponse {
  id: string;
  name: string;
  coverImageUrl: string | null;
  models: PersonalizedModelResponse[];
}

export interface PersonalizedTemplateResponse {
  id: string;
  name: string | null;
  previewUrl: string;
}
