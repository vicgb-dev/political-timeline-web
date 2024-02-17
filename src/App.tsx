import { EventsPage } from './pages/events.page'
import { Header } from './components/header/header'
import './App.css'

function App () {
  return (
    <>
      <header >
        <Header />
      </header>
      <main>
        <EventsPage />
      </main>
    </>
  )
}

export default App
