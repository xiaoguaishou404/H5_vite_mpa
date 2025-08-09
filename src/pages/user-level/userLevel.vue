<template>
  <ModalsContainer />
  <div class="wealth_level_page">
    <img
      src="@/assets/user-level/light-effect-overlay.png"
      alt=""
      class="light-effect-overlay"
    />

    <div class="wealth_level_page_content">
      <Header
        class="header_container"
        :class="{ 'has-shadow': showHeaderShadow }"
      >
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
          <img
            src="@/assets/user-level/user-level-card-bg.png"
            alt=""
            class="bg_img"
          />
          <!-- 容器区域 -->
          <div class="card_content_container">
            <!-- 文字 -->
            <div class="text_container">还需要1200点财富值升级</div>
            <!-- 进度条容器 -->
            <div class="progress_container"></div>
          </div>
        </div>
        <div class="level_progress_container">
          <!-- 背景图 -->
          <img
            src="@/assets/user-level/user-level-progress-bg.png"
            alt=""
            class="bg_img"
          />
          <!-- 进度条区域 -->
          <div class="level_progress_content"></div>
        </div>
        <div class="level_introduction_container">
          <div class="level_introduction_content_title">
            <div>等级特权</div>
          </div>

          <!-- 特权列表 -->
          <div class="level_introduction_content_list">
            <div
              class="level_introduction_content_list_item"
              v-for="item in 6"
              :key="item"
            >
              <div>LV6 等级特权</div>
              <!-- 礼品列表 -->
              <div class="level_introduction_content_list_item_gift_list">
                <div
                  class="level_introduction_content_list_item_gift_list_item"
                  v-for="gift in 3"
                  :key="gift"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ModalsContainer, useModal } from "vue-final-modal";
import Header from "@/shared/components/Header.vue";

// 控制 header 阴影的响应式状态
const showHeaderShadow = ref(false);

// DOM 引用
const scrollContainerRef = ref(null);
const observerTargetRef = ref(null);

// IntersectionObserver 实例
let observer = null;

onMounted(() => {
  // 设置 IntersectionObserver 来监听滚动容器顶部的可见性
  if (observerTargetRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 当目标元素不完全可见时，显示阴影
          showHeaderShadow.value = !entry.isIntersecting;
        });
      },
      {
        // 只有当目标完全可见时才触发
        threshold: 1.0,
        // 相对于viewport的根元素
        root: null,
        // 设置一个小的负margin，确保在滚动开始时就能检测到
        rootMargin: "-1px 0px 0px 0px",
      }
    );

    observer.observe(observerTargetRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.wealth_level_page {
  position: relative;
  width: 100%;
  background-color: #17130d;

  .light-effect-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 580px;
  }
  .wealth_level_page_content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #fff;
    .header_container {
      flex-shrink: 0;
      height: 100px;
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
      position: relative;
      width: 100%;
      padding: 0 20px;

      .observer-target {
        height: 1px;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
      }

      .card_container {
        position: relative;
        width: 100%;
        .bg_img {
          width: 100%;
        }
        .card_content_container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 70px 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          .text_container {
            font-size: 16px;
            margin-top: 50px;
          }

          .progress_container {
          }
        }
      }

      .level_progress_container {
        position: relative;
        .bg_img {
          width: 100%;
        }
      }
      .level_introduction_container {
        border: 2px solid #2a231a;
        padding: 20px;
        border-radius: 20px;
        background: linear-gradient(
          179.94deg,
          rgba(88, 55, 38, 0.0001) -0.56%,
          rgba(71, 55, 40, 0.597957) 98.43%
        );
        .level_introduction_content_title {
          font-size: clamp(20px, 4vw, 24px);
          text-align: center;
        }
        .level_introduction_content_list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          .level_introduction_content_list_item {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .level_introduction_content_list_item_gift_list {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              .level_introduction_content_list_item_gift_list_item {
                width: 100%;
                aspect-ratio: 1/1;
                border-radius: 20px;
                background: linear-gradient(
                  180deg,
                  #3f3325 0%,
                  rgba(32, 25, 16, 0.0001) 100%
                );
              }
            }
          }
        }
      }
    }
  }
}
</style>
