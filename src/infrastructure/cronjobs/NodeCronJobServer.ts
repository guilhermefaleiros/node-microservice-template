import { CronJobConfig } from '@application/ports/cronjobs/CronJobConfig'
import { Logger } from '@shared/ports/Logger'

import cron from 'node-cron'

export class NodeCronJobServer {
  private readonly logger: Logger

  constructor(logger: Logger, cronJobs: CronJobConfig[] = []) {
    this.logger = logger
    cronJobs.forEach((cronJob) => {
      const task = cron.schedule(cronJob.datePattern, async (date: Date) => {
        const utcDate = date.toUTCString()
        try {
          this.logger.info(
            `Running CronJob: [${cronJob.name}], at [${utcDate}]`
          )
          await cronJob.handler.execute()
          this.logger.info(
            `CronJob: [${cronJob.name}] succeeded at [${utcDate}]`
          )
        } catch (e) {
          this.logger.error(`CronJob: [${cronJob.name}] failed at [${utcDate}]`)
        }
      })
      task.start()
    })
  }
}
