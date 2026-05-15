import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackRepositoryPort, FeedbackRecord, CreateFeedbackData, BookRatingSummary } from '../../../domain/ports/feedback-repository.port';
import { FeedbackOrmEntity } from '../entities/feedback.orm-entity';

function toRecord(e: FeedbackOrmEntity): FeedbackRecord {
  return {
    id: Number(e.id),
    orderId: Number(e.orderId),
    modelId: e.modelId ? Number(e.modelId) : null,
    photobookThemeId: e.photobookThemeId ? Number(e.photobookThemeId) : null,
    ratingX2: e.ratingX2,
    stars: e.ratingX2 / 2,
    comment: e.comment,
    redirectedToGoogle: e.redirectedToGoogle,
    createdAt: e.createdAt,
  };
}

@Injectable()
export class TypeOrmFeedbackRepository extends FeedbackRepositoryPort {
  constructor(
    @InjectRepository(FeedbackOrmEntity)
    private readonly repo: Repository<FeedbackOrmEntity>,
  ) {
    super();
  }

  async create(data: CreateFeedbackData): Promise<FeedbackRecord> {
    const entity = this.repo.create({
      orderId: String(data.orderId),
      modelId: data.modelId ? String(data.modelId) : null,
      photobookThemeId: data.photobookThemeId ? String(data.photobookThemeId) : null,
      ratingX2: data.ratingX2,
      comment: data.comment ?? null,
      redirectedToGoogle: data.redirectedToGoogle,
    });
    const saved = await this.repo.save(entity);
    return toRecord(saved);
  }

  async findAll(): Promise<FeedbackRecord[]> {
    const entities = await this.repo.find({ order: { createdAt: 'DESC' } });
    return entities.map(toRecord);
  }

  async findByOrderId(orderId: number): Promise<FeedbackRecord | null> {
    const e = await this.repo.findOne({ where: { orderId: String(orderId) } });
    return e ? toRecord(e) : null;
  }

  async getAverageRatings(): Promise<BookRatingSummary[]> {
    const rows: { model_id: string | null; photobook_theme_id: string | null; avg: string; cnt: string }[] =
      await this.repo.query(`
        SELECT
          model_id,
          photobook_theme_id,
          AVG(rating_x2)::float / 2 AS avg,
          COUNT(*)::int             AS cnt
        FROM feedback
        WHERE model_id IS NOT NULL OR photobook_theme_id IS NOT NULL
        GROUP BY model_id, photobook_theme_id
      `);

    return rows.map((r) => ({
      modelId:          r.model_id          ? Number(r.model_id)          : null,
      photobookThemeId: r.photobook_theme_id ? Number(r.photobook_theme_id) : null,
      average:          parseFloat(r.avg),
      count:            Number(r.cnt),
    }));
  }
}
