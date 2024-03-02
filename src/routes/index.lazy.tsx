import { createLazyFileRoute } from '@tanstack/react-router'
import { TimelinePage } from '../pages/timeline.page'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index () {
  return <TimelinePage />
}
