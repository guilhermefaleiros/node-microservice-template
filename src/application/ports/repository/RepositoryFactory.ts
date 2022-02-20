import { EventRepository } from './EventRepository'
import { UserRepository } from './UserRepository'

export interface RepositoryFactory {
  createUserRepository(): UserRepository
  createEventRepository(): EventRepository
}
