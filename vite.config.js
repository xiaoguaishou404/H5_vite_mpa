import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { entries } from './config/entries.js'

// 统一构建配置：所有入口点构建到同一个 dist/ 目录
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(Object.entries(entries).map(([key, entry]) => [key, entry.input])),
    },
  },
})
