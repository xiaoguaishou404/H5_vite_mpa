<template>
  <Teleport v-if="headerContainerSelector" :to="headerContainerSelector">
    <Header class="header-user-level" :class="{ 'has-shadow': showHeaderShadow }">
      <template #header-left>
        <img @click="handleBack" src="@/assets/left-arrow-white.png" alt="返回" />
      </template>
      <template #header-center>
        <div class="header-title">
          <div
            class="wealthLevel-text"
            :class="{ active: currentPage === 'wealthLevel' }"
            @click="changePage('wealthLevel')"
          >
            财富等级
          </div>
          <div
            class="charmLevel-text"
            :class="{ active: currentPage === 'charmLevel' }"
            @click="changePage('charmLevel')"
          >
            魅力等级
          </div>
        </div>
      </template>
    </Header>
  </Teleport>
  <wealthLevel
    @editHeaderContainerSelector="editHeaderContainerSelector"
    @showHeaderShadow="showHeaderShadow = $event"
    v-if="currentPage === 'wealthLevel'"
  ></wealthLevel>
  <charmLevel
    @editHeaderContainerSelector="editHeaderContainerSelector"
    @showHeaderShadow="showHeaderShadow = $event"
    v-if="currentPage === 'charmLevel'"
  ></charmLevel>
</template>

<script setup>
import wealthLevel from './wealthLevel.vue'
import charmLevel from './charmLevel.vue'
import Header from '@/shared/components/Header.vue'
import { ref, nextTick } from 'vue'
import { webviewController } from '@/shared/utils/webviewController.js'

import './user-level.css'

const handleBack = async () => {
  try {
    await webviewController.webviewCaller('onClose')
  } catch (error) {
    console.error('返回操作失败:', error)
  }
}

// 控制 header 阴影的响应式状态
const showHeaderShadow = ref(false)

const currentPage = ref('wealthLevel')
const headerContainerSelector = ref('')

function changePage(page) {
  currentPage.value = page
}

function editHeaderContainerSelector(selector) {
  headerContainerSelector.value = ''
  nextTick(() => {
    headerContainerSelector.value = selector
  })
}
</script>

<style scoped>
.header-user-level {
  transition: box-shadow 0.3s ease;

  /* 默认状态：无阴影 */
  box-shadow: none;

  /* 滚动时显示阴影 */
  &.has-shadow {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 80px;
    font-size: clamp(16px, 4vw, 24px);

    .wealthLevel-text {
      color: hsl(from var(--primary-color) h s calc(l + 30) / 1);
      &.active {
        font-weight: 600;
        text-shadow: 0 0 25px hsl(from currentColor h s calc(l - 90) / 0.9);
        color: hsl(from var(--primary-color) h s calc(l + 35) / 1);
      }
    }
    .charmLevel-text {
      color: hsl(from var(--primary-color) h s calc(l + 20) / 1);
      &.active {
        font-weight: 600;
        text-shadow: 0 0 40px hsl(from currentColor h s calc(l + 100) / 0.8);
        color: hsl(from var(--primary-color) h s l / 1);
      }
    }
  }
}
</style>
