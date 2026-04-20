import { PublicLink } from '../public-link';

export type CreateLinkData = {
  linkType: 'DEMO_VIEW' | 'PAYMENT_UPLOAD' | 'FEEDBACK' | 'CHECKOUT';
  demoRequestId?: number | null;
  orderId?: number | null;
  ttlDays?: number;
};

export abstract class PublicLinksRepositoryPort {
  abstract create(data: CreateLinkData): Promise<PublicLink>;
  abstract findByToken(token: string): Promise<PublicLink | null>;
}
