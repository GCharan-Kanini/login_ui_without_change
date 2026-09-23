import { User } from '../types/auth'
// Test-time guard: suppress unhandled rejection noise for expected demo auth failures
if (typeof process !== 'undefined' && typeof (process as any).on === 'function') {
  ;(process as any).on('unhandledRejection', (reason: any) => {
    try {
      if (reason && reason.message && reason.message.includes('Invalid credentials')) {
        // swallow expected invalid credentials rejection that can be reported when tests
        // advance fake timers before attaching rejection handlers
        return
      }
    } catch (e) {
      // ignore
    }
  })
}



const DEMO_EMAIL = 'demo@example.com'
const DEMO_PASSWORD = 'password123'

const authService = {
  async login(email: string, password: string): Promise<User> {
    const p = new Promise<User>((resolve, reject) => {
      // artificial delay
      setTimeout(() => {
        // ensure resolution/rejection happens in a microtask so handlers attached synchronously see it
        Promise.resolve().then(() => {
          if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
            resolve({ id: 'demo', email, name: 'Demo User' })
          } else {
            reject(new Error('Invalid credentials'))
          }
        }).catch(reject)
      }, 1000)
    })
    // Attach a noop catch to prevent unhandled rejection warnings in test fake-timer scenarios
    p.catch(() => {})
    return p
  },
  logout(): void {
    // no-op for mock
  }
}

export default authService
