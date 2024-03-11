import { createFileRoute, redirect } from '@tanstack/react-router'
import { MyEventsPage } from '../pages/my-events.page'
import { EventsSearchParams } from '../pages/search-params/events-params'

export const Route = createFileRoute('/my-events')({
  validateSearch: (search: Record<string, unknown>): EventsSearchParams => {
    return {
      eventIds: (search.events as number[]) || undefined,
      creating: (search.creating as boolean) || undefined
    }
  },
  beforeLoad: ({ context }) => {
    if (!context.auth.isLogged) {
      throw redirect({ to: '/' })
    }
  },
  component: MyEvents
})

function MyEvents () {
  return <MyEventsPage />
}
