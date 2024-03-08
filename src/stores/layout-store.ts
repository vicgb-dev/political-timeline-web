import { create } from 'zustand'

interface LayoutState {
    // Menu sidebar
    isSidebarOpen: boolean
    toggleSidebar: () => void
    closeSidebar: () => void
    openSidebar: () => void

    // Events layout
    floatEvent: boolean
    oneColumn: boolean
    minimized: boolean
    setIsFloatEvent: (isFloat: boolean) => void
    setOneColumn: (isOneColumn: boolean) => void
    setMinimized: (isMinimized: boolean) => void
}

export const useLayoutStore = create<LayoutState>((set) => ({
  // Menu sidebar
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openSidebar: () => set({ isSidebarOpen: true }),

  // Events layout
  floatEvent: false,
  oneColumn: true,
  minimized: false,
  setIsFloatEvent: (isFloat: boolean) => set({ floatEvent: isFloat }),
  setOneColumn: (isOneColumn: boolean) => set({ oneColumn: isOneColumn }),
  setMinimized: (isMinimized: boolean) => set({ minimized: isMinimized })
}))
