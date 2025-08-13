import { Request, Response } from "express";
import { getAllItems, getFilteredItems } from "../db/queries";
// import { getAllItems } from "../db/queries";

// type TItem = {
//   id: Number;
//   item_name: string;
//   price: Number;
//   durability: Number;
//   quantity: Number;
//   category_id: string;
// };

export async function getItems(req: Request, res: Response) {
  const items = await getAllItems();
  res.render("index", { title: "Items list", items: items });
}

export async function filterItems(req: Request, res: Response) {
  const items = await getFilteredItems(req.query);
  console.log("inside");
  res.send(items);
  // res.render("index", { title: "Items list", items: items });
}
