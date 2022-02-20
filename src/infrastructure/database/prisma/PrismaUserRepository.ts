import { UserRepository } from '@application/ports/repository/UserRepository'

import { User } from '@domain/entities/User'

import prisma from './prisma'

export class PrismaUserRepository implements UserRepository {
  async save(user: User) {
    return await prisma.$transaction(async (tx) => {
      const response = await tx.users.upsert({
        where: {
          id: user.id
        },
        create: {
          id: user.id,
          name: user.name,
          cpf: user.cpf.value
        },
        update: {
          name: user.name,
          cpf: user.cpf.value
        }
      })
      return response
    })
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.users.findUnique({
      where: {
        id
      }
    })
    return user ? new User(user.name, user.cpf, user.id) : undefined
  }
}
