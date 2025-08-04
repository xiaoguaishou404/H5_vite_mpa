<template>
  <div class="page-container">
    <Header />
    
    <main class="main-content">
      <div class="hero">
        <h1>🏠 欢迎来到首页</h1>
        <p>这是一个使用 Vite MPA 模式构建的首页演示</p>
      </div>
      
      <div class="content">
        <div class="card">
          <h3>📦 MPA 模式特点</h3>
          <ul>
            <li>多个独立的 HTML 入口点</li>
            <li>每个页面有独立的 JS/CSS 逻辑</li>
            <li>共享公共依赖，Vite 自动优化打包</li>
            <li>更好的 SEO 和首屏加载性能</li>
          </ul>
        </div>
        
        <div class="card">
          <h3>⏰ 当前时间</h3>
          <p>{{ currentTime }}</p>
          <button @click="updateTime" class="btn">刷新时间</button>
        </div>
        
        <div class="card">
          <h3>🔗 页面导航</h3>
          <div class="nav-buttons">
            <a href="/contact.html" class="btn btn-primary">访问联系页面</a>
            <a href="/" class="btn btn-secondary">回到主页面</a>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/shared/components/Header.vue'
import Footer from '@/shared/components/Footer.vue'
import { formatDate, logPageView } from '@/shared/utils/common.js'

const currentTime = ref('')

function updateTime() {
  currentTime.value = formatDate(new Date())
}

onMounted(() => {
  updateTime()
  logPageView('首页')
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.hero p {
  font-size: 1.2rem;
  color: #7f8c8d;
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
  line-height: 1.6;
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
  margin-right: 1rem;
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
  background: #95a5a6;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>