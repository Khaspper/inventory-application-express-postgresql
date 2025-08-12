import pool from "./pool";

type TItem = {
  item_name: string;
  price: Number;
  durability: Number;
  quantity: Number;
  category_id: string;
};

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
    const category_id =
      item.category_id == "Weapon"
        ? 1
        : item.category_id == "Clothing"
        ? 2
        : item.category_id == "Food"
        ? 3
        : item.category_id == "Ammunition"
        ? 5
        : 4;
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
