import React from 'react'
import { AuthProvider } from './auth/AuthContext'
import AppRoutes from './routes/AppRoutes'

/**
 * App is the application root which wires authentication and routing.
 */
export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
