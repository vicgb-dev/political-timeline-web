import { useContext, useEffect, useState } from 'react'
import { EventTimeLine } from '../components/event/event-timeline'
import { PoliticalEvent } from '../models/event.interface'
import { EventsService } from '../services/events-service'
import { EventsContext } from '../providers/events-context'
import './events.page.css'
import { Flex } from '@radix-ui/themes'
import '../components/event/event.css'

export function EventsPage () {
  const [events, setEvents] = useState<PoliticalEvent[] | null>(null)

  const {
    floatEvent,
    oneColumn,
    focusedEvent
  } = useContext(EventsContext)

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

    if (!events) {
      getPublishedEvents()
    }
  }, [])

  let lineClass: string = ''

  if (focusedEvent && !floatEvent) {
    lineClass = 'time-line2-3'
  } else if (!oneColumn) {
    lineClass = 'time-line'
  } else {
    lineClass = 'time-line-right'
  }

  return (
    <>
      <div className="fixed background"></div>
      <Flex
        direction='row'
        justify='center'
        align='center'
        className='focused-event-container'
        style={{ height: '100%', maxWidth: '1350px' }}>
        {/* <div className='events-column border-timeline'></div> */}
        {/* <div style={{ flex: '2' }}></div> */}
        <div className={lineClass}></div>
      </Flex>
      {/* <Button onClick={handleDebugclick}>Click me</Button> */}
      <div className='debug'>
        <span>
          {floatEvent ? 'Float' : 'No float'}
        </span>
        <span>
          {oneColumn ? 'One center column' : 'No one center column'}
        </span>
        <span>
          {focusedEvent ? focusedEvent.title : 'No focused event'}
        </span>
      </div>
      <EventTimeLine props={{ events }}/>
    </>
  )
}
