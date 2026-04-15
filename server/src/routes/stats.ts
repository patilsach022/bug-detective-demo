import { Router } from 'express';
import db from '../db/database.js';
import logger from '../logger.js';
import { calculateGrowthRate } from '../helpers/calculations.js';
import type { RevenueRow, ProductRow, UserStatsRow } from '../types.js';

const router = Router();

// GET /api/stats/revenue
router.get('/revenue', (_req, res) => {
  try {
    const rows = db
      .prepare('SELECT date, amount FROM revenue_daily ORDER BY date ASC')
      .all() as unknown as RevenueRow[];

    const growth = calculateGrowthRate(rows[rows.length - 1].amount, rows[0].amount);

    logger.info('Revenue fetched', { service: 'api', route: '/api/stats/revenue', growth });
    res.json({ rows, growth });
  } catch (err: unknown) {
    const e = err as Error;
    logger.error(e.message, {
      service: 'api',
      route: '/api/stats/revenue',
      type: 'Backend',
      stack: e.stack,
    });
    res.status(500).json({ error: e.message });
  }
});

// GET /api/stats/products
router.get('/products', (_req, res) => {
  try {
    const rows = db
      .prepare('SELECT name, sales_count FROM products ORDER BY sales_count DESC')
      .all() as unknown as ProductRow[];
    res.json({ rows });
  } catch (err: unknown) {
    const e = err as Error;
    logger.error(e.message, { service: 'api', route: '/api/stats/products', stack: e.stack });
    res.status(500).json({ error: e.message });
  }
});

// GET /api/stats/users
router.get('/users', (_req, res) => {
  try {
    const result = db
      .prepare('SELECT COUNT(*) as count FROM user_sessions WHERE is_active = 1')
      .get() as unknown as UserStatsRow;

    logger.info('Users fetched', { service: 'database', route: '/api/stats/users' });
    res.json({ activeUsers: result.count });
  } catch (err: unknown) {
    const e = err as Error;
    logger.error(e.message, {
      service: 'database',
      route: '/api/stats/users',
      type: 'Integration',
      stack: e.stack,
    });
    res.status(500).json({ error: e.message });
  }
});

export default router;
