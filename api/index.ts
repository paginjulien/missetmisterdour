import express from 'express';
import helmet from 'helmet';

const app = express();

app.disable('x-powered-by');
app.use(helmet());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ app: 'missetmisterdour', status: 'ok' });
});

app.get('/event/2026', (_req, res) => {
  res.status(200).json({ event: 'misset&mister dour 2026', status: 'published' });
});

app.get('/trpc/health', (_req, res) => {
  res.status(200).json({ result: { data: { status: 'ok', service: 'missetmisterdour-api' } } });
});

app.get('*', (_req, res) => {
  res.status(200).type('html').send(`<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Misset Mister Dour</title></head><body><h1>Misset Mister Dour</h1><p>Entrée Vercel active.</p><ul><li><a href="/api/health">/api/health</a></li><li><a href="/event/2026">/event/2026</a></li><li><a href="/trpc/health">/trpc/health</a></li></ul></body></html>`);
});

export default app;
