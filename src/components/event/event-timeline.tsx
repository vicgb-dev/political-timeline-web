import { PoliticalEvent } from './../../models/event.interface'
import { EventS } from './event.small'
import { ALIGN } from '../../constants/enums'
import { Box, Flex } from '@radix-ui/themes'
import { EventSSkeleton } from './event.small.skeleton'
import { TimelineDate } from '../timeline/timeline-date'
import React, { useContext, useEffect, useState } from 'react'
import { EventsContext } from '../../providers/events-context'
import './event-timeline.css'
import { CalendarIcon } from '@radix-ui/react-icons'
import { EventL } from './event.large'

interface EventTimeLineProps {
  events: PoliticalEvent[] | null
}

export function EventTimeLine ({ props }: { props: EventTimeLineProps }) {
  const { oneColumn, focusedEvent, floatEvent } = useContext(EventsContext)
  const [stretchEvent, setStretchEvent] = useState(false)

  const isOneColumn: boolean = oneColumn || focusedEvent !== null
  const showFloatEvent: boolean = focusedEvent !== null && floatEvent
  const showFocusedEvent: boolean = focusedEvent !== null && !floatEvent

  useEffect(() => {
    const handleResize = () => {
      setStretchEvent(window.innerWidth < 1380)
    }
    // Agregar un event listener para el evento resize
    window.addEventListener('resize', handleResize)
    setStretchEvent(window.innerWidth < 1380)
    // Eliminar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const showDate = (eventId: number): boolean => {
    const eventIndex = props.events?.findIndex((event: PoliticalEvent) => event.id === eventId)
    if (!eventIndex) return false

    const previousDate: Date | undefined = props.events?.[eventIndex - 1].eventDate
    if (!previousDate) return false

    const currentDate: Date | undefined = props.events?.[eventIndex].eventDate
    if (!currentDate) return false

    return ((new Date(previousDate)).getFullYear() !== (new Date(currentDate)).getFullYear() ||
      (new Date(previousDate)).getMonth() !== (new Date(currentDate)).getMonth())
  }

  const getEventDate = (eventId: number): Date => {
    const eventIndex = props.events?.findIndex((event: PoliticalEvent) => event.id === eventId)
    if (!eventIndex) return new Date()

    const currentDate: Date | undefined = props.events?.[eventIndex - 1].eventDate
    if (!currentDate) return new Date()
    return currentDate
  }

  return (
    <Flex direction='column' justify='center' align='center' style={{ paddingTop: '40px' }}>
      <div className='layout'>
        <div className='events-column'>
          {!props.events
            ? (Array.from({ length: 5 }, (_, index) => (
              <Box
                key={index}
                style={{
                  marginTop: '-60px',
                  marginRight: index % 2 === 0 ? '500px' : 0,
                  marginLeft: index % 2 === 1 ? '500px' : 0
                }}>
                <EventSSkeleton/>
              </Box>)))
            : (props.events.map((event: PoliticalEvent, index: number) => (
              <React.Fragment key={`${event.id}div`} >
                { showDate(event.id) ? <TimelineDate date={getEventDate(event.id)} key={`${event.id}date`}/> : null}
                <Box key={`${event.id}box`} className='event-row'>
                  <CalendarIcon className='calendar-icon-center'/>
                  <EventS key={`${event.id}event`} props={{ oneColumn: isOneColumn, event, column: index % 2 === 0 ? ALIGN.LEFT : ALIGN.RIGHT, align: ALIGN.RIGHT }}/>
                </Box>
              </React.Fragment>
            )))
          }
        </div>
        {/* Como el evento grande tiene que estar fijo debemos empujar el listado de eventos */}
        {showFocusedEvent
          ? <div className='empty-focused-event'></div>
          : null
        }
        {showFloatEvent
          ? <div className='float-event'>
            <EventL props={{ event: focusedEvent!, isFloat: floatEvent }}/>
          </div>
          : null
        }
        {showFocusedEvent
          ? (
            <Flex
              direction='row'
              justify='center'
              align='center'
              className='focused-event-container'
              style={{ right: `${stretchEvent ? '0' : ''}` }}>
              <div className='events-column'>
              </div>
              <div className='focused-event'>
                <EventL props={{ event: focusedEvent!, isFloat: floatEvent }}/>
              </div>
            </Flex>
          )
          : null
        }
      </div>

    </Flex>

  )
}
