import { resolve } from 'path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '..')

// 统一配置所有入口点
export const entries = {
  'logout-account': {
    input: resolve(rootDir, 'logout-account.html'),
    name: 'logout-account',
  },
  'user-level': {
    input: resolve(rootDir, 'user-level.html'),
    name: 'user-level',
  },
}
