import { DomainEvent } from 'src/domain/base/DomainEvent'

export interface DomainEventProducer {
  publish(event: DomainEvent): Promise<void>
}
