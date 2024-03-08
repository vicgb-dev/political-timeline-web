import { ExitIcon, GearIcon, QuestionMarkIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { MenuThemeButton } from '../menu/menu-theme-button'
import { useLayoutStore } from '../../stores/layout-store'
import { MenuUserButton } from '../menu/menu-user-button'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'
import { useEvents } from '../../stores/events-store'
import { CreateEventIconButton } from '../buttons/create-event-icon-button'
import { Link } from '@tanstack/react-router'
import { DialogAB } from '../../shared/dialog/dialog-ab'

export function TimeLineMenu () {
  const { isLogged, logout } = useContext(AuthContext)
  const events = useEvents(state => state.selectedEvents)
  const isSidebarOpen = useLayoutStore(state => state.isSidebarOpen)
  return (
    <div hidden={!isSidebarOpen} className='left-0 min-w-16 max-w-16 w-16'>
      <Flex
        direction='column'
        align='center'
        gap='5'
        className='sticky pt-5 top-14 w-full'>
        <div className='absolute pt-5 lateral-menu-line h-96'/>
        <MenuUserButton />
        {isLogged && !events.find(event => event.id === -1) && <CreateEventIconButton />}
        <MenuThemeButton />
        <Link to='/about' className='no-underline text-inherit'>
          <IconButton variant='surface' style={{ cursor: 'pointer' }} onClick={() => console.log()}>
            <QuestionMarkIcon />
          </IconButton>
        </Link>
        <IconButton variant='surface'>
          <GearIcon />
        </IconButton>
        {isLogged &&
        <DialogAB props={{
          title: 'Cerrar sesión',
          description: '¿Estás seguro de que quieres cerrar sesión? Si estabas editando un evento los cambios no guardados se perderán.',
          btnYesText: 'Cancelar',
          btnYesAction: () => { },
          btnNoText: 'Cerrar sesión',
          btnNoAction: () => { logout() }
        }}>
          <IconButton variant='surface' color='tomato' style={{ cursor: 'pointer' }}>
            <ExitIcon />
          </IconButton>
        </DialogAB>
        }
      </Flex>
    </div>
  )
}
