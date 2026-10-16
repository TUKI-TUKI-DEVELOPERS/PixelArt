import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCustomPhotobookRequestDto } from './create-custom-photobook-request.dto';

const validRequest = {
  occasion: 'Tapa personalizada',
  requestedTheme: 'Mi historia',
  coverTitle: 'Nuestra historia (blanco)',
  coverMode: 'CUSTOMER_ARTWORK' as const,
  brief: 'Tapa y contratapa proporcionadas por el cliente.',
  referenceSlots: [
    { assetId: 7, surface: 'FRONT_COVER', slotIndex: 1 },
    { assetId: 8, surface: 'FRONT_COVER', slotIndex: 2 },
    { assetId: 9, surface: 'BACK_COVER', slotIndex: 1 },
    { assetId: 10, surface: 'BACK_COVER', slotIndex: 2 },
  ],
  customerFullName: 'Ana Cliente',
  customerEmail: 'ana@example.com',
  customerPhone: '+51 999 111 222',
};

function createDto(overrides: Record<string, unknown> = {}) {
  return plainToInstance(CreateCustomPhotobookRequestDto, { ...validRequest, ...overrides });
}

describe('CreateCustomPhotobookRequestDto', () => {
  it('accepts a valid email and a formatted local or international phone number', async () => {
    expect(await validate(createDto())).toEqual([]);
  });

  it('accepts one customer-provided image for each cover surface', async () => {
    const errors = await validate(createDto({
      referenceSlots: [
        { assetId: 7, surface: 'FRONT_COVER', slotIndex: 1 },
        { assetId: 9, surface: 'BACK_COVER', slotIndex: 1 },
      ],
    }));

    expect(errors).toEqual([]);
  });

  it('rejects missing titles, malformed contact details and invalid reference counts', async () => {
    const errors = await validate(createDto({
      coverTitle: undefined,
      customerEmail: 'ana-at-example',
      customerPhone: 'telefono de Ana',
      referenceSlots: [{ assetId: 7, surface: 'FRONT_COVER', slotIndex: 1 }],
    }));
    const blankTitle = await validate(createDto({ coverTitle: '   ' }));
        const invalidShortPhone = await validate(createDto({ customerPhone: '12345678' }));
        const tooMany = await validate(createDto({
      referenceSlots: [...validRequest.referenceSlots, { assetId: 11, surface: 'BACK_COVER', slotIndex: 2 }, { assetId: 12, surface: 'FRONT_COVER', slotIndex: 1 }],
    }));

    expect(errors.map((error) => error.property)).toEqual(expect.arrayContaining(['coverTitle', 'customerEmail', 'customerPhone', 'referenceSlots']));
    expect(blankTitle.map((error) => error.property)).toContain('coverTitle');
        expect(invalidShortPhone.map((error) => error.property)).toContain('customerPhone');
        expect(tooMany.map((error) => error.property)).toContain('referenceSlots');
  });
});
