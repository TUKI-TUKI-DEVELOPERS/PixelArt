/** Read-only catalog facts promotions need to resolve eligibility. */
export abstract class PromotionCatalogPort {
  /** personalized_models.id → personalized_categories.id for the ids that exist. */
  abstract findModelCategories(modelIds: number[]): Promise<Map<number, number>>;
}
