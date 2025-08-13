import { Request, Response } from "express";
import { postDeleteItem, getItem, postUpdateItem } from "../db/queries";

export async function deleteItem(req: Request, res: Response) {
  await postDeleteItem(Number(req.params.id));
  res.redirect("/");
}

export async function editItem(req: Request, res: Response) {
  const item = await getItem(Number(req.params.id));
  res.render("editItem", { item: item[0] });
}

export async function updateItem(req: Request, res: Response) {
  req.body.id = req.params.id;
  await postUpdateItem(req.body);
  res.redirect("/");
}
