import { postDeleteItem } from "../db/queries";
import { Request, Response } from "express";

export async function deleteItem(req: Request, res: Response) {
  postDeleteItem(Number(req.params.id));
  res.redirect("/");
}
