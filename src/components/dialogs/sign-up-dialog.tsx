import { Button, Dialog, Flex, IconButton, Text, TextField } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import * as Form from '@radix-ui/react-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EyeNoneIcon, EyeOpenIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'

const schema = z.object({
  email: z.string().email('El correo no es válido').min(1, 'El correo es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})

type SignUpData = z.infer<typeof schema>

export function SignUpDialog ({ children }: {children: React.ReactNode}) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset } = useForm<SignUpData>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<SignUpData> = async (data: SignUpData) => {
    try {
      // TODO: SignUp logic
      await new Promise((resolve) => {
        setTimeout(resolve, 500)
      })
      setOpen(false)
    } catch (error) {
      setError('root', { message: 'Error' })
    }
  }

  function onOpenChange (open: boolean) {
    if (isSubmitting) return
    setOpen(open)
  }

  useEffect(() => {
    reset()
  }, [open])

  function togglePasswordView (e: any) {
    e.preventDefault()
    setPasswordVisible(!passwordVisible)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>

      <Dialog.Content className='flex flex-col items-center gap-3'>
        <Dialog.Title align='center' size='7'>Crear cuenta</Dialog.Title>
        <Form.Root className='flex flex-col items-center gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' gap='4' align='center' pt='2' pb='2'>
            {/* Email */}
            <label className='w-full mb-5'>Email
              <TextField.Root className='w-full' size='3'>
                <TextField.Slot>
                  <PersonIcon />
                </TextField.Slot>
                {/* Email Input */}
                <TextField.Input
                  {...register('email')}
                  required placeholder='mail@mail.com'/>
              </TextField.Root>
              <Text className='absolute' size='1' color='red'>{errors.email?.message}</Text>
            </label>
            {/* Password */}
            <label className='w-full mb-5'>Contraseña
              <TextField.Root className='w-full' size='3'>
                <TextField.Slot>
                  <LockClosedIcon />
                </TextField.Slot>
                {/* Password Input */}
                <TextField.Input
                  type={`${passwordVisible ? 'text' : 'password'}`}
                  {...register('password')}
                  required
                  placeholder='123456'/>
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
              <Text className='absolute' size='1' color='red'>{errors.password?.message}</Text>
            </label>
            {/* Confirm password */}
            <label className='w-full mb-5'>Confirmar contraseña
              <TextField.Root className='w-full' size='3'>
                <TextField.Slot>
                  <LockClosedIcon />
                </TextField.Slot>
                {/* Email Input */}
                <TextField.Input
                  type={`${passwordVisible ? 'text' : 'password'}`}
                  {...register('confirmPassword')}
                  required
                  placeholder='123456'/>
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
              <Text className='absolute' size='1' color='red'>{errors.confirmPassword?.message}</Text>
            </label>
            {/* Botones */}
            <Flex gap="3" mb='3' mt='3' justify='center' width='100%'>
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cerrar
                </Button>
              </Dialog.Close>
              <Form.Submit asChild>
                {/* Submit */}
                <Button disabled={isSubmitting} type="submit" variant="outline">
                  {isSubmitting ? 'Registrando' : 'Registrarse'}
                </Button>
              </Form.Submit>
            </Flex>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  )
}
