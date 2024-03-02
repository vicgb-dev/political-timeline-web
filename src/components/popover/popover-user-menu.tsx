import { Button, Flex, Popover } from '@radix-ui/themes'
import { AuthContext } from '../../context/auth-context'
import { useContext, useState } from 'react'
import { Link } from '@tanstack/react-router'

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
          <Link to='/about' style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
            <Button size='2'style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} variant='soft'>
              Mi perfil
            </Button>
          </Link>
          <Link to='/about' style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
            <Button size='2'style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} variant='soft'>
              Mis eventos
            </Button>
          </Link>
          <Link to='/about' style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
            <Button size='2'style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} variant='soft'>
              Configuración
            </Button>
          </Link>
          <Button size='2' style={{ width: '100%', justifyContent: 'start' }} variant='solid' color='tomato' onClick={signOut} >Cerrar sesión</Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
