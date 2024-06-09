import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as index } from "./routes/index.js";
import { router as roommates } from "./routes/roommates.js";
import { router as gastos } from "./routes/gastos.js";

const app = express();

/* Middlewares */
app.use(express.json());
app.use(morgan("dev"));
//app.use(cors());
app.use(cors());

/* Rutas */
app.use("/", index);
app.use("/roommates", roommates);
app.use("/gastos", gastos);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
