import { EventsPage } from './pages/events.page'
import { Header } from './components/header/header'
import './App.css'
import EventsProvider from './providers/events-context'

function App () {
  return (
    <>
      <EventsProvider>
        <header >
          <Header />
        </header>
        <main>

          <EventsPage />
        </main>
      </EventsProvider>
    </>
  )
}

export default App
