import { PersonIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { LoginDialog } from '../dialogs/login-dialog'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'
import { PopoverUserMenu } from '../popover/popover-user-menu'

export function SearchBarUserButton () {
  const { isLogged } = useContext(AuthContext)

  return (
    <>
      {isLogged
        ? <PopoverUserMenu>
          <IconButton variant='surface' size='2' ><PersonIcon /></IconButton>
        </PopoverUserMenu>
        : <LoginDialog>
          <IconButton variant='surface' size='2' ><PersonIcon /></IconButton>
        </LoginDialog> }

    </>
  )
}
