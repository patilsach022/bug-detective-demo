// BUG 1 (Backend): Throws when previous === 0, which is guaranteed by the seed data.
// The first revenue row is seeded with amount = 0, so this always throws on the first API call.
export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) {
    throw new Error('Division by zero: previous period revenue is 0');
  }
  return ((current - previous) / previous) * 100;
}
