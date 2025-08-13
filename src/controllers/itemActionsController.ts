import { Request, Response } from "express";
import { postDeleteItem, getItem, postUpdateItem } from "../db/queries";
import { validateItem } from "./addItemController";
import { validationResult } from "express-validator";

export async function deleteItem(req: Request, res: Response) {
  await postDeleteItem(Number(req.params.id));
  res.redirect("/");
}

export async function editItem(req: Request, res: Response) {
  const item = await getItem(Number(req.params.id));
  res.render("editItem", { item: item[0] });
}

export const updateItem = [
  validateItem,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const item = await getItem(Number(req.params.id));
      return res.status(400).render("editItem", {
        item: item[0],
        errors: errors.array(),
      });
    }
    req.body.id = req.params.id;
    await postUpdateItem(req.body);
    res.redirect("/");
  },
];
