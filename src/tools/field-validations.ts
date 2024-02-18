export function emailValid (email: string):string {
  const re = /\S+@\S+\.\S+/
  if (re.test(email)) {
    return ''
  }
  return 'Introduce un email válido'
}

export function passwordValid (password: string):string {
  if (!validationContainsLowerCase(password)) {
    return 'La contraseña debe tener al menos una letra minúscula'
  }
  if (!validationContainsNumber(password)) {
    return 'La contraseña debe tener al menos un número'
  }
  if (!validationLongerThan(password, 6)) {
    return 'La contraseña debe tener al menos 6 caracteres'
  }

  return ''
}

function validationLongerThan (password: string, length: number): boolean {
  return password.length >= length
}

function validationContainsUpperCase (password: string): boolean {
  return /[A-Z]/.test(password)
}

function validationContainsLowerCase (password: string): boolean {
  return /[a-z]/.test(password)
}

function validationContainsNumber (password: string): boolean {
  return /\d/.test(password)
}
