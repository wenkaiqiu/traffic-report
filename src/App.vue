<template>
  <div id="app">
    <Headerbar/>
    <Menubar/>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Headerbar from './components/Headerbar';
  import Menubar from './components/Menubar';

  export default {
    name: 'app',
    components: {
      Headerbar,
      Menubar,
    },
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
    .content
      position: relative
      padding-left: 64px
      padding-top: 64px
</style>
