import { Router } from 'express';
import logger from '../logger.js';
import type { ClientErrorPayload } from '../types.js';

const router = Router();

// POST /api/log/client — receives UI error payloads from the React ErrorBoundary
router.post('/client', (req, res) => {
  const { message, stack, componentStack, type } = req.body as ClientErrorPayload;
  logger.error(message, {
    service: 'client',
    type: type ?? 'UI',
    stack,
    componentStack,
  });
  res.status(204).send();
});

export default router;
