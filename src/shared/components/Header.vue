<template>
  <div class="h5-header">
    <div class="safe-area-top"></div>
    <div class="header-container">
      <slot name="header-left"></slot>
      <slot name="header-center"></slot>
      <slot name="header-right"> </slot>
    </div>
  </div>
</template>

<style scoped>
.h5-header {
  width: 100%;
  display: flex;
  flex-direction: column;

  .safe-area-top {
    height: var(--safe-area-top, 20px);
  }

  .header-container {
    display: grid;
    grid-template-columns: 30px 1fr 30px;
    grid-template-rows: 50px;
    align-items: center;
    justify-items: center;
    padding: 0px 10px;
  }
}
</style>
