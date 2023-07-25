import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import { resolve } from 'path';
export default defineConfig({
  e2e: nxE2EPreset(resolve('.'), { cypressDir: 'cypress', bundler: 'vite' }),
});
