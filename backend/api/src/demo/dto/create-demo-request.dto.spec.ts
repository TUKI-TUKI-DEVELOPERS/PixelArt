import { ValidationPipe } from '@nestjs/common';
import { CreateDemoRequestDto } from './create-demo-request.dto';
import { DemoPublicController } from '../demo-public.controller';

// Same options as the global pipe in main.ts.
const pipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true });
const validate = (body: unknown) => pipe.transform(body, { type: 'body', metatype: CreateDemoRequestDto });

// Mirrors the exact body sent by WizardSection.tsx handleSubmit().
function wizardPayload(overrides: Record<string, unknown> = {}) {
  return {
    catalogBookId: 12,
    catalogBookVariantId: 31,
    personalizedCategoryId: 3,
    personalizedModelId: 44,
    customerFullName: 'Ana Pérez',
    customerEmail: 'ana@example.com ',
    customerPhone: '+51 999 111 222',
    shippingAddressLine1: 'Av. Ejército 123',
    shippingAddressLine2: null,
    shippingCity: 'Arequipa',
    shippingRegion: 'Arequipa',
    shippingReference: null,
    wantsRush: false,
    packagePreference: 'STANDARD',
    wantsCustomDedication: false,
    dedicationText: 'Para ti, con todo mi amor.',
    messageOptional: null,
    templateIds: [101, 102],
    assetIds: ['501', 502],
    recipientName: 'Luis',
    recipientNickname: null,
    dedicatorName: 'Ana',
    genderDirection: 'SHE_TO_HE',
    characterMeta: { mode: 'pareja', recipient: { name: 'Luis', nickname: null, assetIds: [501] } },
    ...overrides,
  };
}

describe('CreateDemoRequestDto', () => {
  it('accepts the payload the public wizard sends and normalises ids and email', async () => {
    const dto = await validate(wizardPayload());
    expect(dto).toBeInstanceOf(CreateDemoRequestDto);
    expect(dto.assetIds).toEqual([501, 502]);
    expect(dto.customerEmail).toBe('ana@example.com');
    expect(dto.characterMeta).toEqual({ mode: 'pareja', recipient: { name: 'Luis', nickname: null, assetIds: [501] } });
  });

  it('accepts the memorial gender values and an optional delivery date', async () => {
    await expect(validate(wizardPayload({ genderDirection: 'F', deliveryDate: '2026-12-24' }))).resolves.toBeDefined();
  });

  it.each([
    ['an unknown field', { isPaid: true }],
    ['an invalid email', { customerEmail: 'not-an-email' }],
    ['a missing customer name', { customerFullName: '' }],
    ['an overlong customer name', { customerFullName: 'x'.repeat(121) }],
    ['an overlong dedication', { dedicationText: 'x'.repeat(4001) }],
    ['an overlong message', { messageOptional: 'x'.repeat(2001) }],
    ['an overlong address', { shippingAddressLine1: 'x'.repeat(301) }],
    ['a non-numeric template id', { templateIds: ['abc'] }],
    ['too many asset ids', { assetIds: Array.from({ length: 51 }, (_, i) => i + 1) }],
    ['an unknown package', { packagePreference: 'GOLD' }],
    ['a non-object character meta', { characterMeta: 'x' }],
    ['a non-boolean dedication flag', { wantsCustomDedication: 'yes' }],
  ])('rejects %s', async (_label, overrides) => {
    await expect(validate(wizardPayload(overrides))).rejects.toMatchObject({ status: 400 });
  });

  it('is the declared body type of POST /api/demo/requests so the global pipe validates it', () => {
    const [bodyType] = Reflect.getMetadata('design:paramtypes', DemoPublicController.prototype, 'create');
    expect(bodyType).toBe(CreateDemoRequestDto);
  });
});
