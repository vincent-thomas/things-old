export const toBuffer = (text: string, protocol: BufferEncoding) =>
  Buffer.from(text, protocol);

export const fromBuffer = (buffer: Buffer, protocol: BufferEncoding) =>
  Buffer.from(buffer).toString(protocol);
