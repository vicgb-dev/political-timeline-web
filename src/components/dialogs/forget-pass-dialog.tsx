import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import * as Form from '@radix-ui/react-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PersonIcon } from '@radix-ui/react-icons'

const schema = z.object({
  email: z.string().email('El correo no es válido').min(1, 'El correo es requerido')
})

type ForgetPasswordData = z.infer<typeof schema>

export function ForgetPassDialog ({ children }: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset } = useForm<ForgetPasswordData>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<ForgetPasswordData> = async (data: ForgetPasswordData) => {
    try {
      // TODO: Send email
      await new Promise((resolve) => {
        setTimeout(resolve, 500)
      })
      console.log(data)
    } catch (error) {
      setError('root', { message: 'Error' })
    }
  }

  function onOpenChange (open: boolean) {
    if (isSubmitting) return
    setOpen(open)
  }

  useEffect(() => {
    return () => {
      console.log('unmount')
      reset()
    }
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>

      <Dialog.Content className='flex flex-col items-center gap-3'>
        <Dialog.Title align='center' size='7'>Recuperar contraseña</Dialog.Title>
        <Dialog.Description size="3" align='center' className='text-pretty'>
          <p>
             Si tu correo está en nuestro sistema recibirás <br /> instrucciones para recuperar la contraseña.
          </p>
        </Dialog.Description>
        <Form.Root className='flex flex-col items-center gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' gap='4' align='center' pt='2' pb='2'>
            <label style={{ width: '100%', marginBottom: 15 }}>Email
              <TextField.Root style={{ width: '100%' }} size='3'>
                <TextField.Slot>
                  <PersonIcon height="16" width="16" />
                </TextField.Slot>
                {/* Email Input */}
                <TextField.Input
                  {...register('email')}
                  required placeholder='mail@mail.com'/>
              </TextField.Root>
              {errors.email && <Text size='1' color='red'>{errors.email?.message}</Text>}
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
                  {isSubmitting ? 'Enviando correo' : 'Enviar correo'}
                </Button>
              </Form.Submit>
            </Flex>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  )
}
