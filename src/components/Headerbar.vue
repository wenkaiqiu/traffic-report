<template>
  <header id="header">
    <nav class="headerbar">
      <div class="headerbar-left">
        <ul class="header-nav header-nav-options">
          <li class="header-nav-brand">
            <div class="brand-holder">
              <a href="/">
                <span class="my-text-lg my-text-bold my-text-primary">MATERIAL ADMIN</span>
              </a>
            </div>
          </li>
          <!--<li>-->
            <!--<a class="btn btn-icon-toggle" role="button">-->
              <!--<i class="fa fa-bars"></i>-->
            <!--</a>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="headerbar-right">
        <!--todo: 用户信息 -->
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'headerbar',
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  @import "../../static/css/global"

  $header-height: 64px
  #header
    position: fixed
    height: $header-height
    left: 0
    right: 0
    z-index: $top-index
    background: #fff
    color: rgba(49, 53, 52, 0.6)
    /* 用于添加下边沿的阴影效果 */
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33)

  .headerbar
    position: relative
    min-height: 50px

  .headerbar-left
    position: absolute
    .header-nav
      margin-left: 24px
    a
      float: left

  .header-nav
    margin: 0 12px
    padding-left: 0
    list-style: none
    & > li:first-child
      padding-left: 0
    & > li
      position: relative
      float: left
      display: block
      padding: 14px 0 14px 12px
      & > a
        position: relative
        display: block
      & > a:hover
        text-decoration: none
        background-color: rgba(12, 12, 12, 0.07)
    .header-nav-brand
      display: inline-table
      padding: 0
      height: $header-height
      .brand-holder
        display: table-cell
        vertical-align: middle
      a
        text-decoration: none

  .btn-icon-toggle
    padding: 0
    width: 36px
    border-radius: 999px !important
    &:hover
      background-color: rgba(12, 12, 12, 0.07)
      border-color: transparent
      -webkit-box-shadow: none
      box-shadow: none
      color: inherit
    .fa
      margin: 0
      line-height: 34px
  .btn
    font-size: 14px
    text-transform: uppercase
</style>
