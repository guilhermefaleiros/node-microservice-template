import { EventRepository } from '@application/ports/repository/EventRepository'
import { RepositoryFactory } from '@application/ports/repository/RepositoryFactory'
import { UserRepository } from '@application/ports/repository/UserRepository'
import { PrismaEventRepository } from './PrismaEventRepository'

import { PrismaUserRepository } from './PrismaUserRepository'

export class PrismaRepositoryFactory implements RepositoryFactory {
  createUserRepository(): UserRepository {
    return new PrismaUserRepository()
  }

  createEventRepository(): EventRepository {
    return new PrismaEventRepository()
  }
}
