<template>
  <div class="rounded-button">
    <slot></slot>
  </div>
</template>

<style scoped>
.rounded-button {
  width: 100%;
  height: 100%;
  border-radius: calc(infinity * 1px);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
