<template>
  <div id="history-flow">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div id="master-container" style="height:400px">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-head">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs nav-fill" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#segment" role="tab" @click="changeData('segment')">网段</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#application" role="tab" @click="changeData('application')">应用系统</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#ip" role="tab" @click="changeData('ip')">IP会话</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tcp" role="tab" @click="changeData('tcp')">TCP会话</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#udp" role="tab" @click="changeData('udp')">UDP会话</a>
              </li>
            </ul>
          </div>

          <!-- Tab panes -->
          <div class="card-body tab-content">
            <div class="tab-pane active" id="segment" role="tabpanel">
              <table class="table table-hover">
                <thead class="thead-default">
                <tr>
                  <th>#</th>
                  <th v-for="(value, key) of current_data[0]">{{key}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in current_data">
                  <th scope="row">{{index}}</th>
                  <td v-for="value of item">{{value}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="tab-pane" id="application" role="tabpanel">
              <table class="table table-hover">
                <thead class="thead-default">
                <tr>
                  <th>#</th>
                  <th v-for="(value, key) of current_data[0]">{{key}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in current_data">
                  <th scope="row">{{index}}</th>
                  <td v-for="value of item">{{value}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="tab-pane" id="ip" role="tabpanel">
              <table class="table table-hover">
                <thead class="thead-default">
                <tr>
                  <th>#</th>
                  <th v-for="(value, key) of current_data[0]">{{key}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in current_data">
                  <th scope="row">{{index}}</th>
                  <td v-for="value of item">{{value}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="tab-pane" id="tcp" role="tabpanel">
              <table class="table table-hover">
                <thead class="thead-default">
                <tr>
                  <th>#</th>
                  <th v-for="(value, key) of current_data[0]">{{key}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in current_data">
                  <th scope="row">{{index}}</th>
                  <td v-for="value of item">{{value}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="tab-pane" id="ucp" role="tabpanel">
              <table class="table table-hover">
                <thead class="thead-default">
                <tr>
                  <th>#</th>
                  <th v-for="(value, key) of current_data[0]">{{key}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in current_data">
                  <th scope="row">{{index}}</th>
                  <td v-for="value of item">{{value}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div id="pie-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Highcharts from 'highcharts';
  import { history_data, data_application, data_udp, data_tcp, data_ip, data_segments } from '../../static/data';

  export default {
    name: 'history-flow',
    data: function () {
//      console.log(history_data);
      let date = new Date();
      return {
        history: history_data,
        chart: null,
        detailStart: Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getDate()),
        detailEnd: Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getDate() - 1),
        current_data: data_segments,
      };
    },
    methods: {
      changeData: function (item) {
        const self = this;
        switch (item) {
          case 'segment':
//            self.chart.series[0].setData(data_segments);
            self.current_data = data_segments;
            break;
          case 'application':
//            self.chart.series[0].setData(data_application);
            self.current_data = data_application;
            break;
          case 'ip':
//            self.chart.series[0].setData(data_ip);
            self.current_data = data_ip;
            break;
          case 'udp':
//            self.chart.series[0].setData(data_udp);
            self.current_data = data_udp;
            break;
          case 'tcp':
//            self.chart.series[0].setData(data_tcp);
            self.current_data = data_tcp;
            break;
        }
      },
      createMaster: function () {
        const self = this;
        self.chart = new Highcharts.chart('master-container', {
          chart: {
            reflow: false, //浏览器大小变动时不刷新
            borderWidth: 0,
            backgroundColor: null,
            marginLeft: 50,
            marginRight: 20,
            zoomType: 'x',
            events: {
              // listen to the selection event on the master chart to update the
              // extremes of the detail chart
              selection: function (event) {

                let extremesObject = event.xAxis[0],
                  min = extremesObject.min,
                  max = extremesObject.max,
                  xAxis = this.xAxis[0];

                self.detailStart = extremesObject.min;
                self.detailEnd = extremesObject.max;

                // move the plot bands to reflect the new detail span
                xAxis.removePlotBand('mask-before');
                xAxis.addPlotBand({
                  id: 'mask-before',
                  from: Date.UTC(2014, 2, 18),
                  to: min,
                  color: 'rgba(0, 0, 0, 0.2)'
                });
                xAxis.removePlotBand('mask-after');
                xAxis.addPlotBand({
                  id: 'mask-after',
                  from: max,
                  to: Date.UTC(2017, 3, 17),
                  color: 'rgba(0, 0, 0, 0.2)'
                });
                return false;
              }
            }
          },
          title: {
            text: '历史流量趋势'
          },
          xAxis: {
            type: 'datetime',
            showLastTickLabel: true,
            minRange: 14 * 24 * 3600000, // fourteen days
            plotBands: [{
              id: 'mask-before',
              from: Date.UTC(2014, 2, 18),
              to: Date.UTC(2017, 0, 1),
              color: 'rgba(0, 0, 0, 0.2)'
            }],
            title: {
              text: null
            }
          },
          yAxis: {
            gridLineWidth: 0,
            labels: {
              enabled: false
            },
            title: {
              text: 'Mbps'
            },
            min: 0.6,
            showFirstLabel: false
          },
          tooltip: {
            formatter: function () {
              let point = this.point;
              return '<b>' + point.series.name + '</b><br/>' +
                Highcharts.dateFormat('%A %B %e %Y', this.x) + ':<br/>' +
                Highcharts.numberFormat(point.y, 2) + ' Mbps';
            }
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            series: {
              fillColor: {
                linearGradient: [0, 0, 0, 70],
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, 'rgba(255,255,255,0)']
                ]
              },
              lineWidth: 1,
              marker: {
                enabled: false,
                states: {
                  enabled: true,
                  radius: 3,
                }
              },
              shadow: false,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
            }
          },
          series: [{
            type: 'area',
            name: '流速',
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2014, 2, 18),
            data: self.history
          }],
          exporting: {
            enabled: false
          }
        });
      },
      createPie: function () {
        let pieChart = new Highcharts.chart('pie-container', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
          },
          title: {
            text: '各网段流量比'
          },
          tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              center: [150, 150],
              size: 300,
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 20,
            layout: 'vertical'
          },
          series: [{
            type: 'pie',
            name: '各网段流量比',
            data: [
              ['Firefox', 45.0],
              ['IE', 26.8],
              {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true
              },
              ['Safari', 8.5],
              ['Opera', 6.2],
              ['其他', 0.7]
            ]
          }]
        });
      }
    },
    mounted: function () {
      this.createMaster();
      this.createPie();
    }
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  #history-flow
    position: relative
    padding: 24px
    /*&:first-child*/
      /*padding-top: 0*/
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
        & > .nav-tabs > li > a
          line-height: 54px
          padding-top: 0
          padding-bottom: 0
          color: inherit
          opacity: 0.55
        & > .nav-tabs > li > a.active
          border: none
          border-bottom: 2px solid #0aa89e
          color: #0aa89e
          background-color: transparent
          cursor: default
          opacity: 1
        & > .nav-tabs.nav-fill > a.active
          border: none
          border-bottom: 2px solid #0aa89e
      .card-body
        padding: 24px
        position: relative
        &:last-child
          border-radius: 0 0 2px 2px
    #master-container
      position: relative
      width: 100%

</style>
