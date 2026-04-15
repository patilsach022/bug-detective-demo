# Analytics Dashboard

A full-stack analytics dashboard built with React, TypeScript, Express, and SQLite.

## Prerequisites

- Node.js 22.5 or later
- npm 10 or later

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

This starts both the API server and the frontend in parallel:

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:7001 |

The database is created and seeded automatically on first run.

## Project Structure

```
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/   # Dashboard widgets
│       └── utils/        # API helpers
├── server/          # Express API server
│   └── src/
│       ├── db/           # SQLite setup and seeding
│       ├── routes/       # API route handlers
│       └── helpers/      # Utility functions
├── e2e/             # Playwright end-to-end tests
└── output_logs.txt  # Application log output (NDJSON)
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both server and client in development mode |
| `npm run build` | Build both workspaces for production |
| `npm test` | Run unit tests in both workspaces |
| `npm run e2e` | Run Playwright end-to-end tests |

## Tech Stack

**Frontend**
- React 18
- TypeScript
- Vite
- Recharts

**Backend**
- Node.js (Express)
- TypeScript
- `node:sqlite` (built-in, no native addon required)
- Winston for structured logging

**Testing**
- Vitest (unit)
- Playwright (E2E)

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/stats/revenue` | Daily revenue data |
| `GET` | `/api/stats/products` | Top products by sales |
| `GET` | `/api/stats/users` | Active user session count |
| `POST` | `/api/log/client` | Ingest client-side error logs |
| `GET` | `/health` | Server health check |

## Logging

All server errors are written to `output_logs.txt` in the repo root as NDJSON (one JSON object per line). Client-side errors are POSTed to `/api/log/client` and appended to the same file.

Each log entry includes:

```json
{
  "timestamp": "2026-04-15T10:00:00.000Z",
  "level": "error",
  "message": "...",
  "service": "api | database | client",
  "stack": "..."
}
```

## Database

SQLite is used via Node's built-in `node:sqlite` module (available from Node 22.5). The database file `analytics.db` is created at the repo root on first server start and is excluded from version control.

The seed script populates:
- 30 days of daily revenue data
- 5 products with sales counts
- 50 user sessions

To reset the database, delete `analytics.db` and restart the server.
