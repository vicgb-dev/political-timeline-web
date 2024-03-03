import { useEffect, useState } from 'react'
import { PoliticalEvent } from '../models/political-event.interface'
import { EventsService } from '../services/events-service'
import { Header } from '../components/header/header'
import { TimeLine } from '../components/timeline/timeline'
import { CreateEventButton } from '../components/buttons/create-event-button'
import { Route } from '../routes/my-events'

export function MyEventsPage () {
  const [events, setEvents] = useState<PoliticalEvent[] | null>(null)
  const { eventId, creating } = Route.useSearch()

  // Obtener los eventos
  useEffect(() => {
    async function getMyEvents () {
      try {
        const eventsData = await EventsService.getMyEvents()
        setEvents(eventsData)
      } catch (error) {
        // TODO: Manejo de errores
      }
    }

    getMyEvents()
  }, [])

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        {!creating &&
        <div style={{ position: 'fixed', zIndex: 1, height: 0, left: '0', right: '0', marginTop: -15 }}>
          <CreateEventButton />
        </div>}
        <TimeLine props={{ events }}/>
      </main>
    </>
  )
}
