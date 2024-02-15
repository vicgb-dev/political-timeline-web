import { Box, Flex } from '@radix-ui/themes'
import EventCard from './components/event-card'
import Otro from './components/otro'
import TestComponent from './components/tests-components/tests-components'

function App () {
  const testComponent: boolean = true
  return (
    <>
      <Flex gap="9" justify='center' align='center'>
        <Flex gap="9" direction='column' justify='center' align='center'>
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
        </Flex>
        <Flex gap="9" direction='column' justify='center' align='center'>
          <Box height='9'>
          </Box>
          <Box height='9'>
          </Box>
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
          {testComponent && <TestComponent />}
        </Flex>
      </Flex>
      <EventCard/>
      <Otro/>
    </>
  )
}

export default App
