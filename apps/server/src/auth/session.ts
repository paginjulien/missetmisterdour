export const SESSION_COOKIE_NAME = 'misset.sid';

export const sessionCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 1000 * 60 * 60 * 4,
};

export const SESSION_TIMEOUT_MS = 1000 * 60 * 60 * 4;
