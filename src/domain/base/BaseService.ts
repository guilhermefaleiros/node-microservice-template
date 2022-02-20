export interface BaseService<T, R> {
  execute(input: T): Promise<R>
}
