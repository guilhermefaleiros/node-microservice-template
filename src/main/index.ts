/* eslint-disable import/first */
require('dotenv').config()

import { WinstonElasticLogger } from '@infrastructure/logging/WinstonElasticLogger'
const logger = new WinstonElasticLogger()

import { OpenTelemetryJaegerAdapter } from '@infrastructure/tracing/OpenTelemetryJaegerAdapter'

if (process.env.ENVIRONMENT === 'DEVELOPMENT') {
  new OpenTelemetryJaegerAdapter(logger).start(process.env.SERVICE_NAME)
}

import { ExpressAdapter } from '@infrastructure/http/adapters/ExpressAdapter'
import { routes } from '@main/config/http'
import { cronJobs } from '@main/config/cronjobs'
import { consumers } from '@main/config/listeners'
import { KafkaSetup } from '@infrastructure/event/kafka/KafkaSetup'
import { NodeCronJobServer } from '@infrastructure/cronjobs/NodeCronJobServer'

KafkaSetup(consumers, logger)

// eslint-disable-next-line no-new
new NodeCronJobServer(logger, cronJobs)

new ExpressAdapter(logger)
  .configure(routes, Number(process.env.HTTP_PORT))
  .addErrorMiddleware()
  .start()
