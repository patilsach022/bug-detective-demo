import db from './database.js';

export function setupDatabase(): void {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS revenue_daily (
      date TEXT NOT NULL,
      amount REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sales_count INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      started_at TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1
    );
  `);

  // Seed only if empty
  const revenueCount = (db.prepare('SELECT COUNT(*) as c FROM revenue_daily').get() as unknown as { c: number }).c;
  if (revenueCount > 0) return;

  // Revenue: first row has amount = 0 to guarantee Bug 1 triggers (divide-by-zero in calculateGrowthRate)
  const insertRevenue = db.prepare('INSERT INTO revenue_daily (date, amount) VALUES (?, ?)');
  const revenueData: [string, number][] = [
    ['2026-03-16', 0],
    ['2026-03-17', 1240],
    ['2026-03-18', 980],
    ['2026-03-19', 1530],
    ['2026-03-20', 1750],
    ['2026-03-21', 2100],
    ['2026-03-22', 1890],
    ['2026-03-23', 2300],
    ['2026-03-24', 2150],
    ['2026-03-25', 1970],
    ['2026-03-26', 2450],
    ['2026-03-27', 2680],
    ['2026-03-28', 3100],
    ['2026-03-29', 2890],
    ['2026-03-30', 3250],
    ['2026-03-31', 3480],
    ['2026-04-01', 3200],
    ['2026-04-02', 2950],
    ['2026-04-03', 3600],
    ['2026-04-04', 3750],
    ['2026-04-05', 4100],
    ['2026-04-06', 3900],
    ['2026-04-07', 4300],
    ['2026-04-08', 4150],
    ['2026-04-09', 4500],
    ['2026-04-10', 4750],
    ['2026-04-11', 5000],
    ['2026-04-12', 4800],
    ['2026-04-13', 5200],
    ['2026-04-14', 5450],
  ];
  for (const [date, amount] of revenueData) {
    insertRevenue.run(date, amount);
  }

  // Products
  const insertProduct = db.prepare('INSERT INTO products (name, sales_count) VALUES (?, ?)');
  const productData: [string, number][] = [
    ['Pro Plan', 842],
    ['Starter Plan', 1203],
    ['Enterprise Plan', 317],
    ['Add-on: Analytics', 654],
    ['Add-on: Exports', 489],
  ];
  for (const [name, count] of productData) {
    insertProduct.run(name, count);
  }

  // User sessions — column is `is_active` (Bug 3 query uses `active_flag` which does NOT exist)
  const insertSession = db.prepare('INSERT INTO user_sessions (started_at, is_active) VALUES (?, ?)');
  for (let i = 0; i < 50; i++) {
    insertSession.run(new Date(Date.now() - i * 3600000).toISOString(), i < 38 ? 1 : 0);
  }

  console.log('[setup] Database seeded successfully');
}
