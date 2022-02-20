import { UserRepository } from '@application/ports/repository/UserRepository'
import { User } from '@domain/entities/User'

export class MemoryUserRepository implements UserRepository {
  private readonly users: User[]

  constructor() {
    this.users = []
  }

  async save(user: User) {
    this.users.push(user)
  }

  async findById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((user) => (user.id = id)))
  }
}
