module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: '"http://10.5.0.224:8000/"',
  DATA_REALTIME: '"http://10.5.0.224:8000/rest/past_300/"',
  DATA_ENDPOINT: '"http://10.5.0.224:8000/rest/range_query/endpoint/?start_time={start_time}&end_time={end_time}"',
  DATA_APPLICATION: '"http://10.5.0.224:8000/rest/range_query/application/?start_time={start_time}&end_time={end_time}"',
  DATA_CONVERSATION: '"http://10.5.0.224:8000/rest/range_query/conv/?start_time={start_time}&end_time={end_time}"',
  ID_PCAP: '"http://10.5.0.224:8000/rest/pcap/?start_time={start_time}&end_time={end_time}"',
  INFO_PCAP: '"http://10.5.0.224:8000/rest_state/pcap/?task_id={task_id}"',
  FILE_PCAP: '"http://10.5.0.224:8000/rest/download_pcap/"',
  INFO_PREDICT: '"http://10.5.0.224:8000/rest/predict/{timezone}/"',
  DATA_PREDICT: '"http://10.5.0.224:8000/rest/get_prediction/?task_id={task_id}"',
  // PORT: 9000
}
