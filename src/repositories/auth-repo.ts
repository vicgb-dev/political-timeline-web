export class AuthRepo {
  static saveToken (token: string): void {
    // TODO: usar una cookie de sesión para guardar el token
    localStorage.setItem('token', token)
  }

  static getToken (): string | null {
    // TODO: usar una cookie de sesión para leer el token
    return localStorage.getItem('token')
  }
}
