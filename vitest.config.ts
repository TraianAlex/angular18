import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: [['default'], ['json', { outputFile: 'unit_test_result.json' }]],
    watch: false,
    globals: true,
    setupFiles: ['./setup-vitest.ts'],
  },
});
