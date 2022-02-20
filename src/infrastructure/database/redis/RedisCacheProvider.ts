import Redis, { Redis as RedisInterface } from 'ioredis'

import { CacheProvider } from '@application/ports/cache/CacheProvider'

export class RedisCacheProvider implements CacheProvider {
  private readonly redisClient: RedisInterface

  constructor() {
    this.redisClient = new Redis({
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST
    })
  }

  async get<T = any>(key: string): Promise<T | undefined> {
    const data = await this.redisClient.get(key)
    if (!data) return undefined
    const parsedData = JSON.parse(data) as T
    return parsedData
  }

  async save(key: string, value: any, ttl: number): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl)
  }

  async invalidate(key: string): Promise<void> {
    await this.redisClient.del(key)
  }
}
