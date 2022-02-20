import { v4 } from 'uuid'

export abstract class DomainEvent<T = any> {
  readonly id: string
  readonly name: string
  readonly payload: T

  constructor(name: string, payload: T, id = undefined) {
    this.id = id || v4()
    this.name = name
    this.payload = payload
  }
}
