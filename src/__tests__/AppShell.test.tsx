import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'

// Import modules at the planned locations so missing modules produce collection-time failures (greenfield rule).
import ProtectedRoute from '../routes/ProtectedRoute'
import PublicRoute from '../routes/PublicRoute'
import AuthContext from '../auth/AuthContext'
import theme from '../theme/theme'

// Utility component to expose location and navigation type for assertions
function LocationInspector() {
  const location = useLocation()
  const navType = useNavigationType()
  return (
    <div>
      <span data-testid="current-path">{location.pathname}</span>
      <span data-testid="nav-type">{navType}</span>
    </div>
  )
}

describe('App shell routing and theme (AC-2, AC-3, AC-4)', () => {
  it('AC-2: redirects unauthenticated /dashboard -> /login using a replace navigation', async () => {
    // Render a minimal routing tree using the planned ProtectedRoute
    render(
      <AuthContext.Provider value={{ user: null, isAuthenticated: false }}>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div data-testid="dashboard">DASH</div>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<div data-testid="login">LOGIN</div>} />
          </Routes>
          <LocationInspector />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    // Expect we ended up at /login
    expect(await screen.findByTestId('login')).toBeTruthy()

    // Assert that the router reported navigation type as REPLACE
    const navType = screen.getByTestId('nav-type').textContent
    const current = screen.getByTestId('current-path').textContent
    expect(current).toBe('/login')
    expect(navType).toBe('REPLACE')
  })

  it('AC-3: signed-in visitor requesting /login is redirected to /dashboard (replace/push semantics handled by route)', async () => {
    render(
      <AuthContext.Provider value={{ user: { id: 'demo' }, isAuthenticated: true }}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <div data-testid="login-page">LOGIN PAGE</div>
                </PublicRoute>
              }
            />
            <Route path="/dashboard" element={<div data-testid="dashboard">DASHBOARD</div>} />
          </Routes>
          <LocationInspector />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    // Expect to be redirected to /dashboard
    expect(await screen.findByTestId('dashboard')).toBeTruthy()

    // Ensure the URL is /dashboard
    const current = screen.getByTestId('current-path').textContent
    expect(current).toBe('/dashboard')
  })

  it('AC-4: theme exports the primary colour and border radius in src/theme/theme.ts', () => {
    // The theme object is expected to follow MUI theme shape where
    // palette.primary.main is a colour string and shape.borderRadius exists.
    expect(theme).toBeDefined()

    // primary colour
    // Accept either theme.palette.primary.main or theme.primary (be permissive in shape check but assert presence)
    const hasPrimaryMain = !!(theme && theme.palette && theme.palette.primary && typeof theme.palette.primary.main === 'string')
    expect(hasPrimaryMain).toBe(true)

    // border radius
    const hasBorderRadius = !!(theme && theme.shape && typeof theme.shape.borderRadius !== 'undefined')
    expect(hasBorderRadius).toBe(true)
  })
})
