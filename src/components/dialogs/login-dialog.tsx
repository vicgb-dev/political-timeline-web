import { Button, Dialog, Flex, TextField, Text, IconButton, Link, Separator } from '@radix-ui/themes'
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { emailValid, passwordValid } from '../../tools/field-validations'
import { AuthService } from '../../services/auth/auth-service'
import { EyeNoneIcon, EyeOpenIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form'
import { AuthContext } from '../../context/auth-context'
import { ForgetPassDialog } from './forget-pass-dialog'

export interface LoginFormData{
  email: string
  password: string
}

// TODO: usar hook useForm y zod
export function LoginDialog ({ children }: {children: React.ReactNode}) {
  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState<LoginFormData>({ email: '', password: '' })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [logingIn, setLogingIn] = useState(false)
  const [open, setOpen] = useState(false)

  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = formData.email === '' && formData.password === ''
      return
    }
    setFormErrors({ email: emailValid(formData.email), password: passwordValid(formData.password) })
  }, [formData])

  useEffect(() => {
    if (!open) {
      setFormErrors({ email: '', password: '' })
      setPasswordVisible(false)
      setLogingIn(false)
      isFirstInput.current = true
    }
  }, [open])

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

    // TODO: llamar a la api
    if (emailValid(newFormData.email) === '' && passwordValid(newFormData.password) === '') {
      setLogingIn(true)
      try {
        const token = await AuthService.login(newFormData)
        login(token)
        setOpen(false)
      } catch (error) {
        // TODO: Mostrar mensaje de error en toast
      } finally {
        setLogingIn(false)
      }
    }
  }

  function togglePasswordView (e: any) {
    e.preventDefault()
    setPasswordVisible(!passwordVisible)
  }

  function handleChange (event: ChangeEvent<HTMLInputElement>, fieldName: string): void {
    const value = event.target.value
    const newFormData: LoginFormData = { ...formData, [fieldName]: value }
    setFormData(newFormData)
  }

  function onOpenChange (open: boolean) {
    if (logingIn) return
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>

      <Dialog.Content className='flex flex-col items-center gap-3'>
        <Dialog.Title align='center' size='7'>Inicio de sesión</Dialog.Title>
        <Dialog.Description size="4" align='center'>
          ¿Ya tienes una cuenta?
        </Dialog.Description>
        <Form.Root className='flex flex-col items-center gap-3' onSubmit={handleSubmit}>
          <Flex direction='column' gap='4' align='center' pt='2' pb='2'>
            {/* Email */}
            <label className='w-full mb-5'>Email
              <TextField.Root className='w-full' size='3'>
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
              <Text size='1' color='red' className='absolute'>{formErrors.email}</Text>
            </label>
            {/* Password */}
            <label className='w-full mb-5'>Constraseña
              <TextField.Root className='w-full' size='3'>
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
                  <IconButton size="1" variant="ghost" onClick={(e) => togglePasswordView(e)}>
                    {passwordVisible
                      ? <EyeOpenIcon className='h-4 w-4'/>
                      : <EyeNoneIcon className='h-4 w-4'/>
                    }
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
              {/* Password Error */}
              <Text size='1' color='red' className='absolute'>{formErrors.password}</Text>
            </label>
            {/* Botones */}
            <div className='flex flex-row gap-3 mb-3 justify-center w-full'>
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cerrar
                </Button>
              </Dialog.Close>
              <Form.Submit asChild>
                {/* Submit */}
                <Button disabled={logingIn} type="submit" variant="outline">
                  {logingIn ? 'Iniciando sesión' : 'Iniciar sesión'}
                </Button>
              </Form.Submit>
            </div>
          </Flex>
        </Form.Root>
        <ForgetPassDialog>
          <Link size='2' >¿Olvidaste tu contraseña?</Link>
        </ForgetPassDialog>
        <Separator size='4'/>
        <Text size='3'>¿No tienes una cuenta? <Link href='#'>Regístrate</Link></Text>

      </Dialog.Content>
    </Dialog.Root>
  )
}
