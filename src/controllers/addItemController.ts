import { Request, Response } from "express";
import { postNewItem, getAllItems } from "../db/queries";

export async function addNewItemToDB(req: Request, res: Response) {
  await postNewItem(req.body);
  const items = await getAllItems();
  res.render("index", { title: "Items list", items: items });
}

export async function addItemForm(req: Request, res: Response) {
  res.json({ title: "Form for the user to add a new item" });
}
