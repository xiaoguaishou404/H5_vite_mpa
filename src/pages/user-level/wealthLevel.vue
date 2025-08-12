<template>
  <ModalsContainer />
  <div class="wealth-level-page">
    <img :src="currentLevelData.lightEffectOverlayImg" alt="" class="light-effect-overlay-img" />

    <div class="page-content">
      <div id="header-container-selector-wealthLevel"></div>

      <div class="scroll-container" ref="scrollContainerRef">
        <!-- 用于 IntersectionObserver 监听的目标元素 -->
        <div class="observer-target" ref="observerTargetRef"></div>
        <div class="card-container">
          <img :src="currentLevelData.cardBgImg" alt="" class="bg-img" />
          <!-- 容器区域 -->
          <div class="card-content">
            <!-- 文字 -->
            <div class="text-container">还需要1200点财富值升级</div>
            <!-- 进度条容器 -->
            <div class="progress-container">
              <ProgressBar :value="65" custom-class="wealth-progress" />
            </div>

            <div class="level-info">
              <div>LV1</div>
              <div>1000/2000</div>
              <div>LV2</div>
            </div>
          </div>
        </div>
        <div class="progress-container">
          <!-- 背景图 -->
          <img :src="currentLevelData.progressBgImg" alt="" class="bg-img" />
          <!-- 进度条区域 -->
          <div class="progress-content">
            <div class="lv-last">
              <div class="icon">
                <img :src="currentLevelData.lockClosedImg" alt="" />
              </div>
              LV50
            </div>
            <div class="lv-current">
              <div class="icon">
                <div class="current-icon"></div>
              </div>
              LV2
            </div>
            <div class="lv-next">
              <div class="icon">
                <img :src="currentLevelData.lockClosedImg" alt="" />
              </div>
              LV3
            </div>
          </div>
        </div>
        <div class="level-intro">
          <div class="intro-title">
            <div>等级特权</div>
          </div>

          <!-- 特权列表 -->
          <div class="intro-list">
            <div class="intro-item" v-for="(item, index) in 6" :key="item">
              <div v-if="index < 2" class="intro-item-title lock-open">
                <img :src="currentLevelData.lockOpenImg" alt="" />
                LV6 等级特权
              </div>
              <div v-else class="intro-item-title lock-closed">
                <img :src="currentLevelData.lockClosedImg" alt="" />
                LV6 等级特权
              </div>
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
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue'
import { ModalsContainer, useModal } from 'vue-final-modal'
import Header from '@/shared/components/Header.vue'
import ProgressBar from '@/shared/components/ProgressBar.vue'
import './wealth-level.css'

const emit = defineEmits(['editHeaderContainerSelector', 'showHeaderShadow'])

const level = 5
document.documentElement.setAttribute('level', `wealth-level-${level}`)

// 全部等级数据字典
const levelDataDict = [
  {
    level: 1,
    title: 'LV1',
    description: 'LV1 等级特权',
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-1/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-1/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-1/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-1/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-1/lock-closed.png',
  },
  {
    level: 2,
    title: 'LV2',
    description: 'LV2 等级特权',
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-2/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-2/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-2/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-2/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-2/lock-closed.png',
  },
  {
    level: 3,
    title: 'LV3',
    description: 'LV3 等级特权',
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-3/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-3/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-3/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-3/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-3/lock-closed.png',
  },
  {
    level: 4,
    title: 'LV4',
    description: 'LV4 等级特权',
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-4/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-4/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-4/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-4/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-4/lock-closed.png',
  },
  {
    level: 5,
    title: 'LV5',
    description: 'LV5 等级特权',
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-5/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-5/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-5/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-5/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-5/lock-closed.png',
  },
  {
    level: 6,
    title: 'LV6',
  },
]

const currentLevelData = computed(() => {
  return levelDataDict[level - 1]
})

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
          emit('showHeaderShadow', !entry.isIntersecting)
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
  emit('editHeaderContainerSelector', '#header-container-selector-wealthLevel')
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.wealth-level-page {
  height: 100%;
  position: relative;

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

    .scroll-container {
      flex-grow: 1;
      overflow: auto;
      position: relative;
      padding: 20px;

      .observer-target {
        height: 0px;
        pointer-events: none;
      }
      /* 卡片模块后面应该使用zoom适配，但是这里没有使用 */
      .card-container {
        position: relative;
        .bg-img {
          width: 100%;
        }
        .card-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;

          .text-container {
            position: absolute;
            top: 44%;
            left: 9%;
            white-space: nowrap;
            font-size: clamp(10px, 4vw, 20px);
            color: var(--primary-color);
          }

          .progress-container {
            position: absolute;
            top: 60%;
            left: 9%;
            width: 80%;
            /* 自定义进度条样式 */
            /* 推荐使用deep，因为使用全局style标签覆盖方案，样式是全局的，当权重比较高时可能会导致样式冲突 */
            /* &:deep的颗粒度比较细致，基本上不会有问题，除非一个父级下使用了多次该组件，组件上需要注意使用custom-class来区分*/
            /* 或者组件上再添加一个class xxx来区分，例如&:deep(.wealth-progress.xxx) */
            &:deep(.wealth-progress) {
              height: clamp(10px, 3vw, 20px);
              background: var(--icon-bg-color);

              /* 通过外部CSS控制进度条颜色 */
              .progress-fill {
                background: var(--progress-fill-color);
              }
            }
          }

          .level-info {
            position: absolute;
            top: 70%;
            left: 9%;
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 10px;
            font-size: clamp(10px, 3vw, 18px);
            color: var(--primary-color);
          }
        }
      }

      .progress-container {
        position: relative;
        margin-bottom: 40px;
        .bg-img {
          width: 100%;
        }
        .progress-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .lv-last,
          .lv-current,
          .lv-next {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            font-size: clamp(10px, 3vw, 14px);
          }
          .lv-current {
            transform: translateY(1.5lh);
          }
          .icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: var(--icon-bg-color);
            padding: 6px;
            img {
              width: 100%;
            }
            .current-icon {
              width: 100%;
              height: 100%;
              background-color: var(--icon-color);
              border-radius: 50%;
            }
          }
        }
      }
      .level-intro {
        border: 2px solid var(--box-border-color);

        padding: 20px;
        border-radius: 20px;
        background: var(--level-intro-bg);
        .intro-title {
          font-size: clamp(20px, 4vw, 24px);
          text-align: center;
          padding: 20px 0;
        }
        .intro-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          .intro-item {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .intro-item-title {
              display: flex;
              align-items: center;
              gap: 10px;
              img {
                width: 20px;
                height: 20px;
              }
              &.lock-open {
                color: var(--primary-color);
              }
              &.lock-closed {
                color: var(--lock-closed-color);
              }
            }
            .gift-list {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              .gift-item {
                width: 100%;
                aspect-ratio: 1/1;
                border-radius: 20px;
                background: var(--gradient-bg);
              }
            }
          }
        }
      }
    }
  }
}
</style>
