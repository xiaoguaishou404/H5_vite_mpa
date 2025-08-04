#!/usr/bin/env node

import { execSync } from 'child_process'

// 获取命令行参数
const entry = process.argv[2]

if (!entry) {
  console.log('❌ 请指定要构建的入口点')
  console.log('\n用法: npm run build:single <entry>')
  console.log('可用的入口点: main, home, contact')
  console.log('\n示例:')
  console.log('  npm run build:single main')
  console.log('  npm run build:single home')
  console.log('  npm run build:single contact')
  process.exit(1)
}

const validEntries = ['main', 'home', 'contact']
if (!validEntries.includes(entry)) {
  console.log(`❌ 无效的入口点: ${entry}`)
  console.log(`可用的入口点: ${validEntries.join(', ')}`)
  process.exit(1)
}

console.log(`🚀 开始构建入口点: ${entry}`)

try {
  // 设置环境变量并执行构建
  const env = { ...process.env, VITE_BUILD_ENTRY: entry }
  
  execSync('vite build', {
    stdio: 'inherit',
    env: env,
    cwd: process.cwd()
  })
  
  console.log(`✅ ${entry} 构建完成！`)
  console.log(`📁 构建结果: dist/${entry}/`)
} catch (error) {
  console.error(`❌ ${entry} 构建失败:`, error.message)
  process.exit(1)
}