import React from 'react'
import { Box, Typography, Button, TextField } from '@mui/material'
import useAuth from '../auth/useAuth'

/**
 * LoginPage placeholder demonstrating themeed controls and demo signin.
 */
export default function LoginPage() {
  const { login } = useAuth()

  const doLogin = async () => {
    try {
      await login('demo@example.com', 'password123')
    } catch (e) {
      // ignore
    }
  }

  return (
    <Box p={3}>
      <Typography variant="h4">Login Page</Typography>
      <Box mt={2}>
        <TextField label="Email" />
      </Box>
      <Box mt={2}>
        <TextField label="Password" type="password" />
      </Box>
      <Box mt={2}>
        <Button onClick={doLogin}>Sign in</Button>
      </Box>
    </Box>
  )
}
