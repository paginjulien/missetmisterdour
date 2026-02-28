import { z } from 'zod';
import { ROLES } from '../rbac';
import { publicProcedure, roleProcedure, router } from '../trpc';

export const appRouter = router({
  health: publicProcedure.query(() => ({ status: 'ok', service: 'missetmisterdour-api' })),
  adminPing: roleProcedure(ROLES.ADMIN)
    .input(z.object({ message: z.string().min(1).max(200) }))
    .mutation(({ input, ctx }) => ({
      acknowledged: true,
      byUserId: ctx.session?.userId ?? null,
      echo: input.message,
    })),
});

export type AppRouter = typeof appRouter;
