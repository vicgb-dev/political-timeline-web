import { useState, createContext, Dispatch, SetStateAction, useEffect, useLayoutEffect } from 'react'

export interface LayoutContextState {
  floatEvent: boolean
  oneColumn: boolean
  minimized: boolean
  setIsFloatEvent: Dispatch<SetStateAction<boolean>>
  setOneColumn: Dispatch<SetStateAction<boolean>>
  setMinimized: Dispatch<SetStateAction<boolean>>
}

export const LayoutContext = createContext<LayoutContextState>({
  floatEvent: true,
  oneColumn: true,
  minimized: false,
  setIsFloatEvent: () => { },
  setOneColumn: () => { },
  setMinimized: () => { }
})

interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [floatEvent, setIsFloatEvent] = useState<boolean>(true)
  const [oneColumn, setOneColumn] = useState<boolean>(true)
  const [minimized, setMinimized] = useState<boolean>(false)

  const updateWindowSize = () => {
    // Get Root element by getElement so i can know the width of the window

    // Radix UI considera 1024px tablet landscape
    setIsFloatEvent(document.getElementById('html')!.offsetWidth < 1024)
    // Radix UI considera 768px tablet portrait
    setOneColumn(document.getElementById('html')!.offsetWidth < 768)
  }

  // Actualizar el layout por tamaño de pantalla
  useLayoutEffect(() => {
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
    <LayoutContext.Provider
      value={{
        floatEvent,
        oneColumn,
        minimized,
        setIsFloatEvent,
        setOneColumn,
        setMinimized
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutProvider