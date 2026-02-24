// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        compiler: 'astro',
      }),
    ]
  }
});