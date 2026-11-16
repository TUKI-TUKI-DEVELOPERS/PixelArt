import { BadRequestException, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAiImageGenerationAdapter } from './openai-image-generation.adapter';

describe('OpenAiImageGenerationAdapter error handling', () => {
  const leakyMessage = 'Incorrect API key provided: sk-proj-abc123SECRETxyz. You can find your API key at https://platform.openai.com/account/api-keys.';

  function adapterFailingWith(error: unknown) {
    const previousKey = process.env.OPENAI_API_KEY;
    process.env.OPENAI_API_KEY = 'test-placeholder-key';
    const adapter = new OpenAiImageGenerationAdapter();
    if (previousKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previousKey;
    (adapter as unknown as { client: unknown }).client = {
      images: { generate: jest.fn().mockRejectedValue(error), edit: jest.fn().mockRejectedValue(error) },
    };
    return adapter;
  }

  let errorLog: jest.SpyInstance;
  beforeEach(() => {
    errorLog = jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
  });
  afterEach(() => errorLog.mockRestore());

  it('returns a generic message to the HTTP client instead of the OpenAI error text', async () => {
    const adapter = adapterFailingWith(new OpenAI.APIError(401, { message: leakyMessage, type: 'invalid_request_error', code: 'invalid_api_key' }, leakyMessage, new Headers()));

    const error = await adapter.generate('prompt').catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(BadRequestException);
    expect((error as Error).message).not.toContain('sk-');
    expect((error as Error).message).not.toContain('Incorrect API key');
    expect((error as Error).message).toMatch(/No se pudo generar la imagen/);
  });

  it('logs the upstream detail server-side with key material redacted', async () => {
    const adapter = adapterFailingWith(new OpenAI.APIError(401, { message: leakyMessage, code: 'invalid_api_key' }, leakyMessage, new Headers()));

    await adapter.generateWithReferences('prompt', [Buffer.from('png')]).catch(() => undefined);

    const logged = errorLog.mock.calls.flat().join(' ');
    expect(logged).toContain('401');
    expect(logged).toContain('invalid_api_key');
    expect(logged).not.toContain('sk-proj-abc123SECRETxyz');
    expect(logged).toContain('sk-[redacted]');
  });

  it('keeps the specific moderation message, which carries no upstream detail', async () => {
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });
    const moderation = new OpenAI.APIError(400, { message: 'Your request was rejected by the safety system', code: 'moderation_blocked' }, 'Your request was rejected by the safety system', new Headers());
    const adapter = adapterFailingWith(moderation);
    const pending = adapter.generate('prompt').catch((reason: unknown) => reason);
    await jest.runAllTimersAsync();
    const error = await pending;
    jest.useRealTimers();

    expect(error).toBeInstanceOf(BadRequestException);
    expect((error as Error).message).toMatch(/moderación/);
    expect((error as Error).message).not.toContain('safety system');
  });
});
