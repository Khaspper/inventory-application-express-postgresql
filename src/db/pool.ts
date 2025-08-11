import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.LOCAL_DATABASE_URL,
});

export default pool;
