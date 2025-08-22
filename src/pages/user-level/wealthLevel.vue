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
            <div class="text-container">
              还需要
              <div class="difference-level-exp">
                {{ wealthData.differenceLevelExp }}
              </div>
              点财富值升级
            </div>
            <!-- 进度条容器 -->
            <div class="progress-container">
              <ProgressBar :value="progressPercentage" custom-class="wealth-progress" />
            </div>

            <div class="level-info">
              <div>LV{{ currentLevel }}</div>
              <div>{{ wealthData.currentExp }}/{{ wealthData.nextLevelExp }}</div>
              <div>LV{{ nextLevel }}</div>
            </div>
          </div>
        </div>
        <div class="level-history-container">
          <!-- 背景图 -->
          <img :src="currentLevelData.progressBgImg" alt="" class="bg-img" />
          <!-- 进度条区域 -->
          <div class="progress-content">
            <div class="lv-last">
              <template v-if="levelHistory.last !== 0">
                <div class="icon">
                  <img :src="currentLevelData.lockClosedImg" alt="" />
                </div>
                LV{{ levelHistory.last }}
              </template>
            </div>
            <div class="lv-current">
              <div class="icon">
                <div class="current-icon"></div>
              </div>
              LV{{ levelHistory.current }}
            </div>
            <div class="lv-next">
              <template v-if="levelHistory.next <= wealthData.maxLevel">
                <div class="icon">
                  <img :src="currentLevelData.lockClosedImg" alt="" />
                </div>
                LV{{ levelHistory.next }}
              </template>
            </div>
          </div>
        </div>
        <div class="level-intro">
          <div class="intro-title">
            <div>等级特权</div>
          </div>

          <!-- 特权列表 -->
          <div class="intro-list">
            <div
              class="intro-item"
              v-for="privilege in wealthData.privilegeList"
              :key="privilege.unlockLevel"
            >
              <div class="intro-item-title" :class="privilege.unlock ? 'lock-open' : 'lock-closed'">
                <img
                  :src="
                    privilege.unlock ? currentLevelData.lockOpenImg : currentLevelData.lockClosedImg
                  "
                  alt=""
                />
                LV{{ privilege.unlockLevel }} 等级特权
              </div>
              <!-- 礼品列表 -->
              <div class="gift-list">
                <div class="gift-item" v-for="item in privilege.privilegeList" :key="item.name">
                  <img :src="item.icon" :alt="item.name" />
                  <div>{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, computed, watch } from 'vue'
import { ModalsContainer, useModal } from 'vue-final-modal'
import ProgressBar from '@/shared/components/ProgressBar.vue'
import './wealth-level.css'
import useFetch from '@/shared/utils/useFetch.js'

// 响应式数据存储
const wealthData = ref({
  headUrl: '',
  icon: '',
  level: 1,
  maxLevel: 80,
  levelZero: true,
  levelIconCheck: false,
  currentExp: 0,
  nextLevelExp: 0,
  differenceLevelExp: 0,
  privilegeList: [],
})

// 获取财富等级数据
const fetchWealthData = async () => {
  try {
    const res = await useFetch(`/api/v1/user-exp/my/1`, {
      method: 'POST',
    })

    if (res.code === 200) {
      wealthData.value = res.data
      console.log('财富等级数据:', wealthData.value)
    }
  } catch (error) {
    console.error('获取财富等级数据失败:', error)
  }
}

// 初始加载数据
fetchWealthData()

const emit = defineEmits(['editHeaderContainerSelector', 'showHeaderShadow'])

// 根据等级范围计算CSS主题级别
const getCssLevelRange = (level) => {
  if (level >= 1 && level <= 10) return 1
  if (level >= 11 && level <= 30) return 2
  if (level >= 31 && level <= 50) return 3
  if (level >= 51 && level <= 80) return 4
  return 1 // 默认返回1
}

// 监听等级变化，更新CSS变量
watch(
  () => wealthData.value.level,
  (newLevel) => {
    const cssLevel = getCssLevelRange(newLevel)
    document.documentElement.setAttribute('level', `wealth-level-${cssLevel}`)
  },
  { immediate: true },
)

// 全部等级数据字典
const levelDataDict = [
  {
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-1/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-1/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-1/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-1/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-1/lock-closed.png',
  },
  {
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-2/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-2/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-2/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-2/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-2/lock-closed.png',
  },
  {
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-3/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-3/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-3/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-3/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-3/lock-closed.png',
  },
  {
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-4/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-4/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-4/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-4/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-4/lock-closed.png',
  },
  {
    lightEffectOverlayImg: '/src/assets/user-level/wealth-level/level-5/light-effect-overlay.png',
    cardBgImg: '/src/assets/user-level/wealth-level/level-5/card-bg.png',
    progressBgImg: '/src/assets/user-level/wealth-level/level-5/progress-bg.png',
    lockOpenImg: '/src/assets/user-level/wealth-level/level-5/lock-open.png',
    lockClosedImg: '/src/assets/user-level/wealth-level/level-5/lock-closed.png',
  },
]

// 通过 Vite 的 import.meta.glob 收集静态资源，并在构建期生成可用 URL
const wealthImages = import.meta.glob('/src/assets/user-level/wealth-level/**/*', {
  eager: true,
  import: 'default',
})

function resolveAssetUrl(path) {
  if (!path) return path
  return wealthImages[path] || path
}

const resolvedLevelDataDict = levelDataDict.map((item) => ({
  ...item,
  lightEffectOverlayImg: resolveAssetUrl(item.lightEffectOverlayImg),
  cardBgImg: resolveAssetUrl(item.cardBgImg),
  progressBgImg: resolveAssetUrl(item.progressBgImg),
  lockOpenImg: resolveAssetUrl(item.lockOpenImg),
  lockClosedImg: resolveAssetUrl(item.lockClosedImg),
}))

const currentLevelData = computed(() => {
  const cssLevel = getCssLevelRange(wealthData.value.level)
  return resolvedLevelDataDict[cssLevel - 1]
})

// 计算进度条百分比
const progressPercentage = computed(() => {
  if (wealthData.value.nextLevelExp === 0) return 0
  return Math.round((wealthData.value.currentExp / wealthData.value.nextLevelExp) * 100)
})

// 计算当前等级和下一等级
const currentLevel = computed(() => wealthData.value.level)
const nextLevel = computed(() => wealthData.value.level + 1)

// 计算等级历史进度数据
const levelHistory = computed(() => {
  const current = wealthData.value.level
  return {
    last: current > 1 ? current - 1 : 0,
    current: current,
    next: current + 1,
  }
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
      display: flex;
      flex-direction: column;

      .observer-target {
        height: 0px;
        pointer-events: none;
      }
      /* 卡片模块后面应该使用zoom适配，但是这里没有使用 */
      .card-container {
        position: relative;
        .bg-img {
          width: 100%;
          margin-bottom: -20px;
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
            display: flex;
            align-items: center;
            gap: 10px;
            .difference-level-exp {
              color: var(--icon-color);
            }
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
            top: 73%;
            left: 9%;
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            font-size: clamp(10px, 3vw, 18px);
            color: var(--primary-color);
          }
        }
      }

      .level-history-container {
        position: relative;
        margin-bottom: 40px;
        height: 50px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
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
            transform: translateY(0.5lh);
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
        flex-grow: 1;

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
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 5px;
                font-size: clamp(10px, 3vw, 18px);
                img {
                  width: 60%;
                  height: 60%;
                  object-fit: cover;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
