import { EVENT, HOST, PUBLISHED } from '../constants/api'
import { Event } from '../models/event.interface'

export class EventsService {
  static async getPublishedEvents (): Promise<Event[]> {
    try {
      const response = await fetch(`${HOST}${EVENT}${PUBLISHED}`)
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API')
      }
      const data: Event[] = await response.json()
      return data
    } catch (error) {
      console.error('Error en la llamada a la API:', error)
      throw error
    }
  }
}
