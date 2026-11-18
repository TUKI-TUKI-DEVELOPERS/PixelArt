import { MinioStorageService } from './minio-storage.service';
import { PutObjectCommand } from '@aws-sdk/client-s3';

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn().mockImplementation(() => ({ send: jest.fn() })),
  GetObjectCommand: jest.fn().mockImplementation((input) => ({ input })),
  PutObjectCommand: jest.fn().mockImplementation((input) => ({ input })),
  DeleteObjectCommand: jest.fn(),
  HeadObjectCommand: jest.fn(),
}));

describe('MinioStorageService private objects', () => {
  const original = {
    minioSecret: process.env.MINIO_SECRET_KEY,
    minioAccess: process.env.MINIO_ACCESS_KEY,
    privateKey: process.env.PIXELART_PRIVATE_ASSET_ENCRYPTION_KEY,
  };
  afterEach(() => {
    if (original.minioSecret === undefined) delete process.env.MINIO_SECRET_KEY;
    else process.env.MINIO_SECRET_KEY = original.minioSecret;
    if (original.minioAccess === undefined) delete process.env.MINIO_ACCESS_KEY;
    else process.env.MINIO_ACCESS_KEY = original.minioAccess;
    if (original.privateKey === undefined) delete process.env.PIXELART_PRIVATE_ASSET_ENCRYPTION_KEY;
    else process.env.PIXELART_PRIVATE_ASSET_ENCRYPTION_KEY = original.privateKey;
    jest.clearAllMocks();
  });

  const validDedicatedKey = () => require('crypto').randomBytes(32).toString('base64');
  const setDedicatedKey = (value: string) => { process.env.PIXELART_PRIVATE_ASSET_ENCRYPTION_KEY = value; };

  it('encrypts private uploads and decrypts only with matching key and storage key AAD', async () => {
    process.env.MINIO_SECRET_KEY = 'a'.repeat(40);
    process.env.MINIO_ACCESS_KEY = 'minio-access-credential';
    setDedicatedKey(validDedicatedKey());
    const service = new MinioStorageService();
    const send = (service as any).s3.send as jest.Mock;
    let envelope: Buffer;
    send.mockImplementation(async (command: any) => {
      if (command.input.Body) envelope = command.input.Body;
      else return { Body: require('stream').Readable.from([envelope]) };
    });
    await service.uploadPrivate('private/order/source', Buffer.from('clean image'));
    expect(envelope!.toString('utf8')).not.toContain('clean image');
    expect((PutObjectCommand as unknown as jest.Mock).mock.calls[0][0].CacheControl).toContain('no-store');
    await expect(service.downloadPrivate('private/order/source')).resolves.toEqual(Buffer.from('clean image'));
    await expect(service.downloadPrivate('private/other/source')).rejects.toThrow();
    envelope![envelope!.length - 1] ^= 1;
    await expect(service.downloadPrivate('private/order/source')).rejects.toThrow();
  });

  it.each([
    ['missing', undefined],
    ['default placeholder', 'pixelart_private_asset_encryption_key'],
    ['invalid base64', 'not-base64!'],
    ['wrong decoded length', Buffer.from('too short').toString('base64')],
    ['non-canonical base64', Buffer.concat([Buffer.alloc(32), Buffer.from([1])]).toString('base64').slice(0, 43)],
    ['all-identical bytes', Buffer.alloc(32, 0x41).toString('base64')],
    ['repeated short pattern', Buffer.from('abcd'.repeat(8)).toString('base64')],
    ['password repeated four times', Buffer.from('password'.repeat(4)).toString('base64')],
  ])('fails closed for %s dedicated key', async (_label, value) => {
    process.env.MINIO_SECRET_KEY = 'a'.repeat(40);
    if (value === undefined) delete process.env.PIXELART_PRIVATE_ASSET_ENCRYPTION_KEY;
    else setDedicatedKey(value);
    const service = new MinioStorageService();
    await expect(service.uploadPrivate('private/key', Buffer.from('secret'))).rejects.toThrow();
    await expect(service.downloadPrivate('private/key')).rejects.toThrow();
  });

  it('does not enable private storage from MINIO_SECRET_KEY length alone', async () => {
    process.env.MINIO_SECRET_KEY = 'x'.repeat(64);
    delete process.env.PIXELART_PRIVATE_ASSET_ENCRYPTION_KEY;
    const service = new MinioStorageService();
    await expect(service.uploadPrivate('private/key', Buffer.from('secret'))).rejects.toThrow();
  });

  it('rejects reuse of either effective MinIO credential as the dedicated key', async () => {
    process.env.MINIO_SECRET_KEY = 's'.repeat(32);
    process.env.MINIO_ACCESS_KEY = 'a'.repeat(32);
    setDedicatedKey(Buffer.from('s'.repeat(32)).toString('base64'));
    const secretReuse = new MinioStorageService();
    await expect(secretReuse.uploadPrivate('private/key', Buffer.from('secret'))).rejects.toThrow();

    setDedicatedKey(Buffer.from('a'.repeat(32)).toString('base64'));
    const accessReuse = new MinioStorageService();
    await expect(accessReuse.uploadPrivate('private/key', Buffer.from('secret'))).rejects.toThrow();
  });
});

describe('MinioStorageService public URLs, credentials and object streaming', () => {
  const ENV_KEYS = ['NODE_ENV', 'MINIO_ACCESS_KEY', 'MINIO_SECRET_KEY'] as const;
  const saved: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>> = {};

  beforeEach(() => {
    for (const key of ENV_KEYS) saved[key] = process.env[key];
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  });

  it('keeps public catalog keys on the same-origin /assets path', () => {
    expect(new MinioStorageService().getPublicUrl('IA_Books/Backgrounds/a.png')).toBe('/assets/IA_Books/Backgrounds/a.png');
  });

  it('routes private keys through the authenticated admin storage proxy', () => {
    const storage = new MinioStorageService();
    expect(storage.getPublicUrl('uploads/vouchers/31-ab.jpg')).toBe('/admin-api/storage/uploads/vouchers/31-ab.jpg');
    expect(storage.getPublicUrl('custom-books/print-assets/31/cover.png')).toBe('/admin-api/storage/custom-books/print-assets/31/cover.png');
  });

  it('refuses to start in production without MinIO credentials', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.MINIO_ACCESS_KEY;
    process.env.MINIO_SECRET_KEY = 'set-secret';
    expect(() => new MinioStorageService()).toThrow('MINIO_ACCESS_KEY must be set in production');

    process.env.MINIO_ACCESS_KEY = 'set-access';
    delete process.env.MINIO_SECRET_KEY;
    expect(() => new MinioStorageService()).toThrow('MINIO_SECRET_KEY must be set in production');
  });

  it('keeps the local default credentials outside production', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.MINIO_ACCESS_KEY;
    delete process.env.MINIO_SECRET_KEY;
    expect(() => new MinioStorageService()).not.toThrow();
  });

  function withSend(send: jest.Mock): MinioStorageService {
    const service = new MinioStorageService();
    (service as unknown as { s3: { send: jest.Mock } }).s3 = { send };
    return service;
  }

  it('opens an object stream with its stored metadata', async () => {
    const body = require('stream').Readable.from([Buffer.from('jpeg')]);
    const send = jest.fn().mockResolvedValue({ Body: body, ContentType: 'image/jpeg', ContentLength: 4 });

    await expect(withSend(send).openObject('uploads/vouchers/31.jpg')).resolves.toEqual({ body, contentType: 'image/jpeg', contentLength: 4 });
    expect(send.mock.calls[0][0].input).toEqual(expect.objectContaining({ Key: 'uploads/vouchers/31.jpg' }));
  });

  it('returns null when the object does not exist', async () => {
    const send = jest.fn().mockRejectedValue(Object.assign(new Error('missing'), { name: 'NoSuchKey' }));
    await expect(withSend(send).openObject('uploads/vouchers/404.jpg')).resolves.toBeNull();
  });

  it('propagates storage outages', async () => {
    const send = jest.fn().mockRejectedValue(Object.assign(new Error('down'), { name: 'TimeoutError' }));
    await expect(withSend(send).openObject('uploads/vouchers/31.jpg')).rejects.toThrow('down');
  });
});
