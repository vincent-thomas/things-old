import { fromBuffer, formatTo } from '@things/format';
import { createCipheriv, randomBytes } from 'crypto';
import { ALGORITHM, IV_LENGTH, IV_PROTOCOL } from '../config';

export const encrypt = (text: string, key: Buffer) => {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

  return formatTo(
    `${fromBuffer(iv, IV_PROTOCOL)}:${encrypted}`,
    'utf-8',
    'base64'
  );
};
