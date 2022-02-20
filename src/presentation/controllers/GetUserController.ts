import { RouteHandler } from '@presentation/ports/http/RouteHandler'
import { HttpRequest } from '@presentation/ports/http/HttpRequest'
import { HttpResponse } from '@presentation/ports/http/HttpResponse'
import { buildOkResponse } from '@presentation/utils/http'

import { GetUser } from '@application/services/GetUser'

export class GetUserController implements RouteHandler {
  private readonly getUser: GetUser

  constructor(getUser: GetUser) {
    this.getUser = getUser
  }

  async execute(request: HttpRequest): Promise<HttpResponse> {
    const user = await this.getUser.execute({
      id: request.params.id
    })
    return buildOkResponse(user)
  }
}
