import {
  createLogger,
  format,
  transports,
  Logger as WinstonLoggerModule
} from 'winston'

import { Logger } from '@shared/ports/Logger'

// import { LogstashTransport } from 'winston-logstash-transport'

import { ElasticsearchTransport } from 'winston-elasticsearch'

import apm from '../apm'

export class WinstonElasticLogger implements Logger {
  private readonly logger: WinstonLoggerModule

  constructor() {
    this.logger = createLogger({
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console({}),
        new ElasticsearchTransport({
          level: 'info',
          transformer: (logData) => {
            return {
              '@timestamp': new Date().getTime(),
              severity: logData.level,
              stack: logData.meta.stackInfo,
              service_name: process.env.SERVICE_NAME,
              service_version: '1.0.0',
              message: `${logData.message}`
            }
          },
          apm,
          clientOpts: {
            node: 'http://localhost:9200',
            auth: {
              password: 'changeme',
              username: 'elastic'
            }
          }
        })
      ]
    })
  }

  warn(message: string): void {
    this.logger.warn(message)
  }

  info(message: string): void {
    this.logger.info(message)
  }

  debug(message: string): void {
    this.logger.debug(message)
  }

  error(message: string): void {
    this.logger.error(message)
  }
}
