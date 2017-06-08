<template>
  <div id="instruction">
    <br>
    <div class="row justify-content-center p-2">
      <div class="col-8">
        <div class="card">
          <div class="card-head">
            <header class="my-text-primary">对外接口说明</header>
          </div>
          <div class="card-body">
            <p class="paragraph">系统对外接口使用REST风格设计，使用标准HTTP协议进行交互。</p>
            <br>
            <!--历史流速信息检索-->
            <div>
              <h5>历史流速信息检索</h5>
              <p><b>请求地址: </b><span><kbd>/rest/history/?start_time={开始时间}&end_time={结束时间}</kbd></span></p>
              <p><b>请求方式: </b><span><kbd>GET</kbd></span></p>
              <b>参数说明: </b>
              <table class="table">
                <tr>
                  <th>参数名称</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>开始时间</td>
                  <td>检索开始时间，使用ISO8061标准描述无时区。</td>
                </tr>
                <tr>
                  <td>结束时间</td>
                  <td>检索结束时间，使用ISO8061标准描述无时区。</td>
                </tr>
              </table>
              <b>返回说明: </b>
              <p>如果时间格式出错或结束时间小于开始时间，返回HTTP 404响应。
                操作正常返回JSON数组，数组内为JSON字典，字典具体内容如下：
              </p>
              <table class="table">
                <tr>
                  <th>字段</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>bytes</td>
                  <td>数值类型，流量数，单位为字节。</td>
                </tr>
                <tr>
                  <td>packets</td>
                  <td>数值类型，数据包数。</td>
                </tr>
                <tr>
                  <td>ticker</td>
                  <td>字符类型，时间戳，使用ISO8061标准描述无时区。</td>
                </tr>
              </table>
            </div>
            <br>
            <!--历史网段节点流量分析-->
            <div>
              <h5>历史网段节点流量分析</h5>
              <p><b>请求地址: </b><span><kbd>/rest/range_query/endpoint/?start_time={开始时间}&end_time={结束时间}</kbd></span></p>
              <p><b>请求方式: </b><span><kbd>GET</kbd></span></p>
              <b>参数说明: </b>
              <table class="table">
                <tr>
                  <th>参数名称</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>开始时间</td>
                  <td>检索开始时间，使用ISO8061标准描述无时区。</td>
                </tr>
                <tr>
                  <td>结束时间</td>
                  <td>检索结束时间，使用ISO8061标准描述无时区。</td>
                </tr>
              </table>
              <b>返回说明: </b>
              <p>如果时间格式出错或结束时间小于开始时间，返回HTTP 404响应。
                操作正常返回JSON数组，数组内为JSON字典，字典具体内容如下：
              </p>
              <table class="table">
                <tr>
                  <th>字段</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>ip</td>
                  <td>数值类型，IP地址。</td>
                </tr>
                <tr>
                  <td>ip_node</td>
                  <td>字符串类型，节点名称。</td>
                </tr>
                <tr>
                  <td>rx</td>
                  <td>数值类型，下行流量数，单位为字节。</td>
                </tr>
                <tr>
                  <td>tx</td>
                  <td>数值类型，上行流量数，单位为字节。</td>
                </tr>
                <tr>
                  <td>rx_packets</td>
                  <td>数值类型，下行数据包数。</td>
                </tr>
                <tr>
                  <td>tx_packets</td>
                  <td>数值类型，上行数据包数。</td>
                </tr>
              </table>
            </div>
            <br>
            <!--历史应用流量分析-->
            <div>
              <h5>历史应用流量分析</h5>
              <p><b>请求地址: </b><span><kbd>/rest/range_query/application/?start_time={开始时间}&end_time={结束时间}</kbd></span>
              </p>
              <p><b>请求方式: </b><span><kbd>GET</kbd></span></p>
              <b>参数说明: </b>
              <table class="table">
                <tr>
                  <th>参数名称</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>开始时间</td>
                  <td>检索开始时间，使用ISO8061标准描述无时区。</td>
                </tr>
                <tr>
                  <td>结束时间</td>
                  <td>检索结束时间，使用ISO8061标准描述无时区。</td>
                </tr>
              </table>
              <b>返回说明: </b>
              <p>如果时间格式出错或结束时间小于开始时间，返回HTTP 404响应。
                操作正常返回JSON数组，数组内为JSON字典，字典具体内容如下：
              </p>
              <table class="table">
                <tr>
                  <th>字段</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>bytes</td>
                  <td>数值类型，流量数，单位为字节。</td>
                </tr>
                <tr>
                  <td>packets</td>
                  <td>数值类型，数据包数。</td>
                </tr>
                <tr>
                  <td>protocol</td>
                  <td>字符串，协议名称</td>
                </tr>
              </table>
            </div>
            <br>
            <!--历史IP会话流量分析-->
            <div>
              <h5>历史IP会话流量分析</h5>
              <p><b>请求地址: </b><span><kbd>/rest/range_query/conv/?start_time={开始时间}&end_time={结束时间}</kbd></span></p>
              <p><b>请求方式: </b><span><kbd>GET</kbd></span></p>
              <b>参数说明: </b>
              <table class="table">
                <tr>
                  <th>参数名称</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>开始时间</td>
                  <td>检索开始时间，使用ISO8061标准描述无时区。</td>
                </tr>
                <tr>
                  <td>结束时间</td>
                  <td>检索结束时间，使用ISO8061标准描述无时区。</td>
                </tr>
              </table>
              <b>返回说明: </b>
              <p>如果时间格式出错或结束时间小于开始时间，返回HTTP 404响应。
                操作正常返回JSON数组，数组内为JSON字典，字典具体内容如下：
              </p>
              <table class="table">
                <tr>
                  <th>字段</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>left</td>
                  <td>数值类型，源IP地址。</td>
                </tr>
                <tr>
                  <td>right</td>
                  <td>数值类型，目的IP地址。</td>
                </tr>
                <tr>
                  <td>left_node</td>
                  <td>字符串类型，源节点信息。</td>
                </tr>
                <tr>
                  <td>right</td>
                  <td>字符串类型，目的节点信息。</td>
                </tr>
                <tr>
                  <td>rx</td>
                  <td>数值类型，下行流量数，单位为字节。</td>
                </tr>
                <tr>
                  <td>tx</td>
                  <td>数值类型，上行流量数，单位为字节。</td>
                </tr>
                <tr>
                  <td>rx_packets</td>
                  <td>数值类型，下行数据包数。</td>
                </tr>
                <tr>
                  <td>tx_packets</td>
                  <td>数值类型，上行数据包数。</td>
                </tr>
              </table>
            </div>
            <br>
            <!--历史原始流量数据检索-->
            <div>
              <h5>历史原始流量数据检索</h5>
              <p><b>请求地址: </b><span><kbd>/rest/range_query/pcap/?start_time={开始时间}&end_time={结束时间}</kbd></span></p>
              <p><b>请求方式: </b><span><kbd>GET</kbd></span></p>
              <b>参数说明: </b>
              <table class="table">
                <tr>
                  <th>参数名称</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>开始时间</td>
                  <td>检索开始时间，使用ISO8061标准描述无时区。</td>
                </tr>
                <tr>
                  <td>结束时间</td>
                  <td>检索结束时间，使用ISO8061标准描述无时区。</td>
                </tr>
              </table>
              <b>返回说明: </b>
              <p>如果时间格式出错或结束时间小于开始时间，返回HTTP 404响应。
                操作正常返回二进制数据流，使用pcap格式。</p>
            </div>
            <br>
            <div>
              <h5>未来流量预测</h5>
              <p><b>请求地址: </b><span><kbd>/rest/predict/{预测时间}/</kbd></span></p>
              <p><b>请求方式: </b><span><kbd>GET</kbd></span></p>
              <b>参数说明: </b>
              <table class="table">
                <tr>
                  <th>参数名称</th>
                  <th>说明</th>
                </tr>
                <tr>
                  <td>预测时间</td>
                  <td>需要预测多久，可选为一周、一个月和一年，对应参数分别是week，month和year。</td>
                </tr>
              </table>
              <b>返回说明: </b>
              <p>如果时间格式出错或结束时间小于开始时间，返回HTTP 404响应。
                操作正常返回JSON数组，数组内为JSON字典，字典具体内容如下：
              </p>
              <table class="table">
                <tr>
                  <th>字段</th>
                  <th>说明</th>
                </tr>

                <tr>
                  <td>ds</td>
                  <td>预测日期，日期类型不含时间。</td>
                </tr>
                <tr>
                  <td>yhat</td>
                  <td>预测结果。</td>
                </tr>
                <tr>
                  <td>yhat_lower</td>
                  <td>预测误差下限。</td>
                </tr>
                <tr>
                  <td>yhat_upper</td>
                  <td>预测误差上限。</td>
                </tr>

              </table>
            </div>
            <br>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style rel="stylesheet/sass" lang="sass" scoped>
  @import "../../static/css/materialadmin"

  .paragraph
    padding-left: 2em

  #instruction
    overflow: auto
    position: relative
    height: 100%

</style>

<script>
    export default{
        name: 'instruction',
    }






















</script>
