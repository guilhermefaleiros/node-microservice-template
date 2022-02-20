import { CreateUser } from '@application/services/CreateUser'

import { RouteHandler } from '@presentation/ports/http/RouteHandler'
import { HttpRequest } from '@presentation/ports/http/HttpRequest'
import { HttpResponse } from '@presentation/ports/http/HttpResponse'
import { buildCreatedResponse } from '@presentation/utils/http'

export class CreateUserController implements RouteHandler {
  private readonly createUser: CreateUser

  constructor(createUser: CreateUser) {
    this.createUser = createUser
  }

  async execute(request: HttpRequest): Promise<HttpResponse> {
    const user = await this.createUser.execute({
      name: request.body.name,
      cpf: request.body.cpf
    })
    return buildCreatedResponse(user)
  }
}
