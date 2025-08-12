import { Request, Response } from "express";
import { postNewItem } from "../db/queries";

export async function addNewItemToDB(req: Request, res: Response) {
  await postNewItem(req.body);
  res.redirect("/");
}

export async function addItemForm(req: Request, res: Response) {
  res.render("addItemForm", { title: "Add New Item" });
}
