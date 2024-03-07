import { create } from 'zustand'
import { PoliticalEvent } from '../models/political-event.interface'

interface EventsState {
  selectedEvents: PoliticalEvent[]
  focusedEvent: PoliticalEvent | null
  addEvent: (event: PoliticalEvent) => void
  addEventAt: (ìndex: number, event: PoliticalEvent) => void
  removeEvent: (event: PoliticalEvent) => void
  removeEventById: (id: number) => void
  setFocusedEvent: (event: PoliticalEvent | null) => void
}

export const useEvents = create<EventsState>((set) => ({
  selectedEvents: [],
  focusedEvent: null,
  addEvent: (event: PoliticalEvent) => set((state) => ({ selectedEvents: [...state.selectedEvents, event] })),
  addEventAt: (index: number, event: PoliticalEvent) => set((state) => ({ selectedEvents: addEventAt(state, index, event) })),
  removeEvent: (event: PoliticalEvent) => set((state) => ({ selectedEvents: handleRemoveEvent(state, event, state.setFocusedEvent) })),
  removeEventById: (id: number) => set((state) => ({ selectedEvents: handleRemoveEventById(state, id, state.setFocusedEvent) })),
  setFocusedEvent: (event: PoliticalEvent | null) => set({ focusedEvent: event })
}))

function addEventAt(state: EventsState, index: number, event: PoliticalEvent): PoliticalEvent[] {
  state.selectedEvents.splice(index, 0, event)
  console.log(state.selectedEvents)
  return state.selectedEvents
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
