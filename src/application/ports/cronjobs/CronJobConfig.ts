import { CronJob } from './CronJob'

export type CronJobConfig = {
  handler: CronJob
  datePattern: string
  name: string
}
