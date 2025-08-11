import { Router } from "express";
import { Request, Response } from "express";

const indexRouter = Router();

indexRouter.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "index", message: "hello" });
});

export default indexRouter;
