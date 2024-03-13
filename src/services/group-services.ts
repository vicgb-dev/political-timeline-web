import { GROUP, HOST } from '../constants/api'
import { DEBUG } from '../constants/debug'
import { FakeGroups } from '../constants/mocks/mock-groups'
import { Group } from '../models/group.interface'

export class GroupServices {
  static async getGroupsByTitle (title: string): Promise<Group[]> {
    if (DEBUG) {
      const groups = FakeGroups.filter(group => group.name.toLowerCase().includes(title))
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(groups)
        }, 500)
      })
    }

    try {
      const response = await fetch(`${HOST}${GROUP}?title=${title}`)
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API')
      }
      const data: Group[] = await response.json()
      return data
    } catch (error) {
      console.error('Error en la llamada a la API:', error)
      throw error
    }
  }
}
