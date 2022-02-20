/* eslint-disable no-unused-vars */
import { RouteConfig } from '@presentation/ports/http/RouteConfig'
import { RouteMethod } from '@presentation/ports/http/RouteMethod'
import {
  makeCreateUserController,
  makeGetUserController,
  makeUpdateUserController
} from './factories'

export const routes: RouteConfig[] = [
  {
    path: '/v1/users',
    handler: makeCreateUserController(),
    method: RouteMethod.POST,
    name: 'CREATE_USER'
  },
  {
    path: '/v1/users/:id',
    handler: makeUpdateUserController(),
    method: RouteMethod.PUT,
    name: 'UPDATE_USER'
  },
  {
    path: '/v1/users/:id',
    handler: makeGetUserController(),
    method: RouteMethod.GET,
    name: 'GET_USER'
  }
]
