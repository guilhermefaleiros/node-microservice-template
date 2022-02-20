import { Producer } from 'kafkajs'

import { DomainEvent } from '@domain/base/DomainEvent'
import { DomainEventProducer } from '../../../application/ports/events/DomainEventProducer'

import kafka from './Kafka'

export class KafkaEventProducer implements DomainEventProducer {
  private readonly producer: Producer

  constructor() {
    this.producer = kafka.producer()
  }

  async publish(event: DomainEvent): Promise<void> {
    await this.producer.connect()
    await this.producer.send({
      topic: event.name,
      messages: [
        {
          key: event.id,
          value: JSON.stringify(event)
        }
      ]
    })
  }
}
