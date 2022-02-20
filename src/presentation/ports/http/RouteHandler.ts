import { HttpRequest } from '@presentation/ports/http/HttpRequest'
import { HttpResponse } from '@presentation/ports/http/HttpResponse'

export interface RouteHandler<T = any> {
  execute(request: HttpRequest<T>): Promise<HttpResponse>
}
