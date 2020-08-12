<template>
  <div class="header">
    <span class="fl title">
      <slot name="title"></slot>
    </span>
    
    <slot name='user-defined'></slot>
  </div>
</template>

<script>
import '../assets/css/header.css'
  export default {
    
  }
</script>

<style lang="less" scoped>

</style>