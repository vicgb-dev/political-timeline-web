import { createFileRoute, redirect } from '@tanstack/react-router'
import { MyEventsPage } from '../pages/my-events.page'

type MyEventsSearchParams = {
  eventId?: string | undefined,
  creating?: boolean | undefined
}

export const Route = createFileRoute('/my-events')({
  validateSearch: (search: Record<string, unknown>): MyEventsSearchParams => {
    return {
      eventId: (search.eventId as string) || undefined,
      creating: (search.creating as boolean) || undefined
    }
  },
  beforeLoad: ({ context }) => {
    if (!context.auth.isLogged) {
      console.log('Redirecting to /')
      throw redirect({ to: '/' })
    }
  },
  component: MyEvents
})

function MyEvents () {
  return <MyEventsPage />
}
