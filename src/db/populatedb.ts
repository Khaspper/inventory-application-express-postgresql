import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("Seeding...");

  const connectionString =
    process.env.DATABASE_PUBLIC_URL || process.env.LOCAL_DATABASE_URL;
  if (!connectionString) throw new Error("No DB connection string set.");

  console.log("DB:", connectionString.replace(/\/\/.*@/, "//***:***@"));

  const client = new Client({
    connectionString,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
  });

  await client.connect();

  try {
    await client.query("BEGIN");

    // ensure we're in public schema
    await client.query(`SET search_path TO public`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.categories (
        category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        category     VARCHAR(255) UNIQUE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.items (
        id          INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        item_name   VARCHAR(255) NOT NULL,
        price       NUMERIC(10,2) NOT NULL,
        durability  INTEGER NOT NULL,
        quantity    INTEGER NOT NULL,
        category_id INTEGER NOT NULL REFERENCES public.categories(category_id)
      );
    `);

    // Upsert category
    const category = "Ammunition";
    await client.query(
      `INSERT INTO public.categories (category)
       VALUES ($1)
       ON CONFLICT (category) DO NOTHING;`,
      [category]
    );

    // Get category_id
    const { rows: catRows } = await client.query(
      `SELECT category_id FROM public.categories WHERE category = $1`,
      [category]
    );
    const categoryId = catRows[0].category_id as number;

    // Insert item (example); avoid duplicates by name + category
    await client.query(
      `INSERT INTO public.items (item_name, price, durability, quantity, category_id)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT DO NOTHING;`, // optional: add a unique constraint if you want real idempotency
      ["Shotgun", 59.99, 5, 5, categoryId]
    );

    await client.query("COMMIT");
    console.log("done");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", err);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
