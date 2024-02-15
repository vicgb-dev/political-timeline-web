import EventCard from './components/event-card'
import Otro from './components/otro'
import TestComponent from './components/tests-components/tests-components'

function App () {
  const testComponent: boolean = true
  return (
    <>
      {testComponent && <TestComponent />}
      <EventCard/>
      <Otro/>
    </>
  )
}

export default App
