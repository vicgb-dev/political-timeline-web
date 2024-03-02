export class AuthRepo {
  // TODO: usar cookies en lugar de localStorage
  static saveToken (token: string): void {
    // const cookies: Cookies = new Cookies()
    // cookies.set('token', token, { httpOnly: true, secure: true })
    // console.log('TOKEN GUARDADO EN COOKIE')
    localStorage.setItem('token', token)
  }

  static getToken (): string | null {
    // const cookies: Cookies = new Cookies()
    // return cookies.get('token')
    return localStorage.getItem('token')
  }

  static logout (): void {
    localStorage.removeItem('token')
    console.log('token borrado')
  }
}
