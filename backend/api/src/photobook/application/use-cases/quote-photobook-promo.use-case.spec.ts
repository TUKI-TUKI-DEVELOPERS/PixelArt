import { HttpException } from '@nestjs/common';
import { QuotePhotobookPromoUseCase } from './quote-photobook-promo.use-case';

function harness(evaluation: unknown) {
  const evaluate = { execute: jest.fn().mockResolvedValue(evaluation) };
  return { evaluate, useCase: new QuotePhotobookPromoUseCase(evaluate as any) };
}

const accepted = (discountCents: number) => ({ ok: true, promotionId: 7, code: 'Foto10', percent: 10, discountCents });

describe('QuotePhotobookPromoUseCase.quoteTemplate', () => {
  it('discounts the product price only and keeps the rush fee', async () => {
    const h = harness(accepted(1240));

    const quote = await h.useCase.quoteTemplate({ code: ' Foto10 ', themeId: 3, coverType: 'TAPA_GRUESA', pageCount: 32, wantsRush: true });

    expect(h.evaluate.execute).toHaveBeenCalledWith({
      code: ' Foto10 ',
      product: { kind: 'TEMPLATE_PHOTOBOOK', themeId: 3 },
      discountableBaseCents: 12400,
      applied: null,
    });
    expect(quote).toEqual({
      code: 'Foto10',
      percent: 10,
      discountCents: 1240,
      totalCents: 12400 + 2500 - 1240,
      promotion: { promotionId: 7, code: 'Foto10', percent: 10, discountCents: 1240 },
    });
  });

  it('rejects an invalid cover type before evaluating the code', async () => {
    const h = harness(accepted(0));
    await expect(h.useCase.quoteTemplate({ code: 'X', themeId: 3, coverType: 'OTRA', pageCount: 30, wantsRush: false }))
      .rejects.toThrow('Tipo de tapa inválido');
    expect(h.evaluate.execute).not.toHaveBeenCalled();
  });

  it('maps a rejection to a 422 with photobook copy', async () => {
    const h = harness({ ok: false, reason: 'not_applicable' });
    const error = await h.useCase
      .quoteTemplate({ code: 'Libros20', themeId: 3, coverType: 'TAPA_DELGADA', pageCount: 30, wantsRush: false })
      .catch((e: HttpException) => e);
    expect((error as HttpException).getStatus()).toBe(422);
    expect((error as HttpException).getResponse()).toMatchObject({ message: 'Este código no aplica a este photobook', reason: 'not_applicable' });
  });
});

describe('QuotePhotobookPromoUseCase.quoteCustom', () => {
  it('excludes the custom-cover surcharge and the rush fee from the discount base', async () => {
    const h = harness(accepted(900));

    const quote = await h.useCase.quoteCustom({ code: 'Medida10', coverType: 'TAPA_DELGADA', pageCount: 30, wantsRush: true, customCoverSurchargeCents: 3550 });

    expect(h.evaluate.execute).toHaveBeenCalledWith(expect.objectContaining({
      product: { kind: 'CUSTOM_PHOTOBOOK' },
      discountableBaseCents: 9000,
    }));
    expect(quote.totalCents).toBe(9000 + 2500 + 3550 - 900);
  });
});
