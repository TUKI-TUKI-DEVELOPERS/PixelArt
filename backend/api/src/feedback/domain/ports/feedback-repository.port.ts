export type FeedbackRecord = {
  id: number;
  orderId: number;
  modelId: number | null;
  photobookThemeId: number | null;
  ratingX2: number;
  stars: number;
  comment: string | null;
  redirectedToGoogle: boolean;
  createdAt: Date;
};

export type CreateFeedbackData = {
  orderId: number;
  modelId?: number | null;
  photobookThemeId?: number | null;
  ratingX2: number;
  comment?: string | null;
  redirectedToGoogle: boolean;
};

export type BookRatingSummary = {
  modelId: number | null;
  photobookThemeId: number | null;
  average: number;
  count: number;
};

export abstract class FeedbackRepositoryPort {
  abstract create(data: CreateFeedbackData): Promise<FeedbackRecord>;
  abstract findAll(): Promise<FeedbackRecord[]>;
  abstract findByOrderId(orderId: number): Promise<FeedbackRecord | null>;
  abstract getAverageRatings(): Promise<BookRatingSummary[]>;
}
