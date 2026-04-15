import express from 'express';
import cors from 'cors';
import { setupDatabase } from './db/setup.js';
import statsRouter from './routes/stats.js';
import logRouter from './routes/log.js';

const app = express();
const PORT = 7001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/stats', statsRouter);
app.use('/api/log', logRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

setupDatabase();

app.listen(PORT, () => {
  console.log(`[server] running on http://localhost:${PORT}`);
});
