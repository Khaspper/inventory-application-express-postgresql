import { Router } from "express";
import { addNewItemToDB, addItemForm } from "../controllers/addItemController";

const addItemRouter = Router();

addItemRouter.get("/", addItemForm);
addItemRouter.post("/", addNewItemToDB);

export default addItemRouter;
