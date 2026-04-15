import React from 'react';
import { logClientError } from '../utils/logClientError';

interface Props {
  label: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    logClientError({
      message: error.message,
      stack: error.stack ?? '',
      componentStack: info.componentStack ?? '',
      type: 'UI',
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPanel message={this.state.message} />;
    }
    return this.props.children;
  }
}

export function ErrorPanel({ message }: { message: string }) {
  return (
    <div style={styles.panel}>
      <span style={styles.icon}>⚠</span>
      <p style={styles.title}>Widget failed to load</p>
      <pre style={styles.message}>{message}</pre>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: '100%',
    minHeight: 160,
    background: '#fff5f5',
    border: '1.5px solid #fca5a5',
    borderRadius: 10,
    padding: 24,
    color: '#b91c1c',
  },
  icon: { fontSize: 28 },
  title: { fontWeight: 600, fontSize: 15 },
  message: {
    fontSize: 11,
    fontFamily: 'monospace',
    background: '#fee2e2',
    padding: '6px 10px',
    borderRadius: 6,
    maxWidth: '100%',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    color: '#7f1d1d',
  },
};
