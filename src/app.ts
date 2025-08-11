import express from "express";
import dotenv from "dotenv";
import indexRouter from "./routes";
import path from "node:path";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server up and running listening at http://localhost:${PORT}`);
});
