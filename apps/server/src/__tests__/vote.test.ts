import { describe, expect, it } from 'vitest';
import { ipHash, isVoteAllowed } from '../security/vote';

describe('Vote anti-spam', () => {
  it('rejects a second vote under 10 minutes', () => {
    const lastVote = new Date('2026-01-01T10:00:00.000Z');
    const now = new Date('2026-01-01T10:09:59.000Z');
    expect(isVoteAllowed(lastVote, now)).toBe(false);
  });

  it('allows vote after 10 minutes', () => {
    const lastVote = new Date('2026-01-01T10:00:00.000Z');
    const now = new Date('2026-01-01T10:10:00.000Z');
    expect(isVoteAllowed(lastVote, now)).toBe(true);
  });

  it('hashes ip with deterministic SHA256', () => {
    const hash = ipHash('127.0.0.1', 'salt');
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[a-f0-9]+$/);
  });
});
