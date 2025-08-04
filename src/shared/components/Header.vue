<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">
        <h2>🚀 Vite MPA 演示</h2>
      </div>
      <ul class="nav-list">
        <li><a href="/">主页面</a></li>
        <li><a href="/home.html">首页</a></li>
        <li><a href="/contact.html">联系我们</a></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-list a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-list a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>