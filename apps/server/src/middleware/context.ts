import type { Request } from 'express';
import { ROLES } from '../rbac';
import type { TrpcContext } from '../trpc';

export function createTrpcContext(req: Request): TrpcContext {
  const roleHeader = req.header('x-role-level');
  const userHeader = req.header('x-user-id');

  if (!roleHeader || !userHeader) return { session: null };

  const roleLevel = Number(roleHeader);
  const userId = Number(userHeader);

  if (!Number.isFinite(roleLevel) || !Number.isFinite(userId)) {
    return { session: null };
  }

  if (roleLevel < ROLES.USER || roleLevel > ROLES.SUPER_ADMIN) {
    return { session: null };
  }

  return { session: { userId, roleLevel: roleLevel as (typeof ROLES)[keyof typeof ROLES] } };
}
