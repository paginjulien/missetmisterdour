import { randomBytes, createHash } from 'node:crypto';

export function createInviteToken(): string {
  return randomBytes(32).toString('hex');
}

export function tokenDigest(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function isTokenExpired(expiresAt: Date, now = new Date()): boolean {
  return now.getTime() > expiresAt.getTime();
}
