import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { AuthRepo } from '../repositories/auth-repo'
import { AuthService } from '../services/auth/auth-service'

export interface AuthContextState{
    isLogged: boolean
    login: (token: string) => void
    logout: Dispatch<SetStateAction<void>>
}

export const AuthContext = createContext<AuthContextState>({
  isLogged: false,
  login: () => {},
  logout: () => {}
})

interface AuthProviderProps{
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(AuthService.isLogged())

  const logout = () => {
    AuthRepo.logout()
    setIsLogged(false)
  }

  const login = (token: string) => {
    AuthRepo.saveToken(token)
    setIsLogged(true)
  }

  useEffect(() => {
    const isLogged = () => {
      const isLogged = AuthService.isLogged()
      setIsLogged(isLogged)
    }

    isLogged()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
