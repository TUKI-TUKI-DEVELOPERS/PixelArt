import { detectPaymentProofImage } from './payment-proof-file';

const JPEG_BYTES = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00]);
const PNG_BYTES = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d]);
const WEBP_BYTES = Buffer.concat([Buffer.from('RIFF'), Buffer.from([0x24, 0x00, 0x00, 0x00]), Buffer.from('WEBPVP8 ')]);

describe('detectPaymentProofImage', () => {
  it.each([
    ['JPEG', JPEG_BYTES, { mimeType: 'image/jpeg', extension: 'jpg' }],
    ['PNG', PNG_BYTES, { mimeType: 'image/png', extension: 'png' }],
    ['WEBP', WEBP_BYTES, { mimeType: 'image/webp', extension: 'webp' }],
  ])('detects %s from its magic bytes', (_label, bytes, expected) => {
    expect(detectPaymentProofImage(bytes)).toEqual(expected);
  });

  it.each([
    ['an HTML page renamed to .jpg', Buffer.from('<html><script>alert(1)</script></html>')],
    ['an SVG image', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>')],
    ['a PDF', Buffer.from('%PDF-1.7\n')],
    ['a GIF', Buffer.from('GIF89a......')],
    ['a RIFF file that is not WEBP', Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WAVEfmt ')])],
    ['a truncated PNG signature', PNG_BYTES.subarray(0, 4)],
    ['an empty buffer', Buffer.alloc(0)],
  ])('rejects %s', (_label, bytes) => {
    expect(detectPaymentProofImage(bytes)).toBeNull();
  });
});
