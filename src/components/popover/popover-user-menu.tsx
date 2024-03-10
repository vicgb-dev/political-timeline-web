import { Button, Flex, Popover } from '@radix-ui/themes'
import { AuthContext } from '../../context/auth-context'
import { useContext, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { CreateEventButton } from '../buttons/create-event-button'
import { useEvents } from '../../stores/events-store'

export function PopoverUserMenu ({ children }: {children: React.ReactNode}) {
  const events = useEvents(state => state.selectedEvents)
  const { logout, isLogged } = useContext(AuthContext)
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
            <Button size='2'style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} variant='soft' tabIndex={-1}>
              Mi perfil
            </Button>
          </Link>
          <Link to='/my-events' style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
            <Button size='2'style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} variant='soft' tabIndex={-1}>
              Mis eventos
            </Button>
          </Link>
          {isLogged && !events.find(event => event.id === -1) &&
          <CreateEventButton props={{ fullWidth: true, showIcon: false, showText: true }}/>}
          <Link to='/about' style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
            <Button size='2'style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} variant='soft' tabIndex={-1}>
              Configuración
            </Button>
          </Link>
          <Button size='2' style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} variant='solid' color='tomato' onClick={signOut}>
              Cerrar sesión
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
