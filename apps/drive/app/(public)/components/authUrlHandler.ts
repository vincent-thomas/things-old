'use server';

import { env } from '@drive/env.mjs';

export const getAuthUrl = async () => {
  return env.AUTH_URL;
};
