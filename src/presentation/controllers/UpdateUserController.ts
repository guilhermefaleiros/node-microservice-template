import { UpdateUser } from '@application/services/UpdateUser'

import { RouteHandler } from '@presentation/ports/http/RouteHandler'
import { HttpRequest } from '@presentation/ports/http/HttpRequest'
import { HttpResponse } from '@presentation/ports/http/HttpResponse'
import { buildCreatedResponse } from '@presentation/utils/http'

export class UpdateUserController implements RouteHandler {
  private readonly updateUser: UpdateUser

  constructor(updateUser: UpdateUser) {
    this.updateUser = updateUser
  }

  async execute(request: HttpRequest): Promise<HttpResponse> {
    const user = await this.updateUser.execute({
      name: request.body.name,
      id: request.params.id
    })
    return buildCreatedResponse(user)
  }
}
