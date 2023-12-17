import { defineConfig } from 'tsup';

export default defineConfig({
  loader: {
    '.html': 'file',
    '.png': 'file',
  },
  shims: true,
  external: ['*.png', '*.html'],
});
