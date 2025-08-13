import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_PUBLIC_URL || process.env.LOCAL_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;
