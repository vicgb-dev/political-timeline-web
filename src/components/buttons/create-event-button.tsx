import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { AuthContext } from '../../context/auth-context'
import { useContext } from 'react'

export function CreateEventButton () {
  const { isLogged } = useContext(AuthContext)

  return (
    isLogged &&
    <Link
      to='/my-events'
      search={{ creating: true }}
      style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button size='2' variant='solid' style={{ marginLeft: 'auto', cursor: 'pointer' }}>
        <PlusIcon height="16" width="16" />
          Crear evento
      </Button>
    </Link>
  )
}
