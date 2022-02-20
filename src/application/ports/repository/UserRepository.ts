import { User } from '@domain/entities/User'

export interface UserRepository {
  save(user: User, transaction?: any)
  findById(id: string): Promise<User | undefined>
}
