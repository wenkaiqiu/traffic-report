<template>
  <div id="real-time">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div id="container" style="min-width:400px;height:400px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts';
  require('highcharts/highcharts-more')(Highcharts);
  import { ranges, averages } from '../../static/data';

  export default {
    name: 'real-time',
    data: function () {
      return {
        range_data: ranges,
        average_data: averages,
      };
    },
    mounted: function () {
      const self = this;

      let chart = new Highcharts.chart('container', {
        title: {
          text: '某地7月份气温范围及平均值'
        },
        xAxis: {
          type: 'datetime',
          //tickInterval: 7 * 24 * 60 * 60 * 1000,
          dateTimeLabelFormats: {
            week: '%Y-%m-%d'
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
          valueSuffix: '°C',
          dateTimeLabelFormats: {
            day: '%Y-%m-%d'
          }
        },
        legend: {},
        series: [{
          name: '气温',
//          data: self.average_data,
          data: averages,
          zIndex: 1,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[0]
          }
        }, {
          name: '范围',
          data: ranges,
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

    #container
      position: relative
</style>
