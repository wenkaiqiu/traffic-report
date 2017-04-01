<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
  };
</script>

<style rel="stylesheet/sass" lang="sass">
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    /*margin-top: 64px*/
    background: #e5e6e6
    background-size: 100% 100%
    color: #313534

</style>
