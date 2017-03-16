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
                <strong class="my-text-xl">32,829 Mbps</strong><br/>
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
                <strong class="my-text-xl">42.90 Mbps</strong><br/>
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
                <strong class="my-text-xl">54 Mbps</strong><br/>
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
      </div>
    </div>

  </section>
</template>

<script>
  import Highcharts from 'highcharts';

  export default {
    name: 'flow-trend',

    mounted: () => {
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
      function activeLastPointToolip(chart) {
        var points1 = chart.series[0].points;
        var points2 = chart.series[1].points;
        var points3 = chart.series[2].points;
//        console.log(points1);
        chart.tooltip.refresh([points1[points1.length - 1], points2[points2.length - 1], points3[points3.length - 1]]);
      }

      var chart = new Highcharts.chart('container', {
        chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
            load: function () {
              // set up the updating of the chart each second
              var series = this.series,
                chart = this;
              setInterval(function () {
                var x = (new Date()).getTime(), // current time
                  y1 = Math.random(),
                  y2 = Math.random(),
                  y3 = Math.random();
                series[0].addPoint([x, y1], true, true);
                series[1].addPoint([x, y2], true, true);
                series[2].addPoint([x, y3], true, true);
                activeLastPointToolip(chart)
              }, 1000);
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
            text: 'Mbps'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
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
          data: (function () {
            // generate an array of random data
            var data = [],
              time = (new Date()).getTime(),
              i;
            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: Math.random(),
              });
            }
            return data;
          }()),
          tooltip: {
            valueSuffix: ' Mbps',
          },
          color: '#2196f3',
        },
          {
            name: 'TCP流速',
            data: (function () {
              // generate an array of random data
              var data = [],
                time = (new Date()).getTime(),
                i;
              for (i = -19; i <= 0; i += 1) {
                data.push({
                  x: time + i * 1000,
                  y: Math.random(),
                });
              }
              return data;
            }()),
            tooltip: {
              valueSuffix: ' Mbps',
            },
            color: 'red',
          },
          {
            name: 'UDP流速',
            data: (function () {
              // generate an array of random data
              var data = [],
                time = (new Date()).getTime(),
                i;
              for (i = -19; i <= 0; i += 1) {
                data.push({
                  x: time + i * 1000,
                  y: Math.random(),
                });
              }
              return data;
            }()),
            tooltip: {
              valueSuffix: ' Mbps',
            },
            color: '#4caf50',
          }
        ]
      }, function (c) {
        activeLastPointToolip(c)
      });
    },
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  section
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
