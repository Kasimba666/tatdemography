import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dsv from '@rollup/plugin-dsv'
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
      vue(),
      dsv(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
     // https: true,
     port: 6060
  },
})
