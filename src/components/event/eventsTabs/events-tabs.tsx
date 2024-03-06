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
    shouldAddEvent,
    setShouldAddEvent,
    eventCreating
  } = useContext(EventsContext)

  // const [addEvent, setAddEvent] = useState(false)

  // const getTabsValue = () => {
  //   if (addEvent) return 'addEvent'
  //   if (bigEventFocused) return bigEventFocused.id.toString()
  //   return 'addEvent'
  // }

  // useEffect(() => {
  //   if (bigEventFocused) {
  //     setAddEvent(false)
  //   }
  // }, [bigEventFocused])

  // useEffect(() => {
  //   if (eventCreating) {
  //     setAddEvent(false)
  //   }
  // }, [eventCreating])

  const updateValue = (value: string) => {
    console.log('value', value)
    setShouldAddEvent(value === '0')

    setBigEventFocused(selectedEvents.find((e) => e.id.toString() === value) ?? null)
  }

  const getTabsValue = (): string => {
    if (shouldAddEvent) return '0'
    return bigEventFocused?.id.toString() ?? '0'
  }

  return (
    <Tabs.Root
      onValueChange={value => updateValue(value)}
      // onValueChange={(value) => {
      //   console.log('value', value)
      //   if (value === 'addEvent' || value === '-1') {
      //     setAddEvent(true)
      //     setShouldAddEvent(true)
      //     setBigEventFocused(null)
      //   } else {
      //     setShouldAddEvent(false)
      //     setBigEventFocused(selectedEvents.find((e) => e.id.toString() === value) ?? null)
      //   }
      //   setAddEvent(value === 'addEvent')
      // }}
      value={ getTabsValue() }
      className='h-full'>
      <ScrollArea type="hover" scrollbars="horizontal" style={{ height: 41 }}>
        <Tabs.List className='efcolor' style={{ overflowX: 'scroll', overflowY: 'clip', borderRadius: '12px 12px 0px 0px' }}>
          {selectedEvents.map((event: PoliticalEvent) => (
            event.id > 0
              ? <Tabs.Trigger value={event.id.toString()} key={event.id}>
                <p style={{
                  maxWidth: '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {event.title}
                </p>
              </Tabs.Trigger>
              : null
          ))}
          <Tabs.Trigger
            value={'0'}
            key={'addEventkey'}>
            <PlusIcon />
          </Tabs.Trigger>
          {eventCreating && (<Tabs.Trigger
            value={'-1'}
            key={'creatingEventkey'}
            style={{ backgroundColor: 'var(--accent-a4)' }}>
            Nuevo evento
          </Tabs.Trigger>)}
        </Tabs.List>
      </ScrollArea>

      {selectedEvents.map((event: PoliticalEvent) => (
        event.id > 0
          ? <Tabs.Content
            value={event.id.toString()}
            key={event.id}
            style={{
              height: 'calc(100% - 60px)'
            }}>
            <EventL props={{ event }} />
          </Tabs.Content>
          : null
      ))}

      <Tabs.Content
        value={'0'}
        key={'addEventkey'}
        style={{
          height: 'calc(100% - 60px)'
        }}>
        <Card variant='surface' className='efcolor no-border no-top-radius event-card-L' style={{ height: '100%' }}>
          <Flex align='center' direction='column' gap='5' justify='center' style={{ height: '100%' }}>
            <Heading style={{ textWrap: 'pretty', textAlign: 'center' }}>
                Elige un evento y se mostrará aqui
            </Heading>
            {!eventCreating && <CreateEventButton />}
          </Flex>
        </Card>
      </Tabs.Content>

      {eventCreating && (<Tabs.Content
        value={'-1'}
        key={'creatingEventkey'}
        style={{
          height: 'calc(100% - 60px)'
        }}>
        <EventForm />
      </Tabs.Content>)}
    </Tabs.Root>
  )
}
