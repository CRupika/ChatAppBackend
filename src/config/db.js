import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { parseDbUrl } from '../utils/parseDbUrl.js';

dotenv.config();

let config = {};

if (process.env.DATABASE_URL) {
  const parsed = parseDbUrl(process.env.DATABASE_URL);
  config = {
    user: 'postgres',
    password: 'postgres123',
    host: 'localhost',
    database: 'medusa-my-medusa-store',
    port: 5432
  };
} else {
  config = {
    user: 'postgres',
    password: 'postgres123',
    host: 'localhost',
    database: 'medusa-my-medusa-store',
    port: 5432
  };
}

const pool = new Pool({
  ...config,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
