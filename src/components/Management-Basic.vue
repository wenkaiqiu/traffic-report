<template>
  <div id="basic-management">
    <iframe id="Frame1" :src="url" allowTransparency="true" width="100%"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'basic-management',
    data: function () {
      return {
          'url':window.location.protocol+'//'+window.location.hostname+process.env.CONFIG
      };
    }
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  #basic-management
    height: 100%
    background-color: #f8f8f8
    iframe
      border-width: 0
      margin-top: -60px
      height: 100%

</style>
