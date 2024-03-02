import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute
} from '@tanstack/react-router'
import { AuthProvider } from './context/auth-context.tsx'
import EventsProvider from './context/events-context.tsx'
import { EventsPage } from './pages/events.page.tsx'
import './App.css'
import React, { Suspense } from 'react'

const TanStackRouterDevtools =
// import.meta.env.NODE_ENV === 'production'
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
    // Lazy load in development
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    )
const rootRoute = createRootRoute({
  component: () => (
    <>
      {/* <Link to="/about">
          About
      </Link> */}
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  )
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index () {
    return <EventsPage />
  }
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About () {
    return <div>Hello from About!</div>
  }
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
function App () {
  return (
    <>
      <AuthProvider>
        <EventsProvider>
          <RouterProvider router={router} />
        </EventsProvider>
      </AuthProvider>
    </>
  )
}

export default App
