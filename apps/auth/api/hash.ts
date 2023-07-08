import { argon2id, hash, verify } from 'argon2';
import { createHash as cHash } from 'crypto';
export const createKeyHash = (text: string) =>
  hash(text, {
    type: argon2id,
  });

export const verifyHash = (hash: string, text: string) => {
  return verify(hash, text);
};

export const createHash = (text: string) => {
  return cHash('sha256').update(text).digest('hex');
};
