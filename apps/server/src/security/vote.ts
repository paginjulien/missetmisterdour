import { createHash } from 'node:crypto';

const TEN_MINUTES_MS = 10 * 60 * 1000;

export function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function ipHash(ip: string, salt: string): string {
  return sha256(`${ip}:${salt}`);
}

export function isVoteAllowed(lastVoteAt: Date | null, now = new Date()): boolean {
  if (!lastVoteAt) return true;
  return now.getTime() - lastVoteAt.getTime() >= TEN_MINUTES_MS;
}
