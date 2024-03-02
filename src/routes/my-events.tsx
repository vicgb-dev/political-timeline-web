import { createFileRoute, redirect } from '@tanstack/react-router'
import { MyEventsPage } from '../pages/my-events.page'

export const Route = createFileRoute('/my-events')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isLogged) {
      throw redirect({ to: '/' })
    }
  },
  component: MyEvents
})

function MyEvents () {
  return <MyEventsPage />
}
