import { Router } from "express";
import {
  getItems,
  filterItems,
  secretButton,
  welcomeToTheSecret,
} from "../controllers/indexController";

const indexRouter = Router();

indexRouter.get("/", getItems);
indexRouter.get("/entrance", secretButton);
indexRouter.post("/secret", ...welcomeToTheSecret);
indexRouter.get("/filter", ...filterItems);

export default indexRouter;
