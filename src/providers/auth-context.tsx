import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { AuthRepo } from '../repositories/auth-repo'
import { AuthService } from '../services/auth/auth-service'

export interface AuthContextState{
    isLogged: boolean
    logout: Dispatch<SetStateAction<void>>
}

export const AuthContext = createContext<AuthContextState>({
  isLogged: false,
  logout: () => {}
})

interface AuthProviderProps{
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const logout = () => {
    AuthRepo.logout()
    setIsLogged(false)
  }

  useEffect(() => {
    const isLogged = async () => {
      const isLogged = await AuthService.isLogged()
      setIsLogged(isLogged)
    }

    isLogged()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
