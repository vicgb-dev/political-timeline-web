import { Card, Flex, Heading, ScrollArea, Tabs } from '@radix-ui/themes'
import { PoliticalEvent } from '../../../models/political-event.interface'
import { EventL } from '../eventL/event.large'
import { useContext, useEffect, useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { EventsContext } from '../../../context/events-context'
import { CreateEventButton } from '../../buttons/create-event-button'
import { EventForm } from '../eventForm/event-form'

export function EventsTabs () {
  const {
    selectedEvents,
    bigEventFocused,
    setBigEventFocused,
    setShouldAddEvent,
    eventCreating
  } = useContext(EventsContext)

  const [addEvent, setAddEvent] = useState(false)

  const getValue = () => {
    if (addEvent) return 'addEvent'
    if (bigEventFocused) return bigEventFocused.id.toString()
    if (eventCreating) return 'creatingEvent'
    return 'addEvent'
  }
  useEffect(() => {
    if (bigEventFocused) {
      setAddEvent(false)
    }
  }, [bigEventFocused])

  return (
    <Tabs.Root
      onValueChange={(value) => {
        console.log('value', value)
        if (value === 'addEvent' || value === 'creatingEvent') {
          setAddEvent(true)
          setShouldAddEvent(true)
          setBigEventFocused(null)
        } else {
          setShouldAddEvent(false)
          setBigEventFocused(selectedEvents.find((e) => e.id.toString() === value) ?? null)
        }
        setAddEvent(value === 'addEvent')
      }}
      value={ getValue() }
      style={{ height: '100%' }}>
      <ScrollArea type="hover" scrollbars="horizontal" style={{ height: 50 }}>
        <Tabs.List className='efcolor' style={{ borderRadius: '20px', overflowX: 'scroll', overflowY: 'clip' }}>
          {selectedEvents.map((event: PoliticalEvent) => (
            <Tabs.Trigger value={event.id.toString()} key={event.id}>
              <p style={{
                maxWidth: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {event.title}
              </p>
            </Tabs.Trigger>
          ))}
          <Tabs.Trigger
            value={'addEvent'}
            key={'addEventkey'}>
            <PlusIcon />
          </Tabs.Trigger>
          {eventCreating && (<Tabs.Trigger
            value={'creatingEvent'}
            key={'creatingEventkey'}>
            Nuevo evento
          </Tabs.Trigger>)}
        </Tabs.List>
      </ScrollArea>

      {selectedEvents.map((event: PoliticalEvent) => (
        <Tabs.Content
          value={event.id.toString()}
          key={event.id}
          style={{
            height: 'calc(100% - 85px)',
            paddingTop: '10px'
          }}>
          <EventL props={{ event }} />
        </Tabs.Content>
      ))}

      <Tabs.Content
        value={'addEvent'}
        key={'addEventkey'}
        style={{
          height: 'calc(100% - 85px)',
          paddingTop: '10px'
        }}>
        <Card className='efcolor' style={{ height: '100%' }}>
          <Flex align='center' direction='column' gap='5' justify='center' style={{ height: '100%' }}>
            <Heading style={{ textWrap: 'pretty', textAlign: 'center' }}>
                Elige un evento y se mostrará aqui
            </Heading>
            {!eventCreating && <CreateEventButton />}
          </Flex>
        </Card>
      </Tabs.Content>

      {eventCreating && (<Tabs.Content
        value={'creatingEvent'}
        key={'creatingEventkey'}
        style={{
          height: 'calc(100% - 85px)',
          paddingTop: '10px'
        }}>
        <EventForm />
      </Tabs.Content>)}
    </Tabs.Root>
  )
}
