import { Button } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { useEvents } from '../../stores/events-store'
import { useLayoutStore } from '../../stores/layout-store'
import { Cross1Icon, Cross2Icon, PlusIcon } from '@radix-ui/react-icons'

interface CreateEventButtonProps {
  fullWidth?: boolean
  showText?: boolean
  showIcon?: boolean
}

// TODO: combinar con CreateEventIconButton
export function CreateEventButton ({ props }: {props: CreateEventButtonProps}) {
  const toggleEvent = useEvents(state => state.toggleEvent)
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

    toggleEvent(newEvent)
    setMinimized(false)
  }

  return (
    <Link to='/my-events' style={{ width: `${props.fullWidth ? '100%' : ''}`, textDecoration: 'none', color: 'inherit' }} search={{ creating: true }}>
      <Button
        size='2'
        variant='soft'
        style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} tabIndex={-1}
        onClick={() => addEventCreating()}>
        {props.showIcon ? <PlusIcon /> : null}
        {props.showText ? <p>Crear evento</p> : null}
      </Button>
    </Link>
  )
}
