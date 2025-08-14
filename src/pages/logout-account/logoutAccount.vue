<template>
  <ModalsContainer />
  <div class="logout-account-page">
    <Header class="header-logout-account">
      <template #header-left>
        <img
          @click="handleBack"
          src="@/assets/left-arrow-black.png"
          alt="返回"
          class="back-arrow"
        />
      </template>
      <template #header-center>
        <h1 class="header-title">注销账号</h1>
      </template>
    </Header>

    <div class="content">
      <div class="top-container">
        <h2 class="apply-title">申请账号注销</h2>

        <div class="notice-section">
          <div class="notice-item">
            <span class="notice-number">1、</span>
            <span class="notice-text">账号内资产已结清或自愿放弃</span>
          </div>
          <div class="notice-description">
            钱包内货币、钱包账户余额等虚拟资产、权益，均已使用完毕或您主动清空，任何收入均已提现或您愿意放弃全部资产、权益及收入
          </div>

          <div class="notice-item">
            <span class="notice-number">2、</span>
            <span class="notice-text">申请注销后15天内不在用此账号登录，则注销成功</span>
          </div>
        </div>
      </div>

      <div class="bottom-container">
        <div class="agreement-section">
          <div class="checkbox-wrapper">
            <input type="checkbox" id="agreement" v-model="agreedToTerms" class="checkbox" />
            <label for="agreement" class="agreement-text">
              本人已阅读并同意《<span class="agreement-link">账号注销协议</span>》
            </label>
          </div>
        </div>

        <div class="button-section">
          <button
            class="logout-button"
            :class="{ disabled: !agreedToTerms }"
            :disabled="!agreedToTerms"
            @click="handleLogout"
          >
            立即注销
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/shared/components/Header.vue'
import { useWebviewCallerProvider } from '@/shared/utils/useWebviewCaller.js'

import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalConfirmPlainCss from '@/shared/components/ModalConfirmPlainCss.vue'

// 初始化 webview 调用器
const webviewCaller = useWebviewCallerProvider()

const handleBack = async () => {
  console.log('onClose')
  try {
    await webviewCaller('onClose')
  } catch (error) {
    console.error('返回操作失败:', error)
  }
}

const { open, close } = useModal({
  component: ModalConfirmPlainCss,
  attrs: {
    title: '注销冷静期',
    content: '您当前处于注销冷静期内X天X时X分X秒，登录后将撤销账号注销申请，确认登录吗？',
    onConfirm() {
      // 处理确认登录逻辑
      console.log('确认登录，撤销注销申请')
      close()
    },
    onCancel() {
      // 处理取消逻辑
      console.log('取消登录')
      close()
    },
  },
})

const agreedToTerms = ref(false)

const handleLogout = () => {
  if (agreedToTerms.value) {
    // 在实际应用中，这里会检查用户是否处于冷静期
    // 如果处于冷静期，则显示弹窗
    // 这里为了演示效果，直接显示弹窗
    open()

    // 如果不在冷静期，直接处理注销逻辑
    // console.log("开始注销账号");
  }
}
</script>

<style scoped>
.logout-account-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100vh;
  background-color: var(--primary-bg-color);
}

.header-logout-account {
  background-color: #fff;
  .header-title {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    text-align: center;
    color: #333;
  }
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.top-container {
  background-color: #fff;
  padding: 20px;
}
.bottom-container {
  padding: 50px 20px;
}

.apply-title {
  font-size: 18px;
  font-weight: 500;
  color: #ff4444;
  margin: 0 0 32px 0;
}

.notice-section {
  margin-bottom: 60px;
}

.notice-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;

  .notice-number {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    margin-right: 8px;
    flex-shrink: 0;
  }

  .notice-text {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    line-height: 1.5;
  }
}

.notice-description {
  font-size: 14px;
  color: #999;
  line-height: 1.6;
  margin: 8px 0 32px 0;
  padding-left: 0;
}

.agreement-section {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ddd;
  appearance: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  &:checked {
    background-color: #7c4dff;
    border-color: #7c4dff;

    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
  }
}

.agreement-text {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  user-select: none;

  .agreement-link {
    color: #7c4dff;
    text-decoration: underline;
  }
}

.button-section {
  padding: 0 12px;
}

.logout-button {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #7c4dff 0%, #9c27b0 100%);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(.disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(124, 77, 255, 0.3);
  }

  &:active:not(.disabled) {
    transform: translateY(0);
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
