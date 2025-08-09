import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { entries } from './config/entries.js'

// 独立构建配置：单个入口点构建到独立目录
// 通过环境变量 VITE_BUILD_ENTRY 指定要构建的入口点
export default defineConfig(() => {
  const buildEntry = process.env.VITE_BUILD_ENTRY

  if (!buildEntry || !entries[buildEntry]) {
    throw new Error(`请指定有效的入口点: ${Object.keys(entries).join(', ')}`)
  }

  const entry = entries[buildEntry]

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: `dist/${entry.name}`,
      emptyOutDir: true,
      rollupOptions: {
        input: entry.input,
      },
    },
  }
})
