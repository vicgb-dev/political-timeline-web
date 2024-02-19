import { EVENT, HOST, PUBLISHED } from '../constants/api'
import { PoliticalEvent } from '../models/event.interface'

export class EventsService {
  static async getPublishedEvents (): Promise<PoliticalEvent[]> {
    try {
      const response = await fetch(`${HOST}${EVENT}${PUBLISHED}`)
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API')
      }
      let data: PoliticalEvent[] = await response.json()
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
