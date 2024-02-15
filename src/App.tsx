import { Theme } from '@radix-ui/themes'
import EventCard from './components/event-card'
import Otro from './components/otro'

function App () {
  return (
    <>
      <Theme appearance="dark">
        <EventCard/>
        <Otro/>
      </Theme>
    </>
  )
}

export default App
