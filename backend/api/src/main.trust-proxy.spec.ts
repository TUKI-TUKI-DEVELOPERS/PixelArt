import express from 'express';
import { createServer } from 'http';
import { configureTrustProxy } from './main';

describe('client IP detection behind nginx -> Next -> Nest', () => {
  async function ipSeenFor(headers: Record<string, string>) {
    const app = express();
    configureTrustProxy(app);
    app.get('/', (req, res) => res.json({ ip: req.ip }));
    const server = createServer(app);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Expected TCP address');
    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/`, { headers });
      return ((await response.json()) as { ip: string }).ip;
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    }
  }

  it('uses the address appended by nginx (rightmost entry), ignoring client-supplied entries to its left', async () => {
    await expect(ipSeenFor({ 'x-forwarded-for': '198.51.100.99, 203.0.113.7' })).resolves.toBe('203.0.113.7');
  });

  it('falls back to the socket address for server-side calls that carry no X-Forwarded-For', async () => {
    await expect(ipSeenFor({})).resolves.toMatch(/127\.0\.0\.1$/);
  });
});
