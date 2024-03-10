import { create } from 'zustand'
import { PoliticalEvent } from '../models/political-event.interface'

interface EventsState {
  selectedEvents: PoliticalEvent[]
  focusedEvent: PoliticalEvent | null
  toggleEvent: (event: PoliticalEvent) => void
  removeEventById: (id: number) => void
  setFocusedEvent: (event: PoliticalEvent | null) => void
  scrollTo: (eventId: number) => void
}

export const useEvents = create<EventsState>((set) => ({
  selectedEvents: [],
  focusedEvent: null,
  toggleEvent: (event: PoliticalEvent) => set((state) => ({ selectedEvents: toggleEvent(state, event, state.setFocusedEvent) })),
  removeEventById: (id: number) => set((state) => ({ selectedEvents: handleRemoveEventById(state, id, state.setFocusedEvent) })),
  setFocusedEvent: (event: PoliticalEvent | null) => set({ focusedEvent: event }),
  scrollTo: (eventId: number) => scrollTo(eventId)
}))

function toggleEvent (state: EventsState, event: PoliticalEvent, setFocusedEvent: (event: PoliticalEvent | null) => void): PoliticalEvent[] {
  // Si el evento ya está seleccionado, lo quito de la lista
  if (state.selectedEvents.find((e) => e.id === event.id)) {
    // Si estaba enfocado, le paso el foco a otro evento
    if (state.focusedEvent?.id === event.id) {
      // Quitamos este evento y el de crear
      const tempEvents = state.selectedEvents.filter((e) => e.id !== -1)
      const thisEventIndex = tempEvents.indexOf(event)

      console.log('tempEvents', tempEvents)
      console.log('thisEventIndex', thisEventIndex)

      // Si habia mas eventos, vamos al anterior, si no, a la pantalla de añadir evento
      setFocusedEvent(tempEvents.length > 0 ? tempEvents[thisEventIndex - 1] : null)
      // setFocusedEvent(state.selectedEvents.indexOf(event) > 0 ? state.selectedEvents[state.selectedEvents.indexOf(event) - 1] : null)
    }
    return state.selectedEvents.filter((e) => e.id !== event.id)
  }

  // Si el evento no está seleccionado, lo añado a la lista y lo enfoco
  setFocusedEvent(event)
  return [...state.selectedEvents, event]
}

function scrollTo (eventId: number): void {
  const eventNode = document.getElementById(`event-${eventId}`)
  if (eventNode) {
    eventNode.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function handleRemoveEventById (state: EventsState, eventId: number, setFocusedEvent: (event: PoliticalEvent | null) => void): PoliticalEvent[] {
  const tempEvents = state.selectedEvents.filter((e) => e.id !== eventId)
  if (state.focusedEvent?.id === eventId) {
    setFocusedEvent(null)
  }
  return tempEvents
}
