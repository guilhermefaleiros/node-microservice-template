import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'

import { PgInstrumentation } from '@opentelemetry/instrumentation-pg'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { KafkaJsInstrumentation } from 'opentelemetry-instrumentation-kafkajs'

import { Logger } from '@shared/ports/Logger'

export class OpenTelemetryJaegerAdapter {
  private readonly logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  start(serviceName: string) {
    this.logger.info('Starting OpenTelemetry instrumentation')
    try {
      const provider = new NodeTracerProvider({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: serviceName
        })
      })

      const exporter = new JaegerExporter({
        host: process.env.JAEGER_HOST,
        port: Number(process.env.JAEGER_PORT)
      })

      provider.addSpanProcessor(new SimpleSpanProcessor(exporter))

      provider.register()

      registerInstrumentations({
        instrumentations: [
          new HttpInstrumentation(),
          new ExpressInstrumentation(),
          new KafkaJsInstrumentation(),
          new PgInstrumentation()
        ]
      })

      this.logger.info('OpenTelemetry instrumentation succeed')
    } catch (e) {
      this.logger.error('OpenTelemetry instrumentation failed')
    }
  }
}
