import { useEffect, useState } from 'react'
import { TimeLine } from '../components/timeline/timeline'
import { PoliticalEvent } from '../models/political-event.interface'
import { EventsService } from '../services/events-service'
import { Header } from '../components/header/header'
import './event-pages.css'
import { TimeLineMenu } from '../components/timeline/timeline-menu'

export function TimelinePage () {
  const [events, setEvents] = useState<PoliticalEvent[] | null>(null)

  // Obtener los eventos
  useEffect(() => {
    async function getPublishedEvents () {
      try {
        const eventsData = await EventsService.getPublishedEvents()
        setEvents(eventsData)
      } catch (error) {
        // TODO: Manejo de errores
      }
    }

    getPublishedEvents()
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
