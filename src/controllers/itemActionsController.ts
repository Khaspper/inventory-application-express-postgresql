import { postDeleteItem, getItem } from "../db/queries";
import { Request, Response } from "express";

export async function deleteItem(req: Request, res: Response) {
  postDeleteItem(Number(req.params.id));
  res.redirect("/");
}

export async function editItem(req: Request, res: Response) {
  const item = await getItem(Number(req.params.id));
  res.render("editItem", { item: item[0] });
}
