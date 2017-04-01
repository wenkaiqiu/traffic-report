<template>
  <div id="history-flow">
    <div class="card">
      <div class="row justify-content-center p-2">
        <h2>历史流量分析</h2>
      </div>
      <div class="row">
        <div class="col-md-12 ">
          <div class="d-flex flex-row justify-content-around chart-menubar">
            <!--<div class="btn-group" role="group" aria-label="Time interval">-->
            <!--<span class="my-sapn mr-sm-2">时间间隔</span>-->
            <!--<button role="button" type="button" class="btn btn-secondary">min</button>-->
            <!--<button role="button" type="button" class="btn btn-secondary">h</button>-->
            <!--<button role="button" type="button" class="btn btn-secondary">day</button>-->
            <!--<button role="button" type="button" class="btn btn-secondary">mon</button>-->
            <!--</div>-->
            <div class="form-inline">
              <label for="time-start" class="mr-sm-2">开始时间</label>
              <input class="form-control mb-2 mr-sm-2 mb-sm-0" type="datetime-local" v-model="start_time"
                     id="time-start">
              <label for="time-end" class="mr-sm-2">结束时间</label>
              <input class="form-control mb-2 mr-sm-2 mb-sm-0" type="datetime-local" v-model="end_time"
                     id="time-end">
              <button role="button" type="button" class="btn btn-primary mr-sm-2" v-on:click="changeTime()">更新</button>
              <button role="button" type="button" class="btn btn-secondary" @click="downloadHistory()">下载流量记录</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div id="master-container" class="col-9" style="height:400px"></div>
        <div class="col-md-3">
          <div class="d-flex flex-column">
            <div class="d-flex flex-row">
              <div id="pie-container" style="width: 100%; height:400px;"></div>
            </div>
            <div class="d-flex flex-row justify-content-around" style="height: 38px">
              <div class="btn-group" role="group">
                <button role='button' type="button" class="btn btn-sm btn-secondary"
                        v-bind:class="{'active': pie_choice==='flow'}" @click="changeChoice('flow')">流量


                </button>
                <button role='button' type="button" class="btn btn-sm btn-secondary"
                        v-bind:class="{'active': pie_choice==='packet'}" @click="changeChoice('packet')">包数


                </button>
              </div>
              <div class="d-flex flex-row" v-if="hasPartition">
                <div class="form-check form-check-inline d-flex align-items-center">
                  <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="radio_total" id="radio_total"
                           value="total" v-model="partition_type" @click="changePartition('total')">总
                  </label>
                </div>
                <div class="form-check form-check-inline d-flex align-items-center">
                  <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="radio_download" id="radio_download"
                           value="download" v-model="partition_type" @click="changePartition('download')">接收
                  </label>
                </div>
                <div class="form-check form-check-inline d-flex align-items-center">
                  <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="radio_upload" id="radio_upload"
                           value="upload" v-model="partition_type" @click="changePartition('upload')">发送
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card-head">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs nav-fill" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tab-endpoint" role="tab"
                   @click="changeType('endpoint')">节点信息</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab-application" role="tab"
                   @click="changeType('application')">应用信息</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab-ip" role="tab"
                   @click="changeType('ip')">IP会话</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab-tcp" role="tab"
                   @click="changeType('tcp')">TCP会话</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab-udp" role="tab"
                   @click="changeType('udp')">UDP会话</a>
              </li>
            </ul>
          </div>
          <!-- Tab panes -->
          <div class="card-body tab-content">
            <div class="tab-pane active" id="tab-endpoint" role="tabpanel">
              <table id="table_endpoint" class="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead class="thead-default">
                <tr>
                  <th>IP</th>
                  <th>节点名称</th>
                  <th>接收流量</th>
                  <th>发送流量</th>
                  <th>接收包数</th>
                  <th>发送包数</th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="tab-pane" id="tab-application" role="tabpanel">
              <table id="table_application" class="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead class="thead-default">
                <tr>
                  <th>应用名</th>
                  <th>流量</th>
                  <th>包数</th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="tab-pane" id="tab-ip" role="tabpanel">
              <table id="table_ip" class="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead class="thead-default">
                <tr>
                  <th>源IP</th>
                  <th>源节点</th>
                  <th>目的IP</th>
                  <th>目的节点</th>
                  <th>接收流量</th>
                  <th>发送流量</th>
                  <th>接收包数</th>
                  <th>发送包数</th>
                  <th>协议</th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="tab-pane" id="tab-tcp" role="tabpanel">
              <table id="table_tcp" class="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead class="thead-default">
                <tr>
                  <th>源IP</th>
                  <th>源节点</th>
                  <th>目的IP</th>
                  <th>目的节点</th>
                  <th>接收流量</th>
                  <th>发送流量</th>
                  <th>接收包数</th>
                  <th>发送包数</th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="tab-pane" id="tab-udp" role="tabpanel">
              <table id="table_udp" class="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead class="thead-default">
                <tr>
                  <th>源IP</th>
                  <th>源节点</th>
                  <th>目的IP</th>
                  <th>目的节点</th>
                  <th>接收流量</th>
                  <th>发送流量</th>
                  <th>接收包数</th>
                  <th>发送包数</th>
                </tr>
                </thead>
              </table>
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
  import dt from 'datatables.net';
  import bs4 from 'datatables.net-bs4';
  import 'datatables.net-bs4/css/dataTables.bootstrap4.css';

  function formatIP(ip) {
    let ret = '' + ip & 255;
    for (let i = 1; i < 4; i++)
      ret = '' + ((ip >> (i * 8)) & 255) + '.' + ret;
    return ret;
  };
  const columns_type = {
    'endpoint': [
      {"data": "ip"},
      {"data": "ip_node"},
      {"data": "rx",},
      {"data": "tx"},
      {"data": "rx_packets"},
      {"data": "tx_packets"},
    ],
    'application': [
      {"data": "protocol"},
      {"data": "bytes"},
      {"data": "packets"},
    ],
    'ip': [
      {"data": "left"},
      {"data": "left_node"},
      {"data": "right"},
      {"data": "right_node"},
      {"data": "rx"},
      {"data": "tx"},
      {"data": "rx_packets"},
      {"data": "tx_packets"},
      {"data": "ip_type"},
    ],
    'tcp': [
      {"data": "left"},
      {"data": "left_node"},
      {"data": "right"},
      {"data": "right_node"},
      {"data": "rx"},
      {"data": "tx"},
      {"data": "rx_packets"},
      {"data": "tx_packets"},
    ],
    'udp': [
      {"data": "left"},
      {"data": "left_node"},
      {"data": "right"},
      {"data": "right_node"},
      {"data": "rx"},
      {"data": "tx"},
      {"data": "rx_packets"},
      {"data": "tx_packets"},
    ],
  };
  const ajax_process = {
    'endpoint': item => {
      return {
        "rx": item.rx,
        "tx": item.tx,
        "rx_packets": item.rx_packets,
        "tx_packets": item.tx_packets,
        "ip": formatIP(item.ip),
        "ip_node": item.ip_node,
      };
    },
    'application': item => {
      return {
        'bytes': item.bytes,
        'packets': item.packets,
        'protocol': item.protocol,
      };
    },
    'ip': item => {
      return {
        "rx": item.rx,
        "tx": item.tx,
        "rx_packets": item.rx_packets,
        "tx_packets": item.tx_packets,
        "left": formatIP(item.left),
        "left_node": item.left_node,
        "right": formatIP(item.right),
        "right_node": item.right_node,
        'ip_type': (item.ip_type == 44) ? 'TCP' : ((item.ip_type == 45) ? 'UDP' : '空'),
      };
    },
    'tcp': item => {
      return {
        "rx": item.rx,
        "tx": item.tx,
        "rx_packets": item.rx_packets,
        "tx_packets": item.tx_packets,
        "left": formatIP(item.left),
        "left_node": item.left_node,
        "right": formatIP(item.right),
        "right_node": item.right_node,
      };
    },
    'udp': item => {
      return {
        "rx": item.rx,
        "tx": item.tx,
        "rx_packets": item.rx_packets,
        "tx_packets": item.tx_packets,
        "left": formatIP(item.left),
        "left_node": item.left_node,
        "right": formatIP(item.right),
        "right_node": item.right_node,
      };
    },

  };
  const language = {
    'endpoint': '节点信息',
    'application': '应用信息',
    'ip': 'IP会话',
    'udp': 'UDP会话',
    'tcp': 'TCP会话',
    'packet': '包数',
    'flow': '流量',
    'total': '总',
    'download': '接收',
    'upload': '发送',
  };
  //用于可下钻的饼图
  //  const choice_type = {
  //    'endpoint': true,
  //    'application': false,
  //    'ip': true,
  //    'tcp': true,
  //    'udp': true,
  //  };
  export default {
    name: 'history-flow',
    data: function () {
      return {
        start_time: null,
        end_time: null,
        data_type: null,
        data_table: [],

        //图表元素
        table: null,
        pie: null,
        master: null,
        //图表属性
        hasPartition: null,
        partition_type: null,
        pie_choice: null,
        data_filtered: [],
        data_pie: [],
        data_history: [],
      };
    },
    methods: {
      init: function () {
        const self = this;
        //0.自定义DataTable
        self.customDataTable();
        //1. 初始化起止时间：最近一天
        let date = new Date();
        self.end_time = date.getFullYear() + '-' + self.formatMon(date.getMonth() + 1) + '-' + self.formatMon(date.getDate()) + 'T00:00:00';
        date.setDate(date.getDate() - 1);
        self.start_time = date.getFullYear() + '-' + self.formatMon(date.getMonth() + 1) + '-' + self.formatMon(date.getDate()) + 'T00:00:00';
        console.log(self.start_time);
        //2.创建图表Master，并设置数据
        self.createMaster();
        self.reloadMaster();
        //3. 初始化数据
        self.data_type = 'endpoint';
        self.pie_choice = 'flow';
        self.partition_type = 'total';
//        self.getData(); //使用DataTable后，由DataTable发起ajax请求，故不需要调用该方法
        self.changeType(self.data_type);
      },
      checkTime(time){
        //仅检查时间部分
        console.log('check time ', time);
        let date = time.split('T');
        let loc_time = date[1].split(':');
        if (loc_time.length != 3)
          return time + ':01';
        return time;
      },
      customDataTable(){
        $.fn.dataTableExt.aTypes.push(
          function (sData) {
            let sValidChars = "0123456789.-";
            let Char;

            /* Check the numeric part */
            for (let i = 1; i < sData.length; i++) {
              Char = sData.charAt(i);
              if (sValidChars.indexOf(Char) == -1) {
                return null;
              }
            }
            let str = String(sData);
            let ip = str.split('.');
            if (ip.length != 4)
              return null;
            for (let i of ip) {
              if (parseInt(i) > 255)
                return null;
            }
            return 'ip';
          }
        );
        $.fn.dataTableExt.oSort['ip-asc'] = function (x, y) {
          let ip1 = x.split('.');
          let ip2 = y.split('.');
          let ret = 0;
          for (let i = 0; i < 4; i++) {
            ret = (parseInt(ip1[i]) < parseInt(ip2[i])) ? -1 : ((parseInt(ip1[i]) > parseInt(ip2[i])) ? 1 : 0)
            if (ret != 0)
              return ret;
          }
          return ret;//最终只可能是0
        };

        $.fn.dataTableExt.oSort['ip-desc'] = function (x, y) {
          let ip1 = x.split('.');
          let ip2 = y.split('.');
          let ret = 0;
          for (let i = 0; i < 4; i++) {
            ret = (parseInt(ip1[i]) < parseInt(ip2[i])) ? 1 : ((parseInt(ip1[i]) > parseInt(ip2[i])) ? -1 : 0)
            if (ret != 0)
              return ret;
          }
          return ret;//最终只可能是0
        };
      },
      formatMon(mon){
        return '' + Math.floor(mon / 10) + mon % 10;
      },
      toKB(Bytes){
        return Bytes / 1024;
      },
      toMB(Bytes){
        return Bytes / 1024 / 1024;
      },
      getURL: function (type) {
        const self = this;
        let loc_url = '';
        switch (type) {
          case 'endpoint':
            loc_url = window.location.protocol+'//'+window.location.hostname+process.env.DATA_ENDPOINT;
            break;
          case 'application':
            loc_url = window.location.protocol+'//'+window.location.hostname+process.env.DATA_APPLICATION;
            break;
          case 'ip':
            loc_url = window.location.protocol+'//'+window.location.hostname+process.env.DATA_CONVERSATION;
            break;
          case 'tcp':
            loc_url = window.location.protocol+'//'+window.location.hostname+process.env.DATA_CONVERSATION;
            break;
          case 'udp':
            loc_url = window.location.protocol+'//'+window.location.hostname+process.env.DATA_CONVERSATION;
            break;
        }
        //替换loc_url中的占位符{start_time}和{end_time}
        loc_url = loc_url.replace('{start_time}', self.start_time);
        loc_url = loc_url.replace('{end_time}', self.end_time);
        console.log('loc_url = ' + loc_url);
        return loc_url;
      },
      //使用DataTable后，由DataTable发起ajax请求，此方法暂时无用，故注释
      //      getData: function () {
      //        const self = this;
      //        let type = self.data_type;//获取当前要获取的数据类型
      //        let resource = null;
      //
      //        switch (type) {
      //          case 'endpoint':
      //            resource = self.$resource(window.location.protocol+'//'+window.location.hostname+process.env.DATA_ENDPOINT);
      //            break;
      //          case 'application':
      //            resource = self.$resource(window.location.protocol+'//'+window.location.hostname+process.env.DATA_APPLICATION);
      //            break;
      //          case 'conv':
      //            resource = self.$resource(window.location.protocol+'//'+window.location.hostname+process.env.DATA_CONVERSATION);
      //            break;
      //        }
      //        return resource.get({ start_time: '2017-03-01', end_time: '2017-03-31' })
      //          .then(res => {
      //            console.log(res);
      //            console.log(res.data);
      //            return res.data;
      //          })
      //          .catch(err => {
      //            console.error(err);
      //          });
      //      },
      getMasterData: function () {
        const self = this;
        const resource = self.$resource(window.location.protocol+'//'+window.location.hostname+process.env.DATA_HISTORY);
        return resource.get({start_time: self.start_time, end_time: self.end_time})
          .then(res => {
//            console.log(res.data);
            return res.data;
          })
          .catch(err => {
            console.error(err);
          })
      },
      reloadMaster(){
        const self = this;
        let diff = new Date(self.end_time) - new Date(self.start_time);
        let tag_m = true;
        if (diff <= 24 * 60 * 60 * 1000)
          tag_m = false;
        self.getMasterData().then(res => {
          let loc_data = {
            'flow': [],
            'packets': [],
          };
          res.forEach(item => {
            let time = new Date(item.ticker).getTime();
            loc_data['flow'].push([time, tag_m ? self.toMB(item.bytes) : self.toKB(item.bytes)]);
            loc_data['packets'].push([time, tag_m ? (item.packets / 1000) : (item.packets)]);
          });
          self.data_history = loc_data;
//          console.log(self.data_history);
          self.master.series[0].setData(self.data_history['flow']);
          self.master.series[1].setData(self.data_history['packets']);
          self.master.hideLoading();
          console.log('tag_m', tag_m);
          if (!tag_m) {
            self.master.update({
              yAxis: [{
                labels: {
                  format: '{value}KB',
                },
              }, {
                labels: {
                  format: '{value}/s',
                },
              }],
              series: [{
                tooltip: {
                  valueSuffix: 'KB',
                  valueDecimals: 2,
                }
              }, {
                tooltip: {
                  valueSuffix: ''
                }
              }],
            });
          }
        });

      },
      //更改显示的数据的时间
      changeTime: function () {
        const self = this;
        self.pie.showLoading();
        self.master.showLoading();
        self.start_time = self.checkTime(self.start_time);
        self.end_time = self.checkTime(self.end_time);
        //由于v-model将数据与dom元素绑定，不需传入参数或手动赋值
        self.reloadMaster();
        self.reloadTable();//由于ajax的异步问题，pie的reload在datatable的ajax属性中调用
      },
      //更改显示的数据内容
      changeType: function (type) {
        const self = this;
        self.data_type = type;
        self.createTable(self.data_type);
      },
      changeChoice: function (type) {
        const self = this;
        self.pie_choice = type;
        self.pie.showLoading();
        self.setChoice(type);
        //切换choice时，将Partition重置为total
        self.setPartition('total');
        self.setPieData();
      },
      changePartition: function (type) {
        const self = this;
        self.pie.showLoading();
        self.setPartition(type);
        self.setPieData();
      },
      createTable: function (type) {
        const self = this;
        //创建前先销毁原表格
        if (!!self.table)
          self.table.destroy();
        let loc_url = self.getURL(type);
        let element = element = $('#table_' + type);

        self.table = element.DataTable({
//          "columnDefs": [ {
//            "targets": [2,3],
//            "createdCell": function (td, cellData, rowData, row, col) {
//              console.log("---");
//              if ( cellData < 1 ) {
//                console.log(cellData);
//                $(td).css('color', 'red')
//              }
//            }
//          } ],
          "processing": true,
          "lengthChange": false,
          language: {
            search: '<span class="label label-success">搜索：</span>',//右上角的搜索文本，可以写html标签
            processing: "处理中……",
            paginate: {//分页的样式内容。
              previous: "上一页",
              next: "下一页",
              first: "第一页",
              last: "最后"
            },

            zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
            //下面三者构成了总体的左下角的内容。
            info: "总共_PAGES_ 页，显示第_START_ 到第 _END_ ，筛选之后得到 _TOTAL_ 条，初始_MAX_ 条 ",//左下角的信息显示，大写的词为关键字。
            infoEmpty: "0条记录",//筛选为空时左下角的显示。
            infoFiltered: ""//筛选之后的左下角筛选提示，
          },
          "ajax": {
            "url": '' + loc_url,
            "dataSrc": function (json) {
              let loc_data = json;
              if (self.data_type === 'tcp')
                loc_data = json.filter(item => item.ip_type == 44);
              else if (self.data_type === 'udp')
                loc_data = json.filter(item => item.ip_type == 45);
              let res = loc_data.map(ajax_process[type]);
//              console.log(res);
              self.data_table = res;//为饼图提供数据
              self.createPie();
              return res;
            },
          },
          "columns": columns_type[type],
        });
        $("#table_" + self.data_type + "_wrapper").addClass('flex-column').removeClass('form-inline');
        $("#table_local_filter input[type=search]").css({width: "auto"});//右上角的默认搜索文本框，不写这个就超出去了。
        $("div.col-xs-12").addClass('col-12');
      },
      reloadTable: function () {
        const self = this;
        self.table.ajax.url(self.getURL(self.data_type)).load();
      },
      createMaster: function () {
        const self = this;
        Highcharts.setOptions({
          lang: {
            loading: '数据加载中...'  // 加载中文字配置
          }
        });
        self.master = new Highcharts.chart('master-container', {
          chart: {
            zoomType: 'x',
            type: 'areaspline',
            events: {
              selection: function (event) {
                let loc_min = event.xAxis[0].min;
                let loc_max = event.xAxis[0].max;
                if ((loc_max - loc_min) < 3 * 60 * 1000)
                  loc_max = loc_min + 3 * 60 * 1000;
                let current = new Date().getTime();
                if (loc_max > current) {
                  loc_max = current;
                  loc_min = loc_max - 3 * 60 * 1000;
                }
                let loc_start = Highcharts.dateFormat('%Y-%m-%dT%H:%M:%S', loc_min);
                let loc_end = Highcharts.dateFormat('%Y-%m-%dT%H:%M:%S', loc_max);
                console.log(loc_start, ' ', loc_end);

                self.start_time = loc_start;
                self.end_time = loc_end;
                self.changeTime();

                return false;
              }
            },
          },
          title: {
            text: '历史流量图'
          },
          credits: {enabled: false},
          xAxis: {
            type: 'datetime',
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
            shared: true,
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
          },
          yAxis: [{
            labels: {
              format: '{value}MB',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            title: {
              text: '流量',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            }
          }, {
            labels: {
              format: '{value}K/s',
              style: {
                color: Highcharts.getOptions().colors[0]
              },
            },
            title: {
              text: '包数',
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            opposite: true,
          }],
          legend: {
            enabled: false
          },
          plotOptions: {
            areaspline: {
              marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                  hover: {
                    enabled: true
                  }
                }
              },
              lineWidth: 2,
              states: {
                hover: {
                  lineWidth: 3
                }
              },
            }
          },
          series: [{
            name: '流量',
//            pointInterval: 24 * 3600 * 1000,
//            pointStart: Date.UTC(2014, 2, 18),
            data: [],
            tooltip: {
              valueSuffix: 'MB',
              valueDecimals: 2,
            },
            fillOpacity: 0.4
          }, {
            name: '包数',
            yAxis: 1,
            data: [],
            tooltip: {
              valueSuffix: 'K'
            },
            fillOpacity: 0.3
          }],
        });
        self.master.showLoading();
      },
      createPie: function () {
        const self = this;
        //先设置属性，再创建饼图对象，再向其添加数据
        self.setChoice(self.pie_choice);
        self.setPartition(self.partition_type);
        if (!!self.pie) {
          self.pie.destroy();
        }
//        if (choice_type[type]) {
//          self.createDrilldownPie();
//        } else {
        self.createSimplePie();
//        }
        self.pie.showLoading();
        self.setPieData();
      },
      setChoice: function (type) {
        const self = this;
        //过滤数据
        let loc_data = [];
        switch (type) {
          case 'flow':
            switch (self.data_type) {
              case 'endpoint':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': data.ip + '/' + data.ip_node,
                    'download': data.rx,
                    'upload': data.tx,
                    'total': data.rx + data.tx,
                  };
                });
                break;
              case 'application':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': data.protocol,
                    'total': data.bytes,
                  };
                });
                break;
              case 'ip':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': 'from ' + data.left + '/' + data.left_node + '<br/>to ' + data.right + '/' + data.right_node + '<br/>' + data.ip_type,
                    'download': data.rx,
                    'upload': data.tx,
                    'total': data.rx + data.tx,
                  };
                });
                break;
              case 'tcp':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': 'from ' + data.left + '/' + data.left_node + '<br/>to ' + data.right + '/' + data.right_node,
                    'download': data.rx,
                    'upload': data.tx,
                    'total': data.rx + data.tx,
                  };
                });
                break;
              case 'udp':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': 'from ' + data.left + '/' + data.left_node + '<br/>to ' + data.right + '/' + data.right_node,
                    'download': data.rx,
                    'upload': data.tx,
                    'total': data.rx + data.tx,
                  };
                });
                break;
            }
            break;
          case 'packet':
            switch (self.data_type) {
              case 'endpoint':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': data.ip + '/' + data.ip_node,
                    'download': data.rx_packets,
                    'upload': data.tx_packets,
                    'total': data.rx_packets + data.tx_packets
                  };
                });
                break;
              case 'application':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': data.protocol,
                    'total': data.packets
                  };
                });
                break;
              case 'ip':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': 'from ' + data.left + '/' + data.left_node + '<br/>to ' + data.right + '/' + data.right_node + '<br/>' + data.ip_type,
                    'download': data.rx_packets,
                    'upload': data.tx_packets,
                    'total': data.rx_packets + data.tx_packets
                  };
                });
                break;
              case 'tcp':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': 'from ' + data.left + '/' + data.left_node + '<br/>to ' + data.right + '/' + data.right_node,
                    'download': data.rx_packets,
                    'upload': data.tx_packets,
                    'total': data.rx_packets + data.tx_packets
                  };
                });
                break;
              case 'udp':
                loc_data = self.data_table.map(data => {
                  return {
                    'name': 'from ' + data.left + '/' + data.left_node + '<br/>to ' + data.right + '/' + data.right_node,
                    'download': data.rx_packets,
                    'upload': data.tx_packets,
                    'total': data.rx_packets + data.tx_packets
                  };
                });
                break;
            }
            break;
        }
        self.data_filtered = loc_data;
      },
      setPartition(type){
        const self = this;
        self.partition_type = type;
        switch (self.data_type) {
          case 'endpoint':
            self.hasPartition = true;
            break;
          case 'application':
            self.hasPartition = false;
            break;
          case 'ip':
            self.hasPartition = true;
            break;
          case 'tcp':
            self.hasPartition = true;
            break;
          case 'udp':
            self.hasPartition = true;
            break;
        }
        console.log('hasPartition: ' + self.hasPartition);
        console.log('partition: ' + self.partition_type);
        //过滤数据
        let loc_data = null;
        if (self.hasPartition) {
          loc_data = self.data_filtered.map(data => {
            return [data.name, data[self.partition_type]];
          });
        } else {
          loc_data = self.data_filtered.map(data => {
            return [data.name, data['total']];
          });
        }
        self.data_pie = loc_data.sort((a, b) => {
          return (a[1] > b[1]) ? -1 : ((a[1] < b[1]) ? 1 : 0);
        });
        if (self.pie != null)
          self.pie.update({
            series: [{
              name: '各' + language[self.data_type] + language[self.partition_type] + language[self.pie_choice],
            }]
          })
      },
      setPieData: function () {
        const self = this;
        self.pie.setTitle({text: '各' + language[self.data_type] + language[self.partition_type] + language[self.pie_choice] + '比'})
        let loc = self.data_pie.slice(0, 5);
        let val_other = 0;
        self.data_pie.slice(5).forEach(item => {
          val_other += item[1];
        });
        loc.push(['其它', val_other]);
        self.pie.series[0].setData(loc);
        self.pie.hideLoading();
      },
      createSimplePie(){
        const self = this;
        Highcharts.setOptions({
          lang: {
            loading: '数据加载中...'  // 加载中文字配置
          }
        });
        self.pie = new Highcharts.chart('pie-container', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
          },
          credits: {enabled: false},
          title: {
            text: '各' + language[self.data_type] + language[self.partition_type] + language[self.pie_choice] + '比'
          },
          tooltip: {
            headerFormat: '{series.name}<br/>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              center: [100, 100],
              size: 200,
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          legend: {
            //在下方水平展示
            x: 0,
            y: 50,
            maxHeight: 80,
            align: 'left',
            verticalAlign: 'top',

            //在右方垂直展示
//            align: 'right',
//            verticalAlign: 'top',
//            x: 0,
//            y: 100,
//            layout: 'vertical',
          },
          series: [{
            type: 'pie',
            name: '各' + language[self.data_type] + language[self.partition_type] + language[self.pie_choice],
            data: [],
          }]
        });
        self.pie.showLoading();
      },
      downloadHistory: function () {
        const self = this;
        const id_resource = self.$resource(window.location.protocol+'//'+window.location.hostname+process.env.ID_PCAP);
        const url_resource = self.$resource(window.location.protocol+'//'+window.location.hostname+process.env.INFO_PCAP);

        let task_id = id_resource.get({start_time: self.start_time, end_time: self.end_time})
          .then(res => {
            console.log('get task_id: ');
            console.log(res.data);
            return res.data;
          })
          .catch(err => {
            console.error(err);
          });
        console.log('---1---');
        task_id.then(res => {
          let task_id = res.task_id;
          let finished = false;
          let res_url;
          let loc_timer = setInterval(() => {
            if (!finished) {
              res_url = url_resource.get({task_id: task_id})
                .then(res => {
                  return res.data;
                });
              console.log('---2---');
              res_url.then(res => {
                console.log('get file_path: ');
                if (res.state === 'SUCCESS') {
                  finished = true;
                  $("#downloadform").remove();
                  var form = $("<form>");//定义一个form表单
                  form.attr("id", "downloadform");
                  form.attr("style", "display:none");
                  form.attr("target", "");
                  form.attr("method", "post");
                  form.attr("action", window.location.protocol+'//'+window.location.hostname+process.env.FILE_PCAP);
                  var input1 = $("<input>");
                  input1.attr("type", "text");
                  input1.attr("name", "file_path");
                  input1.attr("value", res.result);
                  form.append(input1);
                  $("body").append(form);//将表单放置在web中

                  form.submit();//表单提交
                }
              });
            } else {
              clearInterval(loc_timer);
            }
          }, 2000);
        });
      },
    },
    mounted: function () {
      const self = this;
      self.init();
    },
  }
</script>

<style rel="stylesheet/sass" lang="sass" scoped>
  #history-flow
    position: relative
    padding: 24px
    overflow: auto
    height: 100%
    /*&:first-child*/
      /*padding-top: 0*/
    .table
      th, td
        padding: 0.5em
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
        padding: 9px 15px
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
