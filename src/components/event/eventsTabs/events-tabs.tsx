import { Card, Flex, Heading, IconButton, ScrollArea, Tabs } from '@radix-ui/themes'
import { PoliticalEvent } from '../../../models/political-event.interface'
import { EventL } from '../eventL/event.large'
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from '@radix-ui/react-icons'
import { CreateEventButton } from '../../buttons/create-event-button'
import { EventForm } from '../eventForm/event-form'
import { useEvents } from '../../../stores/events-store'
import { useLayoutStore } from '../../../stores/layout-store'

export function EventsTabs () {
  const selectedEvents = useEvents(state => state.selectedEvents)
  const focusedEvent = useEvents(state => state.focusedEvent)
  const setFocusedEvent = useEvents(state => state.setFocusedEvent)
  const floatEvent = useLayoutStore(state => state.floatEvent)
  const minimized = useLayoutStore(state => state.minimized)
  const setMinimized = useLayoutStore(state => state.setMinimized)

  const updateValue = (value: string) => {
    console.log('value', value)
    setFocusedEvent(selectedEvents.find((e) => e.id.toString() === value) ?? null)
  }

  const getTabsValue = (): string => {
    return focusedEvent?.id.toString() ?? '0'
  }

  const handleMinimize = () => {
    setMinimized(!minimized)
  }

  return (
    <Tabs.Root
      onValueChange={value => updateValue(value)}
      value={getTabsValue()}
      className='h-full transition-all'>
      <ScrollArea type='hover' scrollbars="horizontal" style={{ height: 41 }} >
        <Tabs.List className={`${floatEvent && !minimized ? 'rounded-none' : 'rounded-t-xl'} pr-16 efcolor w-full overflow-x-scroll overflow-y-clip`}>
          {/* TABS de todos los EVENTOS */}
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
          {/* Tab de AGREGAR */}
          <Tabs.Trigger
            value={'0'}
            key={'addEventkey'}>
            <PlusIcon />
          </Tabs.Trigger>
          {/* Tab de CREAR */}
          {selectedEvents.find(event => event.id === -1) && (<Tabs.Trigger
            value={'-1'}
            key={'creatingEventkey'}
            style={{ backgroundColor: 'var(--accent-a4)' }}>
            Nuevo evento
          </Tabs.Trigger>)}
          {/* Boton de MINIMIZAR */}
          <IconButton variant='solid' className='absolute right-0 translate-y-1 -translate-x-6' onClick={handleMinimize}>
            {minimized
              ? <ChevronUpIcon />
              : <ChevronDownIcon />}
          </IconButton>
        </Tabs.List>
      </ScrollArea>

      {/* Contenido de todos los EVENTOS */}
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

      {/* Contenido de AGREGAR */}
      <Tabs.Content
        value={'0'}
        key={'addEventkey'}
        style={{
          height: 'calc(100% - 60px)'
        }}>
        <Card size='3' variant='surface' className='efcolor no-border no-top-radius event-card-L h-full'>
          <Flex className='flex-col items-center content-center gap-5 center h-full justify-center' justify='center'>
            <Heading className='text-pretty text-center'>
              Elige un evento y se mostrará aqui
            </Heading>
            {!selectedEvents.find(event => event.id === -1) && <CreateEventButton />}
          </Flex>
        </Card>
      </Tabs.Content>

      {/* Contenido de CREAR */}
      {
        selectedEvents.find(event => event.id === -1) && (<Tabs.Content
          value={'-1'}
          key={'creatingEventkey'}
          style={{
            height: 'calc(100% - 60px)'
          }}>
          <EventForm />
        </Tabs.Content>)
      }
    </Tabs.Root >
  )
}
