import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['app/**', 'lib/**', 'components/**'],
      exclude: [
        '**/*.d.ts',
        'app/favicon.ico',
        'app/globals.css',
        'app/layout.tsx',
        'components/ui/dropdown-menu.tsx',
        'components/ui/input-group.tsx',
        'lib/features/auth/model/types.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
