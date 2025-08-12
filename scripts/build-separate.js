#!/usr/bin/env node

import { execSync } from 'child_process'
import { rmSync, existsSync, renameSync } from 'fs'
import { basename } from 'path'
import { entries } from '../config/entries.js'

// 获取所有入口点名称
const entryNames = Object.keys(entries)

// 将构建产物目录中的入口 html 重命名为 index.html
function renameHtmlToIndex(outDir, originalHtmlName) {
  const fromPath = `${outDir}/${originalHtmlName}`
  const toPath = `${outDir}/index.html`

  if (existsSync(fromPath)) {
    try {
      renameSync(fromPath, toPath)
      console.log(`🔁 已重命名 ${originalHtmlName} -> index.html`)
    } catch (e) {
      console.warn(`⚠️ 重命名 HTML 失败: ${e.message}`)
    }
  } else {
    console.warn(`⚠️ 未找到待重命名的 HTML: ${fromPath}`)
  }

  return outDir
}

console.log('🚀 开始独立构建各个入口点...\n')

// 清理之前的构建结果
if (existsSync('dist')) {
  console.log('🧹 清理旧的构建文件...')
  rmSync('dist', { recursive: true, force: true })
}

// 构建每个入口点
for (const entry of entryNames) {
  console.log(`📦 正在构建入口点: ${entry}`)

  try {
    // 设置环境变量并执行构建
    const env = { ...process.env, VITE_BUILD_ENTRY: entry }

    execSync('vite build --config vite.config.separate.js', {
      stdio: 'inherit',
      env: env,
      cwd: process.cwd(),
    })

    // 构建完成后将 html 重命名为 index.html
    const entryConfig = entries[entry]
    const outDir = `dist/${entryConfig.name}`
    const originalHtmlName = basename(entryConfig.input) // 如 user-level.html
    renameHtmlToIndex(outDir, originalHtmlName)

    console.log(`✅ ${entry} 构建完成 -> ${outDir}/\n`)
  } catch (error) {
    console.error(`❌ ${entry} 构建失败:`, error.message)
    process.exit(1)
  }
}

console.log('🎉 所有入口点构建完成！')
console.log('\n📁 构建结果:')
entryNames.forEach((entry) => {
  console.log(`   dist/${entry}/ - ${entry} 页面独立包`)
})

console.log('\n💡 使用说明:')
console.log('   - 每个目录都包含完整的页面资源')
console.log('   - 可以独立部署到不同的服务器')
console.log('   - 共享的依赖会在各自目录中优化打包')
