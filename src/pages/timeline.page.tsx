import { useEffect, useState } from 'react'
import { TimeLine } from '../components/timeline/timeline'
import { PoliticalEvent } from '../models/political-event.interface'
import { EventsService } from '../services/events-service'
import { Header } from '../components/header/header'

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
      <header>
        <Header />
      </header>
      <main>
        <TimeLine props={{ events }}/>
      </main>
    </>
  )
}
