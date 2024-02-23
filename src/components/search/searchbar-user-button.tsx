import { PersonIcon } from '@radix-ui/react-icons'
import { IconButton, Popover } from '@radix-ui/themes'
import { SearchBarLoginForm } from './searchbar-login-form'

export function SearchBarUserButton () {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant='surface' size='2' >
          <PersonIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content >
        <SearchBarLoginForm />

      </Popover.Content>
    </Popover.Root>
  )
}
