import { PoliticalEvent } from './../../models/event.interface'
import { EventS } from './event.small'
import { ALIGN } from '../../constants/enums'
import { Box, Button, Flex } from '@radix-ui/themes'
import { EventSSkeleton } from './event.small.skeleton'
import { TimelineDate } from '../timeline/timeline-date'
import React, { useContext } from 'react'
import { EventsContext } from '../../providers/events-context'
import { CalendarIcon } from '@radix-ui/react-icons'
import { EventL } from './event.large'
import './event-timeline.css'

interface EventTimeLineProps {
  events: PoliticalEvent[] | null
}

export function EventTimeLine ({ props }: { props: EventTimeLineProps }) {
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
          <Flex
            direction='column'
            align='end'>
            <div
              style={{
                position: 'fixed',
                paddingTop: '20px',
                zIndex: '10',
                width: '950px',
                height: 'calc(100% - 180px)'
              }}>
              {/* <Flex className='event-L-grandpa'>
            <div className='aqua event-L-parent'> */}
              <EventL props={{ event: focusedEvent!, isFloat: floatEvent }}/>
            </div>
          </Flex>
        )
        : null
      }
      <Flex
        direction='column'
        justify='center'
        align='start'
        style={{ paddingTop: '20px' }}
        className={`${showFocusedEvent ? 'max-width-440' : 'max-width-1350 layout-center'} ${oneColumn ? 'padding-right-15' : ''}`}>
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
                column: index % 2 === 0 ? ALIGN.LEFT : ALIGN.RIGHT,
                align: ALIGN.RIGHT
              }}/>
          )))
        }
      </Flex>
    </>
  )
}
