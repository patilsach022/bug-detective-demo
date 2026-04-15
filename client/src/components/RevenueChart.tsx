import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { fetchRevenue } from '../utils/api';
import { ErrorPanel } from './ErrorBoundary';

export function RevenueChart() {
  const [data, setData] = useState<{ date: string; amount: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenue()
      .then((res) => setData(res.rows))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={styles.loading}>Loading…</div>;
  if (error) return <ErrorPanel message={error} />;

  return (
    <div style={styles.wrapper}>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} />
          <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { width: '100%', height: '100%', paddingTop: 8 },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, color: '#9ca3af' },
};
