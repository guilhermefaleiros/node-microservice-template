export interface EventListener {
  listen(input: any): Promise<void>
}
