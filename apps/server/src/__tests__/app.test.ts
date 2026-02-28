import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app';

describe('Express runtime', () => {
  const app = createApp();

  it('serves root health route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('returns structured 404 payload', async () => {
    const response = await request(app).get('/unknown-path');
    expect(response.status).toBe(404);
    expect(response.body.code).toBe('NOT_FOUND');
    expect(response.body.error).toBe('NOT_FOUND');
  });
});
