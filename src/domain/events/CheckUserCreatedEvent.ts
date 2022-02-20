import { DomainEvent } from '@domain/base/DomainEvent'

export class CheckUserCreatedEvent extends DomainEvent<any> {
  constructor(payload: any, id = undefined) {
    super('CheckUserCreatedEvent', payload, id)
  }
}
