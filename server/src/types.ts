export interface RevenueRow {
  date: string;
  amount: number;
}

export interface ProductRow {
  name: string;
  sales_count: number;
}

export interface UserStatsRow {
  count: number;
}

export interface ClientErrorPayload {
  message: string;
  stack: string;
  componentStack?: string;
  type?: string;
}
