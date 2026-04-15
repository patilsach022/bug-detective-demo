import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RevenueChart } from './components/RevenueChart';
import { TopProductsChart } from './components/TopProductsChart';
import { ActiveUsersCard } from './components/ActiveUsersCard';
import { ExportButton } from './components/ExportButton';

const widgets: { label: string; component: React.ReactNode }[] = [
  { label: 'Revenue Over Time', component: <RevenueChart /> },
  { label: 'Top Products', component: <TopProductsChart /> },
  { label: 'Active Users', component: <ActiveUsersCard /> },
  { label: 'Export Report', component: <ExportButton /> },
];

export default function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Analytics Dashboard</h1>
        <span style={styles.badge}>Demo — bug-detective showcase</span>
      </header>
      <main style={styles.grid}>
        {widgets.map(({ label, component }) => (
          <div key={label} style={styles.card}>
            <p style={styles.cardLabel}>{label}</p>
            <div style={styles.cardBody}>
              <ErrorBoundary label={label}>
                {component}
              </ErrorBoundary>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f0f2f5', padding: '24px 32px' },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 28,
  },
  title: { fontSize: 22, fontWeight: 700, color: '#111827' },
  badge: {
    fontSize: 11,
    fontWeight: 600,
    background: '#e0e7ff',
    color: '#4338ca',
    padding: '3px 10px',
    borderRadius: 20,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 20,
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: '20px 24px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardBody: { minHeight: 200 },
};
