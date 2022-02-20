import { CheckUserCreatedHandler } from '@application/handlers/CheckUserCreatedHandler'
import { EventListener } from '@presentation/ports/events/EventListener'

export class CheckUserCreatedListener implements EventListener {
  private readonly userCreatedHandler: CheckUserCreatedHandler

  constructor(userCreatedHandler: CheckUserCreatedHandler) {
    this.userCreatedHandler = userCreatedHandler
  }

  async listen(json: string): Promise<void> {
    const event = JSON.parse(json)
    this.userCreatedHandler.handle(event)
  }
}
