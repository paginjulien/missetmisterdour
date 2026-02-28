import { describe, expect, it } from 'vitest';
import { createInviteToken, isTokenExpired, tokenDigest } from '../security/invitation';

describe('Invitation token', () => {
  it('creates 64-char hex token', () => {
    const token = createInviteToken();
    expect(token).toHaveLength(64);
    expect(token).toMatch(/^[a-f0-9]+$/);
  });

  it('creates deterministic digest', () => {
    expect(tokenDigest('abc')).toBe(tokenDigest('abc'));
  });

  it('supports expiration checks', () => {
    expect(isTokenExpired(new Date('2026-01-01T10:00:00.000Z'), new Date('2026-01-01T10:00:01.000Z'))).toBe(true);
  });
});
