import { EVENT, HOST, MINE, PUBLISHED } from '../constants/api'
import { DEBUG } from '../constants/debug'
import { fakeEvents } from '../constants/mocks/mock-events'
import { PoliticalEvent } from '../models/political-event.interface'
import { AuthRepo } from '../repositories/auth-repo'

export class EventsService {
  static async getPublishedEvents (): Promise<PoliticalEvent[]> {
    if (DEBUG) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fakeEvents)
        }, 500)
      })
    }

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

  static async getMyEvents (): Promise<PoliticalEvent[]> {
    if (DEBUG) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // resolve(fakeEvents.slice(0, 3))
          resolve(fakeEvents)
        }, 500)
      })
    }

    try {
      const token = AuthRepo.getToken()
      if (!token) throw new Error('No hay token')

      const response = await fetch(`${HOST}${EVENT}${MINE}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

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
