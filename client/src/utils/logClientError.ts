export interface ClientErrorPayload {
  message: string;
  stack: string;
  componentStack?: string;
  type?: string;
}

export async function logClientError(payload: ClientErrorPayload): Promise<void> {
  try {
    await fetch('/api/log/client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Best-effort: never throw from the error logger itself
  }
}
