import express from 'express';
import { createServer } from 'http';
import { configureBodyParsers } from './main';

describe('JSON body parser limit', () => {
  it('accepts JSON above 100 KB and rejects bodies above 1 MiB', async () => {
    const app = express();
    configureBodyParsers(app);
    app.post('/', (req, res) => res.json({ length: req.body.value.length }));
    const server = createServer(app);
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Expected TCP address');

    const post = (value: string) => fetch(`http://127.0.0.1:${address.port}/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ value }),
    });

    try {
      const accepted = await post('x'.repeat(120 * 1024));
      expect(accepted.status).toBe(200);
      const rejected = await post('x'.repeat(1024 * 1024));
      expect(rejected.status).toBe(413);
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  });
});
