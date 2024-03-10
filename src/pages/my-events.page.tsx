import { useEffect, useState } from 'react'
import { PoliticalEvent } from '../models/political-event.interface'
import { EventsService } from '../services/events-service'
import { Header } from '../components/header/header'
import { TimeLine } from '../components/timeline/timeline'
import './event-pages.css'
import { TimeLineMenu } from '../components/timeline/timeline-menu'

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
      <header className='events-header-page'>
        <Header />
      </header>
      <main className='events-main-page'>
        <TimeLine props={{ events }} />
        <TimeLineMenu />
      </main>
    </>
  )
}
