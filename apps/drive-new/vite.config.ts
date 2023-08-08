/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { ViteWebEss } from '../../libs/build-config';
export default defineConfig({
  cacheDir: '../../node_modules/.vite/drive-new',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: ViteWebEss("../.."),

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    watch: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
