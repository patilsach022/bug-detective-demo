import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/api';
import { ErrorPanel } from './ErrorBoundary';

export function ActiveUsersCard() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((res) => setCount(res.activeUsers))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={styles.loading}>Loading…</div>;
  if (error) return <ErrorPanel message={error} />;

  return (
    <div style={styles.wrapper}>
      <p style={styles.label}>Active Sessions</p>
      <p style={styles.number}>{count?.toLocaleString()}</p>
      <p style={styles.sub}>right now</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 6,
  },
  label: { fontSize: 13, color: '#6b7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 },
  number: { fontSize: 56, fontWeight: 700, color: '#111827', lineHeight: 1 },
  sub: { fontSize: 13, color: '#9ca3af' },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, color: '#9ca3af' },
};
