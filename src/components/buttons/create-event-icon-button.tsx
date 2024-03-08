import { CardStackPlusIcon } from '@radix-ui/react-icons'
import { IconButton, Tooltip } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { useEvents } from '../../stores/events-store'
import { useLayoutStore } from '../../stores/layout-store'

export function CreateEventIconButton () {
  const events = useEvents(state => state.selectedEvents)
  const addEvent = useEvents(state => state.addEvent)
  const setFocusedEvent = useEvents(state => state.setFocusedEvent)
  const setMinimized = useLayoutStore(state => state.setMinimized)
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
    setMinimized(false)
  }

  return (
    <>
      {!events.find(event => event.id === -1)
        ? <Link
          to='/my-events'
          search={{ creating: true }}
          style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton
            size='2'
            variant='surface'
            style={{ marginLeft: 'auto', cursor: 'pointer' }}
            onClick={() => addEventCreating()}>
            <CardStackPlusIcon />
          </IconButton>
        </Link>
        : <Tooltip content="Ya estás editando un evento">
          <IconButton
            disabled
            size='2'
            variant='surface'
            style={{ cursor: 'pointer' }}>
            <CardStackPlusIcon />
          </IconButton>
        </Tooltip>}
    </>
  )
}
