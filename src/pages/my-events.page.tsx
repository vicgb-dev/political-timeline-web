import { useEffect, useState } from 'react'
import { PoliticalEvent } from '../models/political-event.interface'
import { EventsService } from '../services/events-service'
import { Header } from '../components/header/header'
import { TimeLine } from '../components/timeline/timeline'
import { Route } from '../routes/my-events'

export function MyEventsPage() {
  const [events, setEvents] = useState<PoliticalEvent[] | null>(null)
  const { creating } = Route.useSearch()

  // Obtener los eventos
  useEffect(() => {
    async function getMyEvents() {
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
      <main className='pt-14 pl-6 pr-6'>
        <TimeLine props={{ events }} />
      </main>
    </>
  )
}
