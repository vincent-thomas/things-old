import driveRoute from "./modules/drive";
import authRoute from "./modules/auth";

import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import { EnvValidator } from "./env";
import app from "./app";

declare const module: any;

async function bootstrap() {
  const port = process.env.PORT || 3333;

  const server = app.listen(port, () => {
    console.info(`Api started at: http://localhost:${port}`);
  });

  server.on("error", console.error);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

new EnvValidator(process.env).validate();

bootstrap();
