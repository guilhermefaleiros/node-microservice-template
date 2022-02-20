import { RouteMethod } from './RouteMethod'
import { RouteHandler } from './RouteHandler'

export type RouteConfig = {
  method: RouteMethod
  name: string
  handler: RouteHandler
  path: string
}
