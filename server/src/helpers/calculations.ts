// Revenue growth rate utility
export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
