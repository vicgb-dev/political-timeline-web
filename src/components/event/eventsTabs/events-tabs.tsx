import { Card, Flex, Heading, ScrollArea, Tabs } from '@radix-ui/themes'
import { PoliticalEvent } from '../../../models/event.interface'
import { EventL } from '../eventL/event.large'
import { useContext } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { EventsContext } from '../../../context/events-context'
import { CreateEventButton } from '../../buttons/create-event-button'

export function EventsTabs () {
  const { selectedEvents, bigEventFocused, setBigEventFocused, setShouldAddEvent } = useContext(EventsContext)

  return (
    <Tabs.Root
      onValueChange={(value) => {
        if (value === 'addEvent') {
          console.log('addEvent')
          setShouldAddEvent(true)
          setBigEventFocused(null)
        } else {
          setShouldAddEvent(false)
          setBigEventFocused(selectedEvents.find((e) => e.id.toString() === value) ?? null)
        }
      }}
      value={bigEventFocused?.id.toString() ?? 'addEvent'}
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
          <Tabs.Trigger value={'addEvent'} key={'addEventkey'}>
            <PlusIcon />
          </Tabs.Trigger>
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
            <CreateEventButton />
          </Flex>
        </Card>
      </Tabs.Content>
    </Tabs.Root>
  )
}
