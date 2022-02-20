import { DomainEvent } from '@domain/base/DomainEvent'

export interface EventHandler<T extends DomainEvent = any> {
  handle(event: T): Promise<void>
}
