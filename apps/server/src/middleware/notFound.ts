import type { Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: 'NOT_FOUND',
    code: 'NOT_FOUND',
    message: `Route ${req.method} ${req.path} not found`,
  });
}
