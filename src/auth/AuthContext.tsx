import React, { createContext, useEffect, useState } from 'react'
import authService from './authService'
import { AuthContextValue, User } from '../types/auth'

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  login: async () => {
    throw new Error('AuthProvider not mounted')
  },
  logout: () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user')
      if (raw) setUser(JSON.parse(raw))
    } catch (e) {
      // ignore storage errors
      // eslint-disable-next-line no-console
      console.warn('Failed to restore user from storage', e)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const u = await authService.login(email, password)
    setUser(u)
    try {
      localStorage.setItem('user', JSON.stringify(u))
    } catch (e) {
      // ignore
    }
    return u
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('user')
    } catch (e) {
      // ignore
    }
    authService.logout()
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
