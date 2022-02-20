import { CreateUser } from '@application/services/CreateUser'
import { UpdateUser } from '@application/services/UpdateUser'
import { GetUser } from '@application/services/GetUser'

import { CreateUserController } from '@presentation/controllers/CreateUserController'
import { UpdateUserController } from '@presentation/controllers/UpdateUserController'
import { GetUserController } from '@presentation/controllers/GetUserController'

import { logger, producer, repositoryFactory, cacheProvider } from '../shared'

export const makeCreateUserController = () => {
  return new CreateUserController(
    new CreateUser(repositoryFactory, producer, cacheProvider)
  )
}

export const makeUpdateUserController = () => {
  return new UpdateUserController(
    new UpdateUser(repositoryFactory, logger, cacheProvider)
  )
}

export const makeGetUserController = () => {
  return new GetUserController(
    new GetUser(repositoryFactory, cacheProvider, logger)
  )
}
