<template>
  <section id="configuration-management">
    <div class="section-body">
      <div class="row justify-content-center">

        <!-- BEGIN RUNNING INFO -->
        <div class="col-6">
          <div class="card">
            <div class="card-head">
              <header class="my-text-primary">运行信息</header>
            </div><!--end .card-head -->
            <div class="card-body">
              <div class="form-group row">
                <label for="running-time" class="col-4 col-form-label col-form-label-lg">运行时间</label>
                <div class="col-8">
                  <input class="form-control" type="text" v-model="current_time" id="running-time" readonly="true">
                </div>
              </div><!-- end .row -->
              <div class="form-group row">
                <label for="storage" class="col-4 col-form-label col-form-label-lg">存储占用</label>
                <div class="col-8">
                  <p class="form-control-static" id="storage">{{storage_percent}} GB</p>
                  <div class="progress no-margin">
                    <div class="progress-bar progress-bar-danger" v-bind:style="{width: storage_percent +'%'}"></div>
                  </div>
                </div>
                <!--<div class="col-4">-->
                  <!---->
                <!--</div>-->
              </div><!-- end .row -->
              <div class="form-group row">
                <label for="bpf" class="col-4 col-form-label col-form-label-lg">BPF</label>
                <div class="col-8">
                  <input class="form-control" type="text" id="bpf" placeholder="请输入BPF"
                         v-model="bpf">
                </div>
              </div><!-- end .row -->
              <div class="form-group row">
                <label for="running-status" class="col-4 col-form-label col-form-label-lg">运行状态</label>
                <div class="col-8">
                  <p class="form-control-static" id="running-status">
                    <span v-if="running_status==0">Running</span>
                    <span v-else-if="running_status==1">Pause</span>
                  </p>
                </div>
              </div><!-- end .row -->
            </div>
            <div class="card-body height-4">
              <div class="d-flex flex-row justify-content-around">
                <button role="button" type="button" class="btn btn-danger btn-lg col-3" v-bind:disabled="isPause?true:flase" @click="setPause()">暂停</button>
                <button role="button" type="button" class="btn btn-success col-3" v-bind:disabled="!isPause?true:flase" @click="setStart()">开始</button>
              </div><!-- end .d-flex -->
            </div>
          </div>
        </div><!-- END RUNNING INFO -->

      </div><!--end .row -->
    </div><!--end .section-body -->
  </section>
</template>

<script>
  export default {
    name: 'configuration-management',
    data: function () {
      return {
        storage: 1.2,
        storage_total: 12,
        current_time: new Date().toLocaleString(),
        bpf: "",
        running_status: 1,
        isPause: true,
      };
    },
    computed: {
      storage_percent: function() {
        return   (this.storage/this.storage_total*100).toFixed(2);
      },
    },
    methods: {
      computer_time_diff: function (time1, time2) {
        //计算出相差天数
        let days=Math.floor(date3/(24*3600*1000));

        //计算出小时数

        let leave1=date3%(24*3600*1000); //计算天数后剩余的毫秒数
        let hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        let leave2=leave1%(3600*1000);    //计算小时数后剩余的毫秒数
        let minutes=Math.floor(leave2/(60*1000));
        //计算相差秒数
        let leave3=leave2%(60*1000);    //计算分钟数后剩余的毫秒数
        let seconds=Math.round(leave3/1000);
        return days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"
      },
      setPause(){
          const self =this;
          self.isPause = true;
          self.running_status = 1;
      },
      setStart(){
          const self =this;
          self.isPause = false;
          self.running_status = 0;
      },
    },
    mounted: function () {
      const self = this;
      let setTime = () => {
        self.current_time = new Date().toLocaleString();
      };
      let timer1 = window.setInterval(setTime, 1000);
    }
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  @import "../../static/css/materialadmin"

  #configuration-management
    overflow: auto
    height: 100%
    .form-group
      label
        font-size: large
      .form-control[readonly]
        border: none
        display: block
        width: 100%
        padding: 10px 0
        font-size: 1rem
        line-height: 1.25
        color: #464a4c
        background: #fff none
        -webkit-background-clip: padding-box
        background-clip: padding-box
        border-radius: 0.25rem
        height: auto
</style>
