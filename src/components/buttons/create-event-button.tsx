import { Button } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { useEvents } from '../../stores/events-store'

export function CreateEventButton () {
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
    <Link to='/my-events' style={{ width: '100%', textDecoration: 'none', color: 'inherit' }} search={{ creating: true }}>
      <Button
        size='2'
        variant='soft'
        style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} tabIndex={-1}
        onClick={() => addEventCreating()
        }>
        Crear evento
      </Button>
    </Link>
  )
}
