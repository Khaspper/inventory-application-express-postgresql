import { Router } from "express";
import { getItems, filterItems } from "../controllers/indexController";

const indexRouter = Router();

indexRouter.get("/", getItems);
indexRouter.get("/filter", filterItems);

export default indexRouter;
