export interface PersonalizedModelResponse {
  id: string;
  name: string;
  slug: string | null;
  templateCount: number;
  coverImageUrl: string | null;
}

export interface PersonalizedCategoryResponse {
  id: string;
  name: string;
  slug: string | null;
  coverImageUrl: string | null;
  models: PersonalizedModelResponse[];
}

export interface PersonalizedTemplateResponse {
  id: string;
  name: string | null;
  previewUrl: string;
  genderDirection: string | null;
}
