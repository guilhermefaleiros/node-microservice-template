import { DomainGetUser } from '@domain/services/get-user/DomainGetUser'
import { GetUserInput } from '@domain/services/get-user/GetUserInput'
import { GetUserOutput } from '@domain/services/get-user/GetUserOutput'

import { ApplicationError } from '@application/base/ApplicationError'
import { CacheProvider } from '@application/ports/cache/CacheProvider'
import { UserDetailCache } from '@application/ports/cache/models/UserDetailCache'
import { RepositoryFactory } from '@application/ports/repository/RepositoryFactory'
import { UserRepository } from '@application/ports/repository/UserRepository'

import { Logger } from '@shared/ports/Logger'

export class GetUser implements DomainGetUser {
  private readonly userRepository: UserRepository
  private readonly cacheProvider: CacheProvider
  private readonly logger: Logger

  constructor(
    repositoryFactory: RepositoryFactory,
    cacheProvider: CacheProvider,
    logger: Logger
  ) {
    this.userRepository = repositoryFactory.createUserRepository()
    this.cacheProvider = cacheProvider
    this.logger = logger
  }

  async execute(input: GetUserInput): Promise<GetUserOutput> {
    const userCached = await this.cacheProvider.get<UserDetailCache>(
      `user#${input.id}`
    )
    if (userCached) {
      this.logger.error(`User has been retrieved from cache. ID: [${input.id}]`)
      return {
        id: userCached.id,
        name: userCached.name,
        cpf: userCached.cpf
      }
    }
    const userDatabase = await this.userRepository.findById(input.id)
    if (userDatabase) {
      this.logger.error(
        `User has been retrieved from database. ID: [${input.id}]`
      )
      await this.cacheProvider.save(
        `user#${userDatabase.id}`,
        {
          id: userDatabase.id,
          name: userDatabase.name,
          cpf: userDatabase.cpf.value
        },
        10
      )
      return {
        id: userDatabase.id,
        name: userDatabase.name,
        cpf: userDatabase.cpf.value
      }
    }
    this.logger.error(`User was not found. ID: [${input.id}]`)
    throw new ApplicationError({
      statusCode: 404,
      message: `Não foi possível encontrar um usuário para o id: [${input.id}]`
    })
  }
}
