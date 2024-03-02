import { Button, Flex, Popover } from '@radix-ui/themes'
import { AuthContext } from '../../context/auth-context'
import { useContext, useState } from 'react'

export function PopoverUserMenu ({ children }: {children: React.ReactNode}) {
  const { logout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  function signOut () {
    logout()
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        { children }
      </Popover.Trigger>
      <Popover.Content >
        <Flex direction='column' gap='3' align='start'>
          <Button size='2' style={{ width: '100%', justifyContent: 'start' }} variant='soft'>Perfil</Button>
          <Button size='2' style={{ width: '100%', justifyContent: 'start' }} variant='soft'>Configuración</Button>
          <Button size='2' style={{ width: '100%', justifyContent: 'start' }} variant='solid' color='tomato' onClick={signOut} >Cerrar sesión</Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
