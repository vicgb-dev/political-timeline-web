import { IconButton, TextField } from '@radix-ui/themes'
import { DotsHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { EventsPage } from './components/pages/events.page'
import './App.css'

function App () {
  return (
    <>
      <header >
        <div className='header'>
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Search the docs…" size="3" />
            <TextField.Slot pr="3">
              <IconButton size="2" variant="ghost">
                <DotsHorizontalIcon height="16" width="16" />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </div>
      </header>
      <main>
        <EventsPage />
      </main>
    </>
  )
}

export default App
