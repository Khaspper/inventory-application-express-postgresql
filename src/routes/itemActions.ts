import { Router } from "express";
import {
  deleteItem,
  editItem,
  updateItem,
} from "../controllers/itemActionsController";

const itemActionRouter = Router();

itemActionRouter.get("/:id", editItem);
itemActionRouter.post("/:id", deleteItem);
itemActionRouter.post("/update/:id", ...updateItem);

export default itemActionRouter;
