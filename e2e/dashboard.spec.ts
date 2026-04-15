/**
 * Regression tests: Bug-detective demo dashboard
 * Verifies all three intentional bugs surface as red error panels
 * and that output_logs.txt contains all three bug types.
 * Added: 2026-04-15
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Bug-detective demo dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to fully load and Bug 2 auto-trigger (2s delay)
    await page.waitForTimeout(4000);
  });

  test('Revenue widget shows error panel (Bug 1 — Backend)', async ({ page }) => {
    // regression guard: Backend divide-by-zero in calculateGrowthRate
    const panels = page.getByText('Widget failed to load');
    await expect(panels.first()).toBeVisible();
  });

  test('Active Users widget shows error panel (Bug 3 — Integration)', async ({ page }) => {
    // regression guard: Integration SQLite no such column active_flag
    const panels = page.getByText('Widget failed to load');
    await expect(panels.nth(1)).toBeVisible();
  });

  test('Export Report widget shows error panel (Bug 2 — UI)', async ({ page }) => {
    // regression guard: UI TypeError Cannot read properties of undefined (reading map)
    const panels = page.getByText('Widget failed to load');
    await expect(panels.nth(2)).toBeVisible();
  });

  test('Top Products widget renders successfully (healthy widget)', async ({ page }) => {
    // The bar chart should render without error
    await expect(page.locator('.recharts-bar-rectangle').first()).toBeVisible();
  });

  test('output_logs.txt contains all three bug types', async () => {
    const logPath = path.resolve(__dirname, '../output_logs.txt');
    const content = fs.readFileSync(logPath, 'utf-8');
    const lines = content
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((l) => JSON.parse(l));

    // regression guard: each bug type must appear in logs
    expect(lines.some((l) => l.type === 'Backend')).toBe(true);
    expect(lines.some((l) => l.type === 'Integration')).toBe(true);
    expect(lines.some((l) => l.type === 'UI')).toBe(true);
  });
});
