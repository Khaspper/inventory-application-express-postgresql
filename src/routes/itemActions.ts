import { Router } from "express";
import { postDeleteItem } from "../db/queries";

const itemActionRouter = Router();

itemActionRouter.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.send(req.params.id);
});
itemActionRouter.post("/:id", postDeleteItem);

export default itemActionRouter;
