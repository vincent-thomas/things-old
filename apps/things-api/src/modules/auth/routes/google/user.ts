import { getUser } from "@core/data";
import { getToken } from "@core/hooks";
import axios from "axios";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const token = getToken(req, true);
  if (token === null) {
    res.json({ error: "No token" });
    return;
  }

  const user = await getUser(token.sub);

  res.json(user);
});

userRouter.get("/picture", async (req, res) => {
  const token = getToken(req, true);
  if (token === null) {
    res.json({ error: "No token" });
    return;
  }

  const user = await getUser(token.sub);

  if (user === null) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (user.picture === null) {
    return res.status(404).json({ error: "No Picture" });
  }

  const pic = await axios.get(user.picture, { responseType: "arraybuffer" });
  const imageBuffer = Buffer.from(pic.data, "binary");
  res.contentType("image/jpeg");
  res.end(imageBuffer);
});
export { userRouter };
