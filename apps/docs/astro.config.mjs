import { defineConfig } from 'astro/config';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
  vite: { plugins: [solid()], ssr: { noExternal: ['cookie'] } },
});
