import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { appRouter } from './routers/appRouter';
import { createTrpcContext } from './middleware/context';
import { notFoundHandler } from './middleware/notFound';

const currentDir = dirname(fileURLToPath(import.meta.url));
const publicDir = join(currentDir, '../../../public');
const indexFile = join(publicDir, 'index.html');

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

  app.get('/api/health', (_req, res) => {
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

  app.use(express.static(publicDir));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/trpc')) {
      return next();
    }

    return res.sendFile(indexFile);
  });

  app.use(notFoundHandler);

  return app;
}
