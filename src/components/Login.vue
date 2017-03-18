<template>
  <section id="section-account">
    <div class="card contain-sm style-transparent">
      <div class="card-body">
        <div class="d-flex flex-row justify-content-center">
          <div class="col-sm-6">
            <br>
            <span class="my-text-lg my-text-bold my-text-primary">MATERIAL ADMIN</span>
            <br><br>
            <form class="form floating-label" action=""
                  accept-charset="utf-8" method="post">
              <div class="form-group">
                <input type="text" class="form-control" id="username" name="username">
                <label for="username">Username</label>
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="password" name="password">
                <label for="password">Password</label>
                <p class="help-block"><a href="#">Forgotten?</a></p>
              </div>
              <br>
              <div class="d-flex flex-row justify-content-between">
                <!--<div class="col-xs-6 text-left">-->
                <div class="checkbox checkbox-inline checkbox-styled">
                  <label>
                    <input type="checkbox"> <span>Remember me</span>
                  </label>
                </div>
                <!--</div>&lt;!&ndash;end .col &ndash;&gt;-->
                <!--<div class="col-xs-6 text-right">-->
                <router-link to="/dashboard/real-time">
                  <button role='button' class="btn btn-primary btn-raised" type="submit">
                    Login
                  </button>
                </router-link>
                <!--</div>&lt;!&ndash;end .col &ndash;&gt;-->
              </div><!--end .row -->
            </form>
          </div><!--end .col -->
        </div><!--end .row -->
      </div><!--end .card-body -->
    </div>
  </section>
</template>

<script>
  export default {
    name: 'login',
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  @import "../../static/css/materialadmin"
  #section-account
    position: relative
    padding: 24px
    padding-top: 0
    background: #e5e6e6
    background-size: 100% 100%
    color: #313534
    .card
      border-style: none
      .btn-primary
        background-color: #0aa89e
        border-color: #0aa89e
        &:focus
          box-shadow: 0 0 0 2px rgba(10, 168, 158, 0.5)
    .form-control:focus
      background-color: transparent

</style>
