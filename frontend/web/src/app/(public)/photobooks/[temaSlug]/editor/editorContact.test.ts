import { describe, expect, it } from 'vitest';
import { fillEmptyContactFields, isValidEditorPhone, normalizeEditorPhone } from './editorContact';

describe('isValidEditorPhone', () => {
  it.each(['999111222', '+51999111222', '+51 999 111 222'])('accepts %s', (phone) => {
    expect(isValidEditorPhone(phone)).toBe(true);
  });

  it.each(['', '99911122', '9991112222', '51999111222', '+1555123456', '+51-999-111-222'])('rejects %s', (phone) => {
    expect(isValidEditorPhone(phone)).toBe(false);
  });
});

describe('normalizeEditorPhone', () => {
  it.each([
    ['999111222', '+51999111222'],
    ['999 111 222', '+51999111222'],
    ['+51999111222', '+51999111222'],
    ['+51 999 111 222', '+51999111222'],
    ['+51 (999) 111-222', '+51999111222'],
    ['51999111222', '+51999111222'],
    ['51 999.111.222', '+51999111222'],
    ['519111222', '+51519111222'],
  ])('normalizes %s to %s', (raw, expected) => {
    expect(normalizeEditorPhone(raw)).toBe(expected);
    expect(isValidEditorPhone(normalizeEditorPhone(raw))).toBe(true);
  });

  it.each([
    ['an international number', '+1 555 123 4567'],
    ['a foreign number with a plus sign', '+999111222'],
    ['the 00 international prefix', '0051999111222'],
    ['too few digits', '99911122'],
    ['too many digits', '9991112223'],
    ['letters', 'abc'],
    ['an empty value', ''],
    ['a missing value', undefined],
    ['a null value', null],
  ])('returns an empty string for %s', (_label, raw) => {
    expect(normalizeEditorPhone(raw)).toBe('');
  });
});

describe('fillEmptyContactFields', () => {
  const emptyForm = { name: '', email: '', phone: '', deliveryAddress: '', deliveryDistrict: '', deliveryCity: '', deliveryRegion: '', deliveryDepartment: '' };
  const contact = { name: ' Ana Cliente ', email: ' ana@example.com ', phone: '+51 999 111 222' };

  it('fills empty contact fields and leaves the address fields untouched', () => {
    expect(fillEmptyContactFields(emptyForm, contact)).toEqual({
      ...emptyForm,
      name: 'Ana Cliente',
      email: 'ana@example.com',
      phone: '+51999111222',
    });
  });

  it('never overwrites a value the form already holds', () => {
    const form = { ...emptyForm, name: 'Ana María', phone: '987654321' };

    expect(fillEmptyContactFields(form, contact)).toEqual({ ...form, email: 'ana@example.com' });
  });

  it('treats whitespace-only and missing fields as empty', () => {
    const legacyForm = { name: '   ', deliveryAddress: 'Av. Principal 123' } as unknown as typeof emptyForm;

    expect(fillEmptyContactFields(legacyForm, contact)).toEqual({
      name: 'Ana Cliente',
      email: 'ana@example.com',
      phone: '+51999111222',
      deliveryAddress: 'Av. Principal 123',
    });
  });

  it('leaves the phone empty when the contact phone cannot satisfy the editor rule', () => {
    expect(fillEmptyContactFields(emptyForm, { ...contact, phone: '+1 555 123 4567' }).phone).toBe('');
  });

  it('returns the same form when there is no contact to apply', () => {
    expect(fillEmptyContactFields(emptyForm, undefined)).toBe(emptyForm);
    expect(fillEmptyContactFields(emptyForm, { name: '', email: null, phone: undefined })).toBe(emptyForm);
  });
});
