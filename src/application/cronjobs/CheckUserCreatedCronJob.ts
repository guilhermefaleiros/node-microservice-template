import { CronJob } from '@application/ports/cronjobs/CronJob'
import { DomainEventProducer } from '@application/ports/events/DomainEventProducer'
import { CheckUserCreatedEvent } from '@domain/events/CheckUserCreatedEvent'

export class CheckUserCreatedCronJob implements CronJob {
  private readonly eventProducer: DomainEventProducer

  constructor(eventProducer: DomainEventProducer) {
    this.eventProducer = eventProducer
  }

  async execute(): Promise<void> {
    this.eventProducer.publish(new CheckUserCreatedEvent({}))
  }
}
