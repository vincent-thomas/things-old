import { Router } from "express";
import { authorizeV1 } from "./routes/google/authorize";
import { googleAuthCallback } from "./routes/google/callback";
import { userRouter } from "./routes/google/user";

export default Router()
  .use("/google/authorize", authorizeV1)
  .use("/google/callback", googleAuthCallback)
  .use("/user", userRouter);
