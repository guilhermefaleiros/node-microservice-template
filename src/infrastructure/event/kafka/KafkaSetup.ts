import { Logger } from '@shared/ports/Logger'
import { KafkaEventConsumer } from './KafkaEventConsumer'
import { EventListenerConfig } from '@presentation/ports/events/EventListenerConfig'

export const KafkaSetup = async (
  consumers: EventListenerConfig[],
  logger: Logger
) => {
  consumers.forEach(async (config) => {
    const kafkaConsumer = new KafkaEventConsumer(config, logger)
    await kafkaConsumer.start()
  })
}
