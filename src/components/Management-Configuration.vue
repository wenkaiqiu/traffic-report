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
                  <p class="form-control-static" id="storage">{{storage_percent}}% ({{storage}} / {{storage_total}})</p>
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
                <div class="col-8 d-flex">
                  <input class="form-control mr-2" type="text" id="bpf" placeholder="请输入BPF"
                         v-model="bpf">
                  <button role='button' type="button" class="btn mb-2 btn-primary"@click="updateBPF()">更新</button>
                </div>

              </div><!-- end .row -->
              <div class="form-group row">
                <label for="running-status" class="col-4 col-form-label col-form-label-lg">运行状态</label>
                <div class="col-8">
                  <p class="form-control-static" id="running-status">
                    <span v-if="running_status==0">运行</span>
                    <span v-else-if="running_status==1">暂停</span>
                  </p>
                </div>
              </div><!-- end .row -->
            </div>
            <div class="card-body height-4">
              <div class="d-flex flex-row justify-content-around">
                <button role="button" type="button" class="btn btn-danger btn-lg col-3"
                        v-bind:disabled="isPause?true:flase" @click="setPause()">暂停
                </button>
                <button role="button" type="button" class="btn btn-success col-3" v-bind:disabled="!isPause?true:flase"
                        @click="setStart()">开始
                </button>
              </div><!-- end .d-flex -->
            </div>
          </div>
        </div><!-- END RUNNING INFO -->

      </div><!--end .row -->
    </div><!--end .section-body -->
  </section>
</template>

<script>
  let unit = ["B", "KB", "MB", "GB", "TB"];
  export default {
    name: 'configuration-management',
    data: function () {
      return {
        storage_B: 1024 * 1024 * 1024,
        storage_total_B: 10 * 1024 * 1024 * 1024,
        current_time: "0秒",
        bpf: "",
        running_status: 1,
        isPause: true,
      };
    },
    computed: {
      storage_percent: function () {
        return (this.storage_B / this.storage_total_B * 100).toFixed(2);
      },
      storage: function () {
        let local = this.storage_B;
        let count = 0;
        let res = local + " " + unit[count];
        while ((local /= 1024) >= 1) {
          count++;
          res = local + " " + unit[count]
        }
        return res;
      },
      storage_total: function () {
        let local = this.storage_total_B;
        let count = 0;
        let res = local + " " + unit[count];
        while ((local /= 1024) >= 1) {
          count++;
          res = local + " " + unit[count]
        }
        return res;
      }
    },
    methods: {
      updateBPF:function () {
        const self = this;
        const tape_resource = self.$resource(window.location.protocol + '//' + window.location.hostname + process.env.INFO_TAPE);
        tape_resource.save({"BPF":self.bpf,"status":!self.isPause}).then(res=>{
          console.log(res);
        });
      },
      computer_time_diff: function (time1, time2) {
        let date3 = time2 - time1;
        //计算出相差天数
        let days = Math.floor(date3 / (24 * 3600 * 1000));

        //计算出小时数

        let leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000);    //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000);    //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000);
        return days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
      },
      setPause(){
        const self = this;
        self.isPause = true;
        self.running_status = 1;
        const tape_resource = self.$resource(window.location.protocol + '//' + window.location.hostname + process.env.INFO_TAPE);
        tape_resource.save({"BPF":self.bpf,"status":false}).then(res=>{
           console.log(res);
        });
      },
      setStart(){
        const self = this;
        self.isPause = false;
        self.running_status = 0;
        const tape_resource = self.$resource(window.location.protocol + '//' + window.location.hostname + process.env.INFO_TAPE);
        tape_resource.save({"BPF":self.bpf,"status":true}).then(res=>{
          console.log(res);
        });
      },
      getStorageInfo(){
        const self = this;
        const info_resource = self.$resource(window.location.protocol + '//' + window.location.hostname + process.env.INFO_STORAGE);
        info_resource.get().then(res => {
//          console.log(res.data);
          if (res.data != null) {
            self.storage = res.data.used;
            self.storage_total = res.data.total;
          }
        });
      },
      formatTime(time){
        let res="";
        let loc = time;
        if (loc >= 1000 * 60 * 60 * 24) {
          res += Math.floor(loc / (1000 * 60 * 60 * 24)) + "天";
          loc %= (1000 * 60 * 60 * 24);
        }
        if (loc >= 1000 * 60 * 60) {
          res += Math.floor(loc / (1000 * 60 * 60)) + "小时";
          loc %= (1000 * 60 * 60);
        }
        if (loc >= 1000 * 60) {
          res += Math.floor(loc / (1000 * 60)) + "分";
          loc %= (1000 * 60);
        }
        if (loc >= 1000) {
          res += Math.floor(loc / (1000)) + "秒";
          loc %= (1000);
        }
        console.log(res);
        return res;
      }
    },
    mounted: function () {
      const self = this;
      self.getStorageInfo();
      const tape_resource = self.$resource(window.location.protocol + '//' + window.location.hostname + process.env.INFO_TAPE);
      tape_resource.get().then(res=>{
         if(res.data!=null){
             self.bpf = res.data.BPF;
             if(res.data.status){
               self.isPause = false;
               self.running_status = 0;
             }else{
               self.isPause = true;
               self.running_status = 1;
             }
         }
      });
      let setTime = () => {
        const time_resource = self.$resource(window.location.protocol + '//' + window.location.hostname + process.env.INFO_RUNTIME);
        time_resource.get().then(res => {
          if (res.data != null) {
            self.current_time = self.formatTime(res.data.now);
          } else {
            self.current_time = self.computer_time_diff(new Date("2017-05-05T00:00:00").getTime(), new Date().getTime());
          }
        },res=>{
          self.current_time = self.formatTime(100000000);
        });
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
