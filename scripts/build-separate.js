#!/usr/bin/env node

import { execSync } from 'child_process'
import { rmSync, existsSync } from 'fs'
import { resolve } from 'path'

// 定义所有入口点（与vite.config.js保持一致）
const entries = ['main', 'home', 'contact']

console.log('🚀 开始独立构建各个入口点...\n')

// 清理之前的构建结果
if (existsSync('dist')) {
  console.log('🧹 清理旧的构建文件...')
  rmSync('dist', { recursive: true, force: true })
}

// 构建每个入口点
for (const entry of entries) {
  console.log(`📦 正在构建入口点: ${entry}`)
  
  try {
    // 设置环境变量并执行构建
    const env = { ...process.env, VITE_BUILD_ENTRY: entry }
    
    execSync('vite build', {
      stdio: 'inherit',
      env: env,
      cwd: process.cwd()
    })
    
    console.log(`✅ ${entry} 构建完成 -> dist/${entry}/\n`)
  } catch (error) {
    console.error(`❌ ${entry} 构建失败:`, error.message)
    process.exit(1)
  }
}

console.log('🎉 所有入口点构建完成！')
console.log('\n📁 构建结果:')
entries.forEach(entry => {
  console.log(`   dist/${entry}/ - ${entry} 页面独立包`)
})

console.log('\n💡 使用说明:')
console.log('   - 每个目录都包含完整的页面资源')
console.log('   - 可以独立部署到不同的服务器')
console.log('   - 共享的依赖会在各自目录中优化打包')