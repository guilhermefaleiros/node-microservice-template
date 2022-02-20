export interface EventConsumer {
  start(): Promise<void>
  stop(): Promise<void>
}
