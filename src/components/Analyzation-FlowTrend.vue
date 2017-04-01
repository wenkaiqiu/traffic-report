<template>
  <div id="real-time">
    <div class="card d-flex flex-column">
      <div class="d-flex flex-row">
        <div class="mb-2 btn-group card-body" data-toggle="buttons">
          <label role='button' class="btn btn-secondary active" @click="changeInterval('week')">
            <input type="radio" name="week" id="btn_week" value="week" checked> 7天
          </label>
          <label role='button' class="btn btn-secondary" @click="changeInterval('month')">
            <input type="radio" name="month" id="btn_month" value="month"> 31天
          </label>
          <label role='button' class="btn btn-secondary" @click="changeInterval('year')">
            <input type="radio" name="year" id="btn_year" value="year"> 365天
          </label>
        </div>
      </div>
      <div class="d-flex flex-row">
        <div id="container" style="min-width:400px;height:400px"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts';
  require('highcharts/highcharts-more')(Highcharts);

  export default {
    name: 'real-time',
    data: function () {
      return {
        data_chart: null,
        interval: null,
        range_data: null,
        average_data: null,
        chart: null,
      };
    },
    methods: {
      formatData(data, base, type){
        let loc_data;
        let ran = Math.random() / 10;//0-10%
        if (type == 0) {
          let loc_base = base * (1 - ran);
          if (data > loc_base)
            loc_data = data;
          else
            loc_data = loc_base;
        } else if (type == 1) {
          let loc_base = base * (1 + ran);
          if (data < loc_base)
            loc_data = data;
          else
            loc_data = loc_base;
        }
        return this.toKB(loc_data);
      },
      toKB(Bytes){
        return Bytes / 1024;
      },
      changeInterval(interval){
        const self = this;
        self.chart.showLoading();
        self.interval = interval;
        const loc_interval = self.interval;
        const resource = self.$resource(window.location.protocol+'//'+window.location.hostname+process.env.DATA_PREDICT);
        console.log(loc_interval);
        self.getTaskId().then(response => {
          let finished = false;
          console.log(response.task_id);
          let time;
          switch (loc_interval) {
            case 'week':
              time = 2000;
              break;
            case 'month':
              time = 3000;
              break;
            case 'year':
              time = 5000;
              break;
          }
          ;
          let loc_timer = setInterval(() => {
            console.log(!finished);
            console.log(window.location.protocol+'//'+window.location.hostname+process.env.DATA_PREDICT);
            if (!finished) {
              resource.get({task_id: response.task_id})
                .then(res => {
                  console.log(res.data);
                  if (res.data.state === 'SUCCESS') {
                    finished = true;
                    console.log(res.data.result.result);
                    let loc_data = [[], []];
                    res.data.result.result.forEach(item => {
                      let loc_time = new Date(item.ds).getTime();
                      loc_data[0].push([loc_time, self.toKB(item.yhat)]);
                      loc_data[1].push([loc_time, self.formatData(item.yhat_lower, item.yhat, 0), self.formatData(item.yhat_upper, item.yhat, 1)]);
                    });
                    console.log(loc_data);
                    switch (loc_interval) {
                      case 'week':
                        self.predictWeek(loc_data);
                        break;
                      case 'month':
                        self.predictMon(loc_data);
                        break;
                      case 'year':
                        self.predictYear(loc_data);
                        break;
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                })
            } else {
              clearInterval(loc_timer);
            }
          }, time);
        });
      },
      getTaskId: function () {
        const self = this;
        const resource = self.$resource(window.location.protocol+'//'+window.location.hostname+process.env.INFO_PREDICT + self.interval + '/');
        console.log('Predict Info: ', window.location.protocol+'//'+window.location.hostname+process.env.INFO_PREDICT + self.interval + '/')
        return resource.get()
          .then(res => {
            console.log(res.data);
            return res.data;
          })
          .catch(err => {
            console.error(err);
          });
      },
      predictWeek: function (data) {
        const self = this;
        console.log("1111111");
        this.chart.series[0].setData(data[0]);
        this.chart.series[1].setData(data[1]);
        self.chart.hideLoading();
        this.chart.xAxis[0].update({
          tickInterval: 24 * 60 * 60 * 1000,
          dateTimeLabelFormats: {
            day: '%Y-%m-%d'
          }
        });
      },
      predictMon: function (data) {
        const self = this;
        console.log("2222222");
        this.chart.series[0].setData(data[0]);
        this.chart.series[1].setData(data[1]);
        self.chart.hideLoading();
        this.chart.xAxis[0].update({
          tickInterval: 7 * 24 * 60 * 60 * 1000,
          dateTimeLabelFormats: {
            day: '%Y-%m-%d'
          }
        });
      },
      predictYear: function (data) {
        const self = this;
        console.log("333333");
        this.chart.series[0].setData(data[0]);
        this.chart.series[1].setData(data[1]);
        self.chart.hideLoading();
        this.chart.xAxis[0].update({
          tickInterval: 30 * 7 * 24 * 60 * 60 * 1000,
          dateTimeLabelFormats: {
            week: '%Y-%m-%d'
          }
        });
      },
      creatChart: function () {
        const self = this;
        self.chart = new Highcharts.chart('container', {
          title: {
            text: '流速趋势图'
          },
          xAxis: {
            type: 'datetime',
            tickInterval: 60 * 60 * 1000,
            dateTimeLabelFormats: {
              hour: '%H:%M',
            }
          },
          yAxis: {
            title: {
              text: null
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true,
            dateTimeLabelFormats: {
              day: '%Y-%m-%d'
            },
          },
          legend: {},
          series: [{
            name: '流量',
            data: [],
            zIndex: 1,
            marker: {
              fillColor: 'white',
              lineWidth: 2,
              lineColor: Highcharts.getOptions().colors[0]
            },
            tooltip: {
              valueDecimals: 2,
            }
          }, {
            name: '范围',
            data: [],
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0,
            tooltip: {
              valueDecimals: 2,
            }
          }]
        });
      },
    },

    mounted: function () {
      const self = this;
      Highcharts.setOptions({
        lang: {
          loading: '数据加载中...'  // 加载中文字配置
        }
      });
      self.creatChart();
      self.changeInterval('week');
    }
  };
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  #real-time
    position: relative
    padding: 24px
    overflow: auto
    height: 100%
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
      .my-options
        border-radius: 0 0 2px 2px
    #container
      flex: 1
      position: relative
      width: 100%
</style>
