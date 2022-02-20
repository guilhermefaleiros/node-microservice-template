import { RepositoryFactory } from '@application/ports/repository/RepositoryFactory'
import { UserRepository } from '@application/ports/repository/UserRepository'
import { MemoryUserRepository } from './MemoryUserRepository'

export class MemoryRepositoryFactory implements RepositoryFactory {
  createUserRepository(): UserRepository {
    return new MemoryUserRepository()
  }
}
