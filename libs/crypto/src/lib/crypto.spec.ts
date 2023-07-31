import { randomBytes } from 'crypto';
import { decrypt } from './decrypt';
import { encrypt } from './encrypt';

describe('Encryption', () => {
  it('Should format string with the utf-8 encoding to a buffer', () => {
    const TEXT = 'this is the formatting';
    const KEY = randomBytes(32);
    const encrypted = encrypt(TEXT, KEY);
    const TEST_DECRYPTED = decrypt(encrypted, KEY);

    expect(TEXT).toEqual(TEST_DECRYPTED);
  });
});
