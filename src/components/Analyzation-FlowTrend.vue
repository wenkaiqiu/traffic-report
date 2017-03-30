<template>
  <div id="real-time">
    <div class="card d-flex flex-column">
      <div class="d-flex flex-row">
        <div class="mb-2 btn-group card-body" data-toggle="buttons">
          <label role='button' class="btn btn-secondary active" @click="predictDay">
            <input type="radio" name="options" id="option1" checked> 7天
          </label>
          <label role='button' class="btn btn-secondary" @click="predictWeek">
            <input type="radio" name="options" id="option2"> 31天
          </label>
          <label role='button' class="btn btn-secondary" @click="predictMon">
            <input type="radio" name="options" id="option3"> 365天
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
  import { ranges, averages,averages_week, ranges_week, averages_hour, ranges_hour} from '../../static/data';

  export default {
    name: 'real-time',
    data: function () {
      return {
        range_data: ranges,
        average_data: averages,
        chart: null,
      };
    },
    methods: {
      predictDay: function () {
        console.log("1111111");
        this.chart.series[0].setData(averages_hour);
        this.chart.series[1].setData(ranges_hour);
        this.chart.xAxis[0].update({
          tickInterval: 60 * 60 * 1000,
          dateTimeLabelFormats: {
            hour: '%H:%M',
          }
        });
      },
      predictWeek: function () {
        console.log("2222222");
        this.chart.series[0].setData(averages_week);
        this.chart.series[1].setData(ranges_week);
        this.chart.xAxis[0].update({
          tickInterval: 24 * 60 * 60 * 1000,
          dateTimeLabelFormats: {
            day: '%Y-%m-%d'
          }
        });
      },
      predictMon: function () {
        console.log("333333");
        this.chart.series[0].setData(averages);
        this.chart.series[1].setData(ranges);
        this.chart.xAxis[0].update({
          tickInterval: 7 * 24 * 60 * 60 * 1000,
          dateTimeLabelFormats: {
            week: '%Y-%m-%d'
          }
        });
      }
    },
    mounted: function () {
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
          valueSuffix: ' Mbps',
          dateTimeLabelFormats: {
            day: '%Y-%m-%d'
          }
        },
        legend: {},
        series: [{
          name: '流速',
//          data: self.average_data,
          data: averages_hour,
          zIndex: 1,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[0]
          }
        }, {
          name: '范围',
          data: ranges_hour,
//          data: self.range_data,
          type: 'arearange',
          lineWidth: 0,
          linkedTo: ':previous',
          color: Highcharts.getOptions().colors[0],
          fillOpacity: 0.3,
          zIndex: 0
        }]
      });
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
