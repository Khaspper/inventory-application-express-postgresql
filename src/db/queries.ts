import pool from "./pool";

export async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}
