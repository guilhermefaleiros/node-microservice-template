import { CheckUserCreatedHandler } from '@application/handlers/CheckUserCreatedHandler'

import { CheckUserCreatedListener } from '@presentation/listeners/CheckUserCreatedListener'
import { EventListenerConfig } from '@presentation/ports/events/EventListenerConfig'

import { logger, repositoryFactory } from '../shared'

export const consumers: EventListenerConfig[] = [
  {
    listener: new CheckUserCreatedListener(
      new CheckUserCreatedHandler(repositoryFactory, logger)
    ),
    topic: 'CheckUserCreatedEvent'
  }
]
