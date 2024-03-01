import { useState, createContext, Dispatch, SetStateAction, useEffect, useLayoutEffect } from 'react'
import { PoliticalEvent } from '../models/event.interface'

export interface EventsContextState {
  floatEvent: boolean
  oneColumn: boolean
  focusedEvent: PoliticalEvent | null
  setIsFloatEvent: Dispatch<SetStateAction<boolean>>,
  setOneColumn: Dispatch<SetStateAction<boolean>>,
  setFocusedEvent: Dispatch<SetStateAction<PoliticalEvent | null>>
}

export const EventsContext = createContext<EventsContextState>({
  floatEvent: true,
  oneColumn: true,
  focusedEvent: null,
  setIsFloatEvent: () => {},
  setOneColumn: () => {},
  setFocusedEvent: () => {}
})

interface EventsProviderProps {
  children: React.ReactNode;
}

export const EventsProvider = ({ children } : EventsProviderProps) => {
  const [floatEvent, setIsFloatEvent] = useState<boolean>(true)
  const [oneColumn, setOneColumn] = useState<boolean>(true)
  const [focusedEvent, setFocusedEvent] = useState<PoliticalEvent | null>(null)

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

  return (
    <EventsContext.Provider
      value={{
        floatEvent,
        oneColumn,
        focusedEvent,
        setIsFloatEvent,
        setOneColumn,
        setFocusedEvent
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

export default EventsProvider