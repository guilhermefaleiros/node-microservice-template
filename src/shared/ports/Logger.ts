export interface Logger {
  warn(message: string): void
  info(message: string): void
  debug(message: string): void
  error(message: string): void
}
