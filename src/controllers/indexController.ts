import { Request, Response } from "express";
import { getAllItems } from "../db/queries";

export async function getItems(req: Request, res: Response) {
  const items = await getAllItems();
  res.render("index", { title: "Items list", items: items });
}
