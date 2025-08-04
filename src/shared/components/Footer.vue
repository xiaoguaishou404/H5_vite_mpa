<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} Vite MPA 演示项目. 这是一个共享组件演示.</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem 0;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>