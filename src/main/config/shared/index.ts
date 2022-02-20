import { CacheProvider } from '@application/ports/cache/CacheProvider'
import { DomainEventProducer } from '@application/ports/events/DomainEventProducer'
import { RepositoryFactory } from '@application/ports/repository/RepositoryFactory'
import { PrismaRepositoryFactory } from '@infrastructure/database/prisma/PrismaRepositoryFactory'
import { RedisCacheProvider } from '@infrastructure/database/redis/RedisCacheProvider'
import { KafkaEventProducer } from '@infrastructure/event/kafka/KafkaEventProducer'
import { WinstonElasticLogger } from '@infrastructure/logging/WinstonElasticLogger'
import { Logger } from '@shared/ports/Logger'

export const producer: DomainEventProducer = new KafkaEventProducer()

export const repositoryFactory: RepositoryFactory =
  new PrismaRepositoryFactory()

export const logger: Logger = new WinstonElasticLogger()

export const cacheProvider: CacheProvider = new RedisCacheProvider()
