import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        button: 'src/button.tsx',
        input: 'src/input.tsx',
        checkbox: 'src/checkbox.tsx',
        select: 'src/select.tsx',
        dialog: 'src/dialog.tsx',
        tooltip: 'src/tooltip.tsx',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js', '@solidjs/web', '@tirox-ui/preset'],
    },
  },
});
