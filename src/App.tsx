import { EventsPage } from './pages/events.page'
import { Header } from './components/header/header'
import './App.css'
import EventsProvider from './providers/events-context'
import { AuthProvider } from './providers/auth-context'

function App () {
  return (
    <>
      <AuthProvider>
        <EventsProvider>
          <header >
            <Header />
          </header>
          <main>

            <EventsPage />
          </main>
        </EventsProvider>
      </AuthProvider>
    </>
  )
}

export default App
