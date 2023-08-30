// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { toBuffer } from "@things/format";
import { createDecipheriv } from "crypto";
import { ALGORITHM, IV_PROTOCOL } from "./config";

export const decrypt = (text: string, key: Buffer) => {
  const [ivString, msg] = Buffer.from(text, "base64")
    .toString("utf-8")
    .split(":") as [string, string];
  const iv = toBuffer(ivString, IV_PROTOCOL);
  const decipher = createDecipheriv(ALGORITHM, key, iv);

  return decipher.update(msg, "hex", "utf8") + decipher.final("utf8");
};
