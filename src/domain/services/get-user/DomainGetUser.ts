import { BaseService } from '@domain/base/BaseService'

import { GetUserInput } from './GetUserInput'
import { GetUserOutput } from './GetUserOutput'

export interface DomainGetUser
  extends BaseService<GetUserInput, GetUserOutput> {}
