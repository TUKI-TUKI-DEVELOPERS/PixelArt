import { Injectable } from '@nestjs/common';
import { execFile as run } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const DEFAULT_PROFILE = resolve(__dirname, '../../../../resources/icc/APTEC_Offset_Coated_LinearCTV_2025.icc');
const TIMEOUT_MS = 120_000;

@Injectable()
export class CmykPdfConverterService {
  async convert(pdf: Buffer): Promise<Buffer> {
    const profile = process.env.PRINT_PDF_ICC_PROFILE_PATH || DEFAULT_PROFILE;
    let directory: string | undefined;
    let profileAvailable = false;
    try {
      await fs.access(profile);
      profileAvailable = true;
      directory = await fs.mkdtemp(join(tmpdir(), 'pixelart-cmyk-'));
      const input = join(directory, `${randomUUID()}.pdf`);
      const output = join(directory, `${randomUUID()}.pdf`);
      await fs.writeFile(input, pdf);
      await new Promise<void>((resolvePromise, reject) => {
        run('gs', [
          '-dSAFER', '-dBATCH', '-dNOPAUSE', '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.7',
          '-dColorConversionStrategy=/CMYK', '-dProcessColorModel=/DeviceCMYK',
          '-dOverrideICC', `-sOutputICCProfile=${profile}`, `--permit-file-read=${profile}`, `-sOutputFile=${output}`, input,
        ], { shell: false, timeout: TIMEOUT_MS }, (error) => error ? reject(error) : resolvePromise());
      });
      const result = await fs.readFile(output);
      if (result.length < 8 || result.subarray(0, 5).toString() !== '%PDF-') {
        throw new Error('Ghostscript produced invalid PDF output');
      }
      return result;
    } catch (error) {
      const reason = profileAvailable ? 'CMYK PDF conversion failed' : 'Configured ICC profile is unavailable';
      throw new Error(`${reason}: ${error instanceof Error ? error.message : 'unknown error'}`);
    } finally {
      if (directory) await fs.rm(directory, { recursive: true, force: true });
    }
  }
}
