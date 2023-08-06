import { Error, ErrorCause } from './type';

test('error', () => {
  const result = new Error(ErrorCause.NOT_AUTHORIZED, 'testing');
  expect(result).toBe('1');
});
