import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { Link, useRouterState } from '@tanstack/react-router'
import { AuthContext } from '../../context/auth-context'
import { useContext } from 'react'
import { useEvents } from '../../stores/events-store'

export function CreateEventButton() {
  const { isLogged } = useContext(AuthContext)
  const events = useEvents(state => state.selectedEvents)
  const addEvent = useEvents(state => state.addEvent)
  const setFocusedEvent = useEvents(state => state.setFocusedEvent)
  const routerState = useRouterState()

  const addEventCreating = () => {
    const newEvent = {
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
    }

    addEvent(newEvent)
    setFocusedEvent(newEvent)
  }

  return (
    !events.find(event => event.id === -1) &&
    <Link
      to='/my-events'
      search={{ creating: true }}
      style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button
        size='2'
        variant={routerState.location.pathname === '/my-events' ? 'solid' : 'surface'}
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        onClick={() => addEventCreating()
        }>
        <PlusIcon height="16" width="16" />
        Crear evento
      </Button>
    </Link>
  )
}
