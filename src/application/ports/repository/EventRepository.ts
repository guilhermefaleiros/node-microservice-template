import { Event } from '@domain/entities/Event'

export interface EventRepository {
  save(event: Event): Promise<Event>
  findNotHandled(type: string): Promise<Event[]>
}
