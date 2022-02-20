export type HttpRequest<T = any> = {
  body: T
  params: any
  query: any
  headers: any
}
