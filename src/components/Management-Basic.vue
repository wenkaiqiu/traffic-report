<template>
  <div id="basic-management">
    <iframe id="Frame1" src="http://10.5.0.224:8000/admin/" allowTransparency="true" width="100%"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'basic-management',
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
