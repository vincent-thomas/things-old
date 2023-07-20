import { Encoding } from 'crypto';

export const fromBuffer = (buffer: Buffer, encoding: Encoding) =>
  Buffer.from(buffer).toString(encoding);

export const toBuffer = (text: string, encoding: Encoding) =>
  Buffer.from(text, encoding);
