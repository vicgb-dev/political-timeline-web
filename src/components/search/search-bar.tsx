import { BoxIcon, CalendarIcon, MagnifyingGlassIcon, MixIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { IconButton, TextField } from '@radix-ui/themes'
import { useContext } from 'react'
import { EventsContext } from '../../context/events-context'

export function SearchBar () {
  const { floatEvent, oneColumn, focusedEvent, setIsFloatEvent, setOneColumn, setFocusedEvent } = useContext(EventsContext)

  const tempEvent = {
    id: 1,
    title: 'Evento de prueba',
    summary: 'Resumen de prueba',
    description: 'Descripción de prueba',
    publishingStatus: 'published',
    idTopic: 1,
    idAuthor: '1',
    eventDate: new Date(),
    importance: 1,
    eventImg: null
  }

  function toggleFloat () {
    console.log('toggleFloat')
    setIsFloatEvent(!floatEvent)
  }
  function toggleoneColumn () {
    setOneColumn(!oneColumn)
  }
  function togglefocusedEvent () {
    if (focusedEvent) setFocusedEvent(null)
    else setFocusedEvent(tempEvent)
  }

  return (
    <TextField.Root className='item-grow search-input' color='orange' >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder="@Figura pública, #tag, t[topic]..." size="3"/>
      <TextField.Slot pr="3">
        <IconButton size="2" variant="ghost">
          <MixerHorizontalIcon height="16" width="16" />
        </IconButton>
        <IconButton size="2" variant={floatEvent ? 'solid' : 'ghost'} onClick={toggleFloat}>
          <BoxIcon height="16" width="16" />
        </IconButton>
        <IconButton size="2" variant={oneColumn ? 'solid' : 'ghost'} onClick={toggleoneColumn} >
          <MixIcon height="16" width="16" />
        </IconButton>
        <IconButton size="2" variant={tempEvent.id !== 1 ? 'solid' : 'ghost'} onClick={togglefocusedEvent} >
          <CalendarIcon height="16" width="16" />
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  )
}
