import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app';

describe('Express runtime', () => {
  const app = createApp();

  it('serves html shell on root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Misset Mister Dour');
  });

  it('serves dedicated api health route', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('returns structured 404 payload for unknown api routes', async () => {
    const response = await request(app).get('/api/unknown-path');
    expect(response.status).toBe(404);
    expect(response.body.code).toBe('NOT_FOUND');
    expect(response.body.error).toBe('NOT_FOUND');
  });

  it('serves favicon to avoid browser 404 noise', async () => {
    const response = await request(app).get('/favicon.svg');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toContain('image/svg+xml');
  });
});
