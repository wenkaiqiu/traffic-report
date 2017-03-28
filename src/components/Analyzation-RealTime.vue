<template>
  <section id="flow-trend">
    <div class="section-body">
      <div class="row">

        <!-- BEGIN 实时流速 -->
        <div class="col-md-4 col-sm-6">
          <div class="card">
            <div class="card-body no-padding">
              <div class="alert alert-callout alert-info no-margin">
                <strong class="pull-right my-text-lg"
                        v-bind:class="{'my-text-success': isPos(rate_all),'text-danger': !isPos(rate_all)}">{{rate_all}}% <i
                  class="md"
                  v-bind:class="{'md-trending-up': isPos(rate_all),'md-trending-down': !isPos(rate_all)}"></i></strong>
                <strong class="my-text-xl">{{flow_all}} Kbps</strong><br/>
                <span class="opacity-30">实时流速</span>
              </div>
            </div><!--end .card-body -->
          </div><!--end .card -->
        </div><!--end .col -->
        <!-- END 实时流速 -->

        <!-- BEGIN TCP实时流速 -->
        <div class="col-md-4 col-sm-6">
          <div class="card">
            <div class="card-body no-padding">
              <div class="alert alert-callout alert-danger no-margin">
                <strong class="pull-right my-text-lg"
                        v-bind:class="{'my-text-success': isPos(rate_tcp),'text-danger': !isPos(rate_tcp)}">{{rate_tcp}}% <i
                  class="md"
                  v-bind:class="{'md-trending-up': isPos(rate_tcp),'md-trending-down': !isPos(rate_tcp)}"></i></strong>
                <strong class="my-text-xl">{{flow_tcp}} Kbps</strong><br/>
                <span class="opacity-30">TCP实时流速</span>
              </div>
            </div><!--end .card-body -->
          </div><!--end .card -->
        </div><!--end .col -->
        <!-- END TCP实时流速 -->

        <!-- BEGIN UDP实时流速 -->
        <div class="col-md-4 col-sm-6">
          <div class="card">
            <div class="card-body no-padding">
              <div class="alert alert-callout alert-success no-margin">
                <strong class="pull-right my-text-lg"
                        v-bind:class="{'my-text-success': isPos(rate_udp),'text-danger': !isPos(rate_udp)}">{{rate_udp}}% <i
                  class="md"
                  v-bind:class="{'md-trending-up': isPos(rate_udp),'md-trending-down': !isPos(rate_udp)}"></i></strong>
                <strong class="my-text-xl">{{flow_udp}} Kbps</strong><br/>
                <span class="opacity-30">UDP实时流速</span>
              </div>
            </div><!--end .card-body -->
          </div><!--end .card -->
        </div><!--end .col -->
        <!-- END UDP实时流速 -->

      </div><!-- end .row 1 -->

      <div class="row">
        <div class="col-md-12">
          <div class="card ">
            <div id="container" style="height:400px"></div>
          </div>
        </div>
      </div>
      <!--<div class="row">-->
      <!--&lt;!&ndash; BEGIN 应用流量排名 &ndash;&gt;-->
      <!--<div class="col-md-4">-->
      <!--<div class="card">-->
      <!--<div class="card-head">-->
      <!--<header>应用流量排名</header>-->
      <!--</div>&lt;!&ndash;end .card-head &ndash;&gt;-->
      <!--<div class="nano has-scollbar" style="height: 300px">-->
      <!--<div class="nano-content" style="right: -15px">-->
      <!--<div class="card-body no-padding scroll">-->
      <!--<ul class="list divider-full-bleed">-->
      <!--<li class="tile">-->
      <!--<div class="tile-content">-->
      <!--<div class="tile-text">Ann Laurens</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="tile">-->
      <!--<div class="tile-content">-->
      <!--<div class="tile-text">Ann Laurens</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>&lt;!&ndash;end .card-body &ndash;&gt;-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>&lt;!&ndash;end .card &ndash;&gt;-->
      <!--</div>&lt;!&ndash;end .col &ndash;&gt;-->
      <!--&lt;!&ndash; END 应用流量排名 &ndash;&gt;-->

      <!--&lt;!&ndash; BEGIN TCP流量排名 &ndash;&gt;-->
      <!--<div class="col-md-4">-->
      <!--<div class="card">-->
      <!--<div class="card-head">-->
      <!--<header>TCP流量排名</header>-->
      <!--</div>&lt;!&ndash;end .card-head &ndash;&gt;-->
      <!--<div class="nano has-scollbar" style="height: 300px">-->
      <!--<div class="nano-content" style="right: -15px">-->
      <!--<div class="card-body no-padding scroll">-->
      <!--<ul class="list divider-full-bleed">-->
      <!--<li class="tile">-->
      <!--<div class="tile-content">-->
      <!--<div class="tile-text">Ann Laurens</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="tile">-->
      <!--<div class="tile-content">-->
      <!--<div class="tile-text">Ann Laurens</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>&lt;!&ndash;end .card-body &ndash;&gt;-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>&lt;!&ndash;end .card &ndash;&gt;-->
      <!--</div>&lt;!&ndash;end .col &ndash;&gt;-->
      <!--&lt;!&ndash; END TCP流量排名 &ndash;&gt;-->

      <!--&lt;!&ndash; BEGIN UDP流量排名 &ndash;&gt;-->
      <!--<div class="col-md-4">-->
      <!--<div class="card">-->
      <!--<div class="card-head">-->
      <!--<header>UDP流量排名</header>-->
      <!--</div>&lt;!&ndash;end .card-head &ndash;&gt;-->
      <!--<div class="nano has-scollbar" style="height: 300px">-->
      <!--<div class="nano-content" style="right: -15px">-->
      <!--<div class="card-body no-padding scroll">-->
      <!--<ul class="list divider-full-bleed">-->
      <!--<li class="tile">-->
      <!--<div class="tile-content">-->
      <!--<div class="tile-text">Ann Laurens</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="tile">-->
      <!--<div class="tile-content">-->
      <!--<div class="tile-text">Ann Laurens</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>&lt;!&ndash;end .card-body &ndash;&gt;-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>&lt;!&ndash;end .card &ndash;&gt;-->
      <!--</div>&lt;!&ndash;end .col &ndash;&gt;-->
      <!--&lt;!&ndash; END UDP流量排名 &ndash;&gt;-->
      <!--</div>-->
    </div>

  </section>
</template>

<script>
  import Highcharts from 'highcharts';

  export default {
    name: 'flow-trend',
    data: function () {
      return {
        series1: [],
        series2: [],
        series3: [],
        flow_all: 0,
        flow_udp: 0,
        flow_tcp: 0,
        timer: null,
        chart: null,
        rate_all: 0,
        rate_udp: 0,
        rate_tcp: 0,
      };
    },
    methods: {
      createChart: function () {
        const self = this;
        Highcharts.setOptions({
          global: {
            useUTC: false
          }
        });
        let activeLastPointToolip = (chart) => {
          let points1 = chart.series[0].points;
          let points2 = chart.series[1].points;
          let points3 = chart.series[2].points;
          let refresh_data = [points1[points1.length - 1], points2[points2.length - 1], points3[points3.length - 1]];
          //获取下一个值，计算变化率，并赋值
          //all
          let temp = Highcharts.numberFormat(refresh_data[0].y, 3);//用于保存下一个值
          self.rate_all = self.computeRate(temp, self.flow_all);
          self.flow_all = temp;
          //tcp
          temp = Highcharts.numberFormat(refresh_data[1].y, 3);//用于保存下一个值
          self.rate_tcp = self.computeRate(temp, self.flow_tcp);
          self.flow_tcp = temp;
          //udp
          temp = Highcharts.numberFormat(refresh_data[2].y, 3);//用于保存下一个值
          self.rate_udp = self.computeRate(temp, self.flow_udp);
          self.flow_udp = temp;

          chart.tooltip.refresh(refresh_data);
        }

        self.chart = new Highcharts.chart('container', {
          chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
              load: function () {
                // set up the updating of the chart each second
                let series = this.series,
                  chart = this;
                //每5s获取一次数据
                self.timer = setInterval(function () {
                  let loc_data = self.getData().then(res => {
                    let data_init = self.data2point(res);
                    //由于每次获取5s的值，添加时每秒添加一次
                    for(let i=0;i<5;i++){
                      setTimeout(function () {
                        let s1 = data_init[0][i];
                        let s2 = data_init[1][i];
                        let s3 = data_init[2][i];
                        series[0].addPoint([s1.x, s1.y], true, true);
                        series[1].addPoint([s2.x, s2.y], true, true);
                        series[2].addPoint([s3.x, s3.y], true, true);
                        activeLastPointToolip(chart);
                      }, i*1000);
                    }
                  });
                }, 5000)
              }
            }
          },
          title: {
            text: '流量实时统计'
          },
          xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
          },
          yAxis: {
            title: {
              text: 'Kbps'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip: {
            formatter: function () {
              let s = '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b>';

              $.each(this.points, function () {
                s += '<br/>' + this.series.name + ': ' +
                  Highcharts.numberFormat(this.y, 3) + ' Kbps';
              });

              return s;
            },
            shared: true,
          },
          legend: {
            align: 'center',
            itemDistance: 50
          },
          exporting: {
            enabled: false
          },
          series: [{
            name: '总流速',
            data: self.series1,
            color: '#2196f3',
          },
            {
              name: 'TCP流速',
              data: self.series2,
              color: 'red',
            },
            {
              name: 'UDP流速',
              data: self.series3,
              color: '#4caf50',
            }
          ]
        }, function (c) {
          activeLastPointToolip(c)
        });
      },

      getData: function () {
        const self = this;
        const resource = self.$resource(process.env.DATA_REALTIME);
        return resource.get().then(res => {
          return res.data.sort((a, b) => (b.pk - a.pk));
        }).catch(err => {
          console.error(err);
        });
      },
      /*
       * 用于将后台传来的数据转换为图表所需格式。
       * 图表所需格式[{x: number,y: number},...]
       * x:时间轴，y:值
       * data：从后台获取的数据，每5s统计一次
       * num：要取的数据个数，默认取最近的1个
       * 返回的数据以秒为单位
       */
      data2point: function (data, num = 1) {
        const self = this;
        let res = [[], [], []];//分别代表series1,series2,series3
        //从最近的开始取数据，若取多个则往前找
        for (let i = num - 1; i >= 0; i--) {
          let item = data[i];
          console.log('pk = ' + item.pk);
          let loc_time = new Date(item.fields.pick_time).getTime();//获取时间值
          //原数据是5s的统计值，平滑成每1s的值
          const noise = [0.1438, 0.0325, -0.0755, 0.1370, -0.1712];//一组均值为0,方差为0.1的高斯随机数
          for (let j = -4; j <= 0; j++) {
            let temp = self.toKbps(item.fields.bytes);
            res[0].push({
              x: loc_time + j * 1000,
              y: temp * (1 + noise[4 + j])
            });
            temp = self.toKbps(item.fields.tcp_bytes);
            res[1].push({
              x: loc_time + j * 1000,
              y: temp * (1 + noise[4 + j])
            });
            temp = self.toKbps(item.fields.udp_bytes);
            res[2].push({
              x: loc_time + j * 1000,
              y: temp * (1 + noise[4 + j])
            });
          }
        }
        return res;
      },
      computeRate(newer, older){
        let rate = 0;
        if (older != 0) {
          rate = (newer - older) / older * 100;
        }
        return rate.toFixed(2);
      },
      isPos(num){
        return num >= 0;
      },
      toKbps(flow5s){
        return flow5s / 1024 * 8 / 5;//5s的数据，故除5
      }
    },
    mounted: function () {
      const self = this;
      self.getData().then(res => {
        //初始化图表数据，只初始化最近20s的数据
        let data_init = self.data2point(res, 4);
        self.series1 = self.series1.concat(data_init[0]);
        self.series2 = self.series2.concat(data_init[1]);
        self.series3 = self.series3.concat(data_init[2]);
        //创建图表
        self.createChart();
      });
    },
    destroyed: function () {
      clearInterval(this.timer);
    }
  }
  ;
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  section
    overflow: auto
    height: 100%
    position: relative
    padding: 24px
    &:first-child
      padding-top: 0

    .section-body
      &:first-child
        margin-top: 24px

    .card
      position: relative
      margin-bottom: 22px
      background-color: white
      color: #313534
      border-radius: 2px
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33)
      &:last-child
        border-radius: 0 0 2px 2px
      & > .nano:last-child
        border-radius: 0 0 2px 2px
    .card-head
      position: relative
      line-height: 52px
      min-height: 56px
      vertical-align: middle
      border-radius: 2px 2px 0 0
      header
        display: inline-block
        padding: 11px 24px
        vertical-align: middle
        line-height: 17px
        font-size: 1.25rem

    .card-body
      padding: 24px
      position: relative
      &:last-child
        border-radius: 0 0 2px 2px
    .alert.alert-callout
      position: relative
      padding-left: 20px
      background: #ffffff
      color: #313534
      border-radius: 3px
      border-color: rgba(83, 88, 88, 0.15)
      &:before
        content: ''
        position: absolute
        display: block
        width: 4px
        left: -1px
        top: -1px
        bottom: -1px
        background: red
    .alert-callout.alert-info:before
      background: #2196f3

    .alert-callout.alert-success:before
      background: #4caf50

    .opacity-30
      opacity: 0.7

    .nano
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      & > .nano-content
        position: absolute
        overflow: scroll
        overflow-x: hidden
        top: 0
        right: 0
        bottom: 0
        left: 0
    .list
      margin: 0
      padding-left: 0
      list-style: none
      line-height: 24px
      .tile
        position: relative
        display: table
        width: 100%
        min-height: 48px
        .tile-content
          display: table-cell
          padding-left: 16px
          & > div
            display: table-cell
            vertical-align: middle
        .tile-text
          padding: 12px 8px
          font-size: 1rem
          width: 100%
      li:after
        left: 0
        content: ''
        position: absolute
        bottom: 0
        right: 0
        display: block
        height: 1px
        background: rgba(150, 156, 156, 0.3)

</style>
