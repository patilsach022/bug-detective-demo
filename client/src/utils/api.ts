const BASE = '';

export async function fetchRevenue(): Promise<{ rows: { date: string; amount: number }[] }> {
  const res = await fetch(`${BASE}/api/stats/revenue`);
  if (!res.ok) throw new Error(`Revenue API error ${res.status}`);
  return res.json();
}

export async function fetchProducts(): Promise<{ rows: { name: string; sales_count: number }[] }> {
  const res = await fetch(`${BASE}/api/stats/products`);
  if (!res.ok) throw new Error(`Products API error ${res.status}`);
  return res.json();
}

export async function fetchUsers(): Promise<{ activeUsers: number }> {
  const res = await fetch(`${BASE}/api/stats/users`);
  if (!res.ok) throw new Error(`Users API error ${res.status}`);
  return res.json();
}
