/* eslint-disable import/first */
require('dotenv').config()

import { OpenTelemetryJaegerAdapter } from '@infrastructure/tracing/OpenTelemetryJaegerAdapter'
import { WinstonElasticLogger } from '@infrastructure/logging/WinstonElasticLogger'

const logger = new WinstonElasticLogger()

new OpenTelemetryJaegerAdapter(logger).start(process.env.SERVICE_NAME)
