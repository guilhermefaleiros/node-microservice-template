import { v4 } from 'uuid'

export abstract class DomainEntity {
  id: string

  constructor(id = undefined) {
    this.id = id || v4()
  }
}
