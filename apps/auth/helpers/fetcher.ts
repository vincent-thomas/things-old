import { env } from '@auth/env.mjs';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

export const baseFetch = (
  path: string,
  method: 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE',
  opts: Omit<RequestInit, 'method'>
) => {
  fetch(`${env.AUTH_APP_URL}/${path}`, {
    method,
    ...opts,
  });
};

export const fetcher = {
  get(path: string, opts: Omit<RequestInit, 'method'>) {
    baseFetch(path, 'GET', opts);
  },
  post(path: string, opts: Omit<RequestInit, 'method'>) {
    baseFetch(path, 'POST', opts);
  },
  delete(path: string, opts: Omit<RequestInit, 'method'>) {
    baseFetch(path, 'DELETE', opts);
  },
  put(path: string, opts: Omit<RequestInit, 'method'>) {
    baseFetch(path, 'PUT', opts);
  },
};
