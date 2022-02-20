import { User } from '@domain/entities/User'
import { CreateUserInput } from '@domain/services/create-user/CreateUserInput'
import { DomainCreateUser } from '@domain/services/create-user/DomainCreateUser'
import { Event } from '@domain/entities/Event'

import { DomainEventProducer } from '@application/ports/events/DomainEventProducer'
import { UserRepository } from '@application/ports/repository/UserRepository'
import { RepositoryFactory } from '@application/ports/repository/RepositoryFactory'
import { CreateUserOutput } from '@domain/services/create-user/CreateUserOutput'
import { CacheProvider } from '@application/ports/cache/CacheProvider'
import { EventRepository } from '@application/ports/repository/EventRepository'

export class CreateUser implements DomainCreateUser {
  private readonly userRepository: UserRepository
  private readonly eventRepository: EventRepository
  private readonly cacheProvider: CacheProvider

  constructor(
    repositoryFactory: RepositoryFactory,
    producer: DomainEventProducer,
    cacheProvider: CacheProvider
  ) {
    this.userRepository = repositoryFactory.createUserRepository()
    this.eventRepository = repositoryFactory.createEventRepository()
    this.cacheProvider = cacheProvider
  }

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = new User(input.name, input.cpf)
    await this.userRepository.save(user)
    await this.eventRepository.save(
      new Event('UserCreatedEvent', JSON.stringify(user), false)
    )
    await this.cacheProvider.save(`user#${user.id}`, user, 30)
    return {
      id: user.id,
      cpf: user.cpf.value,
      name: user.name
    }
  }
}
