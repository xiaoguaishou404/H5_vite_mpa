<template>
  <div class="page-container">
    <Header />
    
    <main class="main-content">
      <div class="hero">
        <h1>🚀 Vite MPA 演示项目</h1>
        <p>这是主页面，展示 Vite 多页面应用(MPA)的功能</p>
      </div>
      
      <div class="content">
        <div class="card">
          <h3>📋 项目介绍</h3>
          <p>这个项目演示了如何使用 Vite 构建多页面应用(MPA)，每个页面都有独立的入口点和逻辑。</p>
          <ul>
            <li><strong>主页面</strong>: 当前页面 (index.html)</li>
            <li><strong>首页</strong>: 独立的首页入口 (home.html)</li>
            <li><strong>联系页面</strong>: 独立的联系页面 (contact.html)</li>
          </ul>
        </div>
        
        <div class="card">
          <h3>🎯 技术特点</h3>
          <ul>
            <li>✅ 多个独立HTML入口</li>
            <li>✅ 共享Vue组件和工具函数</li>
            <li>✅ Vite自动优化打包</li>
            <li>✅ 提取公共依赖(common chunks)</li>
            <li>✅ 支持代码分割</li>
            <li>✅ 独立的页面逻辑</li>
          </ul>
        </div>
        
        <div class="card">
          <h3>🔗 页面导航</h3>
          <p>访问不同的页面查看MPA效果:</p>
          <div class="nav-buttons">
            <a href="/home.html" class="btn btn-primary">首页</a>
            <a href="/contact.html" class="btn btn-secondary">联系我们</a>
          </div>
        </div>
        
        <div class="card">
          <h3>⚡ 开发说明</h3>
          <div class="code-block">
            <h4>开发服务器:</h4>
            <code>npm run dev</code>
            
            <h4>构建项目:</h4>
            <code>npm run build</code>
            
            <h4>预览构建结果:</h4>
            <code>npm run preview</code>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '@/shared/components/Header.vue'
import Footer from '@/shared/components/Footer.vue'
import { logPageView } from '@/shared/utils/common.js'

onMounted(() => {
  logPageView('主页面')
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

.hero {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e8ed;
}

.card h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.card ul {
  color: #555;
  line-height: 1.8;
  padding-left: 1.2rem;
}

.card li {
  margin-bottom: 0.5rem;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}

.btn:hover {
  background: #2980b9;
}

.btn-primary {
  background: #e74c3c;
}

.btn-primary:hover {
  background: #c0392b;
}

.btn-secondary {
  background: #27ae60;
}

.btn-secondary:hover {
  background: #229954;
}

.code-block {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid #3498db;
}

.code-block h4 {
  margin: 1rem 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.code-block h4:first-child {
  margin-top: 0;
}

.code-block code {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: block;
  font-family: 'Courier New', monospace;
  margin-bottom: 1rem;
}

.code-block code:last-child {
  margin-bottom: 0;
}
</style>
