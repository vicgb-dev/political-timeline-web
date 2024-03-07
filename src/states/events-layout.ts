import { create } from 'zustand'
import { PoliticalEvent } from '../models/political-event.interface'

interface EventsState {
  selectedEvents: PoliticalEvent[]
  focusedEvent: PoliticalEvent | null
  addEvent: (event: PoliticalEvent) => void
  removeEvent: (event: PoliticalEvent) => void
  removeEventById: (id: number) => void
  setSelectedEvents: (events: PoliticalEvent[]) => void
  setFocusedEvent: (event: PoliticalEvent | null) => void
  setFocusedEventById: (eventId: number) => void
}

export const useEvents = create<EventsState>((set) => ({
  selectedEvents: [],
  focusedEvent: null,
  addEvent: (event: PoliticalEvent) => set((state) => ({ selectedEvents: handleAddEvent(state, event) })),
  removeEvent: (event: PoliticalEvent) => set((state) => ({ selectedEvents: state.selectedEvents.filter((e) => e.id !== event.id) })),
  removeEventById: (id: number) => set((state) => ({ selectedEvents: state.selectedEvents.filter((e) => e.id !== id) })),
  setSelectedEvents: (selectedEvents: PoliticalEvent[]) => set({ selectedEvents }),
  setFocusedEvent: (event: PoliticalEvent | null) => set({ focusedEvent: event }),
  setFocusedEventById: (eventId: number) => set((state) => ({ focusedEvent: state.selectedEvents.find((e) => e.id === eventId) }))
}))

// Al clicar un EventS
function handleAddEvent(state: EventsState, event: PoliticalEvent): PoliticalEvent[] {
  // Si ya esta en eventos, lo enfoco
  if (state.selectedEvents.find((e) => e.id === event.id)) {
    state.setFocusedEvent(event)
    return state.selectedEvents
  }

  // Si mi foco es EventForm o Añadir Evento Aqui, lo agrego
  if (state.focusedEvent === null || state.focusedEvent?.id === -1) {
    return [...state.selectedEvents, event]
  }

  // Si mi foco es un Evento (que no es EventForm), lo sustituyo
  const newSelectedEvents = state.selectedEvents
  const index = newSelectedEvents.findIndex(event => event.id === state.focusedEvent?.id)
  if (index !== -1) {
    // Reemplaza el objeto en la misma posición
    newSelectedEvents[index] = event
  }

  return newSelectedEvents
}
