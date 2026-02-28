import { initTRPC, TRPCError } from '@trpc/server';
import { hasPermission, type RoleLevel } from './rbac';

export type TrpcContext = {
  session: {
    userId: number;
    roleLevel: RoleLevel;
  } | null;
};

const t = initTRPC.context<TrpcContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const roleProcedure = (requiredLevel: RoleLevel) =>
  t.procedure.use(({ ctx, next }) => {
    if (!ctx.session || !hasPermission(ctx.session.roleLevel, requiredLevel)) {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Insufficient role level' });
    }

    return next();
  });
