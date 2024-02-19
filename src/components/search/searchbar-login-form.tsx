import { Button, Flex, Heading, IconButton, Link, Separator, Text, TextField } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import { EyeNoneIcon, EyeOpenIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { emailValid, passwordValid } from '../../tools/field-validations'
import { UserService } from '../../services/auth/user-service'

export interface LoginFormData{
    email: string
    password: string
}

export function SearchBarLoginForm () {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState<LoginFormData>({ email: '', password: '' })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [logingIn, setLogingIn] = useState(false)

  const isFirstInput = useRef(true)

  function togglePasswordView () {
    setPasswordVisible(!passwordVisible)
  }

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = formData.email === '' && formData.password === ''
      return
    }
    setFormErrors({ email: emailValid(formData.email), password: passwordValid(formData.password) })
  }, [formData])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const currentFormData = new FormData(form)
    const data = Object.fromEntries(currentFormData.entries())

    const newFormData: LoginFormData = {
      email: data.email.toString(),
      password: data.password.toString()
    }

    setFormData(newFormData)
    if (emailValid(newFormData.email) === '' && passwordValid(newFormData.password) === '') {
      setLogingIn(true)
      const response = await UserService.login(newFormData)

      setLogingIn(false)

      if (response) {
        console.log('Login correcto')
        // TODO: cambiar el layout del popover para mostrar el menu de usuario
        window.location.reload()
      } else {
        console.log('Error en el login')
      }
    }
  }

  function handleChange (event: ChangeEvent<HTMLInputElement>, fieldName: string): void {
    const value = event.target.value
    const newFormData: LoginFormData = { ...formData, [fieldName]: value }
    setFormData(newFormData)
  }

  return (
    <Flex direction='column' gap='4' align='center' p='3' style={{ transition: 'all 0.5 ease-in-out' }}>

      {/* Titulo */}
      <Heading size='5'>¿Ya tienes una cuenta?</Heading>
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
        <Flex direction='column' gap='4' align='center' pt='2' pb='2'>
          {/* Email */}
          <TextField.Root style={{ width: '100%' }} size='3'>
            <TextField.Slot>
              <PersonIcon height="16" width="16" />
            </TextField.Slot>
            {/* Email Input */}
            <TextField.Input
              name='email'
              required placeholder='mail@mail.com'
              onChange={(event) => handleChange(event, 'email')}/>
          </TextField.Root>
          {/* Email Error */}
          <Text size='1' color='red'>{formErrors.email}</Text>
          {/* Password */}
          <TextField.Root style={{ width: '100%' }} size='3'>
            <TextField.Slot>
              <LockClosedIcon height="16" width="16" />
            </TextField.Slot>
            {/* Password Input */}
            <TextField.Input
              name='password'
              required type={`${passwordVisible ? 'text' : 'password'}`}
              placeholder='123456'
              onChange={(event) => handleChange(event, 'password')}
            />

            {/* Mostrar/esconder contrasena */}
            <TextField.Slot>
              <IconButton size="1" variant="ghost" onClick={togglePasswordView}>
                {passwordVisible
                  ? <EyeOpenIcon height="14" width="14" />
                  : <EyeNoneIcon height="14" width="14" />
                }
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
          {/* Password Error */}
          <Text size='1' color='red' style={{ maxWidth: '250px' }}>{formErrors.password}</Text>
          <Form.Submit asChild>
            {/* Submit */}
            <Button disabled={logingIn} type="submit" variant="outline" color='orange' style={{ marginTop: 10 }}>
              {logingIn ? 'Iniciando sesión' : 'Iniciar sesión'}
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>

      <Link size='2' href='#' color='orange'>¿Olvidaste tu contraseña?</Link>
      <Separator size='4'/>
      <Text size='2'>¿No tienes una cuenta? <Link href='#' color='orange'>Regístrate</Link></Text>

    </Flex>
  )
}
