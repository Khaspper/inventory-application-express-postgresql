import pool from "./pool";

type TItem = {
  id?: Number;
  item_name: string;
  price: Number;
  durability: Number;
  quantity: Number;
  category: string;
};

type TFilter = {
  item_name?: string;
  category?: string;
  sort_by?: string;
  order?: string;
};

function getCategory(category: string) {
  return category == "weapon"
    ? 1
    : category == "clothing"
    ? 2
    : category == "food"
    ? 3
    : category == "ammunition"
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
    const category_id = getCategory(item.category);
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
  const category_id = getCategory(item.category);
  await pool.query(
    "UPDATE items SET item_name = ($2), price = ($3), durability = ($4), quantity = ($5), category_id = ($6) WHERE id = ($1)",
    [id, item_name, price, durability, quantity, category_id]
  );
  return;
}

export async function getFilteredItems(filter: TFilter) {
  const itemName =
    typeof filter.item_name === "string" ? filter.item_name : "none";
  const category =
    typeof filter.category === "string" ? filter.category : "all";
  const sortBy = typeof filter.sort_by === "string" ? filter.sort_by : "none";
  const order = typeof filter.order === "string" ? filter.order : "none";

  let SQL = `SELECT * FROM items WHERE 1 = 1`;
  const params = [];
  let count = 1;

  if (itemName !== "none" && itemName !== "") {
    SQL += ` AND item_name = ($${count})`;
    params.push(itemName);
    count += 1;
  }

  if (category !== "all") {
    const categoryId = getCategory(category);
    SQL += ` AND category_id = ($${count})`;
    params.push(categoryId);
    count += 1;
  }

  if (sortBy !== "none") {
    SQL += ` ORDER BY ${sortBy}`;
    if (order === "ascending") {
      SQL += ` ASC`;
    } else {
      SQL += " DESC";
    }
  } else if (order !== "none") {
    if (order === "ascending") {
      SQL += ` ORDER BY id ASC`;
    } else if (order === "descending") {
      SQL += " ORDER BY id DESC";
    }
  }

  const { rows } = await pool.query(SQL, params);
  return rows;
}
