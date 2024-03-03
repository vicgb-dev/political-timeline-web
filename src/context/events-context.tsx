import { useState, createContext, Dispatch, SetStateAction, useEffect, useLayoutEffect } from 'react'
import { PoliticalEvent } from '../models/event.interface'

export interface EventsContextState {
  floatEvent: boolean
  oneColumn: boolean
  selectedEvents: PoliticalEvent[] | []
  bigEventFocused: PoliticalEvent | null
  shouldAddEvent: boolean
  setShouldAddEvent: Dispatch<SetStateAction<boolean>>
  setBigEventFocused: (event: PoliticalEvent | null) => void,
  setIsFloatEvent: Dispatch<SetStateAction<boolean>>,
  setOneColumn: Dispatch<SetStateAction<boolean>>,
  addBigEvent: (event: PoliticalEvent) => void,
  removeBigEvent: (event: PoliticalEvent) => void,
}

export const EventsContext = createContext<EventsContextState>({
  floatEvent: true,
  oneColumn: true,
  selectedEvents: [],
  bigEventFocused: null,
  shouldAddEvent: true,
  setShouldAddEvent: () => {},
  setBigEventFocused: () => {},
  setIsFloatEvent: () => {},
  setOneColumn: () => {},
  addBigEvent: () => {},
  removeBigEvent: () => {}
})

interface EventsProviderProps {
  children: React.ReactNode;
}

export const EventsProvider = ({ children } : EventsProviderProps) => {
  const [floatEvent, setIsFloatEvent] = useState<boolean>(true)
  const [oneColumn, setOneColumn] = useState<boolean>(true)
  const [selectedEvents, setSelectedEvents] = useState<PoliticalEvent[]>([])
  const [bigEventFocused, setBigEventFocused] = useState<PoliticalEvent | null>(null)
  const [shouldAddEvent, setShouldAddEvent] = useState<boolean>(true)

  const updateWindowSize = () => {
    // Get Root element by getElement so i can know the width of the window

    // Radix UI considera 1280px tablet landscape
    setIsFloatEvent(document.getElementById('html')!.offsetWidth < 1280)
    // Radix UI considera 768px tablet portrait
    setOneColumn(document.getElementById('html')!.offsetWidth < 768)
  }

  // Actualizar el layout por tamaño de pantalla
  useLayoutEffect(() => {
    const handleResize = () => {
      updateWindowSize()
    }
    // Agregar un event listener para el evento resize
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)
    updateWindowSize()
    // Eliminar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)
    }
  }, [])

  const addBigEvent = (event: PoliticalEvent) => {
    setShouldAddEvent(false)
    setBigEventFocused(event)

    // Es el primer evento seleccionado
    if (selectedEvents.length === 0) {
      setSelectedEvents([event])
      return
    }

    // Si el evento ya está seleccionado no se agrega pero se enfoca
    if (selectedEvents.find((e) => e.id === event.id)) {
      return
    }

    // Si estoy en la pestana de agregar evento
    if (shouldAddEvent) {
      console.log('shouldAddEvent')
      setSelectedEvents([...selectedEvents, event])
      return
    }

    // No hay que agregar evento
    if (bigEventFocused) {
      // El evento sustituye al evento seleccionado
      const index = selectedEvents.findIndex(eve => eve.id === bigEventFocused.id)

      if (index !== -1) {
        // Reemplaza el objeto en la misma posición
        selectedEvents[index] = event
      }

      setSelectedEvents([...selectedEvents])
    }
  }

  const removeBigEvent = (event: PoliticalEvent) => {
    setBigEventFocused(null)
    if (!selectedEvents) return

    setShouldAddEvent(true)

    setSelectedEvents(selectedEvents?.filter((e) => e.id !== event.id))
  }

  return (
    <EventsContext.Provider
      value={{
        floatEvent,
        oneColumn,
        selectedEvents,
        bigEventFocused,
        shouldAddEvent,
        setShouldAddEvent,
        setBigEventFocused,
        setIsFloatEvent,
        setOneColumn,
        addBigEvent,
        removeBigEvent
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

export default EventsProvider
