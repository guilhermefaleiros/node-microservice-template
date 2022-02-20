import express, { Express, NextFunction, Request, Response } from 'express'

import { HttpServer } from '@presentation/ports/http/HttpServer'
import { RouteConfig } from '@presentation/ports/http/RouteConfig'
import { Logger } from '@shared/ports/Logger'
import { ApplicationError } from '@application/base/ApplicationError'

import 'express-async-errors'
import { DomainError } from '@domain/base/DomainError'

export class ExpressAdapter implements HttpServer {
  private app: Express
  private port: number
  private onStart?: () => void
  private logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
    this.app = express()
    this.app.use(express.json())
  }

  private adaptRoute(route: RouteConfig): any {
    const { handler } = route

    const expressRoute = async (req: Request, res: Response) => {
      this.logger.info(`[GET] ${route.path} - ${route.name}`)
      const response = await handler.execute({
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query
      })

      if (response.headers) {
        response.headers.forEach((header) => {
          res.header(header.key, header.value)
        })
      }

      return res.status(response.statusCode).json(response.body)
    }

    return expressRoute
  }

  configure(
    routes: RouteConfig[],
    port: number,
    onStart?: () => void
  ): HttpServer {
    routes.forEach((route) => {
      this.addRoute(route)
    })
    this.port = port
    this.onStart = onStart
    return this
  }

  addErrorMiddleware(): HttpServer {
    this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof ApplicationError || err instanceof DomainError) {
        return res.status(err.statusCode).json({
          message: err.message
        })
      }

      return res.status(500).json({
        message: 'Ocorreu um erro inesperado. Tente mais tarde novamente!'
      })
    })
    return this
  }

  start(): void {
    this.logger.info(
      `Starting [${process.env.SERVICE_NAME}] express server  on port: [${this.port}]`
    )

    this.app.listen(this.port, this.onStart ? this.onStart : () => {})
  }

  private addRoute(route: RouteConfig): void {
    this.app[route.method](route.path, this.adaptRoute(route))
  }
}
