import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { fromBuffer, toBuffer } from "../(oauth-server)/oauth/utils/serialize";

const IV_LENGTH = 16;
const ALGORITHM = "aes-256-cbc";
const IV_PROTOCOL = "hex";

export const encrypt = (text: string, key: Buffer) => {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return `${fromBuffer(iv, IV_PROTOCOL)}:${encrypted}`;
};

export const decrypt = (text: string, key: Buffer) => {
  const [ivString, msg] = text.split(":") as [string, string];
  const iv = toBuffer(ivString, IV_PROTOCOL);
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  return decipher.update(msg, "hex", "utf8") + decipher.final("utf8");
};

// decrypt(encrypt("hello world"))
