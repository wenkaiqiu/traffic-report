<template>
  <div id="greeting">
    <Headerbar/>
    <Menubar/>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Headerbar from './Headerbar';
  import Menubar from './Menubar';

  export default {
    name: 'greeting',
    components: {
      Headerbar,
      Menubar,
    },
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  #greeting
    .content
      position: relative
      padding-left: 64px
      padding-top: 64px
</style>
