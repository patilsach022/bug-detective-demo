// Uses Node.js built-in node:sqlite (available since Node 22.5+, no native addon needed)
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = resolve(__dirname, '../../../analytics.db');

const db = new DatabaseSync(DB_PATH);

export default db;
