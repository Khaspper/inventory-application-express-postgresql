import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

//? Category
const category = "Ammunition";

//? Items
// const item_name = "Shotgun";
// const price = 59.99;
// const durability = 5;
// const quantity = 5;
// const category_id = 1;

async function main() {
  console.log("Seeding...");
  const connectionString = process.env.LOCAL_DATABASE_URL;
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(
    `CREATE TABLE IF NOT EXISTS categories (
	category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	category VARCHAR ( 255 )
);`
  );
  await client.query(
    `CREATE TABLE IF NOT EXISTS items (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	item_name VARCHAR ( 255 ) NOT NULL,
  	price REAL NOT NULL,
  	durability INTEGER NOT NULL,
  	quantity INTEGER NOT NULL,
  	category_id INTEGER NOT NULL,
  	FOREIGN KEY(category_id) REFERENCES categories(category_id)
);`
  );
  await client.query(
    `INSERT INTO categories (category)
    VALUES ($1);`,
    [category]
  );
  // await client.query(
  //   `INSERT INTO items (item_name, price, durability, quantity, category_id)
  //   VALUES ($1, $2, $3, $4, $5, $6);`,
  //   [item_name, price, durability, quantity, category_id]
  // );
  await client.end();
  console.log("done");
}
main();
