import { useEffect, useState } from 'react'
import { EventTimeLine } from '../components/event/event-timeline'
import { Event } from '../models/event.interface'
import { EventsService } from '../services/events-service'
import './events.page.css'

export function EventsPage () {
  const [events, setEvents] = useState<Event[] | null>(null)

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

  return (
    <>
      <div className="linea-central"></div>
      <div className="fixed background"></div>
      <EventTimeLine props={{ events }}/>
    </>
  )
}
