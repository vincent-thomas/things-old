/// <reference types="vitest" />
import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import viteTsConfigPaths from "vite-tsconfig-paths";
export default defineConfig({
  cacheDir: "../../node_modules/.vite/drive-new",

  server: {
    port: 4200,
    host: "localhost",
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())]
    }
  },

  preview: {
    port: 4200,
    host: "localhost"
  },

  plugins: [
    react(),
    vanillaExtractPlugin(),
    viteTsConfigPaths({
      root: "../../"
    })
  ],

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest"
    },
    environment: "jsdom",
    watch: true,
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  }
});
