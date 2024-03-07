import { create } from 'zustand'
import { PoliticalEvent } from '../models/political-event.interface'

interface EventsState {
  selectedEvents: PoliticalEvent[]
  focusedEvent: PoliticalEvent | null
  addEvent: (event: PoliticalEvent) => void
  addEventAt: (ìndex: number, event: PoliticalEvent) => void
  removeEvent: (event: PoliticalEvent) => void
  removeEventById: (id: number) => void
  setSelectedEvents: (events: PoliticalEvent[]) => void
  setFocusedEvent: (event: PoliticalEvent | null) => void
  setFocusedEventById: (eventId: number) => void
}

export const useEvents = create<EventsState>((set) => ({
  selectedEvents: [],
  focusedEvent: null,
  addEvent: (event: PoliticalEvent) => set((state) => ({ selectedEvents: [...state.selectedEvents, event] })),
  addEventAt: (index: number, event: PoliticalEvent) => set((state) => ({ selectedEvents: addEventAt(state, index, event) })),
  // addEvent: (event: PoliticalEvent) => set((state) => ({ selectedEvents: handleAddEvent(state, event, state.setFocusedEvent) })),
  removeEvent: (event: PoliticalEvent) => set((state) => ({ selectedEvents: handleRemoveEvent(state, event, state.setFocusedEvent) })),
  removeEventById: (id: number) => set((state) => ({ selectedEvents: handleRemoveEventById(state, id, state.setFocusedEvent) })),
  setSelectedEvents: (selectedEvents: PoliticalEvent[]) => set({ selectedEvents }),
  setFocusedEvent: (event: PoliticalEvent | null) => set({ focusedEvent: event }),
  setFocusedEventById: (eventId: number) => set((state) => ({ focusedEvent: state.selectedEvents.find((e) => e.id === eventId) }))
}))

function addEventAt(state: EventsState, index: number, event: PoliticalEvent): PoliticalEvent[] {
  state.selectedEvents.splice(index, 0, event)
  console.log(state.selectedEvents)
  return state.selectedEvents
}

// Al clicar un EventS
function handleAddEvent(state: EventsState, event: PoliticalEvent, setFocusedEvent: (event: PoliticalEvent | null) => void): PoliticalEvent[] {
  // Si ya esta en eventos, lo enfoco
  if (state.selectedEvents.find((e) => e.id === event.id)) {
    setFocusedEvent(event)
    return state.selectedEvents
  }

  // Si mi foco es EventForm o Añadir Evento Aqui, lo agrego
  if (state.focusedEvent === null || state.focusedEvent?.id === -1) {
    setFocusedEvent(event)
    return [...state.selectedEvents, event]
  }

  // Si mi foco es un Evento (que no es EventForm), lo sustituyo
  const newSelectedEvents = state.selectedEvents
  console.log('ANTES', newSelectedEvents)
  const index = newSelectedEvents.findIndex(event => event.id === state.focusedEvent?.id)
  if (index !== -1) {
    // Reemplaza el objeto en la misma posición
    newSelectedEvents[index] = event
  }

  console.log('DESPUES', newSelectedEvents)
  return newSelectedEvents
}

function handleRemoveEvent(state: EventsState, event: PoliticalEvent, setFocusedEvent: (event: PoliticalEvent | null) => void): PoliticalEvent[] {
  const newSelectedEvents = state.selectedEvents.filter((e) => e.id !== event.id)
  if (state.focusedEvent?.id === event.id) {
    setFocusedEvent(null)
  }
  return newSelectedEvents
}

function handleRemoveEventById(state: EventsState, eventId: number, setFocusedEvent: (event: PoliticalEvent | null) => void): PoliticalEvent[] {
  const newSelectedEvents = state.selectedEvents.filter((e) => e.id !== eventId)
  if (state.focusedEvent?.id === eventId) {
    setFocusedEvent(null)
  }
  return newSelectedEvents
}
