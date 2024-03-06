import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { Link, useRouterState } from '@tanstack/react-router'
import { AuthContext } from '../../context/auth-context'
import { useContext } from 'react'
import { EventsContext } from '../../context/events-context'

export function CreateEventButton () {
  const { isLogged } = useContext(AuthContext)
  const { eventCreating, setEventCreating } = useContext(EventsContext)
  const routerState = useRouterState()

  return (
    isLogged && !eventCreating &&
    <Link
      to='/my-events'
      search={{ creating: true }}
      style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button
        size='2'
        variant={routerState.location.pathname === '/my-events' ? 'solid' : 'surface'}
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        onClick={() => setEventCreating(
          {
            id: -1,
            title: '',
            summary: '',
            description: '',
            publishingStatus: '',
            idTopic: null,
            idAuthor: '',
            eventDate: new Date(),
            importance: 1,
            eventImg: ''
          })
        }>
        <PlusIcon height="16" width="16" />
          Crear evento
      </Button>
    </Link>
  )
}
