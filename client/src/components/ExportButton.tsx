import React from 'react';

export function ExportButton() {
  return (
    <div style={styles.wrapper}>
      <button style={styles.button}>
        ↓ Export Report
      </button>
      <p style={styles.hint}>Click to download CSV</p>
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
    gap: 10,
  },
  button: {
    padding: '10px 28px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  hint: { fontSize: 12, color: '#9ca3af' },
};
