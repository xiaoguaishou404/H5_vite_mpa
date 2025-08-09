<template>
  <div class="h5-header">
    <slot name="header-left" class="header-left"></slot>
    <slot name="header-center" class="header-center"></slot>
    <slot name="header-right" class="header-right">
      <div></div>
    </slot>
  </div>
 
</template>

<style scoped>
.h5-header{
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .header-left{
    width: 100px;
  }
  .header-center{ 
    flex: 1;
  }
  .header-right{
    width: 100px;
  }
}
</style>