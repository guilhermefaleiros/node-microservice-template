import { BaseService } from '@domain/base/BaseService'

import { CreateUserInput } from './CreateUserInput'
import { CreateUserOutput } from './CreateUserOutput'

export interface DomainCreateUser
  extends BaseService<CreateUserInput, CreateUserOutput> {}
