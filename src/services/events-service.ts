import { EVENT, HOST, PUBLISHED } from '../constants/api'
import { Event } from '../models/event.interface'

export class EventsService {
  static async getPublishedEvents (): Promise<Event[]> {
    try {
      const response = await fetch(`${HOST}${EVENT}${PUBLISHED}`)
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API')
      }
      let data: Event[] = await response.json()
      data = data.sort((a, b) => {
        return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
      })
      return data
    } catch (error) {
      console.error('Error en la llamada a la API:', error)
      throw error
    }
  }
}
