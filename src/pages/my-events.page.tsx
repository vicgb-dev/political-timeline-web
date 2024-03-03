import { useEffect, useState } from 'react'
import { PoliticalEvent } from '../models/event.interface'
import { EventsService } from '../services/events-service'
import { Header } from '../components/header/header'
import { TimeLine } from '../components/timeline/timeline'
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/my-events')

export function MyEventsPage () {
  const [events, setEvents] = useState<PoliticalEvent[] | null>(null)
  const { eventId, creating } = routeApi.useSearch()

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
        <p>{eventId}</p>
        <p>{creating ? 'true' : 'false'}</p>
        <TimeLine props={{ events }}/>
      </main>
    </>
  )
}
