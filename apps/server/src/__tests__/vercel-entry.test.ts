import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../../../api/index';

describe('Vercel entrypoint', () => {
  it('loads without external module resolution errors and serves health', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
