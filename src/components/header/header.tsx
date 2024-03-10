import { SearchBar } from '../search/search-bar'
import { SearchBarInfoButton } from '../search/search-bar-info-button'
import { IconButton } from '@radix-ui/themes'
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useLayoutStore } from '../../stores/layout-store'
import { SearchBarLogo } from '../search/search-bar-logo'
import './header.css'

export function Header () {
  const toggleSidebar = useLayoutStore(state => state.toggleSidebar)
  const isSidebarOpen = useLayoutStore(state => state.isSidebarOpen)
  const floatEvent = useLayoutStore(state => state.floatEvent)

  return (
    <div className='w-full flex justify-center py-2-custom'>
      <div className='w-full flex items-center gap-5 max-width-1500 px-5-custom'>
        {floatEvent
          ? <IconButton onClick={toggleSidebar}>
            {isSidebarOpen
              ? <Cross1Icon />
              : <HamburgerMenuIcon />}
          </IconButton>
          : null}
        <SearchBarLogo />
        <SearchBar />
        <SearchBarInfoButton />
        {/* {routerState.location.pathname !== '/my-events' && <CreateEventButton />} */}
      </div>
    </div>
  )
}
