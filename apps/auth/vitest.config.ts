import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: './**/*.test.ts',
    coverage: {
      reportsDirectory: '../../coverage/apps/auth',
      provider: 'c8',
    },
  },
});
