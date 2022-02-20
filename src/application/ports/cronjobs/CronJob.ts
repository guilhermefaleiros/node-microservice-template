export interface CronJob {
  execute(): Promise<void>
}
