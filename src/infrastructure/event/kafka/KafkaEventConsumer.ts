import { Logger } from '@shared/ports/Logger'
import { EventConsumer } from '../../../presentation/ports/events/EventConsumer'

import { Consumer, ConsumerSubscribeTopic, EachMessagePayload } from 'kafkajs'
import { EventListener } from '@presentation/ports/events/EventListener'
import { EventListenerConfig } from '@presentation/ports/events/EventListenerConfig'
import kafka from './Kafka'

export class KafkaEventConsumer implements EventConsumer {
  private kafkaConsumer: Consumer
  private listener: EventListener
  private logger: Logger
  private topic: string

  public constructor(config: EventListenerConfig, logger: Logger) {
    this.listener = config.listener
    this.topic = config.topic
    this.logger = logger
    this.kafkaConsumer = this.createKafkaConsumer()
  }

  public async start(): Promise<void> {
    const topic: ConsumerSubscribeTopic = {
      topic: this.topic,
      fromBeginning: true
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { message } = messagePayload
          await this.listener.listen(message.value.toString())
        }
      })
    } catch (error) {
      this.stop()
      this.logger.error(
        `An error has ocurred on set consumer to topic: [${topic.topic}]`
      )
    }
  }

  public async stop(): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }

  private createKafkaConsumer(): Consumer {
    const consumer = kafka.consumer({
      groupId: process.env.KAFKA_CONSUMER_GROUP
    })
    return consumer
  }
}
