import { create } from 'zustand'

export interface ToastProps {
  title: string
  description: string
  showButton: boolean
  buttonText: string
  buttonAction: () => void
  duration: number // 0 means it will stay until the user clicks it
}

interface ToastsState {
  toastQueue: ToastProps[]
  addToast: (toast: ToastProps, clearTheRestToasts: boolean) => void
  removeFirstToast: () => void
  removeToast: (toast: ToastProps) => void
  clearToasts: () => void
}

export const useToast = create<ToastsState>((set) => ({
  toastQueue: [],
  addToast: (toast: ToastProps, clearTheRestToasts: boolean) => set((state) => ({ toastQueue: clearTheRestToasts ? [toast] : [...state.toastQueue, toast] })),
  removeFirstToast: () => set((state) => ({ toastQueue: state.toastQueue.slice(1) })),
  removeToast: (toast: ToastProps) => set((state) => ({ toastQueue: state.toastQueue.filter((t) => t !== toast) })),
  clearToasts: () => set({ toastQueue: [] })
}))
