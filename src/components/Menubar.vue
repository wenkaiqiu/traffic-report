<template>
  <div id="menubar" class="menubar-inverse animate">

    <ul id="main-menu" class="gui-controls">
      <router-link tag="li" to="/dashboard/real-time">
        <a><div class="gui-icon"><i class="md md-home"></i></div></a>
      </router-link>
      <router-link tag="li" to="/dashboard/flow-trend">
        <a><div class="gui-icon"><i class="md md-trending-up"></i></div></a>
      </router-link>
      <router-link tag="li" to="/dashboard/history-flow">
        <a><div class="gui-icon"><i class="md md-poll"></i></div></a>
      </router-link>
      <router-link tag="li" to="/dashboard/data-package">
        <a><div class="gui-icon"><i class="md md-laptop-windows"></i></div></a>
      </router-link>
      <router-link tag="li" to="/dashboard/basic-management">
        <a><div class="gui-icon"><i class="md md-settings"></i></div></a>
      </router-link>
      <router-link tag="li" to="/dashboard/configuration-management">
        <a><div class="gui-icon"><i class="md md-settings-applications"></i></div></a>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'menubar',
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  #menubar
    position: fixed
    z-index: 999
    left: 0
    top: 64px
    bottom: 0
    width: 64px
    color: rgba(255, 255, 255, 0.55)
    background: #2b323a
    padding-top: 16px
    #main-menu
      overflow-x: hidden
  .gui-controls
    padding: 0
    li.router-link-active .gui-icon
      background-color: #ffffff
      border-color: #ffffff
      color: #0aa89e
    & > li
      position: relative
      margin-bottom: 12px
      list-style: none
      > a
        position: relative
        display: block
        text-decoration: none
        padding: 12px 0
        font-size: 12px
        line-height: normal
        border-radius: 0
        min-height: 40px
        max-height: 64px
        z-index: 1
    .gui-icon
      position: absolute
      left: 12px
      top: 0
      width: 40px
      height: 40px
      color: #535858
      font-size: 18px
      overflow: hidden
      border-radius: 999px
      -webkit-transition: all 0.15s linear
      -o-transition: all 0.15s linear
      transition: all 0.15s linear
      &:hover
        background-color: rgba(255, 255, 255, 0.12)
        color: #ffffff
      .md:first-child
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
        line-height: 40px
        width: 1em
  .menubar-inverse .gui-icon
    color: rgba(255, 255, 255, 0.65)

</style>
