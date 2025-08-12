import { Router } from "express";
import { deleteItem, editItem } from "../controllers/itemActionsController";

const itemActionRouter = Router();

itemActionRouter.get("/:id", editItem);
itemActionRouter.post("/:id", deleteItem);

export default itemActionRouter;
