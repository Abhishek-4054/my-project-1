import 'dotenv/config'; // auto-loads .env

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './shared/schema';

// Optional validation
['PG_HOST', 'PG_PORT', 'PG_USER', 'PG_PASSWORD', 'PG_DB'].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
});

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: String(process.env.PG_PASSWORD),
  database: process.env.PG_DB,
});

export const db = drizzle(pool, { schema });
