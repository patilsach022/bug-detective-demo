import React, { useEffect, useState } from 'react';

// BUG 2 (UI): `data` is never populated (undefined). Two seconds after mount,
// this component tries to call .map() on undefined, which throws a TypeError.
// The setCrashError pattern triggers a render-phase throw so the parent
// ErrorBoundary catches it and calls logClientError().
export function ExportButton() {
  const [crashError, setCrashError] = useState<Error | null>(null);

  // Throw during render so ErrorBoundary catches it
  if (crashError) throw crashError;

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Intentional crash: undefined has no .map method
        (undefined as unknown as unknown[]).map(() => '');
      } catch (e) {
        setCrashError(e as Error);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
