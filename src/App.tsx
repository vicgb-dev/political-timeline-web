import { EventsPage } from './pages/events.page'
import { Header } from './components/header/header'
import './App.css'
import EventsProvider from './providers/events-context'

function App () {
  return (
    <>
      <header >
        <Header />
      </header>
      <main>

        <EventsProvider>

          <EventsPage />
        </EventsProvider>
      </main>
    </>
  )
}

export default App
