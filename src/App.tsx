import { RouterProvider, createRouter } from '@tanstack/react-router'
import { AuthProvider, useAuth } from './context/auth-context.tsx'
import { routeTree } from './routeTree.gen.ts'
import { useEffect } from 'react'
import { useLayoutStore } from './stores/layout-store'
import { Breakpoints } from './constants/breakpoints.ts'
import './App.css'

const router = createRouter({
  routeTree,
  context: {
    auth: undefined! // This is a placeholder for the auth context
  }
})
declare module '@tanstack/react-router' {
  interface Register {router: typeof router}
}

function InnerApp () {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function App () {
  const setIsFloatEvent = useLayoutStore(state => state.setIsFloatEvent)
  const setOneColumn = useLayoutStore(state => state.setOneColumn)
  const openSidebar = useLayoutStore(state => state.openSidebar)
  const closeSidebar = useLayoutStore(state => state.closeSidebar)

  const updateWindowSize = () => {
    const html: HTMLElement = document.getElementById('html')!
    const lessThanTablet = html.offsetWidth < Breakpoints.TABLET
    const lessThanMobile = html.offsetWidth < Breakpoints.MOBILE

    if (lessThanTablet) {
      closeSidebar()
    } else {
      openSidebar()
    }

    setIsFloatEvent(lessThanTablet)
    setOneColumn(lessThanMobile)
  }

  // useLayoutEffect(() => {
  useEffect(() => {
    const handleResize = () => {
      updateWindowSize()
    }
    // Agregar un event listener para el evento resize
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)
    updateWindowSize()
    // Eliminar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)
    }
  }, [])

  return (
    <>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </>
  )
}

export default App
