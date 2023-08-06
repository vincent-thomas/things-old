/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/ui',
  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
    vanillaExtractPlugin(),
  ],
  publicDir: './public',
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/lib.ts',
      name: 'ui',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    cssMinify: true,
    minify: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-slot',
        '@radix-ui/react-avatar',
      ],
      treeshake: 'safest',
    },
  },

  test: {
    reporters: 'dot',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: 'html-spa',
      reportsDirectory: '../../coverage/libs/ui',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
