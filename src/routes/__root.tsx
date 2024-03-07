import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import React, { Suspense } from 'react'
import { Button } from '@radix-ui/themes'
import { AuthContextState } from '../context/auth-context'

const TanStackRouterDevtools =
// import.meta.env.NODE_ENV === 'production'
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools
      }))
    )

interface MyRouterContext {
  auth: AuthContextState
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: () => (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0', width: '100%', height: '100%' }}>
      <h1>
        Esta página no existe
      </h1>
      <Link to='/'>
        <Button variant='solid'>
            Ir a la página de inicio
        </Button>
      </Link>
    </div>
  )
})

function RootComponent () {
  return (
    <>
      <Outlet />
      <Suspense>
        {/* <TanStackRouterDevtools /> */}
      </Suspense>
    </>
  )
}
