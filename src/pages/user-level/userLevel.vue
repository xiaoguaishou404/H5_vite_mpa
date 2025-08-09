<template>
  <ModalsContainer />
  <div class="user_level_page">
    <img
      src="@/assets/user-level/light-effect-overlay.png"
      alt=""
      class="light-effect-overlay-img"
    />

    <div class="page-content">
      <Header class="header_container" :class="{ 'has-shadow': showHeaderShadow }">
        <template #header-left>
          <img src="@/assets/left-arrow.png" alt="返回" class="back-arrow" />
        </template>
        <template #header-center>
          <div class="header_title">
            <div>财富等级</div>
            <div>魅力等级</div>
          </div>
        </template>
        <template #header-right>
          <img src="@/assets/left-arrow.png" alt="返回" class="back-arrow" />
        </template>
      </Header>

      <div class="scroll_container" ref="scrollContainerRef">
        <!-- 用于 IntersectionObserver 监听的目标元素 -->
        <div class="observer-target" ref="observerTargetRef"></div>
        <div class="card_container">
          <img src="@/assets/user-level/user-level-card-bg.png" alt="" class="bg_img" />
          <!-- 容器区域 -->
          <div class="card-content">
            <!-- 文字 -->
            <div class="text_container">还需要1200点财富值升级</div>
            <!-- 进度条容器 -->
            <div class="progress_container">
              <ProgressBar :value="65" custom-class="wealth-progress" />
            </div>
          </div>
        </div>
        <div class="progress-container">
          <!-- 背景图 -->
          <img src="@/assets/user-level/user-level-progress-bg.png" alt="" class="bg_img" />
          <!-- 进度条区域 -->
          <div class="progress-content"></div>
        </div>
        <div class="level-intro">
          <div class="intro-title">
            <div>等级特权</div>
          </div>

          <!-- 特权列表 -->
          <div class="intro-list">
            <div class="intro-item" v-for="item in 6" :key="item">
              <div>LV6 等级特权</div>
              <!-- 礼品列表 -->
              <div class="gift-list">
                <div class="gift-item" v-for="gift in 3" :key="gift"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ModalsContainer, useModal } from 'vue-final-modal'
import Header from '@/shared/components/Header.vue'
import ProgressBar from '@/shared/components/ProgressBar.vue'

// 控制 header 阴影的响应式状态
const showHeaderShadow = ref(false)

// DOM 引用
const scrollContainerRef = ref(null)
const observerTargetRef = ref(null)

// IntersectionObserver 实例
let observer = null

onMounted(() => {
  // 设置 IntersectionObserver 来监听滚动容器顶部的可见性
  if (observerTargetRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 当目标元素不完全可见时，显示阴影
          showHeaderShadow.value = !entry.isIntersecting
        })
      },
      {
        // 只有当目标完全可见时才触发
        threshold: 1.0,
        // 相对于viewport的根元素
        root: null,
        // 设置一个小的负margin，确保在滚动开始时就能检测到
        rootMargin: '-1px 0px 0px 0px',
      },
    )

    observer.observe(observerTargetRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.user_level_page {
  height: 100%;
  position: relative;
  color: #fff;

  .light-effect-overlay-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 580px;
  }
  .page-content {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;

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
    .scroll_container {
      flex-grow: 1;
      overflow: auto;
      position: relative;
      padding: 0 20px;

      .observer-target {
        height: 0px;
        pointer-events: none;
      }
      /* 卡片模块后面应该使用zoom适配，但是这里没有使用 */
      .card_container {
        position: relative;
        .bg_img {
          width: 100%;
        }
        .card-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;

          .text_container {
            position: absolute;
            top: 50%;
            left: 33%;
            transform: translate(-50%, -50%);
            white-space: nowrap;
            font-size: clamp(14px, 4vw, 20px);
          }

          .progress_container {
            position: absolute;
            top: 64%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            /* 自定义进度条样式 */
            /* 推荐使用deep，因为使用全局style标签覆盖方案，样式是全局的，当权重比较高时可能会导致样式冲突 */
            /* &:deep的颗粒度比较细致，基本上不会有问题，除非一个父级下使用了多次该组件，组件上需要注意使用custom-class来区分*/
            /* 或者组件上再添加一个class xxx来区分，例如&:deep(.wealth-progress.xxx) */
            &:deep(.wealth-progress) {
              height: 20px;
              background: rgb(44, 33, 22);

              /* 通过外部CSS控制进度条颜色 */
              .progress-fill {
                background: linear-gradient(
                  90deg,
                  #fee1b8 0%,
                  #fee4b3 50%,
                  #fdc97c 100%
                ) !important;
              }
            }
          }
        }
      }

      .progress-container {
        position: relative;
        .bg_img {
          width: 100%;
        }
      }
      .level-intro {
        border: 2px solid #2a231a;
        padding: 20px;
        border-radius: 20px;
        background: linear-gradient(
          179.94deg,
          rgba(88, 55, 38, 0.0001) -0.56%,
          rgba(71, 55, 40, 0.597957) 98.43%
        );
        .intro-title {
          font-size: clamp(20px, 4vw, 24px);
          text-align: center;
        }
        .intro-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          .intro-item {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .gift-list {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              .gift-item {
                width: 100%;
                aspect-ratio: 1/1;
                border-radius: 20px;
                background: linear-gradient(180deg, #3f3325 0%, rgba(32, 25, 16, 0.0001) 100%);
              }
            }
          }
        }
      }
    }
  }
}
</style>
