import { EventRepository } from '@application/ports/repository/EventRepository'
import { Event } from '@domain/entities/Event'

import prisma from './prisma'

export class PrismaEventRepository implements EventRepository {
  async save(event: Event): Promise<Event> {
    return await prisma.$transaction(async (tx) => {
      await tx.events.upsert({
        where: {
          id: event.id
        },
        create: {
          id: event.id,
          name: event.name,
          handled: false,
          payload: event.payload
        },
        update: {
          id: event.id,
          name: event.name,
          handled: event.handled,
          payload: event.payload
        }
      })
      return event
    })
  }

  async findNotHandled(type: string): Promise<Event[]> {
    const response = await prisma.events.findMany({
      where: {
        name: type,
        handled: false
      }
    })
    return response
      ? response.map((e) => new Event(e.name, e.payload, e.handled, e.id))
      : []
  }
}
