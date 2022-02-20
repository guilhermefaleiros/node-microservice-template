import { BaseService } from '@domain/base/BaseService'
import { User } from '@domain/entities/User'
import { UpdateUserInput } from './UpdateUserInput'

export interface DomainUpdateUser extends BaseService<UpdateUserInput, User> {}
