import { Router } from "express";
import { folder } from "./routes/folder";
import { file } from "./routes/file";

const driveRouter = Router();

driveRouter.use("/folder", folder);
driveRouter.use("/object", file);

export default driveRouter;
