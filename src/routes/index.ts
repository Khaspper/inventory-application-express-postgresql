import { Router } from "express";
import { getItems } from "../controllers/indexController";

const indexRouter = Router();

indexRouter.get("/", getItems);

export default indexRouter;
