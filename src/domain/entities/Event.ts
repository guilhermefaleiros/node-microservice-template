import { DomainEntity } from '@domain/base/DomainEntity'

export class Event extends DomainEntity {
  name: string
  payload: string
  handled: boolean

  constructor(name: string, payload: string, handled: boolean, id = undefined) {
    super(id)
    this.name = name
    this.handled = handled
    this.payload = payload
  }
}
