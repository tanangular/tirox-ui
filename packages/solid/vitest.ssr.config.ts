import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@solidjs/web': fileURLToPath(
        new URL('./node_modules/@solidjs/web/dist/server.js', import.meta.url),
      ),
    },
  },
  test: { environment: 'node', include: ['tests/ssr.test.tsx'] },
});
