export interface CacheProvider {
  get<T = any>(key: string): Promise<T | undefined>
  save(key: string, value: any, ttl: number): Promise<void>
  invalidate(key: string): Promise<void>
}
