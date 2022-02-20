import ElasticApm from 'elastic-apm-node'

export default ElasticApm.start({
  serviceName: process.env.SERVICE_NAME,
  serverUrl: process.env.ELASTIC_APM_SERVER_URL
})
