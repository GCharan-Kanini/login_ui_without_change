import { useContext } from 'react'
import AuthContext from './AuthContext'

/**
 * useAuth returns the authentication context value and throws when used outside
 * of an AuthProvider.
 */
export default function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
