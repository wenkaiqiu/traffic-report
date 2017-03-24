<template>
  <section id="flow-trend">
    <div class="section-body">
      <div class="row">

        <!-- BEGIN 实时流速 -->
        <div class="col-md-4 col-sm-6">
          <div class="card">
            <div class="card-body no-padding">
              <div class="alert alert-callout alert-info no-margin">
                <strong class="pull-right my-text-success my-text-lg">0,38% <i class="md md-trending-up"></i></strong>
                <strong class="my-text-xl">{{flow_all}} Mbps</strong><br/>
                <span class="opacity-50">实时流速</span>
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
                <strong class="pull-right text-danger my-text-lg">0,18% <i class="md md-trending-down"></i></strong>
                <strong class="my-text-xl">{{flow_tcp}} Mbps</strong><br/>
                <span class="opacity-50">TCP实时流速</span>
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
                <strong class="pull-right text-danger my-text-lg">0,18% <i class="md md-trending-down"></i></strong>
                <strong class="my-text-xl">{{flow_udp}} Mbps</strong><br/>
                <span class="opacity-50">UDP实时流速</span>
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
      <div class="row">
        <!-- BEGIN 应用流量排名 -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-head">
              <header>应用流量排名</header>
            </div><!--end .card-head -->
            <div class="nano has-scollbar" style="height: 300px">
              <div class="nano-content" style="right: -15px">
                <div class="card-body no-padding scroll">
                  <ul class="list divider-full-bleed">
                    <li class="tile">
                      <div class="tile-content">
                        <div class="tile-text">Ann Laurens</div>
                      </div>
                    </li>
                    <li class="tile">
                      <div class="tile-content">
                        <div class="tile-text">Ann Laurens</div>
                      </div>
                    </li>
                  </ul>
                </div><!--end .card-body -->
              </div>
            </div>
          </div><!--end .card -->
        </div><!--end .col -->
        <!-- END 应用流量排名 -->

        <!-- BEGIN TCP流量排名 -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-head">
              <header>TCP流量排名</header>
            </div><!--end .card-head -->
            <div class="nano has-scollbar" style="height: 300px">
              <div class="nano-content" style="right: -15px">
                <div class="card-body no-padding scroll">
                  <ul class="list divider-full-bleed">
                    <li class="tile">
                      <div class="tile-content">
                        <div class="tile-text">Ann Laurens</div>
                      </div>
                    </li>
                    <li class="tile">
                      <div class="tile-content">
                        <div class="tile-text">Ann Laurens</div>
                      </div>
                    </li>
                  </ul>
                </div><!--end .card-body -->
              </div>
            </div>
          </div><!--end .card -->
        </div><!--end .col -->
        <!-- END TCP流量排名 -->

        <!-- BEGIN UDP流量排名 -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-head">
              <header>UDP流量排名</header>
            </div><!--end .card-head -->
            <div class="nano has-scollbar" style="height: 300px">
              <div class="nano-content" style="right: -15px">
                <div class="card-body no-padding scroll">
                  <ul class="list divider-full-bleed">
                    <li class="tile">
                      <div class="tile-content">
                        <div class="tile-text">Ann Laurens</div>
                      </div>
                    </li>
                    <li class="tile">
                      <div class="tile-content">
                        <div class="tile-text">Ann Laurens</div>
                      </div>
                    </li>
                  </ul>
                </div><!--end .card-body -->
              </div>
            </div>
          </div><!--end .card -->
        </div><!--end .col -->
        <!-- END UDP流量排名 -->
      </div>
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
          self.flow_all = Highcharts.numberFormat(refresh_data[0].y, 3);
          self.flow_tcp = Highcharts.numberFormat(refresh_data[1].y, 3);
          self.flow_udp = Highcharts.numberFormat(refresh_data[2].y, 3);

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

                self.timer = setInterval(function () {
                  let loc_data = self.getData().then(res => {
                      console.log("start");
                    let data_init = self.data2point(res);
                    console.log("end");
                    let s1 = data_init[0][0];
                    let s2 = data_init[1][0];
                    let s3 = data_init[2][0];
                    series[0].addPoint([s1.x, s1.y], true, true);
                    series[1].addPoint([s2.x, s2.y], true, true);
                    series[2].addPoint([s3.x, s3.y], true, true);
                    activeLastPointToolip(chart);
                    setTimeout(function () {
                      let s1 = data_init[0][1];
                      let s2 = data_init[1][1];
                      let s3 = data_init[2][1];
                      series[0].addPoint([s1.x, s1.y], true, true);
                      series[1].addPoint([s2.x, s2.y], true, true);
                      series[2].addPoint([s3.x, s3.y], true, true);
                      activeLastPointToolip(chart);
                    }, 1000);
                    setTimeout(function () {
                      let s1 = data_init[0][2];
                      let s2 = data_init[1][2];
                      let s3 = data_init[2][2];
                      series[0].addPoint([s1.x, s1.y], true, true);
                      series[1].addPoint([s2.x, s2.y], true, true);
                      series[2].addPoint([s3.x, s3.y], true, true);
                      activeLastPointToolip(chart);
                    }, 2000);
                    setTimeout(function () {
                      let s1 = data_init[0][3];
                      let s2 = data_init[1][3];
                      let s3 = data_init[2][3];
                      series[0].addPoint([s1.x, s1.y], true, true);
                      series[1].addPoint([s2.x, s2.y], true, true);
                      series[2].addPoint([s3.x, s3.y], true, true);
                      activeLastPointToolip(chart);
                    }, 3000);
                    setTimeout(function () {
                      let s1 = data_init[0][4];
                      let s2 = data_init[1][4];
                      let s3 = data_init[2][4];
                      series[0].addPoint([s1.x, s1.y], true, true);
                      series[1].addPoint([s2.x, s2.y], true, true);
                      series[2].addPoint([s3.x, s3.y], true, true);
                      activeLastPointToolip(chart);
                    }, 4000);
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

      data2point: function (data, num=1) {
        const self = this;
        let res = [[], [], []];
        console.log("-------------------------data2point-------------------------------");
        for(let i=num-1;i>=0;i--) {
          let item = data[i];
          console.log(item.pk);
          let loc_time = new Date(item.fields.pick_time).getTime();
          for (let j = -4; j <= 0; j++) {
            res[0].push({
              x: loc_time + j * 1000,
              y: item.fields.bytes / 5 / 1024
            });
            res[1].push({
              x: loc_time + j * 1000,
              y: item.fields.tcp_bytes / 5 / 1024
            });
            res[2].push({
              x: loc_time + j * 1000,
              y: item.fields.udp_bytes / 5 / 1024
            });
          }
        }
        console.log("-------------------------data2point end-------------------------------");
        return res;
      },
    },
    mounted: function () {
      const self = this;
      self.getData().then(res => {
        console.log(res);
//        //初始化图表，只初始化20s的数据
        let data_init = self.data2point(res,4);
        console.log("-------1-------")
        self.series1 = self.series1.concat(data_init[0]);
        self.series2 = self.series2.concat(data_init[1]);
        self.series3 = self.series3.concat(data_init[2]);
        self.createChart();
        console.log("-------2-------")
      });
    },
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
      margin-bottom: 24px
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

    .opacity-50
      opacity: 0.5

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
