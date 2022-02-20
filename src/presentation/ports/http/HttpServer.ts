import { RouteConfig } from './RouteConfig'

export interface HttpServer {
  configure(routes: RouteConfig[], port: number): HttpServer
  addErrorMiddleware(): HttpServer
  start(): void
}
