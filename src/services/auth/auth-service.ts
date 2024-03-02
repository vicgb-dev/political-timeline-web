import { HOST, LOGIN, USER } from '../../constants/api'
import { LoginUser } from '../../models/login.interface'
import { AuthRepo } from '../../repositories/auth-repo'

export class AuthService {
  static async login (userLogin: LoginUser): Promise<string> {
    try {
      const response = await fetch(`${HOST}${USER}${LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogin)
      })

      if (response.ok) {
        const token = await response.text()
        AuthRepo.saveToken(token)
        // TODO: Cambiar token por usuario porque el token se usará en una httponly cookies
        return token
      }

      throw new Error('Error al obtener los datos de la API')
    } catch (error) {
      console.error('Error en la llamada a la API:', error)
      throw error
    }
  }

  static logout (): void {
    AuthRepo.logout()
  }

  static async isLogged (): Promise<boolean> {
    return Promise.resolve(!!AuthRepo.getToken())
  }
}
