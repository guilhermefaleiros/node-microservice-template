/* eslint-disable indent */
/* eslint-disable brace-style */
import { EventRepository } from '@application/ports/repository/EventRepository'
import { RepositoryFactory } from '@application/ports/repository/RepositoryFactory'
import { EventHandler } from '@domain/base/EventHandler'
import { CheckUserCreatedEvent } from '@domain/events/CheckUserCreatedEvent'
import { Logger } from '@shared/ports/Logger'

export class CheckUserCreatedHandler
  implements EventHandler<CheckUserCreatedEvent>
{
  private readonly eventRepository: EventRepository
  private readonly logger: Logger

  constructor(eventFactory: RepositoryFactory, logger: Logger) {
    this.eventRepository = eventFactory.createEventRepository()
    this.logger = logger
  }

  async handle(_: CheckUserCreatedEvent): Promise<void> {
    const events = await this.eventRepository.findNotHandled('UserCreatedEvent')
    for (const event of events) {
      event.handled = true
      await this.eventRepository.save(event)
    }
    this.logger.info(
      `CheckUserCreatedEvent has been handled, at: ${new Date().toUTCString()}`
    )
  }
}
