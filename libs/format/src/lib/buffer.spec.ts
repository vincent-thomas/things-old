import { toBuffer, fromBuffer, formatTo } from './buffer';

describe('Buffer formatting', () => {
  it('Should format string with the utf-8 encoding to a buffer', () => {
    const TEST_TEXT = 'this is the formatting';
    const BUFFER_TO_TEST = toBuffer(TEST_TEXT, 'utf-8');
    const CONTROL_BUFFER = Buffer.from(TEST_TEXT, 'utf-8');

    expect(BUFFER_TO_TEST.equals(CONTROL_BUFFER)).toBe(true);
  });

  it('Should format buffer to a string with the utf-8 encoding', () => {
    const TEST_BUFFER = Buffer.from('this is the formatting', 'utf-8');
    const TEXT_TO_TEST = fromBuffer(TEST_BUFFER, 'utf-8');
    const CONTROL_TEXT = Buffer.from(TEST_BUFFER).toString('utf-8');

    expect(TEXT_TO_TEST).toBe(CONTROL_TEXT);
  });

  it('Should format buffer to a string with the utf-8 encoding', () => {
    const TEST_BUFFER = "TEST_STRING";
    const TEXT_TO_TEST = formatTo(TEST_BUFFER, 'utf-8', "hex");
    const thisShouldBeSame = Buffer.from(TEST_BUFFER, "utf-8").toString("hex");
    expect(TEXT_TO_TEST).toBe(thisShouldBeSame);

    const TEXT_TO_TEST_2 = formatTo(thisShouldBeSame, 'hex', "utf-8");
    expect(TEXT_TO_TEST_2).toBe(TEST_BUFFER);
  });
});
