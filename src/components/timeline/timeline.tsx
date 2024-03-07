import { PoliticalEvent } from '../../models/political-event.interface'
import { EventS } from '../event/eventS/event.small'
import { ALIGN } from '../../constants/enums'
import { Box, Flex } from '@radix-ui/themes'
import { EventSSkeleton } from '../event/eventsDeco/event.small.skeleton'
import { useContext, useEffect } from 'react'
import { LayoutContext } from '../../context/layout-context'
import { EventsTabs } from '../event/eventsTabs/events-tabs'
import './timeline.css'
import { useEvents } from '../../stores/events-store'

interface TimeLineProps {
  events: PoliticalEvent[] | null
}

export function TimeLine({ props }: { props: TimeLineProps }) {
  const { oneColumn, floatEvent } = useContext(LayoutContext)
  const selectedEvents = useEvents(state => state.selectedEvents)

  useEffect(() => {
    if (selectedEvents.length > 0 && floatEvent) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectedEvents, floatEvent])

  const isOneColumn: boolean = oneColumn || (selectedEvents.length > 0 && !floatEvent)
  const showFloatEvent: boolean = selectedEvents.length > 0 && floatEvent
  const showTwoThirdsEvent: boolean = selectedEvents.length > 0 && !floatEvent

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
          className='fixed z-10 w-full top-0 -ml-6 mt-14'
          style={{
            height: 'calc(100% - 35px)'
          }}>
          <EventsTabs />
        </div>
        : null
      }

      {/* Mostrar evento grande dos tercios */}
      {showTwoThirdsEvent
        ? (
          <div
            className='flex flex-col w-full'>
            <div className='fixed self-end pt-5 z-10 event-L-container'>
              {/* <EventL props={{ event: focusedEvent! }}/> */}
              <EventsTabs />
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
        className={`${showTwoThirdsEvent ? 'events-two-thirds' : 'max-width-1350 my-0 mx-auto'} ${oneColumn ? '-ml-5 pr-7' : ''}`}>
        {!props.events
          ? (Array.from({ length: 5 }, (_, index) => (
            <EventSSkeleton
              key={`${index}event`}
              props={{
                oneColumn: isOneColumn,
                column: index % 2 === 0 ? ALIGN.LEFT : ALIGN.RIGHT
              }} />
          )))
          : (props.events.map((event: PoliticalEvent, index: number) => (
            // TODO: incluir la fecha al cambiar de mes
            // { showDate(event.id) ? <TimelineDate date={getEventDate(event.id)} key={`${event.id}date`}/> : null}
            <EventS
              key={`${event.id}event`}
              props={{
                oneColumn: isOneColumn,
                event,
                column: index % 2 === 0 ? ALIGN.LEFT : ALIGN.RIGHT
              }} />
          )))
        }
      </Flex>
    </>
  )
}
