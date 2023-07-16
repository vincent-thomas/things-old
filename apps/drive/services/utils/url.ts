import { env } from '@drive/env.mjs';

export const getAppUrl = () => {
  return typeof window !== 'undefined'
    ? `${
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
          ? 'http:'
          : 'https:'
      }//${window.location.host}`
    : env.DRIVE_APP_URL;
};
