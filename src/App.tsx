import { RouterProvider, createRouter } from '@tanstack/react-router'
import { AuthProvider, useAuth } from './context/auth-context.tsx'
import EventsProvider from './context/events-context.tsx'
import { routeTree } from './routeTree.gen.ts'
import './App.css'

const router = createRouter({
  routeTree,
  context: {
    auth: undefined! // This is a placeholder for the auth context
  }
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp () {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function App () {
  return (
    <>
      <AuthProvider>
        <EventsProvider>
          <InnerApp />
        </EventsProvider>
      </AuthProvider>
    </>
  )
}

export default App
