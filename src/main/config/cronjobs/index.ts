import { CheckUserCreatedCronJob } from '@application/cronjobs/CheckUserCreatedCronJob'
import { CronJobConfig } from '@application/ports/cronjobs/CronJobConfig'

import { producer } from '../shared/'

export const cronJobs: CronJobConfig[] = [
  {
    name: 'CheckUserCreated',
    handler: new CheckUserCreatedCronJob(producer),
    datePattern: '* * * * *'
  }
]
