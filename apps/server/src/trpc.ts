import { initTRPC, TRPCError } from '@trpc/server';
import { hasPermission, type RoleLevel } from './rbac';

type Context = {
  session: {
    userId: number;
    roleLevel: RoleLevel;
  } | null;
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const roleProcedure = (requiredLevel: RoleLevel) =>
  t.procedure.use(({ ctx, next }) => {
    if (!ctx.session || !hasPermission(ctx.session.roleLevel, requiredLevel)) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    return next();
  });
