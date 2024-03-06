import { PoliticalEvent } from '../../models/political-event.interface'
import { EventS } from '../event/eventS/event.small'
import { ALIGN } from '../../constants/enums'
import { Box, Flex } from '@radix-ui/themes'
import { EventSSkeleton } from '../event/eventsDeco/event.small.skeleton'
import { useContext, useEffect } from 'react'
import { EventsContext } from '../../context/events-context'
import { EventsTabs } from '../event/eventsTabs/events-tabs'
import './timeline.css'

interface TimeLineProps {
  events: PoliticalEvent[] | null
}

export function TimeLine ({ props }: { props: TimeLineProps }) {
  const { oneColumn, selectedEvents, floatEvent, eventCreating } = useContext(EventsContext)

  useEffect(() => {
    if (isFocusedEvent && floatEvent) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectedEvents, floatEvent])

  const isFocusedEvent: boolean = (selectedEvents !== null && selectedEvents.length > 0) || eventCreating !== null
  const isOneColumn: boolean = oneColumn || (isFocusedEvent && !floatEvent)
  const showFloatEvent: boolean = isFocusedEvent && floatEvent
  const showFocusedEvent: boolean = isFocusedEvent && !floatEvent && selectedEvents?.length > 0

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
    <>
      {/* Mostrar evento grande como dialogo */}
      {showFloatEvent
        ? <div
          style={{
            position: 'fixed',
            paddingTop: '20px',
            bottom: '0',
            zIndex: '10',
            width: '100%',
            height: 'calc(100% - 100px)',
            marginLeft: '-34px', /* 25px de padding del main y 8px del margen del body */
            paddingBottom: '35px'
          }}
        >
          {/* <EventL props={{ event: focusedEvent! }}/> */}
          <EventsTabs/>
        </div>
        : null
      }

      {/* Mostrar evento grande dos tercios */}
      {showFocusedEvent
        ? (
          <div
            className='event-L-parent'>
            <div className='event-L-container'>
              {/* <EventL props={{ event: focusedEvent! }}/> */}
              <EventsTabs/>
            </div>
          </div>
        )
        : null
      }
      <Flex
        direction='column'
        justify='center'
        align='start'
        style={{ paddingTop: '20px' }}
        className={`${showFocusedEvent ? 'events-two-thirds' : 'max-width-1350 layout-center'} ${oneColumn ? 'one-clumn-timeline' : ''}`}>
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
            // TODO: incluir la fecha al cambiar de mes
            // { showDate(event.id) ? <TimelineDate date={getEventDate(event.id)} key={`${event.id}date`}/> : null}
            <EventS
              key={`${event.id}event`}
              props={{
                oneColumn: isOneColumn,
                event,
                column: index % 2 === 0 ? ALIGN.LEFT : ALIGN.RIGHT
              }}/>
          )))
        }
      </Flex>
    </>
  )
}
