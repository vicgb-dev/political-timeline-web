import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { Link, useRouterState } from '@tanstack/react-router'
import { AuthContext } from '../../context/auth-context'
import { useContext } from 'react'

export function CreateEventButton () {
  const { isLogged } = useContext(AuthContext)
  const routerState = useRouterState()

  return (
    isLogged &&
    <Link
      to='/my-events'
      search={{ creating: true }}
      style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button size='2' variant={routerState.location.pathname === '/my-events' ? 'solid' : 'surface'} style={{ marginLeft: 'auto', cursor: 'pointer' }}>
        <PlusIcon height="16" width="16" />
          Crear evento
      </Button>
    </Link>
  )
}
