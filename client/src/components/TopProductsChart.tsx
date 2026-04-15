import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { fetchProducts } from '../utils/api';
import { ErrorPanel } from './ErrorBoundary';

export function TopProductsChart() {
  const [data, setData] = useState<{ name: string; sales_count: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((res) => setData(res.rows))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={styles.loading}>Loading…</div>;
  if (error) return <ErrorPanel message={error} />;

  return (
    <div style={styles.wrapper}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
          <Tooltip formatter={(v) => [v, 'Sales']} />
          <Bar dataKey="sales_count" fill="#10b981" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { width: '100%', height: '100%', paddingTop: 8 },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, color: '#9ca3af' },
};
