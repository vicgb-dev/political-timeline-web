import { PoliticalEvent } from '../../models/event.interface'
import { EventS } from '../event/eventS/event.small'
import { ALIGN } from '../../constants/enums'
import { Box, Button, Flex } from '@radix-ui/themes'
import { EventSSkeleton } from '../event/eventsDeco/event.small.skeleton'
import { useContext } from 'react'
import { EventsContext } from '../../context/events-context'
import { EventL } from '../event/eventL/event.large'
import './timeline.css'

interface TimeLineProps {
  events: PoliticalEvent[] | null
}

export function TimeLine ({ props }: { props: TimeLineProps }) {
  const { oneColumn, focusedEvent, floatEvent } = useContext(EventsContext)

  const isOneColumn: boolean = oneColumn || (focusedEvent !== null && !floatEvent)
  const showFloatEvent: boolean = focusedEvent !== null && floatEvent
  const showFocusedEvent: boolean = focusedEvent !== null && !floatEvent

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
            paddingBottom: '15px'
          }}
        >
          <EventL props={{ event: focusedEvent!, isFloat: floatEvent }}/>
        </div>
        : null
      }

      {/* Mostrar evento grande dos tercios */}
      {showFocusedEvent
        ? (
          // TODO: mejorar el responsive al estrecharse la pagina
          <div
            className='event-L-parent'>
            <div className='event-L-container'>
              <EventL props={{ event: focusedEvent!, isFloat: floatEvent }}/>
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
