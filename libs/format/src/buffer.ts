import { Encoding } from "crypto";

const DEFAULT_ENCODING: Encoding = "base64url";

export const fromBuffer = (
  buffer: Buffer,
  encoding: Encoding = DEFAULT_ENCODING
) => Buffer.from(buffer).toString(encoding);

export const toBuffer = (text: string, encoding: Encoding = DEFAULT_ENCODING) =>
  Buffer.from(text, encoding);

export const formatTo = (
  text: string,
  encodingFrom: Encoding,
  encodingTo: Encoding
) => Buffer.from(text, encodingFrom).toString(encodingTo);
