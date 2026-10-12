import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCustomPhotobookRequestDto } from './create-custom-photobook-request.dto';

const validRequest = {
  occasion: 'Viaje',
  requestedTheme: 'Japón',
  coverMode: 'PIXELART_DESIGNED' as const,
  brief: 'Una cubierta minimalista inspirada en nuestro viaje.',
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

function createDto(overrides: Partial<typeof validRequest> = {}) {
  return plainToInstance(CreateCustomPhotobookRequestDto, { ...validRequest, ...overrides });
}

describe('CreateCustomPhotobookRequestDto', () => {
  it('accepts a valid email and a formatted local or international phone number', async () => {
    const errors = await validate(createDto());

    expect(errors).toEqual([]);
  });

  it('rejects a malformed email address and a non-numeric phone number', async () => {
    const errors = await validate(createDto({
      customerEmail: 'ana-at-example',
      customerPhone: 'telefono de Ana',
    }));

    expect(errors.map((error) => error.property)).toEqual(expect.arrayContaining(['customerEmail', 'customerPhone']));
  });

  it('requires exactly four structured reference slots', async () => {
    const tooFew = await validate(createDto({ referenceSlots: validRequest.referenceSlots.slice(0, 3) }));
    const tooMany = await validate(createDto({ referenceSlots: [...validRequest.referenceSlots, { assetId: 11, surface: 'BACK_COVER', slotIndex: 2 }] }));

    expect(tooFew.map((error) => error.property)).toContain('referenceSlots');
    expect(tooMany.map((error) => error.property)).toContain('referenceSlots');
  });
});
