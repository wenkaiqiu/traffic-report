<template>
  <div id="history-flow">
    <div class="row">
      <div class="col-md-12">
        <div class="card d-flex flex-column">
          <div class="chart-menubar d-flex flex-row">
            <div class="btn-group col-3 d-flex flex-row" role="group" aria-label="Basic example">
              <span class="my-span mr-sm-2">时间间隔</span>
              <button role="button" type="button" class="btn btn-secondary">min</button>
              <button role="button" type="button" class="btn btn-secondary">h</button>
              <button role="button" type="button" class="btn btn-secondary">day</button>
            </div>
            <div class="form-inline col-9">
              <label for="time-start" class="mr-sm-2">开始时间</label>
              <input class="form-control mb-2 mr-sm-2 mb-sm-0" type="datetime-local" value="2017-03-01T13:45:00"
                     id="time-start">
              <label for="time-end" class="mr-sm-2">结束时间</label>
              <input class="form-control mb-2 mr-sm-2 mb-sm-0" type="datetime-local" value="2017-03-31T13:45:00"
                     id="time-end">
              <button role="button" type="button" class="btn btn-primary mr-sm-2">更新</button>
              <button role="button" type="button" class="btn btn-secondary">下载日志</button>
            </div>
          </div>
          <div id="master-container" style="height:400px">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="row">
            <div class="col-md-8">

              <div class="card-head">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs nav-fill" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#endpoint" role="tab"
                       @click="changeData('endpoint')">终端</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#application" role="tab"
                       @click="changeData('application')">应用系统</a>
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
                <div class="tab-pane active" id="endpoint" role="tabpanel">
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
            <div class="col-md-4">
              <div class="d-flex flex-column">
                <div class="d-flex flex-row">
                  <div class="mb-2 btn-group card-head" data-toggle="buttons">
                    <label role='button' class="btn btn-secondary active" @click="changePieData('package')"
                           v-if="current_choice.pack_num">
                      <input type="radio" name="options" id="option1" checked> package
                    </label>
                    <label role='button' class="btn btn-secondary" @click="changePieData('flow')"
                           v-if="current_choice.flow_count">
                      <input type="radio" name="options" id="option2"> flow
                    </label>
                  </div>
                </div>
                <div class="d-flex flex-row">
                  <div id="pie-container" style="width: 100%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Highcharts from 'highcharts';
  import { history_data, data_application, data_udp, data_tcp, data_ip, data_endpoint } from '../../static/data';

  let enable = {
    endpoint: {
      name: true,
      pack_num: true,
      flow_count: true,
    },
    tcp: {
      from: true,
      to: true,
      pack_num: true,
      flow_count: true,
    },
    udp: {
      from: true,
      to: true,
      pack_num: true,
      flow_count: true,
    },
    ip: {
      from: true,
      to: true,
      pack_num: true,
      flow_count: true,
    },
    application: {
      name: true,
      protocol: true,
      pack_num: true,
      flow_count: true,
    }
  };
  export default {
    name: 'history-flow',
    data: function () {
//      console.log(history_data);
      let date = new Date();
      return {
        history: history_data,
        chart: null,
        pie_chart: null,
        detailStart: Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getDate()),
        detailEnd: Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getDate() - 1),
        current_data: data_endpoint,
        enable: enable,
        current_choice: enable.endpoint,
        current_tab: 'package',
      };
    },
    methods: {
      changeChoice: function (item) {
        this.current_choice = item;
      },
      changePieData: function (item) {
        const self = this;
        let pie_data = [];
        self.current_tab = item;
        switch (item) {
          case 'package':
            this.current_data.forEach(item => {
              if (self.current_choice.name) {
                pie_data.push([item.name, item.pack_num]);
              } else {
                pie_data.push([item.from + ' -> ' + item.to, item.pack_num]);
              }
            });
            break;
          case 'flow':
            this.current_data.forEach(item => {
              if (self.current_choice.name) {
                pie_data.push([item.name, item.flow_count]);
              } else {
                pie_data.push([item.from + ' -> ' + item.to, item.flow_count]);
              }
            });
            break;
        }
        console.log(pie_data);
        self.pie_chart.series[0].setData(pie_data);
      },
      changeData: function (item) {
        const self = this;
        switch (item) {
          case 'endpoint':
            self.changeChoice(enable.endpoint);
            self.current_data = data_endpoint;
            break;
          case 'application':
            self.changeChoice(enable.application);
            self.current_data = data_application;
            break;
          case 'ip':
            self.changeChoice(enable.ip);
            self.current_data = data_ip;
            break;
          case 'udp':
            self.changeChoice(enable.udp);
            self.current_data = data_udp;
            break;
          case 'tcp':
            self.changeChoice(enable.tcp);
            self.current_data = data_tcp;
            break;
        }
        self.changePieData(self.current_tab);
      },
      createMaster: function () {
        const self = this;
        self.chart = new Highcharts.chart('master-container', {
          chart: {
            zoomType: 'x'
          },
          title: {
            text: '历史流量图'
          },
          xAxis: {
            type: 'datetime',
//            minRange: 24 * 3600000,
            dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%m-%d',
              week: '%m-%d',
              month: '%Y-%m',
              year: '%Y'
            }
          },
          tooltip: {
            dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%Y-%m-%d',
              week: '%m-%d',
              month: '%Y-%m',
              year: '%Y'
            },
            formatter: function () {
              let point = this.point;
              return '<b>' + point.series.name + '</b><br/>' +
                Highcharts.dateFormat('%A %B %e %Y', this.x) + ':<br/>' +
                Highcharts.numberFormat(point.y, 2) + 'Mbps';
            }
          },
          yAxis: {
            title: {
              text: 'Mbps'
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            area: {
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
              },
              marker: {
                radius: 2
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
              threshold: null
            }
          },
          series: [{
            type: 'area',
            name: '流速',
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2014, 2, 18),
            data: self.history
          }],
        });
      },
      createPie: function () {
        this.pie_chart = new Highcharts.chart('pie-container', {
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
            layout: 'vertical',
          },
          series: [{
            type: 'pie',
            name: '各网段流量比',
            data: [],
          }]
        });
      }
    },
    mounted: function () {
      this.createMaster();
      this.createPie();
      this.changeData('segment');
    }
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  #history-flow
    position: relative
    padding: 24px
    overflow: auto
    height: 100%
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
      .chart-menubar
        padding-left: 30px
        padding-top: 16px
        height: 60px
        .my-sapn
          align-items: center
          display: flex
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
        &.btn-group
          margin-top: 10px
          min-height: 0px
      .card-body
        padding: 24px
        position: relative
        &:last-child
          border-radius: 0 0 2px 2px
    #master-container
      position: relative
      width: 100%

</style>
