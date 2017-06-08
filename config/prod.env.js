module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: '"http://127.0.0.1:8000/"',
  DATA_REALTIME: '":8000/rest/past_300/"',
  DATA_HISTORY: '":8000/rest/history/?start_time={start_time}&end_time={end_time}"',
  DATA_ENDPOINT: '":8000/rest/range_query/endpoint/?start_time={start_time}&end_time={end_time}"',
  DATA_APPLICATION: '":8000/rest/range_query/application/?start_time={start_time}&end_time={end_time}"',
  DATA_CONVERSATION: '":8000/rest/range_query/conv/?start_time={start_time}&end_time={end_time}"',
  ID_PCAP: '":8000/rest/pcap/?start_time={start_time}&end_time={end_time}"',
  INFO_PCAP: '":8000/rest/pcap_state/?task_id={task_id}"',
  FILE_PCAP: '":8000/rest/download_pcap/"',
  INFO_PREDICT: '":8000/rest/predict/"',
  DATA_PREDICT: '":8000/rest/get_prediction/?task_id={task_id}"',
  CONFIG: '":8000/admin/"',
  INFO_STORAGE: '":8000/rest/storage_info/"',
  INFO_RUNTIME: '":8000/rest/run_time/"',
  INFO_TAPE: '":8000/rest/tape/"',
  // PORT: 9000
}
