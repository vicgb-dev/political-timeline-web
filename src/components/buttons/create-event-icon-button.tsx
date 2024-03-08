import { CardStackPlusIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { useEvents } from '../../stores/events-store'

export function CreateEventIconButton () {
  const addEvent = useEvents(state => state.addEvent)
  const setFocusedEvent = useEvents(state => state.setFocusedEvent)

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
    <Link
      to='/my-events'
      search={{ creating: true }}
      style={{ textDecoration: 'none', color: 'inherit' }}>
      <IconButton
        size='2'
        variant='surface'
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        onClick={() => addEventCreating()
        }>
        <CardStackPlusIcon />
      </IconButton>
    </Link>
  )
}
