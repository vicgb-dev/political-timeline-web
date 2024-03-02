import { useEffect, useState } from 'react'
import { PoliticalEvent } from '../models/event.interface'
import { EventsService } from '../services/events-service'
import { Header } from '../components/header/header'
import { TimeLine } from '../components/timeline/timeline'

export function MyEventsPage () {
  const [events, setEvents] = useState<PoliticalEvent[] | null>(null)

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
        <TimeLine props={{ events }}/>
      </main>
    </>
  )
}
