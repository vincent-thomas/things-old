import { authSdk } from './user';

describe('authSdk', () => {
  it('should work', () => {
    expect(authSdk()).toEqual('auth-sdk');
  });
});
