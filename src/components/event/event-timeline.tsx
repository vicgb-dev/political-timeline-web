import { Event } from './../../models/event.interface'
import { EventS } from './event.small'
import { ALIGN } from '../../constants/enums'
import { Box, Flex } from '@radix-ui/themes'
import { EventSSkeleton } from './event.small.skeleton'
import { TimelineDate } from '../timeline/timeline-date'
import React from 'react'

interface EventTimeLineProps {
  events: Event[] | null
}

export function EventTimeLine ({ props }: { props: EventTimeLineProps }) {
  // TODO: que esta variable cambie automaticamente cuando clicas un evento y se abre a pantalla completa
  const oneColumn: boolean = false

  const showDate = (eventId: number): boolean => {
    const eventIndex = props.events?.findIndex((event: Event) => event.id === eventId)
    if (!eventIndex) return false

    const previousDate: Date | undefined = props.events?.[eventIndex - 1].eventDate
    if (!previousDate) return false

    const currentDate: Date | undefined = props.events?.[eventIndex].eventDate
    if (!currentDate) return false

    return ((new Date(previousDate)).getFullYear() !== (new Date(currentDate)).getFullYear() ||
      (new Date(previousDate)).getMonth() !== (new Date(currentDate)).getMonth())
  }

  const getEventDate = (eventId: number): Date => {
    const eventIndex = props.events?.findIndex((event: Event) => event.id === eventId)
    if (!eventIndex) return new Date()

    const currentDate: Date | undefined = props.events?.[eventIndex - 1].eventDate
    if (!currentDate) return new Date()
    return currentDate
  }

  return (
    <Flex direction='column' justify='center' align='center' style={{ paddingTop: '80px' }}>
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
        : (props.events.map((event: Event, index: number) => (
          <React.Fragment key={`${event.id}div`} >
            { showDate(event.id) ? <TimelineDate date={getEventDate(event.id)} key={`${event.id}date`}/> : null}
            <Box
              key={`${event.id}box`}>
              <EventS key={`${event.id}event`} props={{ oneColumn, event, column: index % 2 === 0 ? ALIGN.LEFT : ALIGN.RIGHT, align: ALIGN.RIGHT }}/>
            </Box>
          </React.Fragment>
        )))
      }
    </Flex>
  )
}
