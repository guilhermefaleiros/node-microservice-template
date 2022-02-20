import { HttpResponse } from '@presentation/ports/http/HttpResponse'

export const buildCreatedResponse = (payload: any): HttpResponse => {
  return {
    statusCode: 201,
    body: payload
  }
}

export const buildOkResponse = (payload: any): HttpResponse => {
  return {
    statusCode: 200,
    body: payload
  }
}
