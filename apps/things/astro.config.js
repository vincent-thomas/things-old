import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  outDir: '../../dist/apps/things',
  build: {
    format: 'file',
  },
  integrations: [
    prefetch({
      intentSelector: 'a',
    }),
    react(),
    tailwind(),
  ],
  vite: {
    cacheDir: '../../.local/vite-cache/things',
  },
  srcDir: './src',
});