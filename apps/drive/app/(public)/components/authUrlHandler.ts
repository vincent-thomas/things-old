'use server';

import { env } from '@drive/env.mjs';

export const getAuthUrl = async () => {
  return env.DRIVE_AUTH_URL;
};
