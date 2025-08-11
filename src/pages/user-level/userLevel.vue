<template>
  <Teleport v-if="headerContainerSelector" :to="headerContainerSelector">
    <Header class="header_container" :class="{ 'has-shadow': showHeaderShadow }">
      <template #header-left>
        <img src="@/assets/left-arrow.png" alt="返回" class="back-arrow" />
      </template>
      <template #header-center>
        <div class="header_title gradient-text" style="--g1: #ffffff; --g2: #cca48d">
          <div @click="changePage('wealthLevel')">财富等级</div>
          <div @click="changePage('charmLevel')">魅力等级</div>
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
import { ref } from 'vue'
// 控制 header 阴影的响应式状态
const showHeaderShadow = ref(false)

const currentPage = ref('wealthLevel')
const headerContainerSelector = ref('')

function changePage(page) {
  currentPage.value = page
}

function editHeaderContainerSelector(selector) {
  headerContainerSelector.value = selector
}
</script>

<style scoped>
.header_container {
  flex-shrink: 0;
  align-items: flex-end;
  background-color: transparent;
  transition: box-shadow 0.3s ease;

  /* 默认状态：无阴影 */
  box-shadow: none;

  /* 滚动时显示阴影 */
  &.has-shadow {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  }

  .header_title {
    display: flex;
    align-items: center;
    gap: 80px;
    font-size: clamp(20px, 4vw, 24px);
  }
}
</style>
