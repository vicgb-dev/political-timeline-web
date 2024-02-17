import { Event } from './../../models/event.interface'

interface EventTimeLineProps {
  events: Event[]
  isMobile: boolean
}

export function EventTimeLine ({ events, isMobile }: EventTimeLineProps) {
  // Pinta la linea
  // Decide si mostrar una columna o dos

  return (
    <div>
      {isMobile && <p>Es móvil</p>}
      <h1>EventTimeLine</h1>
    </div>
  )
}
