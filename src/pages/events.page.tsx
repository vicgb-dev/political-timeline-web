import { useContext, useEffect, useState } from 'react'
import { EventTimeLine } from '../components/event/event-timeline'
import { PoliticalEvent } from '../models/event.interface'
import { EventsService } from '../services/events-service'
import './events.page.css'
import { EventsContext } from '../providers/events-context'
import { Button } from '@radix-ui/themes'

export function EventsPage () {
  const [events, setEvents] = useState<PoliticalEvent[] | null>(null)

  const { setFocusedEvent } = useContext(EventsContext)

  const {
    floatEvent,
    oneCenterColumn,
    focusedEvent
  } = useContext(EventsContext)

  // Obtener los eventos
  useEffect(() => {
    async function getPublishedEvents () {
      try {
        const eventsData = await EventsService.getPublishedEvents()

        setEvents(eventsData)
      } catch (error) {
        // Manejo de errores
      }
    }

    if (!events) {
      getPublishedEvents()
    }
  }, [])

  const handleDebugclick = () => {
    setFocusedEvent(null)
  }

  return (
    <>
      <div className="fixed background"></div>
      <div className="time-line"></div>
      <Button onClick={handleDebugclick}>Click me</Button>
      <div className='debug'>
        <span>
          {floatEvent ? 'Float' : 'No float'}
        </span>
        <span>
          {oneCenterColumn ? 'One center column' : 'No one center column'}
        </span>
        <span>
          {focusedEvent ? focusedEvent.title : 'No focused event'}
        </span>
      </div>
      <EventTimeLine props={{ events }}/>
    </>
  )
}
