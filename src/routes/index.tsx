import { createFileRoute } from '@tanstack/react-router'
import { TimelinePage } from '../pages/timeline.page'
import { EventsSearchParams } from '../pages/search-params/events-params'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): EventsSearchParams => {
    return {
      eventIds: (search.events as number[]) || undefined
    }
  },
  component: Index
})

function Index () {
  return <TimelinePage />
}
