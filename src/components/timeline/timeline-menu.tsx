import { ExitIcon, GearIcon, QuestionMarkIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Link } from '@radix-ui/themes'
import { MenuThemeButton } from '../menu/menu-theme-button'
import { useLayoutStore } from '../../stores/layout-store'
import { MenuUserButton } from '../menu/menu-user-button'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'
import { CreateEventIconButton } from '../buttons/create-event-icon-button'
import { Link as RLink } from '@tanstack/react-router'
import { DialogAB } from '../../shared/dialog/dialog-ab'
import { SearchBarLogo } from '../search/search-bar-logo'
import { useToast } from '../../stores/toast-store'
import { ToastProps } from './../../stores/toast-store'

export function TimeLineMenu () {
  const { isLogged, logout } = useContext(AuthContext)
  const isSidebarOpen = useLayoutStore(state => state.isSidebarOpen)
  const oneColumn = useLayoutStore(state => state.oneColumn)
  const addToast = useToast(state => state.addToast)

  function handleOnGear () {
    const toast: ToastProps = {
      title: 'Not implemented yet',
      description: 'This feature is not implemented yet',
      showButton: false,
      buttonText: '',
      buttonAction: () => { },
      duration: 1000
    }
    addToast(toast, true)
  }

  return (
    <div hidden={!isSidebarOpen} className='left-0 min-w-20  w-16'>
      <Flex
        direction='column'
        align='center'
        gap='5'
        className='sticky pt-5 top-14 w-full'>
        <div className='absolute pt-5 lateral-menu-line h-96'/>
        {oneColumn && <SearchBarLogo isInMenu={oneColumn}/>}
        <MenuUserButton />
        {isLogged && <CreateEventIconButton />}
        <MenuThemeButton />
        <RLink to='/about' className='no-underline text-inherit'>
          <IconButton variant='surface' style={{ cursor: 'pointer' }} tabIndex={-1}>
            <QuestionMarkIcon />
          </IconButton>
        </RLink>
        <IconButton variant='surface' onClick={handleOnGear}>
          <GearIcon />
        </IconButton>
        {isLogged &&
        <DialogAB props={{
          title: 'Cerrar sesión',
          description: '¿Estás seguro de que quieres cerrar sesión? Si estabas editando un evento los cambios no guardados se perderán.',
          btnGrayText: 'Cancelar',
          btnGrayAction: () => { },
          btnColorText: 'Cerrar sesión',
          btnColorAction: () => { logout() }
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
