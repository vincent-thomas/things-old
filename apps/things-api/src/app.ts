import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import driveRouter from "./modules/drive";
import authRouter from "./modules/auth";

const app: Express = express();

app.use(
  helmet(),
  cors(),
  cookieParser(),
  (_req, res, next) => {
    res.setHeader("X-Powered-By", "Things");
    next();
  },
  express.json()
);
app.get("/healthcheck", (req, res) => {
  res.status(200).send({ status: "up", code: 200 });
});

app.use("/drive", driveRouter);
app.use("/auth", authRouter);

export default app;
