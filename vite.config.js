import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 定义所有入口点
const entries = {
  main: {
    input: resolve(__dirname, 'index.html'),
    name: 'main'
  },
  home: {
    input: resolve(__dirname, 'home.html'),
    name: 'home'
  },
  contact: {
    input: resolve(__dirname, 'contact.html'),
    name: 'contact'
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 从环境变量获取要构建的入口点
  const buildEntry = process.env.VITE_BUILD_ENTRY
  
  let buildConfig = {}
  
  if (buildEntry && entries[buildEntry]) {
    // 单独构建指定入口点
    const entry = entries[buildEntry]
    buildConfig = {
      outDir: `dist/${entry.name}`,
      emptyOutDir: true,
      rollupOptions: {
        input: entry.input,
      }
    }
  } else {
    // 默认构建所有入口点到一个目录（开发模式）
    buildConfig = {
      rollupOptions: {
        input: Object.fromEntries(
          Object.entries(entries).map(([key, entry]) => [key, entry.input])
        ),
      },
    }
  }

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    build: buildConfig,
  }
})
