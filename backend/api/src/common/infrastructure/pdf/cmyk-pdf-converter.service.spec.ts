import { promises as fs } from 'node:fs';
import { execFile } from 'node:child_process';
import { CmykPdfConverterService } from './cmyk-pdf-converter.service';

jest.mock('node:child_process', () => ({ execFile: jest.fn() }));
jest.mock('node:fs', () => ({ promises: { mkdtemp: jest.fn(), writeFile: jest.fn(), readFile: jest.fn(), access: jest.fn(), rm: jest.fn() } }));

const mockedExec = execFile as unknown as jest.Mock;
const files = fs as jest.Mocked<typeof fs>;

describe('CmykPdfConverterService', () => {
  const service = new CmykPdfConverterService();
  const source = Buffer.from('%PDF-source');
  const converted = Buffer.from('%PDF-converted');
  const profile = '/profile/aptec.icc';
  const root = '/tmp/cmyk-test';
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PRINT_PDF_ICC_PROFILE_PATH = profile;
    (files.mkdtemp as jest.Mock).mockResolvedValue(root);
    (files.writeFile as jest.Mock).mockResolvedValue(undefined);
    (files.access as jest.Mock).mockResolvedValue(undefined);
    (files.readFile as jest.Mock).mockResolvedValue(converted);
    (files.rm as jest.Mock).mockResolvedValue(undefined);
    mockedExec.mockImplementation((_cmd, _args, _opts, callback) => callback(null, '', ''));
  });
  afterEach(() => { delete process.env.PRINT_PDF_ICC_PROFILE_PATH; });

  it('resolves the configured profile and invokes Ghostscript with argv and no shell', async () => {
    await expect(service.convert(source)).resolves.toEqual(converted);
    expect(files.access).toHaveBeenCalledWith(profile);
    const [cmd, args, options] = mockedExec.mock.calls[0];
    expect(cmd).toBe('gs');
    expect(Array.isArray(args)).toBe(true);
    expect(args).toContain(`-sOutputICCProfile=${profile}`);
    expect(args).toContain(`--permit-file-read=${profile}`);
    expect(options).toMatchObject({ shell: false, timeout: 120000 });
  });
  it('uses the packaged APTEC profile when no override is configured', async () => {
    delete process.env.PRINT_PDF_ICC_PROFILE_PATH;
    await service.convert(source);
    expect(files.access).toHaveBeenCalledWith(expect.stringContaining('APTEC_Offset_Coated_LinearCTV_2025.icc'));
  });
  it('reports temp-directory creation failures as conversion failures, not profile failures', async () => {
    (files.mkdtemp as jest.Mock).mockRejectedValueOnce(new Error('temp unavailable'));
    const failure = service.convert(source);
    await expect(failure).rejects.toThrow(/CMYK PDF conversion failed/);
    await expect(failure).rejects.not.toThrow(/Configured ICC profile is unavailable/);
  });
  it('rejects missing profile without starting Ghostscript', async () => {
    (files.access as jest.Mock).mockRejectedValueOnce(new Error('missing'));
    await expect(service.convert(source)).rejects.toThrow(/ICC profile/i);
    expect(mockedExec).not.toHaveBeenCalled();
    expect(files.rm).not.toHaveBeenCalled();
  });
  it.each([new Error('timeout'), Object.assign(new Error('exit'), { code: 1 })])('rejects process failure without RGB fallback', async (error) => {
    mockedExec.mockImplementationOnce((_cmd, _args, _opts, callback) => callback(error, '', ''));
    await expect(service.convert(source)).rejects.toThrow(/CMYK/i);
    expect(files.rm).toHaveBeenCalledWith(root, { recursive: true, force: true });
  });
  it('rejects invalid output and cleans up', async () => {
    (files.readFile as jest.Mock).mockResolvedValueOnce(Buffer.from('not pdf'));
    await expect(service.convert(source)).rejects.toThrow(/output/i);
    expect(files.rm).toHaveBeenCalledWith(root, { recursive: true, force: true });
  });
});
