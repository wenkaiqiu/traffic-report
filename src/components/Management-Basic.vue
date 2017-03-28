<template>
  <div id="basic-management">
    <iframe id="Frame1" src="http://10.5.0.224:8000/admin/login/?next=/admin/" allowTransparency="true" width="100%"></iframe>
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
    iframe
      border-width: 0
      height: 100%

</style>
