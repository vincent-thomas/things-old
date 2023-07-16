import { defineConfig } from 'astro/config';

import prefetch from '@astrojs/prefetch';
// https://astro.build/config
export default defineConfig({
  outDir: '../../dist/apps/info',
  integrations: [
    prefetch({
      intentSelector: 'a',
    }),
  ],
  srcDir: './src',
});
