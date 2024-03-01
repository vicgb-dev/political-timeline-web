import { PersonIcon } from '@radix-ui/react-icons'
import { IconButton, Popover } from '@radix-ui/themes'
import { SearchBarLoginForm } from './searchbar-login-form'
import { LoginDialog } from '../dialogs/login-dialog'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'

export function SearchBarUserButton () {
  const { isLogged } = useContext(AuthContext)

  return (
    <>
      {isLogged
        ? <Popover.Root>
          <Popover.Trigger>
            <IconButton variant='surface' size='2' ><PersonIcon /></IconButton>
          </Popover.Trigger>
          <Popover.Content >
            <SearchBarLoginForm />
          </Popover.Content>
        </Popover.Root>
        : <LoginDialog>
          <IconButton variant='surface' size='2' ><PersonIcon /></IconButton>
        </LoginDialog> }

    </>
  )
}
