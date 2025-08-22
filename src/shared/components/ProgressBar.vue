<template>
  <div class="progress-bar" :class="customClass">
    <div class="progress-fill" :style="progressStyle"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  // 进度值 (0-100)
  value: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
  // 外部自定义样式类
  customClass: {
    type: String,
    default: '',
  },

  // 是否启用初始加载动画
  enableLoadAnimation: {
    type: Boolean,
    default: true,
  },
  // 是否启用持续渐变动画
  enableGradientAnimation: {
    type: Boolean,
    default: true,
  },
})

const currentProgress = ref(0)
const isLoaded = ref(false)

// 计算进度条样式
const progressStyle = computed(() => {
  return {
    width: `${currentProgress.value}%`,
  }
})

// 初始加载动画
const animateProgress = () => {
  if (!props.enableLoadAnimation) {
    currentProgress.value = props.value
    isLoaded.value = true
    return
  }

  const duration = 1000 // 1秒动画
  const startTime = Date.now()
  const startValue = 0
  const endValue = props.value

  const animate = () => {
    // 如果已经被外部更新了，停止动画
    if (isLoaded.value) {
      return
    }

    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用缓动函数
    const easeOutQuad = 1 - (1 - progress) * (1 - progress)
    currentProgress.value = startValue + (endValue - startValue) * easeOutQuad

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      isLoaded.value = true
    }
  }

  requestAnimationFrame(animate)
}

// 监听 value 变化
watch(
  () => props.value,
  (newValue) => {

    if (isLoaded.value) {
      currentProgress.value = newValue
    } else {
      currentProgress.value = newValue
      isLoaded.value = true
    }
  },
  { immediate: true },
)

onMounted(() => {
  animateProgress()
})
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 8px;
  border-radius: var(--border-radius);
  box-shadow: 0 0.1lh 0.2lh rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  /* 默认渐变色，可通过外部CSS覆盖 */
  background: linear-gradient(90deg, #ffd700 0%, #ff8c00 100%);
}

/* 持续渐变动画 */
.progress-fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* 禁用持续动画的样式 */
.progress-bar.no-gradient-animation .progress-fill::before {
  display: none;
}
</style>
