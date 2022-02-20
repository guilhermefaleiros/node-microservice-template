import { User } from '@domain/entities/User'
import { DomainUpdateUser } from '@domain/services/update-user/DomainUpdateUser'
import { UpdateUserInput } from '@domain/services/update-user/UpdateUserInput'

import { UserRepository } from '@application/ports/repository/UserRepository'
import { ApplicationError } from '@application/base/ApplicationError'

import { Logger } from '@shared/ports/Logger'
import { RepositoryFactory } from '@application/ports/repository/RepositoryFactory'
import { CacheProvider } from '@application/ports/cache/CacheProvider'

export class UpdateUser implements DomainUpdateUser {
  private readonly userRepository: UserRepository
  private readonly logger: Logger
  private readonly cacheProvider: CacheProvider

  constructor(
    repositoryFactory: RepositoryFactory,
    logger: Logger,
    cacheProvider: CacheProvider
  ) {
    this.userRepository = repositoryFactory.createUserRepository()
    this.cacheProvider = cacheProvider
    this.logger = logger
  }

  async execute(input: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findById(input.id)
    if (!user) {
      this.logger.error(
        `Não foi possível encontrar um usuário para o id: [${input.id}]`
      )
      throw new ApplicationError({
        statusCode: 404,
        message: `Não foi possível encontrar um usuário para o id: [${input.id}]`
      })
    }
    user.name = input.name
    await this.userRepository.save(user)
    await this.cacheProvider.invalidate(`user#${user.id}`)
    return user
  }
}
