/**
 * Payment proofs (Yape/bank screenshots) must be real images. The client's
 * declared mimetype is never trusted: the stored Content-Type and extension
 * come from the file's own magic bytes, so an HTML/SVG upload can never be
 * served back as a document on our origin.
 */
export type PaymentProofImage = {
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp';
  extension: 'jpg' | 'png' | 'webp';
};

export const INVALID_PAYMENT_PROOF_MESSAGE = 'El comprobante debe ser una imagen JPG, PNG o WEBP.';

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function startsWith(buffer: Buffer, signature: Buffer | string, offset = 0): boolean {
  const expected = typeof signature === 'string' ? Buffer.from(signature, 'ascii') : signature;
  return buffer.length >= offset + expected.length && buffer.subarray(offset, offset + expected.length).equals(expected);
}

export function detectPaymentProofImage(buffer: Buffer): PaymentProofImage | null {
  if (startsWith(buffer, Buffer.from([0xff, 0xd8, 0xff]))) return { mimeType: 'image/jpeg', extension: 'jpg' };
  if (startsWith(buffer, PNG_SIGNATURE)) return { mimeType: 'image/png', extension: 'png' };
  if (startsWith(buffer, 'RIFF') && startsWith(buffer, 'WEBP', 8)) return { mimeType: 'image/webp', extension: 'webp' };
  return null;
}
