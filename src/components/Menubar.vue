<template>
  <div id="menubar">

    <ul id="main-menu" class="gui-controls">
      <router-link tag="li" to="/flow-trend">
        <a>FlowTrend</a>
      </router-link>
      <router-link tag="li" to="/real-time">
        <a>RealTime</a>
      </router-link>
      <router-link tag="li" to="/basic-management">
        <a>BasicManagement</a>
      </router-link>
      <router-link tag="li" to="/configuration-management">
        <a>ConfigurationManagement</a>
      </router-link>
      <router-link tag="li" to="/data-package">
        <a>DataPackage</a>
      </router-link>
      <router-link tag="li" to="/history-flow">
        <a>HistoryFlow</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'menubar',
  };
</script>

<style rel="stylesheet/sass" lang="sass">
  #menubar
    position: fixed
    z-index: 999
    left: 0
    top: 64px
    bottom: 0
    width: 64px
    color: rgba(255, 255, 255, 0.55)
    background: #2b323a

  #main-menu
    overflow-x: hidden
  .gui-controls
    padding: 0
    & > li
      position: relative
      margin-bottom: 12px
    li
      list-style: none
</style>
