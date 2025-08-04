<template>
  <div class="page-container">
    <Header />
    
    <main class="main-content">
      <div class="hero">
        <h1>📞 联系我们</h1>
        <p>这是联系页面，演示独立页面的功能</p>
      </div>
      
      <div class="content">
        <div class="contact-form-card">
          <h3>💬 发送消息</h3>
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name">姓名:</label>
              <input 
                id="name"
                v-model="form.name" 
                type="text" 
                required 
                class="form-input"
                placeholder="请输入您的姓名"
              >
            </div>
            
            <div class="form-group">
              <label for="email">邮箱:</label>
              <input 
                id="email"
                v-model="form.email" 
                type="email" 
                required 
                class="form-input"
                placeholder="请输入您的邮箱"
              >
            </div>
            
            <div class="form-group">
              <label for="message">消息:</label>
              <textarea 
                id="message"
                v-model="form.message" 
                rows="4" 
                required 
                class="form-input"
                placeholder="请输入您的消息"
              ></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? '发送中...' : '发送消息' }}
            </button>
          </form>
        </div>
        
        <div class="contact-info-card">
          <h3>📍 联系信息</h3>
          <div class="contact-item">
            <strong>📧 邮箱:</strong>
            <span>demo@example.com</span>
          </div>
          <div class="contact-item">
            <strong>📱 电话:</strong>
            <span>+86 138-0000-0000</span>
          </div>
          <div class="contact-item">
            <strong>🏢 地址:</strong>
            <span>北京市朝阳区某某大厦</span>
          </div>
          <div class="contact-item">
            <strong>🕐 工作时间:</strong>
            <span>周一至周五 9:00-18:00</span>
          </div>
          
          <div class="stats">
            <h4>📊 页面统计</h4>
            <p>页面ID: {{ pageId }}</p>
            <p>访问时间: {{ visitTime }}</p>
          </div>
          
          <div class="nav-section">
            <h4>🔗 快速导航</h4>
            <a href="/" class="btn btn-secondary">主页面</a>
            <a href="/home.html" class="btn btn-secondary">首页</a>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Header from '@/shared/components/Header.vue'
import Footer from '@/shared/components/Footer.vue'
import { formatDate, generateRandomId, logPageView, debounce } from '@/shared/utils/common.js'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const pageId = ref('')
const visitTime = ref('')

// 防抖提交函数
const debouncedSubmit = debounce(async () => {
  isSubmitting.value = true
  
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  alert('✅ 消息发送成功！这只是一个演示。')
  
  // 重置表单
  Object.assign(form, { name: '', email: '', message: '' })
  isSubmitting.value = false
}, 300)

function submitForm() {
  debouncedSubmit()
}

onMounted(() => {
  pageId.value = generateRandomId()
  visitTime.value = formatDate(new Date())
  logPageView('联系页面')
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
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
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
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
}

.contact-form-card,
.contact-info-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e8ed;
  height: fit-content;
}

.contact-form-card h3,
.contact-info-card h3 {
  margin: 0 0 1.5rem 0;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.contact-item:last-child {
  border-bottom: none;
}

.stats,
.nav-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f0f0f0;
}

.stats h4,
.nav-section h4 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.stats p {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
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
  margin-bottom: 0.5rem;
}

.btn:hover:not(:disabled) {
  background: #2980b9;
}

.btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.btn-primary {
  background: #e74c3c;
  width: 100%;
}

.btn-primary:hover:not(:disabled) {
  background: #c0392b;
}

.btn-secondary {
  background: #95a5a6;
}

.btn-secondary:hover {
  background: #7f8c8d;
}
</style>