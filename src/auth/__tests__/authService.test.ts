import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Import the planned auth service location so missing module is a collection-time failure per greenfield_rule
import authService from '../authService'

describe('authService.login (AC-5)', () => {
  const DEMO_EMAIL = 'demo@example.com'
  const DEMO_PASSWORD = 'password123'

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('resolves to a demo user after an artificial delay for the demo credentials', async () => {
    const loginPromise = authService.login(DEMO_EMAIL, DEMO_PASSWORD)

    // Advance time enough for the artificial delay implemented by the demo login
    // Tests should not rely on exact milliseconds; advance generously
    await vi.advanceTimersByTimeAsync(5000)

    await expect(loginPromise).resolves.toEqual(
      expect.objectContaining({
        // At minimum the demo user should include the email used to login
        email: DEMO_EMAIL
      })
    )
  })

  it('rejects for any other credentials', async () => {
    const p = authService.login('someone@else.com', 'badpass')

    // Advance timers so any artificial delay settles
    await vi.advanceTimersByTimeAsync(5000)

    await expect(p).rejects.toBeDefined()
  })
})
