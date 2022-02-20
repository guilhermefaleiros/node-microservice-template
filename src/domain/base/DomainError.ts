export class DomainError extends Error {
  readonly statusCode: number
  readonly message: string

  constructor(message: string) {
    super(message)
    this.message = message
    this.statusCode = 400
  }
}
