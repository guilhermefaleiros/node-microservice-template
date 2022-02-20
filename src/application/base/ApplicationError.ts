export class ApplicationError extends Error {
  readonly statusCode: number
  readonly message: string

  constructor({
    message,
    statusCode
  }: {
    statusCode?: number
    message: string
  }) {
    super(message)
    this.message = message
    this.statusCode = statusCode || 400
  }
}
