import { EventsPage } from './pages/events.page'
import EventsProvider from './context/events-context'
import { AuthProvider } from './context/auth-context'
import './App.css'

function App () {
  return (
    <>
      <AuthProvider>
        <EventsProvider>
          <EventsPage />
        </EventsProvider>
      </AuthProvider>
    </>
  )
}

export default App
