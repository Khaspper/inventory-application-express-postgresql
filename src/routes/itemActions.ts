import { Router } from "express";
import { deleteItem } from "../controllers/itemActionsController";

const itemActionRouter = Router();

itemActionRouter.post("/:id", deleteItem);

export default itemActionRouter;
