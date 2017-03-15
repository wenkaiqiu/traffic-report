<template>
  <header id="header">
  </header>
</template>

<script>
  export default {
    name: 'headerbar',
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  #header
    position: fixed
    height: 64px
    left: 0
    right: 0
    z-index: 1000
    background: #fff
    color: rgba(49, 53, 52, 0.6)
    /* 用于添加下边沿的阴影效果 */
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33)
</style>
