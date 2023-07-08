import {randomBytes, pbkdf2Sync } from "crypto";



export const toBuffer = (msg: string, encoding: BufferEncoding): Buffer => Buffer.from(msg, encoding)
export const fromBuffer = (msg: Buffer, encoding: BufferEncoding): string => Buffer.from(msg).toString(encoding)



export const createKey = (password: string) => {
  const salt = randomBytes(16);
  return pbkdf2Sync(password, salt, 500_000,32, "sha512");
}