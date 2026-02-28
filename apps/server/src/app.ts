import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/appRouter';
import { createTrpcContext } from './middleware/context';
import { notFoundHandler } from './middleware/notFound';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.status(200).json({
      app: 'missetmisterdour',
      status: 'ok',
      docs: '/trpc/health',
    });
  });

  app.get('/event/2026', (_req, res) => {
    res.status(200).json({ event: 'misset&mister dour 2026', status: 'published' });
  });

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: ({ req }) => createTrpcContext(req),
    }),
  );

  app.use(notFoundHandler);

  return app;
}
