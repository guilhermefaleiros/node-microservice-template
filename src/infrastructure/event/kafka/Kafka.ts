require('dotenv').config()

// eslint-disable-next-line import/first
import { Kafka } from 'kafkajs'

export default new Kafka({
  clientId: process.env.SERVICE_NAME,
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
  logLevel: 0
})
