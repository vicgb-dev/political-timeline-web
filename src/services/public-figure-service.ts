import { HOST, PUBLIC_FIGURE } from '../constants/api'
import { DEBUG } from '../constants/debug'
import { FakePublicFigures } from '../constants/mocks/mock-public-figure'
import { PublicFigure } from '../models/public-figure.interface'

export class PublicFigureService {
  static async getPublicFiguresByName (name: string): Promise<PublicFigure[]> {
    if (DEBUG) {
      const publicFigures = FakePublicFigures.filter(publicFigure =>
        publicFigure.first_name.toLowerCase().includes(name.toLowerCase()) ||
        publicFigure.last_name.toLowerCase().includes(name.toLowerCase())
      )
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(publicFigures)
        }, 500)
      })
    }

    try {
      const response = await fetch(`${HOST}${PUBLIC_FIGURE}?name=${name}`)
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API')
      }
      const data: PublicFigure[] = await response.json()
      return data
    } catch (error) {
      console.error('Error en la llamada a la API:', error)
      throw error
    }
  }
}
