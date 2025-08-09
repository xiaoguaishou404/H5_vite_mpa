<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

defineProps<{
  title?: string;
  content?: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="modal-container">
      <h2 class="modal-title">{{ title }}</h2>
      <div class="modal-content">
        <p class="modal-text">{{ content }}</p>
        <slot />
      </div>
      <div class="modal-actions">
        <button class="cancel-button" @click="emit('cancel')">取消</button>
        <button class="confirm-button" @click="emit('confirm')">确认</button>
      </div>
    </div>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.confirm-modal-content {
  width: 100%;
  max-width: 320px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-container {
  padding: 24px 20px 20px 20px;
  text-align: center;
}

.modal-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.modal-content {
  margin-bottom: 32px;
}

.modal-text {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.modal-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.cancel-button,
.confirm-button {
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
}

.cancel-button {
  background-color: #f5f5f5;
  color: #666;
  
  &:hover {
    background-color: #e8e8e8;
  }
}

.confirm-button {
  background: linear-gradient(135deg, #7c4dff 0%, #9c27b0 100%);
  color: white;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(124, 77, 255, 0.3);
  }
}
</style>
