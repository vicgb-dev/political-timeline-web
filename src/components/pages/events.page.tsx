import { useEffect, useState } from 'react'
import { EventTimeLine } from '../event/event-timeline'
import { Event } from '../../models/event.interface'
import { Box, Flex } from '@radix-ui/themes'
import TestComponent from '../tests-components/tests-components'
import { EventsService } from '../../services/events-service'
import ToastDemo from '../../shared/toast-demo'

export function EventsPage () {
  const [events, setEvents] = useState<Event[]>([])

  // Obtener los eventos
  useEffect(() => {
    async function getPublishedEvents () {
      try {
        const eventsData = await EventsService.getPublishedEvents()
        setEvents(eventsData)
        console.log(eventsData)
      } catch (error) {
        // Manejo de errores
      }
    }

    getPublishedEvents()
  }, [])

  return (
    <>
      <ToastDemo />
      <div className="linea-central"></div>
      <EventTimeLine events={events} isMobile={false}/>
      <Flex direction='column' justify='center' align='center' style={{ paddingTop: '80px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((_, index) => (
          <Box
            key={index}
            style={{
              marginTop: '-60px',
              marginRight: index % 2 === 0 ? '500px' : 0,
              marginLeft: index % 2 === 1 ? '500px' : 0
            }}>
            <TestComponent />
          </Box>
        ))}
      </Flex>
    </>
  )
}
