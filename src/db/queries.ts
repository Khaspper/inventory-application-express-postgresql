import pool from "./pool";

type TItem = {
  id?: Number;
  item_name: string;
  price: Number;
  durability: Number;
  quantity: Number;
  category_id: string;
};

function getCategory(category_id: string) {
  return category_id == "Weapon"
    ? 1
    : category_id == "Clothing"
    ? 2
    : category_id == "Food"
    ? 3
    : category_id == "Ammunition"
    ? 5
    : 4;
}

export async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

export async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

export async function postNewItem(item: TItem) {
  try {
    const item_name = item.item_name;
    const price = item.price;
    const durability = item.durability;
    const quantity = item.quantity;
    const category_id = getCategory(item.category_id);
    await pool.query(
      "INSERT INTO items (item_name, price, durability, quantity, category_id) VALUES ($1, $2, $3, $4, $5)",
      [item_name, price, durability, quantity, category_id]
    );
  } catch (error) {
    console.log("Got an error");
    console.error(error);
  }
}

export async function postDeleteItem(id: Number) {
  await pool.query("DELETE FROM items WHERE id = ($1)", [id]);
}

export async function getItem(id: Number) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = ($1)", [
    id,
  ]);
  return rows;
}

export async function postUpdateItem(item: TItem) {
  const id = Number(item.id);
  const item_name = item.item_name;
  const price = item.price;
  const durability = item.durability;
  const quantity = item.quantity;
  const category_id = getCategory(item.category_id);
  await pool.query(
    "UPDATE items SET item_name = ($2), price = ($3), durability = ($4), quantity = ($5), category_id = ($6) WHERE id = ($1)",
    [id, item_name, price, durability, quantity, category_id]
  );
  return;
}
