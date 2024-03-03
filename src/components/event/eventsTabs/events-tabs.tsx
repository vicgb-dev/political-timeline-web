import { Card, Flex, Heading, Tabs, Text } from '@radix-ui/themes'
import { PoliticalEvent } from '../../../models/event.interface'
import { EventL } from '../eventL/event.large'
import { useEffect, useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'

interface EventsTabsProps {
    events: PoliticalEvent[]
}

export function EventsTabs ({ props }: {props: EventsTabsProps}) {
  const moreThanOneEvent: boolean = props.events.length > 0
  const [defaultValue, setDefaultValue] = useState(props.events[0].id.toString())

  useEffect(() => {
    setDefaultValue(props.events[0].id.toString())
    console.log('EventsTabs useEffect')
  }, [props.events])

  return (
    <Tabs.Root
      onValueChange={(value) => setDefaultValue(value)}
      value={defaultValue}
      style={{ height: '100%' }}>
      {moreThanOneEvent &&
        <Tabs.List className='efcolor' style={{ borderRadius: '20px' }}>
          {props.events.map((event: PoliticalEvent) => (
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
      }

      {props.events.map((event: PoliticalEvent) => (
        <Tabs.Content
          value={event.id.toString()}
          key={event.id}
          style={{
            height: moreThanOneEvent ? 'calc(100% - 85px)' : 'calc(100% - 20px)',
            paddingTop: '10px'
          }}>
          <EventL props={{ event }} />
        </Tabs.Content>
      ))}

      <Tabs.Content
        value={'addEvent'}
        key={'addEventkey'}
        style={{
          height: moreThanOneEvent ? 'calc(100% - 85px)' : 'calc(100% - 20px)',
          paddingTop: '10px'
        }}>
        <Card className='efcolor' style={{ height: '100%' }}>
          <Flex align='center' justify='center' style={{ height: '100%' }}>
            <Heading>
                Elige un evento y se mostrará aqui
            </Heading>
          </Flex>
        </Card>
      </Tabs.Content>
    </Tabs.Root>
  )
}
